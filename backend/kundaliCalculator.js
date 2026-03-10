// kundaliCalculator.js
// Complete Vedic Kundali Calculator using Swiss Ephemeris (swisseph)
// Calculates: Planets, Lagna, Houses, Nakshatras, Retrograde, Rasi Chart

import swisseph from 'swisseph';

// ── Constants ─────────────────────────────────────────────────────────────────

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

const NAKSHATRA_LORDS = [
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'
];

const SIGN_LORDS = [
  'Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury',
  'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'
];

const HOUSE_NAMES = {
  1: 'Lagna', 2: 'Dhana', 3: 'Sahaja', 4: 'Sukha',
  5: 'Putra', 6: 'Ripu', 7: 'Kalatra', 8: 'Ayur',
  9: 'Bhagya', 10: 'Karma', 11: 'Labha', 12: 'Vyaya'
};

// Planet IDs in swisseph
const PLANETS = {
  Sun:     swisseph.SE_SUN,
  Moon:    swisseph.SE_MOON,
  Mars:    swisseph.SE_MARS,
  Mercury: swisseph.SE_MERCURY,
  Jupiter: swisseph.SE_JUPITER,
  Venus:   swisseph.SE_VENUS,
  Saturn:  swisseph.SE_SATURN,
  Rahu:    swisseph.SE_MEAN_NODE,  // North Node = Rahu
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const norm360 = (deg) => ((deg % 360) + 360) % 360;

const getSignInfo = (longitude) => {
  const lon = norm360(longitude);
  const signIndex = Math.floor(lon / 30);
  const degreeInSign = lon - signIndex * 30;
  return {
    sign: ZODIAC_SIGNS[signIndex],
    signIndex,
    degree: parseFloat(degreeInSign.toFixed(4)),
    absoluteDegree: parseFloat(lon.toFixed(4)),
    lord: SIGN_LORDS[signIndex],
  };
};

const getNakshatraInfo = (siderealLon) => {
  const lon = norm360(siderealLon);
  const nakshatraSize = 360 / 27; // 13.333...°
  const padaSize = nakshatraSize / 4; // 3.333...°
  const nakshatraIndex = Math.floor(lon / nakshatraSize);
  const posInNakshatra = lon - nakshatraIndex * nakshatraSize;
  const padaIndex = Math.floor(posInNakshatra / padaSize);

  return {
    nakshatra: NAKSHATRAS[nakshatraIndex] || 'Unknown',
    pada: padaIndex + 1,
    lord: NAKSHATRA_LORDS[nakshatraIndex] || 'Unknown',
    nakshatraIndex,
  };
};

// ── Julian Date ───────────────────────────────────────────────────────────────

const getJulianDate = (date) => {
  return new Promise((resolve, reject) => {
    const year  = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day   = date.getUTCDate();
    const hour  = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;

    const jd = swisseph.swe_julday(year, month, day, hour, swisseph.SE_GREG_CAL);
    resolve(jd);
  });
};

// ── Get Ayanamsa (Lahiri) ─────────────────────────────────────────────────────

const getAyanamsa = (jd) => {
  swisseph.swe_set_sid_mode(swisseph.SE_SIDM_LAHIRI, 0, 0);
  const ayanamsa = swisseph.swe_get_ayanamsa_ut(jd);
  return ayanamsa;
};

// ── Calculate Single Planet ───────────────────────────────────────────────────

const calculatePlanet = (jd, planetId, ayanamsa) => {
  return new Promise((resolve, reject) => {
    const flags = swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH;

    swisseph.swe_calc_ut(jd, planetId, flags, (result) => {
      if (result.error) {
        reject(new Error(result.error));
        return;
      }

      const tropicalLon = result.longitude;
      const siderealLon = norm360(tropicalLon - ayanamsa);
      const speed       = result.longitudeSpeed;
      const retrograde  = speed < 0;

      const signInfo      = getSignInfo(siderealLon);
      const nakshatraInfo = getNakshatraInfo(siderealLon);

      resolve({
        tropicalLongitude: parseFloat(tropicalLon.toFixed(4)),
        siderealLongitude: parseFloat(siderealLon.toFixed(4)),
        speed:             parseFloat(speed.toFixed(6)),
        retrograde,
        ...signInfo,
        ...nakshatraInfo,
      });
    });
  });
};

// ── Calculate Lagna (Ascendant) ───────────────────────────────────────────────

const calculateLagna = (jd, latitude, longitude, ayanamsa) => {
  return new Promise((resolve, reject) => {
    const cusps  = new Array(13).fill(0);
    const ascmc  = new Array(10).fill(0);

    swisseph.swe_houses(jd, latitude, longitude, 'W', cusps, ascmc);

      // ascmc[0] = Ascendant (tropical)
      // ascmc[1] = MC
      const tropicalAsc = ascmc[0];
      const siderealAsc = norm360(tropicalAsc - ayanamsa);

      const signInfo      = getSignInfo(siderealAsc);
      const nakshatraInfo = getNakshatraInfo(siderealAsc);

      // House cusps (whole sign — each house is one full sign)
      const houseCusps = [];
      for (let i = 1; i <= 12; i++) {
        const tropicalCusp  = cusps[i];
        const siderealCusp  = norm360(tropicalCusp - ayanamsa);
        const cuspSignInfo  = getSignInfo(siderealCusp);
        houseCusps.push({
          house: i,
          tropicalCusp: parseFloat(tropicalCusp.toFixed(4)),
          siderealCusp: parseFloat(siderealCusp.toFixed(4)),
          sign: cuspSignInfo.sign,
          signIndex: cuspSignInfo.signIndex,
          lord: cuspSignInfo.lord,
        });
      }

      resolve({
        tropicalLongitude: parseFloat(tropicalAsc.toFixed(4)),
        siderealLongitude: parseFloat(siderealAsc.toFixed(4)),
        ...signInfo,
        ...nakshatraInfo,
        houseCusps,
      });
    });
  }

// ── Assign Planets to Houses ──────────────────────────────────────────────────

const assignPlanetsToHouses = (planets, lagnaSignIndex) => {
  // Whole Sign House System:
  // House 1 = Lagna sign, House 2 = next sign, etc.
  const houseMap = {};

  for (let i = 1; i <= 12; i++) {
    houseMap[i] = {
      house: i,
      sign: ZODIAC_SIGNS[(lagnaSignIndex + i - 1) % 12],
      signIndex: (lagnaSignIndex + i - 1) % 12,
      lord: SIGN_LORDS[(lagnaSignIndex + i - 1) % 12],
      planets: [],
    };
  }

  // Place each planet in its house
  Object.entries(planets).forEach(([name, data]) => {
    const planetSignIndex = data.signIndex;
    // House number = how many signs away from lagna sign + 1
    let houseNum = ((planetSignIndex - lagnaSignIndex + 12) % 12) + 1;
    houseMap[houseNum].planets.push(name);
    planets[name].house = houseNum;
  });

  return houseMap;
};

// ── Build Rasi Chart Data ─────────────────────────────────────────────────────

const buildRasiChart = (houseMap) => {
  return Object.values(houseMap).map(({ house, sign, signIndex, lord, planets }) => ({
    house,
    sign,
    signIndex,
    lord,
    planet: planets.join(', '),
    planets,
  }));
};

// ── Main Calculator ───────────────────────────────────────────────────────────

export const calculateAccurateKundali = async ({ datetime, latitude, longitude, name }) => {
  try {
    // Set ephemeris path (swisseph bundled data)
    swisseph.swe_set_ephe_path('./node_modules/swisseph/ephe');

    // Get Julian Date (UTC)
    const jd = await getJulianDate(datetime);

    // Get Lahiri Ayanamsa
    const ayanamsa = getAyanamsa(jd);

    // Calculate all planets
    const planetData = {};
    const planetErrors = {};

    for (const [planetName, planetId] of Object.entries(PLANETS)) {
      try {
        const data = await calculatePlanet(jd, planetId, ayanamsa);
        planetData[planetName] = { name: planetName, ...data };
      } catch (err) {
        planetErrors[planetName] = err.message;
        console.warn(`Warning: Could not calculate ${planetName}:`, err.message);
      }
    }

    // Calculate Ketu (always opposite Rahu by 180°)
    if (planetData.Rahu) {
      const ketuLon = norm360(planetData.Rahu.siderealLongitude + 180);
      const ketuSign = getSignInfo(ketuLon);
      const ketuNakshatra = getNakshatraInfo(ketuLon);
      planetData.Ketu = {
        name: 'Ketu',
        siderealLongitude: parseFloat(ketuLon.toFixed(4)),
        tropicalLongitude: parseFloat(norm360(planetData.Rahu.tropicalLongitude + 180).toFixed(4)),
        retrograde: true, // Ketu is always considered retrograde
        speed: planetData.Rahu.speed,
        ...ketuSign,
        ...ketuNakshatra,
      };
    }

    // Calculate Lagna
    const lagnaData = await calculateLagna(jd, latitude, longitude, ayanamsa);

    // Assign planets to houses (Whole Sign system)
    const houseMap = assignPlanetsToHouses(planetData, lagnaData.signIndex);

    // Update house number in each planet
    Object.values(houseMap).forEach(({ house, planets: planetNames }) => {
      planetNames.forEach(pName => {
        if (planetData[pName]) planetData[pName].house = house;
      });
    });

    // Build rasi chart
    const rasiChart = buildRasiChart(houseMap);

    // Format planets array for frontend
    const planetsArray = Object.values(planetData).map(p => ({
      name: p.name,
      sign: p.sign,
      signIndex: p.signIndex,
      house: p.house || 1,
      degree: parseFloat((p.degree || 0).toFixed(2)),
      absoluteDegree: parseFloat((p.siderealLongitude || 0).toFixed(2)),
      nakshatra: p.nakshatra,
      nakshatraPada: p.pada,
      nakshatraLord: p.lord,
      signLord: p.signLord || SIGN_LORDS[p.signIndex] || '',
      retrograde: p.retrograde || false,
      speed: p.speed || 0,
    }));

    // Build birth details
    const birthDetails = {
      name,
      datetime: datetime.toISOString(),
      latitude: parseFloat(latitude.toFixed(4)),
      longitude: parseFloat(longitude.toFixed(4)),
      julianDay: parseFloat(jd.toFixed(4)),
      ayanamsa: parseFloat(ayanamsa.toFixed(4)),
      ayanamsaName: 'Lahiri',
      timezone: 'UTC',
    };

    return {
      status: 'success',
      data: {
        birth_details: birthDetails,
        lagna: {
          sign: lagnaData.sign,
          signIndex: lagnaData.signIndex,
          degree: parseFloat((lagnaData.degree || 0).toFixed(2)),
          nakshatra: lagnaData.nakshatra,
          nakshatraPada: lagnaData.pada,
          lord: lagnaData.lord,
        },
        planets: planetsArray,
        chart: {
          rasi: rasiChart,
          houses: Object.values(houseMap).map(h => ({
            house: h.house,
            name: HOUSE_NAMES[h.house],
            sign: h.sign,
            signIndex: h.signIndex,
            lord: h.lord,
            planets: h.planets,
            planet: h.planets.join(', '),
          })),
        },
        meta: {
          calculatedAt: new Date().toISOString(),
          houseSystem: 'Whole Sign',
          ayanamsa: 'Lahiri',
          ephemeris: 'Swiss Ephemeris',
        },
      },
    };

  } catch (error) {
    console.error('Kundali calculation error:', error);
    throw error;
  }
};