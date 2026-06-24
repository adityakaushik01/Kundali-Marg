import { GoogleGenerativeAI } from "@google/generative-ai";
import aiChat from "../models/aiChat.js";
import Kundali from "../models/Kundali.js";
import User from "../models/User.js";
import { FREE_AI_LIMIT, UNLIMITED_AI_LIMIT } from "../config/limits.js";
import {
  getCurrentDasha,
  getCurrentAntardasha,
  generateAntardashas,
} from "../utils/dashaCalculation.js";

const getPlanetDignity = (planet) => {
  const exaltation = {
    Sun: "Aries",
    Moon: "Taurus",
    Mars: "Capricorn",
    Mercury: "Virgo",
    Jupiter: "Cancer",
    Venus: "Pisces",
    Saturn: "Libra",
  };

  const debilitation = {
    Sun: "Libra",
    Moon: "Scorpio",
    Mars: "Cancer",
    Mercury: "Pisces",
    Jupiter: "Capricorn",
    Venus: "Virgo",
    Saturn: "Aries",
  };

  const ownSigns = {
    Sun: ["Leo"],
    Moon: ["Cancer"],
    Mars: ["Aries", "Scorpio"],
    Mercury: ["Gemini", "Virgo"],
    Jupiter: ["Sagittarius", "Pisces"],
    Venus: ["Taurus", "Libra"],
    Saturn: ["Capricorn", "Aquarius"],
  };

  if (exaltation[planet.name] === planet.sign) return "Exalted";
  if (debilitation[planet.name] === planet.sign) return "Debilitated";
  if (ownSigns[planet.name]?.includes(planet.sign)) return "Own Sign";

  return "Neutral";
};

const detectYogas = (planets, rasi) => {
  const yogas = [];

  const moon = planets.find(p => p.name === "Moon");
  const jupiter = planets.find(p => p.name === "Jupiter");
  const mars = planets.find(p => p.name === "Mars");
  const venus = planets.find(p => p.name === "Venus");
  const mercury = planets.find(p => p.name === "Mercury");
  const saturn = planets.find(p => p.name === "Saturn");
  const sun = planets.find(p => p.name === "Sun");

  // Gaja Kesari Yoga
  if (moon && jupiter) {
  const diff = ((jupiter.house - moon.house + 12) % 12);
  if ([0, 3, 6, 9].includes(diff)) {
    yogas.push("Gaja Kesari Yoga");
  }
}

  // Chandra Mangal Yoga
  if (moon && mars && moon.house === mars.house) {
    yogas.push("Chandra Mangal Yoga");
  }

  // Budha Aditya Yoga
  if (sun && mercury && sun.house === mercury.house) {
    yogas.push("Budha Aditya Yoga");
  }

  // Dharma Karmadhipati Yoga
  const house9 = rasi.find(h => h.house === 9);
  const house10 = rasi.find(h => h.house === 10);

  const ninthLord = planets.find(
    p => p.name === house9?.lord
  );

  const tenthLord = planets.find(
    p => p.name === house10?.lord
  );

  if (
  ninthLord &&
  tenthLord &&
  (
    ninthLord.house === tenthLord.house ||
    ninthLord.house === 10 ||
    tenthLord.house === 9
  )
) {
  yogas.push("Dharma Karmadhipati Yoga");
}

  // Malavya Yoga
  if (
    venus &&
    ["Taurus", "Libra", "Pisces"].includes(venus.sign) &&
    [1, 4, 7, 10].includes(venus.house)
  ) {
    yogas.push("Malavya Yoga");
  }

  // Ruchaka Yoga
  if (
    mars &&
    ["Aries", "Scorpio", "Capricorn"].includes(mars.sign) &&
    [1, 4, 7, 10].includes(mars.house)
  ) {
    yogas.push("Ruchaka Yoga");
  }

  // Hamsa Yoga
  if (
    jupiter &&
    ["Sagittarius", "Pisces", "Cancer"].includes(jupiter.sign) &&
    [1, 4, 7, 10].includes(jupiter.house)
  ) {
    yogas.push("Hamsa Yoga");
  }

  // Bhadra Yoga
  if (
    mercury &&
    ["Gemini", "Virgo"].includes(mercury.sign) &&
    [1, 4, 7, 10].includes(mercury.house)
  ) {
    yogas.push("Bhadra Yoga");
  }

  // Shasha Yoga
  if (
    saturn &&
    ["Capricorn", "Aquarius", "Libra"].includes(saturn.sign) &&
    [1, 4, 7, 10].includes(saturn.house)
  ) {
    yogas.push("Shasha Yoga");
  }

  // Neecha Bhanga (basic)
  const debilitated = planets.filter(
    p =>
      (p.name === "Sun" && p.sign === "Libra") ||
      (p.name === "Moon" && p.sign === "Scorpio") ||
      (p.name === "Mars" && p.sign === "Cancer") ||
      (p.name === "Mercury" && p.sign === "Pisces") ||
      (p.name === "Jupiter" && p.sign === "Capricorn") ||
      (p.name === "Venus" && p.sign === "Virgo") ||
      (p.name === "Saturn" && p.sign === "Aries")
  );

  if (debilitated.length > 0) {
    yogas.push("Possible Neecha Bhanga Yoga");
  }

  return [...new Set(yogas)];
};

