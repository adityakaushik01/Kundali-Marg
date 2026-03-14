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
  5: 'Putra', 6: 'Ripu',  7: 'Kalatra', 8: 'Ayur',
  9: 'Bhagya', 10: 'Karma', 11: 'Labha', 12: 'Vyaya'
};

const PLANETS = {
  Sun:     swisseph.SE_SUN,
  Moon:    swisseph.SE_MOON,
  Mars:    swisseph.SE_MARS,
  Mercury: swisseph.SE_MERCURY,
  Jupiter: swisseph.SE_JUPITER,
  Venus:   swisseph.SE_VENUS,
  Saturn:  swisseph.SE_SATURN,
  Rahu:    swisseph.SE_TRUE_NODE,
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
  const nakshatraSize = 360 / 27;
  const padaSize = nakshatraSize / 4;
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
  const year  = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day   = date.getUTCDate();
  const hour  = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  return swisseph.swe_julday(year, month, day, hour, swisseph.SE_GREG_CAL);
};

// ── Ayanamsa ──────────────────────────────────────────────────────────────────

const getAyanamsa = (jd) => {
  swisseph.swe_set_sid_mode(swisseph.SE_SIDM_LAHIRI, 0, 0);
  return swisseph.swe_get_ayanamsa_ut(jd);
};

// ── Calculate Single Planet ───────────────────────────────────────────────────

const calculatePlanet = (jd, planetId, ayanamsa) => {
  return new Promise((resolve, reject) => {
    const flags = swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH;
    swisseph.swe_calc_ut(jd, planetId, flags, (result) => {
      if (result.error) { reject(new Error(result.error)); return; }
      const tropicalLon = result.longitude;
      const siderealLon = norm360(tropicalLon - ayanamsa);
      const speed       = result.longitudeSpeed;
      resolve({
        tropicalLongitude: parseFloat(tropicalLon.toFixed(4)),
        siderealLongitude: parseFloat(siderealLon.toFixed(4)),
        speed:             parseFloat(speed.toFixed(6)),
        retrograde:        speed < 0,
        ...getSignInfo(siderealLon),
        ...getNakshatraInfo(siderealLon),
      });
    });
  });
};

// ── Calculate Lagna (Ascendant) ───────────────────────────────────────────────
// FIX: node-swisseph swe_houses uses callback API, NOT array output params.
// The old code passed two arrays as args 5 & 6 — the callback was never called
// and ascmc[0] stayed 0, producing a hardcoded wrong lagna of ~336° every time.

