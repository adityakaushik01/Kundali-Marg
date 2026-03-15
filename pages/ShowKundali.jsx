import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Stars from "../components/Stars";
import DecorativeElement from "../components/DecorativeElement";
import BottomDecorativeElement from "../components/BottomDecorativeElement";
import ZodiacRing from "../components/ZodiacRing";
import AmbientGlow from "../components/AmbientGlow";
import SunImage from "../src/assets/planets-icon/sun.png";
import MoonImage from "../src/assets/planets-icon/moon.png";
import MarsImage from "../src/assets/planets-icon/mars.png";
import MercuryImage from "../src/assets/planets-icon/mercury.png";
import JupiterImage from "../src/assets/planets-icon/jupiter.png";
import VenusImage from "../src/assets/planets-icon/venus.png";
import SaturnImage from "../src/assets/planets-icon/saturn.png";
import RahuImage from "../src/assets/planets-icon/rahu.png";
import KetuImage from "../src/assets/planets-icon/ketu.png";
// ── Language data ──────────────────────────────────────────────────────────────
const LANG = {
  en: {
    abbr: {
      Sun: "Su",
      Moon: "Mo",
      Mars: "Ma",
      Mercury: "Me",
      Jupiter: "Ju",
      Venus: "Ve",
      Saturn: "Sa",
      Rahu: "Ra",
      Ketu: "Ke",
    },
    full: {
      Sun: "Sun",
      Moon: "Moon",
      Mars: "Mars",
      Mercury: "Mercury",
      Jupiter: "Jupiter",
      Venus: "Venus",
      Saturn: "Saturn",
      Rahu: "Rahu",
      Ketu: "Ketu",
    },
    signs: [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
    ],
    nakshatras: [
      "Ashwini",
      "Bharani",
      "Krittika",
      "Rohini",
      "Mrigashira",
      "Ardra",
      "Punarvasu",
      "Pushya",
      "Ashlesha",
      "Magha",
      "Purva Phalguni",
      "Uttara Phalguni",
      "Hasta",
      "Chitra",
      "Swati",
      "Vishakha",
      "Anuradha",
      "Jyeshtha",
      "Mula",
      "Purva Ashadha",
      "Uttara Ashadha",
      "Shravana",
      "Dhanishtha",
      "Shatabhisha",
      "Purva Bhadrapada",
      "Uttara Bhadrapada",
      "Revati",
    ],
    asc: "Asc",
    chartTitle: "North Indian Rasi Chart",
    lagnaLabel: "Lagna",
  },
  hi: {
    abbr: {
      Sun: "सू",
      Moon: "च",
      Mars: "मं",
      Mercury: "बु",
      Jupiter: "गु",
      Venus: "शु",
      Saturn: "श",
      Rahu: "रा",
      Ketu: "के",
    },
    full: {
      Sun: "सूर्य",
      Moon: "चंद्र",
      Mars: "मंगल",
      Mercury: "बुध",
      Jupiter: "गुरु",
      Venus: "शुक्र",
      Saturn: "शनि",
      Rahu: "राहु",
      Ketu: "केतु",
    },
    signs: [
      "मेष",
      "वृषभ",
      "मिथुन",
      "कर्क",
      "सिंह",
      "कन्या",
      "तुला",
      "वृश्चिक",
      "धनु",
      "मकर",
      "कुम्भ",
      "मीन",
    ],
    nakshatras: [
      "अश्विनी",
      "भरणी",
      "कृत्तिका",
      "रोहिणी",
      "मृगशिरा",
      "आर्द्रा",
      "पुनर्वसु",
      "पुष्य",
      "आश्लेषा",
      "मघा",
      "पूर्व फाल्गुनी",
      "उत्तर फाल्गुनी",
      "हस्त",
      "चित्रा",
      "स्वाती",
      "विशाखा",
      "अनुराधा",
      "ज्येष्ठा",
      "मूल",
      "पूर्वाषाढ़",
      "उत्तराषाढ़",
      "श्रवण",
      "धनिष्ठा",
      "शतभिषा",
      "पूर्व भाद्रपद",
      "उत्तर भाद्रपद",
      "रेवती",
    ],
    asc: "लग्न",
    chartTitle: "उत्तर भारतीय राशि कुंडली",
    lagnaLabel: "लग्न",
  },
};