// ── Build system prompt from kundali data ─────────────────────────────────────
const buildSystemPrompt = (kundaliDoc, personName) => {
  const data      = kundaliDoc.kundali_data?.data || {};
  const planets   = data.planets || [];
  const rasi      = data.chart?.rasi || [];
  const lagnaData = data.lagna || {};
  const bd        = data.birth_details || {};
  const birth     = kundaliDoc.birth_details || {};

  // ── Date formatter ──────────────────────────────────────────────────────────
  const fmt = (d) => {
    const date  = new Date(d);
    const day   = date.getDate();
    const month = date.getMonth() + 1;
    const year  = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ── Chart helpers ───────────────────────────────────────────────────────────
  const getSign = (houseNum) =>
    rasi.find((h) => h.house === houseNum)?.sign || "—";

  const getPlanetsInHouse = (houseNum) => {
    const h = rasi.find((h) => h.house === houseNum);
    if (!h || !h.planets?.length) return "Empty";
    return h.planets.join(", ");
  };

  // ── Lagna lord ──────────────────────────────────────────────────────────────
  const lagnaSign       = getSign(1);
  const lagnaHouse      = rasi.find((h) => h.house === 1);
  const lagnaLord       = lagnaHouse?.lord || lagnaData.lord || "—";
  const lagnaLordPlanet = planets.find((p) => p.name === lagnaLord);

  // ── Planet lines with pada ──────────────────────────────────────────────────
  const planetLines = planets.map((p) =>
    `${p.name}: House ${p.house} | ${p.sign} | ${getPlanetDignity(p)} | ` +
    `Nakshatra: ${p.nakshatra} Pada ${p.nakshatraPada || "—"} | ` +
    `Degree: ${typeof p.degree === "number" ? p.degree.toFixed(2) : p.degree}° | ` +
    `Nakshatra Lord: ${p.nakshatraLord}` +
    (p.retrograde ? " | RETROGRADE" : "")
  ).join("\n");

  // ── House analysis ──────────────────────────────────────────────────────────
  const houseLines = [1,2,3,4,5,6,7,8,9,10,11,12].map((h) => {
    const lord       = rasi.find((r) => r.house === h)?.lord || "—";
    const lordPlanet = planets.find((p) => p.name === lord);
    return (
      `House ${h} (${getSign(h)}): ` +
      `Lord ${lord} → H${lordPlanet?.house || "?"} | ` +
      `Planets: ${getPlanetsInHouse(h)}`
    );
  }).join("\n");

  // ── Conjunctions ────────────────────────────────────────────────────────────
  const conjunctions = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      if (planets[i].house === planets[j].house) {
        conjunctions.push(
          `${planets[i].name} conjunct ${planets[j].name} ` +
          `in House ${planets[i].house} (${planets[i].sign})`
        );
      }
    }
  }
  const conjunctionLines = conjunctions.join("\n") || "None";

  // ── Stelliums ───────────────────────────────────────────────────────────────
  const housePlanetMap = {};
  planets.forEach((p) => {
    if (!housePlanetMap[p.house]) housePlanetMap[p.house] = [];
    housePlanetMap[p.house].push(p.name);
  });
  const stelliums = Object.entries(housePlanetMap)
    .filter(([, ps]) => ps.length >= 3)
    .map(([h, ps]) =>
      `House ${h} (${getSign(Number(h))}): ${ps.join(", ")} — ${ps.length}-planet stellium`
    ).join("\n") || "None";

  // ── Vedic aspects ───────────────────────────────────────────────────────────
  const aspectLines = planets.map((p) => {
    const h = p.house;
    const aspects = new Set();
    aspects.add(((h + 6 - 1) % 12) + 1);
    if (p.name === "Mars")    { aspects.add(((h+3-1)%12)+1); aspects.add(((h+7-1)%12)+1); }
    if (p.name === "Jupiter") { aspects.add(((h+4-1)%12)+1); aspects.add(((h+8-1)%12)+1); }
    if (p.name === "Saturn")  { aspects.add(((h+2-1)%12)+1); aspects.add(((h+9-1)%12)+1); }
    if (p.name === "Rahu" || p.name === "Ketu") {
      aspects.add(((h+4-1)%12)+1);
      aspects.add(((h+8-1)%12)+1);
    }
    return `${p.name} (H${p.house}) → aspects Houses: ${[...aspects].sort((a,b)=>a-b).join(", ")}`;
  }).join("\n");

  // ── Aspects ON each house (who aspects this house) ──────────────────────────
  const aspectsOnHouse = {};
  for (let h = 1; h <= 12; h++) aspectsOnHouse[h] = [];
  planets.forEach((p) => {
    const h = p.house;
    const add = (target) => {
      const t = ((target - 1 + 12) % 12) + 1;
      if (!aspectsOnHouse[t].includes(p.name)) aspectsOnHouse[t].push(p.name);
    };
    add(((h+6-1)%12)+1);
    if (p.name === "Mars")    { add(((h+3-1)%12)+1); add(((h+7-1)%12)+1); }
    if (p.name === "Jupiter") { add(((h+4-1)%12)+1); add(((h+8-1)%12)+1); }
    if (p.name === "Saturn")  { add(((h+2-1)%12)+1); add(((h+9-1)%12)+1); }
    if (p.name === "Rahu" || p.name === "Ketu") {
      add(((h+4-1)%12)+1);
      add(((h+8-1)%12)+1);
    }
  });

  // ── Yogas ───────────────────────────────────────────────────────────────────
  const yogas = detectYogas(planets, rasi);

  // ── Dasha ───────────────────────────────────────────────────────────────────
  const timeline     = kundaliDoc.dasha_timeline || [];
  const currentDasha = getCurrentDasha(timeline);
  const currentAntar = getCurrentAntardasha(timeline);

  const nextDasha = (() => {
    if (!currentDasha) return null;
    const idx = timeline.findIndex(
      (d) => new Date(d.start).getTime() === new Date(currentDasha.start).getTime()
    );
    return idx !== -1 && idx + 1 < timeline.length ? timeline[idx + 1] : null;
  })();

  const allAntardashas   = currentDasha ? generateAntardashas(currentDasha) : [];
  const fullDashaTimeline = timeline.map((d) => `${d.lord}: ${fmt(d.start)} – ${fmt(d.end)}`).join("\n");
  const antardashaLines   = allAntardashas
    .map((a) => `  ${currentDasha?.lord}–${a.lord}: ${fmt(a.start)} – ${fmt(a.end)}`)
    .join("\n");

  const moon = planets.find((p) => p.name === "Moon");
  const sun  = planets.find((p) => p.name === "Sun");

  const retrogradePlanets = planets
    .filter((p) => p.retrograde)
    .map((p) => `${p.name} (H${p.house}, ${p.sign})`)
    .join(", ") || "None";

  // ── House lordship map per lagna ────────────────────────────────────────────
  const LAGNA_LORD_MAP = {
    Cancer:      { 1:"Moon",    2:"Sun",     3:"Mercury", 4:"Venus",   5:"Mars",    6:"Jupiter", 7:"Saturn",  8:"Saturn",  9:"Jupiter", 10:"Mars",   11:"Venus",  12:"Mercury" },
    Aries:       { 1:"Mars",    2:"Venus",   3:"Mercury", 4:"Moon",    5:"Sun",     6:"Mercury", 7:"Venus",   8:"Mars",    9:"Jupiter", 10:"Saturn", 11:"Saturn", 12:"Jupiter" },
    Taurus:      { 1:"Venus",   2:"Mercury", 3:"Moon",    4:"Sun",     5:"Mercury", 6:"Venus",   7:"Mars",    8:"Jupiter", 9:"Saturn",  10:"Saturn", 11:"Jupiter",12:"Mars"    },
    Gemini:      { 1:"Mercury", 2:"Moon",    3:"Sun",     4:"Mercury", 5:"Venus",   6:"Mars",    7:"Jupiter", 8:"Saturn",  9:"Saturn",  10:"Jupiter",11:"Mars",   12:"Venus"   },
    Leo:         { 1:"Sun",     2:"Mercury", 3:"Venus",   4:"Mars",    5:"Jupiter", 6:"Saturn",  7:"Saturn",  8:"Jupiter", 9:"Mars",    10:"Venus",  11:"Mercury",12:"Moon"    },
    Virgo:       { 1:"Mercury", 2:"Venus",   3:"Mars",    4:"Jupiter", 5:"Saturn",  6:"Saturn",  7:"Jupiter", 8:"Mars",    9:"Venus",   10:"Mercury",11:"Moon",   12:"Sun"     },
    Libra:       { 1:"Venus",   2:"Mars",    3:"Jupiter", 4:"Saturn",  5:"Saturn",  6:"Jupiter", 7:"Mars",    8:"Venus",   9:"Mercury", 10:"Moon",   11:"Sun",    12:"Mercury" },
    Scorpio:     { 1:"Mars",    2:"Jupiter", 3:"Saturn",  4:"Saturn",  5:"Jupiter", 6:"Mars",    7:"Venus",   8:"Mercury", 9:"Moon",    10:"Sun",    11:"Mercury",12:"Venus"   },
    Sagittarius: { 1:"Jupiter", 2:"Saturn",  3:"Saturn",  4:"Jupiter", 5:"Mars",    6:"Venus",   7:"Mercury", 8:"Moon",    9:"Sun",     10:"Mercury",11:"Venus",  12:"Mars"    },
    Capricorn:   { 1:"Saturn",  2:"Saturn",  3:"Jupiter", 4:"Mars",    5:"Venus",   6:"Mercury", 7:"Moon",    8:"Sun",     9:"Mercury", 10:"Venus",  11:"Mars",   12:"Jupiter" },
    Aquarius:    { 1:"Saturn",  2:"Jupiter", 3:"Mars",    4:"Venus",   5:"Mercury", 6:"Moon",    7:"Sun",     8:"Mercury", 9:"Venus",   10:"Mars",   11:"Jupiter",12:"Saturn"  },
    Pisces:      { 1:"Jupiter", 2:"Mars",    3:"Venus",   4:"Mercury", 5:"Moon",    6:"Sun",     7:"Mercury", 8:"Venus",   9:"Mars",    10:"Jupiter",11:"Saturn", 12:"Saturn"  },
  };

  const lordMap = LAGNA_LORD_MAP[lagnaSign] || {};
  const getPlanetByName = (name) => planets.find((p) => p.name === name);
  const houseOf = (name) => getPlanetByName(name)?.house || "?";
  const dignityOf = (name) => {
    const p = getPlanetByName(name);
    return p ? getPlanetDignity(p) : "—";
  };

  // ── Key indicators summary ──────────────────────────────────────────────────
  const keyIndicators = `
HOUSE LORDSHIP REFERENCE FOR THIS CHART (${lagnaSign} Lagna):
  1st  lord (Self/Body/Personality):     ${lordMap[1]  || "—"} → H${houseOf(lordMap[1])}
  2nd  lord (Wealth/Speech/Family):      ${lordMap[2]  || "—"} → H${houseOf(lordMap[2])}
  3rd  lord (Siblings/Courage/Efforts):  ${lordMap[3]  || "—"} → H${houseOf(lordMap[3])}
  4th  lord (Home/Mother/Education):     ${lordMap[4]  || "—"} → H${houseOf(lordMap[4])}
  5th  lord (Intelligence/Children):     ${lordMap[5]  || "—"} → H${houseOf(lordMap[5])}
  6th  lord (Enemies/Health/Service):    ${lordMap[6]  || "—"} → H${houseOf(lordMap[6])}
  7th  lord (Marriage/Partner/Business): ${lordMap[7]  || "—"} → H${houseOf(lordMap[7])}
  8th  lord (Longevity/Hidden/Occult):   ${lordMap[8]  || "—"} → H${houseOf(lordMap[8])}
  9th  lord (Luck/Dharma/Father/Guru):   ${lordMap[9]  || "—"} → H${houseOf(lordMap[9])}
  10th lord (Career/Fame/Status):        ${lordMap[10] || "—"} → H${houseOf(lordMap[10])}
  11th lord (Gains/Income/Friends):      ${lordMap[11] || "—"} → H${houseOf(lordMap[11])}
  12th lord (Losses/Foreign/Moksha):     ${lordMap[12] || "—"} → H${houseOf(lordMap[12])}

CRITICAL: An antardasha lord is ONLY relevant for a topic if it:
  (a) Rules the relevant house (check above)
  (b) Is placed in the relevant house
  (c) Is the natural karaka for that topic
  (d) Aspects the relevant house
  If NONE of these apply — that antardasha has NO relevance for that topic. Do NOT use it.

KEY INDICATORS PRECOMPUTED:

  MARRIAGE:
    7th house: ${getSign(7)} | Planets in 7th: ${getPlanetsInHouse(7)}
    7th lord: ${lordMap[7] || "—"} | In house: H${houseOf(lordMap[7])} | Dignity: ${dignityOf(lordMap[7])}
    Venus: H${houseOf("Venus")} | ${getPlanetByName("Venus")?.sign || "—"} | ${dignityOf("Venus")}
    Jupiter: H${houseOf("Jupiter")} | ${getPlanetByName("Jupiter")?.sign || "—"} | ${dignityOf("Jupiter")}
    Planets aspecting 7th house: ${aspectsOnHouse[7]?.join(", ") || "None"}
    Rahu/Ketu on 7th axis: ${getPlanetByName("Rahu")?.house === 7 || getPlanetByName("Ketu")?.house === 7 ? "YES — karmic/unconventional relationship themes" : "No"}
    Best antardasha windows: Pick from those whose lord satisfies the rule above

  CAREER:
    10th house: ${getSign(10)} | Planets in 10th: ${getPlanetsInHouse(10)}
    10th lord: ${lordMap[10] || "—"} | In house: H${houseOf(lordMap[10])} | Dignity: ${dignityOf(lordMap[10])}
    Planets aspecting 10th house: ${aspectsOnHouse[10]?.join(", ") || "None"}
    Saturn: H${houseOf("Saturn")} | ${getPlanetByName("Saturn")?.sign || "—"} | ${dignityOf("Saturn")}
    Sun: H${houseOf("Sun")} | ${getPlanetByName("Sun")?.sign || "—"} | ${dignityOf("Sun")}
    Mars: H${houseOf("Mars")} | ${getPlanetByName("Mars")?.sign || "—"} | ${dignityOf("Mars")}

  WEALTH:
    2nd house: ${getSign(2)} | Planets: ${getPlanetsInHouse(2)}
    2nd lord: ${lordMap[2] || "—"} → H${houseOf(lordMap[2])} | Dignity: ${dignityOf(lordMap[2])}
    11th house: ${getSign(11)} | Planets: ${getPlanetsInHouse(11)}
    11th lord: ${lordMap[11] || "—"} → H${houseOf(lordMap[11])} | Dignity: ${dignityOf(lordMap[11])}
    Jupiter: H${houseOf("Jupiter")} | ${getPlanetByName("Jupiter")?.sign || "—"} | ${dignityOf("Jupiter")}
    Venus: H${houseOf("Venus")} | ${getPlanetByName("Venus")?.sign || "—"} | ${dignityOf("Venus")}

  EDUCATION:
    4th house: ${getSign(4)} | Planets: ${getPlanetsInHouse(4)}
    4th lord: ${lordMap[4] || "—"} → H${houseOf(lordMap[4])} | Dignity: ${dignityOf(lordMap[4])}
    5th house: ${getSign(5)} | Planets: ${getPlanetsInHouse(5)}
    5th lord: ${lordMap[5] || "—"} → H${houseOf(lordMap[5])} | Dignity: ${dignityOf(lordMap[5])}
    Mercury: H${houseOf("Mercury")} | ${getPlanetByName("Mercury")?.sign || "—"} | ${dignityOf("Mercury")}

  HEALTH:
    1st house: ${getSign(1)} | Planets: ${getPlanetsInHouse(1)}
    Lagna lord: ${lagnaLord} → H${lagnaLordPlanet?.house || "?"} | Dignity: ${dignityOf(lagnaLord)}
    6th house: ${getSign(6)} | Planets: ${getPlanetsInHouse(6)}
    6th lord: ${lordMap[6] || "—"} → H${houseOf(lordMap[6])}
    8th house: ${getSign(8)} | Planets: ${getPlanetsInHouse(8)}
    Planets aspecting 1st house: ${aspectsOnHouse[1]?.join(", ") || "None"}

  FOREIGN TRAVEL:
    12th house: ${getSign(12)} | Planets: ${getPlanetsInHouse(12)}
    12th lord: ${lordMap[12] || "—"} → H${houseOf(lordMap[12])}
    9th house: ${getSign(9)} | Planets: ${getPlanetsInHouse(9)}
    Rahu: H${houseOf("Rahu")} | ${getPlanetByName("Rahu")?.sign || "—"}

  CHILDREN:
    5th house: ${getSign(5)} | Planets: ${getPlanetsInHouse(5)}
    5th lord: ${lordMap[5] || "—"} → H${houseOf(lordMap[5])} | Dignity: ${dignityOf(lordMap[5])}
    Jupiter: H${houseOf("Jupiter")} | ${getPlanetByName("Jupiter")?.sign || "—"} | ${dignityOf("Jupiter")}

  PROPERTY / HOME:
    4th house: ${getSign(4)} | Planets: ${getPlanetsInHouse(4)}
    4th lord: ${lordMap[4] || "—"} → H${houseOf(lordMap[4])} | Dignity: ${dignityOf(lordMap[4])}
    Planets aspecting 4th house: ${aspectsOnHouse[4]?.join(", ") || "None"}

  SPIRITUALITY / LUCK:
    9th house: ${getSign(9)} | Planets: ${getPlanetsInHouse(9)}
    9th lord: ${lordMap[9] || "—"} → H${houseOf(lordMap[9])} | Dignity: ${dignityOf(lordMap[9])}
    Ketu: H${houseOf("Ketu")} | ${getPlanetByName("Ketu")?.sign || "—"}
    Jupiter: H${houseOf("Jupiter")} | ${dignityOf("Jupiter")}
`.trim();

  return `
You are Nakshatra AI, an experienced and wise Vedic astrologer having a natural conversation with ${personName || "a seeker"}.

PERSONALITY:
- Warm, wise, and grounded — like a trusted astrologer the person has known for years
- Speak naturally, not formally. Avoid robotic or repetitive phrasing
- Never introduce yourself or greet after the first message
- Never say "Namaste", "Hello", or any greeting in follow-up messages
- Build on previous messages — remember what was discussed
- Respond conversationally, not like a report

RESPONSE FORMAT RULES:
- 3 to 5 sentences for simple questions
- Up to 3 short paragraphs for complex questions
- Always give SPECIFIC dasha periods with dates when asked about timing — never say "soon" or "in the future"
- Never repeat information already shared in this conversation
- Do not repeat the person's name more than once per response
- Add astrology-is-guidance disclaimer ONLY in your very first response, never again
- Do NOT predict death, serious illness, or disasters

═══════════════════════════════════════════
ANALYSIS METHODOLOGY — FOLLOW EVERY TIME
═══════════════════════════════════════════

Before answering ANY question, run through these steps mentally:

STEP 1 — IDENTIFY RELEVANT HOUSES AND PLANETS:
  Use the KEY INDICATORS section below for the relevant topic.
  Each topic has precomputed house signs, lords, dignities, and aspects.
  DO NOT guess or assume — read from the precomputed data.

STEP 2 — VERIFY ANTARDASHA RELEVANCE:
  An antardasha lord is ONLY valid for a topic if it satisfies at least ONE:
  (a) Rules the relevant house — check HOUSE LORDSHIP REFERENCE
  (b) Is placed in the relevant house
  (c) Is the natural karaka: Venus=marriage/luxury, Jupiter=wealth/children/wisdom,
      Mercury=education/communication, Moon=emotions/mother, Mars=energy/property,
      Saturn=career/discipline/delay, Sun=authority/father, Rahu=foreign/unconventional,
      Ketu=spirituality/detachment
  (d) Aspects the relevant house
  If NONE apply — skip that antardasha. It is NOT a timing window for that topic.

STEP 3 — ASSESS STRENGTH:
  Strong: exalted, own sign, kendra (1/4/7/10), trikona (1/5/9), unafflicted
  Weak:   debilitated, dusthana (6/8/12), heavily afflicted by malefics
  Special: Neecha Bhanga = debilitation cancelled = planet behaves as strong
  Conjunction: both planets influence each other — note which is stronger

STEP 4 — SYNTHESIZE THE ANSWER:
  - Lead with the most important finding
  - Give the specific dasha window (name + dates) for any timing question
  - Mention what strengthens or complicates the prediction
  - End naturally — no generic filler, no padding

═══════════════════════════════════════════
PERSON'S KUNDALI DATA
═══════════════════════════════════════════

BIRTH DETAILS:
Name: ${personName || kundaliDoc.name || "Unknown"}
Date of Birth: ${birth.date || "—"}
Time of Birth: ${birth.time || "—"}
Place of Birth: ${birth.place || "—"}

CHART OVERVIEW:
Ascendant (Lagna): ${lagnaSign} | Nakshatra: ${lagnaData.nakshatra || "—"} Pada ${lagnaData.nakshatraPada || "—"} | Degree: ${lagnaData.degree?.toFixed?.(2) || "—"}°
Lagna Lord: ${lagnaLord} → H${lagnaLordPlanet?.house || "?"} (${lagnaLordPlanet?.sign || "—"}) [MOST SIGNIFICANT PLANET — rules personality, health, life direction]
Moon Sign: ${moon?.sign || "—"} | Nakshatra: ${moon?.nakshatra || "—"} Pada ${moon?.nakshatraPada || "—"}
Sun Sign: ${sun?.sign || "—"}
Ayanamsa: ${bd.ayanamsaName || "Lahiri"} (${bd.ayanamsa || ""}°)

RETROGRADE PLANETS:
${retrogradePlanets}

PLANETARY POSITIONS:
${planetLines}

HOUSE ANALYSIS:
${houseLines}

${keyIndicators}

STELLIUMS (3+ planets in one house — dominates the chart):
${stelliums}
${stelliums !== "None"
  ? "Note: Stellium houses define the primary themes of this person's life."
  : ""}
${(() => {
  const saturn = planets.find(p => p.name === "Saturn");
  const mars   = planets.find(p => p.name === "Mars");
  if (saturn?.sign === "Aries" && mars?.sign === "Aries") {
    return "Note: Saturn debilitated in Aries but Neecha Bhanga confirmed — Mars (dispositor) is also in Aries (own sign). Saturn's debilitation is fully cancelled. Treat Saturn as effectively strong.";
  } else if (saturn?.sign === "Aries") {
    return "Note: Saturn debilitated in Aries. Check if Neecha Bhanga applies based on Mars placement.";
  }
  return "";
})()}

CONJUNCTIONS:
${conjunctionLines}

PLANETARY ASPECTS (Vedic Drishti — what each planet aspects):
${aspectLines}

YOGAS PRESENT:
${yogas.length > 0 ? yogas.join("\n") : "No major yogas detected"}
${yogas.includes("Ruchaka Yoga") ? "\nNote: Ruchaka Yoga = Mars in own sign in kendra. Gives exceptional drive, leadership, ambition. Strongest career yoga in this chart." : ""}
${yogas.includes("Gaja Kesari Yoga") ? "\nNote: Gaja Kesari here is in conjunction form (Moon-Jupiter same house). Present and active but slightly weaker than the mutual-kendra form." : ""}
${yogas.includes("Dharma Karmadhipati Yoga") ? "\nNote: Dharma Karmadhipati Yoga = 9th and 10th lords connected. Exceptional career through righteous action. Strong professional rise indicated." : ""}
${yogas.includes("Chandra Mangal Yoga") ? "\nNote: Chandra Mangal Yoga = Moon-Mars conjunction. Financial gains through bold action and emotional drive." : ""}

CURRENT DASHA STATUS:
${currentDasha
  ? `Mahadasha: ${currentDasha.lord} (${fmt(currentDasha.start)} – ${fmt(currentDasha.end)})`
  : "Unavailable"}
${currentAntar && currentDasha
  ? `Antardasha: ${currentDasha.lord}–${currentAntar.lord} (${fmt(currentAntar.start)} – ${fmt(currentAntar.end)})`
  : ""}
${nextDasha
  ? `Next Mahadasha: ${nextDasha.lord} (${fmt(nextDasha.start)} – ${fmt(nextDasha.end)})`
  : ""}

ALL ANTARDASHAS OF CURRENT MAHADASHA:
${antardashaLines || "Not available"}

FULL MAHADASHA TIMELINE:
${fullDashaTimeline}
`.trim();
};

