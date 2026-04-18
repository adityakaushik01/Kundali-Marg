import { calculateAccurateKundali } from "../kundaliCalculator.js";
import User from "../models/User.js";
import Kundali from "../models/Kundali.js";
import { FREE_KUNDALI_LIMIT } from "../config/limits.js";
import { calculateDashaBalance, generateMahadashaTimeline, DASHA_ORDER, DASHA_YEARS } from "../utils/dashaCalculation.js";

export const generateKundali = async (req, res) => {

  try {

    const user = await User.findById(req.user.user_id);
    console.log("user found in generateKundali", user);

    if (user.kundali_created_count >= FREE_KUNDALI_LIMIT) {
      return res.status(403).json({
        message: "Free kundali limit reached. Please buy credits."
      });
    }

    const { datetime, latitude, longitude, name, timezone, timezoneOffset } = req.body;

    console.log('Kundali Request Received:', {
      datetime, latitude, longitude,
      name: name || 'Anonymous'
    });

    if (!datetime) {
      return res.status(400).json({
        error: 'Missing datetime parameter',
        message: 'Please provide birth date and time'
      });
    }

    if (!latitude || !longitude) {
      return res.status(400).json({
        error: 'Missing location parameters',
        message: 'Please provide latitude and longitude'
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        error: 'Invalid coordinates',
        message: 'Latitude and longitude must be valid numbers'
      });
    }

    if (lat < -90 || lat > 90) {
      return res.status(400).json({
        error: 'Invalid latitude',
        message: 'Latitude must be between -90 and 90'
      });
    }

    if (lng < -180 || lng > 180) {
      return res.status(400).json({
        error: 'Invalid longitude',
        message: 'Longitude must be between -180 and 180'
      });
    }

    if (name && name.length > 100) {
      return res.status(400).json({
        error: 'Invalid name',
        message: 'Name must be under 100 characters'
      });
    }

    const birthDate = new Date(datetime);
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid datetime',
        message: 'Please provide a valid date and time'
      });
    }

    if (birthDate > new Date()) {
      return res.status(400).json({
        error: 'Future date not allowed',
        message: 'Birth date cannot be in the future'
      });
    }

    if (birthDate < new Date('1900-01-01')) {
      return res.status(400).json({
        error: 'Date too far in the past',
        message: 'Birth date must be after January 1, 1900'
      });
    }

    console.log('Validation passed, calculating kundali...');

    const kundaliData = await calculateAccurateKundali({
      datetime: birthDate,
      latitude: lat,
      longitude: lng,
      name: (name || '').trim() || 'User'
    });

    console.log("Kundali calculation completed successfully", JSON.stringify(kundaliData, null, 2));

    const moon = kundaliData.data.planets.find(p => p.name === "Moon");
const moonNakshatraIndex = Math.floor(moon.absoluteDegree / 13.3333333333);
const startLord = DASHA_ORDER[moonNakshatraIndex % 9];
const degreeInNakshatra = moon.absoluteDegree % 13.3333333333;
const balanceYears = calculateDashaBalance(degreeInNakshatra, DASHA_YEARS[startLord]);
const dashaTimeline = generateMahadashaTimeline(birthDate, startLord, balanceYears);

    kundaliData.request_info = {
      processed_at: new Date().toISOString(),
      birth_datetime_utc: birthDate.toISOString(),
      timezone,
      timezone_offset: timezoneOffset,
      coordinates: { latitude: lat, longitude: lng }
    };

    const birthDateObj = new Date(datetime);
    const dateStr = birthDateObj.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const timeStr = birthDateObj.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const savedKundali = await Kundali.create({
      user_id: req.user.user_id,
      name: (name || '').trim() || 'User',
      birth_details: {
        date: dateStr,
        time: timeStr,
        place: req.body.place || "",
        latitude: lat,
        longitude: lng,
        timezone: timezone || "",
      },
      dasha_timeline: dashaTimeline,
      kundali_data: kundaliData,
    });

    console.log("Kundali saved to DB:", savedKundali._id);

    user.kundali_created_count += 1;
    await user.save();

    res.json({
      ...kundaliData,
      dasha_timeline: savedKundali.dasha_timeline,
      kundali_id: savedKundali._id,
    });

  } catch (error) {
    console.error('Error generating kundali:', error);
    res.status(500).json({
      error: 'Kundali calculation failed',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
  }
};