const SIGN_POS = {
  1: { x: 241, y: 216 },
  2: { x: 123, y: 98 },
  3: { x: 98, y: 123 },
  4: { x: 216, y: 241 },
  5: { x: 98, y: 359 },
  6: { x: 123, y: 384 },
  7: { x: 233, y: 266 },
  8: { x: 351, y: 384 },
  9: { x: 376, y: 359 },
  10: { x: 266, y: 241 },
  11: { x: 384, y: 123 },
  12: { x: 359, y: 98 },
};

const PLANET_ZONE = {
  1: { xMin: 195, xMax: 285, yMin: 85, yMax: 165 },
  2: { xMin: 80, xMax: 160, yMin: 35, yMax: 110 },
  3: { xMin: 20, xMax: 95, yMin: 90, yMax: 165 },
  4: { xMin: 150, xMax: 230, yMin: 205, yMax: 275 },
  5: { xMin: 20, xMax: 95, yMin: 305, yMax: 375 },
  6: { xMin: 80, xMax: 160, yMin: 360, yMax: 440 },
  7: { xMin: 195, xMax: 285, yMin: 310, yMax: 385 },
  8: { xMin: 310, xMax: 390, yMin: 360, yMax: 440 },
  9: { xMin: 385, xMax: 460, yMin: 305, yMax: 375 },
  10: { xMin: 285, xMax: 355, yMin: 205, yMax: 275 },
  11: { xMin: 385, xMax: 460, yMin: 90, yMax: 165 },
  12: { xMin: 310, xMax: 390, yMin: 35, yMax: 110 },
};

// ─────────────────────────────────────────────────────────────────────────────