const calculateLagna = (jd, latitude, longitude, ayanamsa) => {
  return new Promise((resolve, reject) => {

    // ✅ CORRECT: callback-based API
    // result.ascendant = tropical ascendant degree
    // result.house[1..12] = tropical house cusps
    swisseph.swe_houses(jd, latitude, longitude, 'P', (result) => {

      if (result.error) { reject(new Error(result.error)); return; }

      // Ascendant is the same regardless of house system ('P' Placidus or 'W' Whole Sign)
      const tropicalAsc = result.ascendant;
      const siderealAsc = norm360(tropicalAsc - ayanamsa);

      const signInfo      = getSignInfo(siderealAsc);
      const nakshatraInfo = getNakshatraInfo(siderealAsc);

      // Build house cusps from result.house array
      // result.house = [0, cusp1, cusp2, ..., cusp12] (1-indexed, index 0 unused)
      const houseCusps = [];
      for (let i = 1; i <= 12; i++) {
        const tropicalCusp = result.house[i] || 0;
        const siderealCusp = norm360(tropicalCusp - ayanamsa);
        const cuspSignInfo = getSignInfo(siderealCusp);
        houseCusps.push({
          house: i,
          tropicalCusp: parseFloat(tropicalCusp.toFixed(4)),
          siderealCusp: parseFloat(siderealCusp.toFixed(4)),
          sign:      cuspSignInfo.sign,
          signIndex: cuspSignInfo.signIndex,
          lord:      cuspSignInfo.lord,
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
  });
};

// ── Assign Planets to Houses (Whole Sign) ─────────────────────────────────────

const assignPlanetsToHouses = (planets, lagnaSignIndex) => {
  const houseMap = {};
  for (let i = 1; i <= 12; i++) {
    houseMap[i] = {
      house: i,
      sign:      ZODIAC_SIGNS[(lagnaSignIndex + i - 1) % 12],
      signIndex: (lagnaSignIndex + i - 1) % 12,
      lord:      SIGN_LORDS[(lagnaSignIndex + i - 1) % 12],
      planets:   [],
    };
  }
  Object.entries(planets).forEach(([name, data]) => {
    const houseNum = ((data.signIndex - lagnaSignIndex + 12) % 12) + 1;
    houseMap[houseNum].planets.push(name);
    planets[name].house = houseNum;
  });
  return houseMap;
};

// ── Build Rasi Chart ──────────────────────────────────────────────────────────

const buildRasiChart = (houseMap) =>
  Object.values(houseMap).map(({ house, sign, signIndex, lord, planets }) => ({
    house, sign, signIndex, lord,
    planet:  planets.join(', '),
    planets,
  }));

// ── Main Export ───────────────────────────────────────────────────────────────

export const calculateAccurateKundali = async ({
  datetime,
  latitude,
  longitude,
  name,
  timezone,
  timezoneOffset,
}) => {
  try {
    swisseph.swe_set_ephe_path('./node_modules/swisseph/ephe');

    // Julian Date from UTC datetime
    const jd = getJulianDate(datetime);

    // Lahiri Ayanamsa
    const ayanamsa = getAyanamsa(jd);

    // All planets
    const planetData = {};
    for (const [planetName, planetId] of Object.entries(PLANETS)) {
      try {
        const data = await calculatePlanet(jd, planetId, ayanamsa);
        planetData[planetName] = { name: planetName, ...data };
      } catch (err) {
        console.warn(`Warning: Could not calculate ${planetName}:`, err.message);
      }
    }

    // Ketu = always 180° from Rahu
    if (planetData.Rahu) {
      const ketuLon = norm360(planetData.Rahu.siderealLongitude + 180);
      planetData.Ketu = {
        name: 'Ketu',
        siderealLongitude: parseFloat(ketuLon.toFixed(4)),
        tropicalLongitude: parseFloat(norm360(planetData.Rahu.tropicalLongitude + 180).toFixed(4)),
        retrograde: true,
        speed: planetData.Rahu.speed,
        ...getSignInfo(ketuLon),
        ...getNakshatraInfo(ketuLon),
      };
    }

    // Lagna — now uses correct callback API ✅
    const lagnaData = await calculateLagna(jd, latitude, longitude, ayanamsa);

    // Houses (Whole Sign)
    const houseMap = assignPlanetsToHouses(planetData, lagnaData.signIndex);
    Object.values(houseMap).forEach(({ house, planets: pNames }) => {
      pNames.forEach(pName => {
        if (planetData[pName]) planetData[pName].house = house;
      });
    });

    const rasiChart = buildRasiChart(houseMap);

    const planetsArray = Object.values(planetData).map(p => ({
      name:          p.name,
      sign:          p.sign,
      signIndex:     p.signIndex,
      house:         p.house || 1,
      degree:        parseFloat((p.degree || 0).toFixed(2)),
      absoluteDegree: parseFloat((p.siderealLongitude || 0).toFixed(2)),
      nakshatra:     p.nakshatra,
      nakshatraPada: p.pada,
      nakshatraLord: p.lord,
      signLord:      p.signLord || SIGN_LORDS[p.signIndex] || '',
      retrograde:    p.retrograde || false,
      speed:         p.speed || 0,
    }));

    return {
      status: 'success',
      data: {
        birth_details: {
          name,
          datetime_utc:   datetime.toISOString(),
          latitude:       parseFloat(latitude.toFixed(4)),
          longitude:      parseFloat(longitude.toFixed(4)),
          julianDay:      parseFloat(jd.toFixed(4)),
          ayanamsa:       parseFloat(ayanamsa.toFixed(4)),
          ayanamsaName:   'Lahiri',
          timezone,
          timezoneOffset,
        },
        lagna: {
          sign:          lagnaData.sign,
          signIndex:     lagnaData.signIndex,
          degree:        parseFloat((lagnaData.degree || 0).toFixed(2)),
          nakshatra:     lagnaData.nakshatra,
          nakshatraPada: lagnaData.pada,
          lord:          lagnaData.lord,
        },
        planets: planetsArray,
        chart: {
          rasi: rasiChart,
          houses: Object.values(houseMap).map(h => ({
            house:     h.house,
            name:      HOUSE_NAMES[h.house],
            sign:      h.sign,
            signIndex: h.signIndex,
            lord:      h.lord,
            planets:   h.planets,
            planet:    h.planets.join(', '),
          })),
        },
        meta: {
          calculatedAt: new Date().toISOString(),
          houseSystem:  'Whole Sign',
          ayanamsa:     'Lahiri',
          ephemeris:    'Swiss Ephemeris',
        },
      },
    };

  } catch (error) {
    console.error('Kundali calculation error:', error);
    throw error;
  }
};