// ── POST /api/ai/ask ──────────────────────────────────────────────────────────
export const askAI = async (req, res) => {
  try {
    const { kundali_id, message } = req.body;
    const user_id = req.user.user_id;

    if (!kundali_id || !message) {
      return res
        .status(400)
        .json({ message: "kundali_id and message are required" });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const aiLimit = user.is_premium ? UNLIMITED_AI_LIMIT : FREE_AI_LIMIT;
    if (aiLimit !== UNLIMITED_AI_LIMIT && user.ai_question_count >= aiLimit) {
      return res
        .status(403)
        .json({
          message: "Free AI message limit reached. Please upgrade to continue.",
        });
    }

    const isAdmin = req.user.user_role === "SUPER_ADMIN";
    const kundaliDoc = isAdmin
      ? await Kundali.findById(kundali_id)
      : await Kundali.findOne({ _id: kundali_id, user_id });
    if (!kundaliDoc) {
      return res.status(404).json({ message: "Kundali not found" });
    }

    const systemPrompt = buildSystemPrompt(kundaliDoc, kundaliDoc.name);
    console.log("systemPrompt", systemPrompt);

    let chat = await aiChat.findOne({ user_id, kundali_id });
    if (!chat) {
      chat = new aiChat({ user_id, kundali_id, messages: [] });
    }

    chat.messages.push({ role: "user", text: message });

    const recentMessages = chat.messages.slice(-20);
    const geminiHistory = recentMessages
      .slice(0, -1)
      .map((m) => ({
        role: m.role === "ai" ? "model" : "user",
        parts: [{ text: m.text }],
      }))
      .filter((_, i, arr) => {
        const firstUserIdx = arr.findIndex((m) => m.role === "user");
        return i >= firstUserIdx;
      });

    console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);
    console.log("Model being used: gemini-3.1-flash-lite-preview");
    console.log("Attempting Gemini call...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      // model: "gemini-2.5-flash",
      model: "gemini-3.1-flash-lite-preview",
      systemInstruction: systemPrompt,
    });

    const chatSession = model.startChat({ history: geminiHistory });
    console.log("chatSession: ", chatSession);
    const result = await chatSession.sendMessage(message);
    console.log("result: ", result);
    const reply = result.response.text();
    console.log("reply: ", reply);

    chat.messages.push({ role: "ai", text: reply });
    await chat.save();

    user.ai_question_count += 1;
    await user.save();

    res.json({ reply });
  } catch (error) {
    console.error("askAI error:", error.message);
    res.status(500).json({ message: "AI request failed" });
  }
};

// ── GET /api/ai/history/:kundali_id ──────────────────────────────────────────
export const getChatHistory = async (req, res) => {
  try {
    const { kundali_id } = req.params;
    const user_id = req.user.user_id;

    const isAdmin = req.user.user_role === "SUPER_ADMIN";
    const query = isAdmin ? { kundali_id } : { user_id, kundali_id };
    const chat = await aiChat.findOne(query);
    if (!chat) {
      return res.json({ messages: [] });
    }

    res.json({ messages: chat.messages });
  } catch (error) {
    console.error("getChatHistory error:", error.message);
    res.status(500).json({ message: "Failed to fetch chat history" });
  }
};