const ShowKundali = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { kundaliData, name, birthDetails } = location.state || {};
  const [activeTab, setActiveTab] = useState("chart");
  const [lang, setLang] = useState("en"); // 'en' | 'hi'

  const L = LANG[lang];

  const getNakshatraDisplay = (englishName) => {
    const idx = LANG.en.nakshatras.findIndex(
      (n) => n.toLowerCase() === englishName?.toLowerCase(),
    );
    return idx >= 0 ? L.nakshatras[idx] : englishName || "—";
  };

  // ── No data guard ──────────────────────────────────────────────────────────
  if (!kundaliData || !kundaliData.data) {
    return (
      <div
        className="min-h-screen text-white flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg,#050810 0%,#0a0f1e 30%,#0d1225 60%,#080d1a 100%)",
        }}
      >
        <div className="text-center p-10 rounded-2xl backdrop-blur-md border border-amber-400/20 bg-white/5">
          <div className="text-5xl mb-4">🔮</div>
          <h2 className="text-2xl font-bold text-amber-300 mb-3">
            No Kundali Data Found
          </h2>
          <p className="text-gray-400 mb-6">
            Please generate your Kundali first.
          </p>
          <button
            onClick={() => navigate("/GenerateKundali")}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-xl"
          >
            Generate Kundali
          </button>
        </div>
      </div>
    );
  }

  // ── Data helpers ───────────────────────────────────────────────────────────
  const rasi = kundaliData?.data?.chart?.rasi ?? [];
  const getHouse = (n) => rasi.find((h) => h.house === n);
  const getPlanetsInHouse = (n) => {
    const h = getHouse(n);
    if (!h || !h.planet) return [];
    return h.planet
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
  };
  const getSignInHouse = (n) => {
    const h = getHouse(n);
    return h ? h.sign : "";
  };

  // ── VedicChart ─────────────────────────────────────────────────────────────
  const VedicChart = () => {
    const renderPlanets = (h) => {
      const data = getHouse(h);
      const zone = PLANET_ZONE[h];
      if (!data || !zone) return null;

      const items =
        h === 1 ? [L.asc, ...(data.planets ?? [])] : [...(data.planets ?? [])];

      if (!items.length) return null;

      const count = items.length;

      // SAFE MARGIN (prevents touching chart lines)
      const padding = 12;

      const xMin = zone.xMin + padding;
      const xMax = zone.xMax - padding;
      const yMin = zone.yMin + padding;
      const yMax = zone.yMax - padding;

      const width = xMax - xMin;
      const height = yMax - yMin;

      let cols = 1;
      if (count >= 3) cols = 2;
      if (count >= 7) cols = 3;

      const rows = Math.ceil(count / cols);

      const colSpacing = width / cols;
      const rowSpacing = height / rows;

      // Font scaling like real astrology software
      let fontSize = 15;
      if (count >= 5) fontSize = 13;
      if (count >= 7) fontSize = 11;

      return items.map((planet, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = xMin + colSpacing * col + colSpacing / 2;
        const y = yMin + rowSpacing * row + rowSpacing / 2;

        const label =
          planet === L.asc || planet === "Asc"
            ? L.asc
            : (L.abbr[planet] ?? planet.slice(0, 2));

        return (
          <text
            key={`p-${h}-${i}`}
            x={x}
            y={y}
            fontSize={fontSize}
            fontWeight="600"
            fontFamily="sans-serif"
            fill="#fb923c"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {label}
          </text>
        );
      });
    };

    const renderSign = (h) => {
      const data = getHouse(h);
      if (!data) return null;

      const pos = SIGN_POS[h];

      return (
        <text
          key={`sign-${h}`}
          x={pos.x}
          y={pos.y}
          fontSize="12"
          fontFamily="sans-serif"
          fill="rgba(253,230,138,0.65)"
          dominantBaseline="middle"
          textAnchor="middle"
          pointerEvents="none"
        >
          {String(data.signIndex + 1).padStart(2, "0")}
        </text>
      );
    };

    return (
      <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 480 480"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",
            background: "rgba(10, 15, 30, 0.95)",
            borderRadius: "12px",
            border: "1.5px solid rgba(245,158,11,0.35)",
            boxShadow: "0 0 40px rgba(245,158,11,0.08)",
          }}
        >
          {/* Background subtle gradient overlay */}
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245,158,11,0.04)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="480" height="480" fill="url(#bgGrad)" />

          {/* ── FIXED LINES ── */}
          {/* Outer square */}
          <line
            x1="10"
            y1="10"
            x2="10"
            y2="472"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.55)"
          />
          <line
            x1="10"
            y1="472"
            x2="472"
            y2="472"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.55)"
          />
          <line
            x1="472"
            y1="472"
            x2="472"
            y2="10"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.55)"
          />
          <line
            x1="472"
            y1="472"
            x2="472"
            y2="10"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.55)"
          />
          <line
            x1="472"
            y1="10"
            x2="10"
            y2="10"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.55)"
          />
          {/* Diagonals */}
          <line
            x1="10"
            y1="10"
            x2="472"
            y2="472"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.4)"
          />
          <line
            x1="10"
            y1="472"
            x2="472"
            y2="10"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.4)"
          />
          {/* Inner diamond */}
          <line
            x1="242"
            y1="10"
            x2="472"
            y2="242"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.55)"
          />
          <line
            x1="472"
            y1="242"
            x2="242"
            y2="472"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.55)"
          />
          <line
            x1="242"
            y1="472"
            x2="10"
            y2="242"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.55)"
          />
          <line
            x1="10"
            y1="242"
            x2="242"
            y2="10"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.55)"
          />

          {/* ── DYNAMIC TEXT ── */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(renderSign)}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(renderPlanets)}
        </svg>

        {/* Planet legend */}
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            justifyContent: "center",
          }}
        >
          {Object.entries(L.abbr).map(([en, short]) => (
            <span
              key={en}
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "20px",
                background: "rgba(251,146,60,0.08)",
                color: "rgba(251,146,60,0.85)",
                border: "1px solid rgba(251,146,60,0.2)",
                fontFamily: "sans-serif",
              }}
            >
              {short} = {L.full[en]}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const getSignLord = (name) => (lang === "hi" ? (L.full[name] ?? name) : name);
  const getNakLord = (name) => (lang === "hi" ? (L.full[name] ?? name) : name);

  // ── PlanetaryPositions ─────────────────────────────────────────────────────
  const PlanetaryPositions = () => {
    const planets = kundaliData?.data?.planets || [];
    const icons = {
      Sun: SunImage,
      Moon: MoonImage,
      Mars: MarsImage,
      Mercury: MercuryImage,
      Jupiter: JupiterImage,
      Venus: VenusImage,
      Saturn: SaturnImage,
      Rahu: RahuImage,
      Ketu: KetuImage,
    };
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {planets.map((planet, i) => (
          <div
            key={i}
            className="p-5 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] border border-white/20 bg-white/5"
          >
            <div
              className="flex items-center gap-3 mb-4"
              style={{ minHeight: "56px" }}
            >
              <img
                src={icons[planet.name]}
                alt={planet.name}
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <h3 className="text-amber-300 font-bold text-lg">
                {lang === "hi" ? L.full[planet.name] : planet.name}
              </h3>
              {planet.retrograde && (
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: "rgba(239,68,68,0.15)",
                    color: "#f87171",
                    border: "1px solid rgba(239,68,68,0.3)",
                  }}
                >
                  ℞
                </span>
              )}
            </div>
            <div className="space-y-2 text-sm">
              {[
                [
                  lang === "hi" ? "राशि" : "Sign",
                  lang === "hi" ? L.signs[planet.signIndex] : planet.sign,
                ],
                [lang === "hi" ? "भाव" : "House", planet.house],
                [
                  lang === "hi" ? "राशि स्वामी" : "Sign Lord",
                  getSignLord(planet.signLord),
                ],
                [
                  lang === "hi" ? "अंश" : "Degree",
                  planet.degree ? `${planet.degree}°` : null,
                ],
                [
                  lang === "hi" ? "नक्षत्र" : "Nakshatra",
                  getNakshatraDisplay(planet.nakshatra),
                ],
                [
                  lang === "hi" ? "नक्षत्र पद" : "Nakshatra Pada",
                  planet.degree ? `${planet.nakshatraPada}°` : null,
                ],
                [
                  lang === "hi" ? "नक्षत्र स्वामी" : "Nakshatra Lord",
                  getNakLord(planet.nakshatraLord),
                ],
                // [lang==='hi'?'गति'        :'Speed',          `${Math.abs(planet.speed).toFixed(4)}°/day`],
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-amber-400/70">{label}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── HouseDetails ───────────────────────────────────────────────────────────
  const HouseDetails = () => {
    const houseNames = {
      1: lang === "hi" ? "लग्न — स्वयं" : "Lagna — Self & Body",
      2: lang === "hi" ? "धन — संपत्ति" : "Dhana — Wealth & Family",
      3: lang === "hi" ? "सहज — भाई-बहन" : "Sahaja — Siblings & Courage",
      4: lang === "hi" ? "सुख — घर" : "Sukha — Home & Mother",
      5: lang === "hi" ? "पुत्र — संतान" : "Putra — Children & Mind",
      6: lang === "hi" ? "रिपु — शत्रु" : "Ripu — Enemies & Health",
      7: lang === "hi" ? "कलत्र — जीवनसाथी" : "Kalatra — Spouse & Partners",
      8: lang === "hi" ? "आयु — रहस्य" : "Ayur — Longevity & Occult",
      9: lang === "hi" ? "भाग्य — धर्म" : "Bhagya — Fortune & Dharma",
      10: lang === "hi" ? "कर्म — व्यवसाय" : "Karma — Career & Fame",
      11: lang === "hi" ? "लाभ — मित्र" : "Labha — Gains & Friends",
      12: lang === "hi" ? "व्यय — मोक्ष" : "Vyaya — Losses & Moksha",
    };
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((house) => {
          const planets = getPlanetsInHouse(house);
          const signIdx = getHouse(house)?.signIndex ?? 0;
          const signDisp =
            lang === "hi" ? L.signs[signIdx] : getSignInHouse(house);
          const planetsDisp = planets.map((p) =>
            lang === "hi" ? (L.full[p] ?? p) : p,
          );
          return (
            <div
              key={house}
              className="p-5 rounded-xl backdrop-blur-sm border border-white/20 bg-white/5"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-amber-400 font-bold text-lg">
                  {lang === "hi" ? `भाव ${house}` : `House ${house}`}
                </span>
                <span className="text-xs text-gray-400 text-right leading-snug max-w-[160px]">
                  {houseNames[house]}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    {lang === "hi" ? "राशि" : "Sign"}
                  </span>
                  <span className="text-white font-medium">
                    {signDisp || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    {lang === "hi" ? "ग्रह" : "Planets"}
                  </span>
                  <span className="text-orange-300 font-medium text-right max-w-[180px]">
                    {planetsDisp.length > 0
                      ? planetsDisp.join(", ")
                      : lang === "hi"
                        ? "खाली"
                        : "Empty"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── BirthDetails ───────────────────────────────────────────────────────────
  const BirthDetails = () => {
    const bd = kundaliData?.data?.birth_details || {};
    const isHi = lang === "hi";
    const fields = [
      [isHi ? "पूरा नाम" : "Full Name", name || bd.name || "—"],
      [isHi ? "जन्म तिथि" : "Date of Birth", birthDetails?.date || "—"],
      [isHi ? "जन्म समय" : "Time of Birth", birthDetails?.time || "—"],
      [isHi ? "जन्म स्थान" : "Place of Birth", birthDetails?.place || "—"],
      [isHi ? "अक्षांश" : "Latitude", bd.latitude || "—"],
      [isHi ? "देशांतर" : "Longitude", bd.longitude || "—"],
      [
        isHi ? "अयनांश" : "Ayanamsa",
        `${bd.ayanamsaName || "Lahiri"} (${bd.ayanamsa || ""}°)`,
      ],
    ];
    const lagnaSign =
      lang === "hi" ? L.signs[getHouse(1)?.signIndex ?? 0] : getSignInHouse(1);
    const moonSign = kundaliData?.data?.planets?.find((p) => p.name === "Moon");
    const sunSign = kundaliData?.data?.planets?.find((p) => p.name === "Sun");

    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl backdrop-blur-sm border border-white/20 bg-white/5">
          <h3 className="text-xl font-bold text-amber-300 mb-5">
            {isHi ? "जन्म विवरण" : "Birth Information"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fields.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between items-center p-3 rounded-lg"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span className="text-amber-400/70 text-sm">{label}</span>
                <span className="text-white font-medium text-sm text-right max-w-[55%]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-xl backdrop-blur-sm border border-white/20 bg-white/5">
          <h3 className="text-xl font-bold text-amber-300 mb-5">
            {isHi ? "कुंडली सारांश" : "Chart Summary"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: isHi ? "लग्न राशि" : "Ascendant (Lagna)",
                value: lagnaSign,
                sub: isHi ? "उदय राशि" : "Rising sign",
              },
              {
                label: isHi ? "चंद्र राशि" : "Moon Sign (Rashi)",
                value: isHi
                  ? L.signs[moonSign?.signIndex ?? 0]
                  : moonSign?.sign,
                sub: isHi ? "भावनात्मक स्व" : "Emotional self",
              },
              {
                label: isHi ? "सूर्य राशि" : "Sun Sign",
                value: isHi ? L.signs[sunSign?.signIndex ?? 0] : sunSign?.sign,
                sub: isHi ? "मूल पहचान" : "Core identity",
              },
            ].map(({ label, value, sub }) => (
              <div
                key={label}
                className="text-center p-5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <p className="text-amber-400/70 text-xs uppercase tracking-wider mb-2">
                  {label}
                </p>
                <p className="text-white text-xl font-bold mb-1">
                  {value || "—"}
                </p>
                <p className="text-gray-500 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── Tabs config ────────────────────────────────────────────────────────────
  const tabs = [
    {
      id: "chart",
      label: lang === "hi" ? "कुंडली" : "Birth Chart",
      icon: "🔮",
    },
    { id: "planets", label: lang === "hi" ? "ग्रह" : "Planets", icon: "🪐" },
    { id: "houses", label: lang === "hi" ? "भाव" : "Houses", icon: "🏠" },
    { id: "birth", label: lang === "hi" ? "विवरण" : "Details", icon: "📋" },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900 text-white overflow-x-hidden">
      <AmbientGlow />
      <ZodiacRing />
      <Stars />
      <DecorativeElement />
      <BottomDecorativeElement />

      <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-400/50 tracking-[0.25em] text-sm mb-2 uppercase">
            {lang === "hi" ? "जन्म कुंडली" : "Janam Kundali"}
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{
              background:
                "linear-gradient(135deg,#fde68a 0%,#f59e0b 50%,#fb923c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {name
              ? lang === "hi"
                ? `${name} की कुंडली`
                : `${name}'s Kundali`
              : lang === "hi"
                ? "आपकी कुंडली"
                : "Your Kundali"}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mb-5">
            {birthDetails
              ? `${birthDetails.date} • ${birthDetails.time} • ${birthDetails.place}`
              : "Vedic birth chart"}
          </p>

          {/* Controls row */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/GenerateKundali")}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.25)",
                color: "#fbbf24",
              }}
            >
              ← {lang === "hi" ? "नई कुंडली" : "Generate New Kundali"}
            </button>

            {/* Language toggle */}
            <div
              className="flex items-center gap-1 p-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {["en", "hi"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                  style={
                    lang === l
                      ? { background: "#f59e0b", color: "#000" }
                      : { color: "rgba(255,255,255,0.5)" }
                  }
                >
                  {l === "en" ? "EN" : "हिं"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div
            className="flex gap-2 p-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-white/10"
                style={
                  activeTab === tab.id
                    ? {
                        background: "#f59e0b",
                        color: "#000",
                        boxShadow: "0 4px 15px rgba(245,158,11,0.4)",
                      }
                    : { color: "rgba(255,255,255,0.6)" }
                }
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === "chart" && (
            <div className="rounded-2xl p-6 md:p-10 backdrop-blur-md border border-white/20 bg-white/5">
              <h2 className="text-2xl font-bold text-center text-amber-300 mb-8">
                {L.chartTitle}
              </h2>
              <div className="flex justify-center">
                <VedicChart />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
                {[
                  [
                    lang === "hi" ? "लग्न" : "Lagna",
                    lang === "hi"
                      ? L.signs[getHouse(1)?.signIndex ?? 0]
                      : getSignInHouse(1),
                  ],
                  [
                    lang === "hi" ? "कुंडली" : "Chart Type",
                    lang === "hi" ? "राशि (D-1)" : "Rasi (D-1)",
                  ],
                  [
                    lang === "hi" ? "अयनांश" : "Ayanamsa",
                    kundaliData?.data?.birth_details?.ayanamsaName || "Lahiri",
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="p-3 rounded-xl"
                    style={{
                      background: "rgba(245,158,11,0.05)",
                      border: "1px solid rgba(245,158,11,0.1)",
                    }}
                  >
                    <p className="text-amber-400/60 text-xs mb-1">{label}</p>
                    <p className="text-white font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "planets" && (
            <div
              className="rounded-2xl p-6 md:p-10 backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(245,158,11,0.15)",
              }}
            >
              <h2 className="text-2xl font-bold text-center text-amber-300 mb-8">
                {lang === "hi" ? "ग्रह स्थिति" : "Planetary Positions"}
              </h2>
              <PlanetaryPositions />
            </div>
          )}

          {activeTab === "houses" && (
            <div
              className="rounded-2xl p-6 md:p-10 backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(245,158,11,0.15)",
              }}
            >
              <h2 className="text-2xl font-bold text-center text-amber-300 mb-8">
                {lang === "hi" ? "भाव विश्लेषण" : "House Analysis"}
              </h2>
              <HouseDetails />
            </div>
          )}

          {activeTab === "birth" && <BirthDetails />}
        </div>

        {/* Footer */}
        <div className="text-center mt-14 text-gray-600 text-xs">
          <p>
            {lang === "hi"
              ? "वैदिक ज्योतिष • लाहिरी अयनांश • केवल शैक्षिक उद्देश्य के लिए"
              : "Generated using Vedic Astrology • Lahiri Ayanamsa • For educational purposes"}
          </p>
          <p className="mt-1">
            {lang === "hi"
              ? "विस्तृत विश्लेषण के लिए किसी योग्य ज्योतिषी से परामर्श करें"
              : "Consult a qualified Jyotishi for detailed interpretation"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowKundali;
