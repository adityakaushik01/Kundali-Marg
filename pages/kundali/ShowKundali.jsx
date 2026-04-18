// pages/kundali/ShowKundali.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import Stars from "../../components/decorations/Stars";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaStroopwafel } from "react-icons/fa6";
import { IoPlanetSharp } from "react-icons/io5";
import { GiHouse } from "react-icons/gi";
import { BiSolidDetail } from "react-icons/bi";
import { RiRobot3Line } from "react-icons/ri";
import { GiTimeSynchronization } from "react-icons/gi";
import { GiYinYang } from "react-icons/gi";

import UserSidebar from "../../components/user/Sidebar";
import { glass, COLORS, pageBg } from "../../components/dashboard/theme";
import useAuth from "../../hooks/useAuth";

import SunImage from "../../src/assets/planets-icon/sun.png";
import MoonImage from "../../src/assets/planets-icon/moon.png";
import MarsImage from "../../src/assets/planets-icon/mars.png";
import MercuryImage from "../../src/assets/planets-icon/mercury.png";
import JupiterImage from "../../src/assets/planets-icon/jupiter.png";
import VenusImage from "../../src/assets/planets-icon/venus.png";
import SaturnImage from "../../src/assets/planets-icon/saturn.png";
import RahuImage from "../../src/assets/planets-icon/rahu.png";
import KetuImage from "../../src/assets/planets-icon/ketu.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ── Language data — UNCHANGED ─────────────────────────────────────────────────
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

// ── Chart layout constants — UNCHANGED ───────────────────────────────────────
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

const r = (o) => `rgba(255,255,255,${o})`;

// ── ShowKundali ───────────────────────────────────────────────────────────────
const ShowKundali = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const { kundaliData, name, birthDetails } = location.state || {};
  console.log("location.state:", location.state);
  console.log("kundaliData check:", kundaliData);

  const [activeTab, setActiveTab] = useState("chart");
  const [lang, setLang] = useState("en");
  const [sideOpen, setSideOpen] = useState(false);

  const L = LANG[lang];

  const sidebarUser = {
    name: user
      ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User"
      : "User",
    initial: user?.first_name?.charAt(0)?.toUpperCase() || "U",
    line1: user?.email || "",
  };

  const getNakshatraDisplay = (englishName) => {
    const idx = LANG.en.nakshatras.findIndex(
      (n) => n.toLowerCase() === englishName?.toLowerCase(),
    );
    return idx >= 0 ? L.nakshatras[idx] : englishName || "—";
  };

  if (!kundaliData || !kundaliData.data) {
    return (
      <div
        className="min-h-screen text-white flex items-center justify-center"
        style={pageBg}
      >
        <Stars />
        <ZodiacRing />
        <AmbientGlow />
        <div
          className="text-center p-10 rounded-2xl relative z-10"
          style={glass(COLORS.amber.border)}
        >
          <div className="text-5xl mb-4">🔮</div>
          <h2
            className="text-xl font-light tracking-wider mb-3"
            style={{ color: COLORS.amber.text }}
          >
            No Kundali Data Found
          </h2>
          <p className="text-sm font-light mb-6" style={{ color: r(0.4) }}>
            Please generate your Kundali first.
          </p>
          <button
            onClick={() => navigate("/generate-kundali")}
            className="px-6 py-2.5 rounded-full text-xs font-light tracking-widest uppercase text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#d97706,#b45309)" }}
          >
            Generate Kundali
          </button>
        </div>
      </div>
    );
  }

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
  const getSignLord = (name) => (lang === "hi" ? (L.full[name] ?? name) : name);
  const getNakLord = (name) => (lang === "hi" ? (L.full[name] ?? name) : name);

  // ── VedicChart SVG — UNCHANGED ────────────────────────────────────────────
  const VedicChart = () => {
    const renderPlanets = (h) => {
      const data = getHouse(h);
      const zone = PLANET_ZONE[h];
      if (!data || !zone) return null;
      const items =
        h === 1 ? [L.asc, ...(data.planets ?? [])] : [...(data.planets ?? [])];
      if (!items.length) return null;
      const count = items.length;
      const padding = 12;
      const xMin = zone.xMin + padding,
        xMax = zone.xMax - padding;
      const yMin = zone.yMin + padding,
        yMax = zone.yMax - padding;
      const width = xMax - xMin,
        height = yMax - yMin;
      let cols = 1;
      if (count >= 3) cols = 2;
      if (count >= 7) cols = 3;
      const rows = Math.ceil(count / cols);
      const colSpacing = width / cols,
        rowSpacing = height / rows;
      let fontSize = 15;
      if (count >= 5) fontSize = 13;
      if (count >= 7) fontSize = 11;
      return items.map((planet, i) => {
        const col = i % cols,
          row = Math.floor(i / cols);
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
      <div style={{ width: "100%", maxWidth: "480px", margin: "0 auto" }}>
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 480 480"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: "block",
            background: "rgba(10,15,30,0.95)",
            borderRadius: "12px",
            border: "1.5px solid rgba(245,158,11,0.35)",
            boxShadow: "0 0 40px rgba(245,158,11,0.08)",
          }}
        >
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245,158,11,0.04)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="480" height="480" fill="url(#bgGrad)" />
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
            y1="10"
            x2="10"
            y2="10"
            strokeWidth="1"
            stroke="rgba(245,158,11,0.55)"
          />
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(renderSign)}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(renderPlanets)}
        </svg>
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

  // ── PlanetaryPositions — UNCHANGED ────────────────────────────────────────
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {planets.map((planet, i) => (
          <div
            key={i}
            className="p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={glass()}
          >
            <div
              className="flex items-center gap-3 mb-4"
              style={{ minHeight: "48px" }}
            >
              <img
                src={icons[planet.name]}
                alt={planet.name}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <h3
                className="text-sm font-light tracking-wider"
                style={{ color: COLORS.amber.text }}
              >
                {lang === "hi" ? L.full[planet.name] : planet.name}
              </h3>
              {planet.retrograde && (
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full font-light"
                  style={{
                    background: COLORS.rose.bg,
                    color: COLORS.rose.text,
                    border: `1px solid ${COLORS.rose.border}`,
                  }}
                >
                  ℞
                </span>
              )}
            </div>
            <div
              style={{
                height: "1px",
                background: r(0.07),
                marginBottom: "12px",
              }}
            />
            <div className="space-y-2">
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
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <span
                      className="text-xs font-light"
                      style={{ color: r(0.4) }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-xs font-light"
                      style={{ color: r(0.82) }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── HouseDetails — UNCHANGED ──────────────────────────────────────────────
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
            <div key={house} className="p-5 rounded-xl" style={glass()}>
              <div className="flex justify-between items-start mb-3">
                <span
                  className="text-sm font-light tracking-wide"
                  style={{ color: COLORS.amber.text }}
                >
                  {lang === "hi" ? `भाव ${house}` : `House ${house}`}
                </span>
                <span
                  className="text-xs font-light text-right leading-snug max-w-[160px]"
                  style={{ color: r(0.35) }}
                >
                  {houseNames[house]}
                </span>
              </div>
              <div
                style={{
                  height: "1px",
                  background: r(0.07),
                  marginBottom: "10px",
                }}
              />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className="text-xs font-light"
                    style={{ color: r(0.4) }}
                  >
                    {lang === "hi" ? "राशि" : "Sign"}
                  </span>
                  <span
                    className="text-xs font-light"
                    style={{ color: r(0.82) }}
                  >
                    {signDisp || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className="text-xs font-light"
                    style={{ color: r(0.4) }}
                  >
                    {lang === "hi" ? "ग्रह" : "Planets"}
                  </span>
                  <span
                    className="text-xs font-light text-right max-w-[55%]"
                    style={{ color: COLORS.amber.text, opacity: 0.85 }}
                  >
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

  // ── BirthDetails — UNCHANGED ──────────────────────────────────────────────
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
      <div className="space-y-5">
        <div style={glass(COLORS.amber.border)}>
          <div
            className="px-6 py-4"
            style={{ borderBottom: `1px solid ${r(0.07)}` }}
          >
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
              style={{ color: r(0.3) }}
            >
              {isHi ? "जन्म विवरण" : "Birth Information"}
            </p>
            <h3
              className="text-sm font-light tracking-wider"
              style={{ color: r(0.85) }}
            >
              {isHi ? "जन्म की जानकारी" : "Your Birth Details"}
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {fields.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between items-center p-3 rounded-xl"
                style={{ background: r(0.04), border: `1px solid ${r(0.07)}` }}
              >
                <span className="text-xs font-light" style={{ color: r(0.4) }}>
                  {label}
                </span>
                <span
                  className="text-xs font-light text-right max-w-[55%]"
                  style={{ color: r(0.82) }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={glass()}>
          <div
            className="px-6 py-4"
            style={{ borderBottom: `1px solid ${r(0.07)}` }}
          >
            <p
              className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
              style={{ color: r(0.3) }}
            >
              {isHi ? "कुंडली सारांश" : "Chart Summary"}
            </p>
            <h3
              className="text-sm font-light tracking-wider"
              style={{ color: r(0.85) }}
            >
              {isHi ? "राशि एवं लग्न" : "Signs & Ascendant"}
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                style={{
                  background: COLORS.amber.bg,
                  border: `1px solid ${COLORS.amber.border}`,
                }}
              >
                <p
                  className="text-[10px] tracking-wider uppercase mb-2"
                  style={{ color: r(0.35) }}
                >
                  {label}
                </p>
                <p
                  className="text-lg font-light mb-1"
                  style={{ color: r(0.9) }}
                >
                  {value || "—"}
                </p>
                <p className="text-xs font-light" style={{ color: r(0.3) }}>
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };


  // ── DashaTimeline ─────────────────────────────────────────────────────────
const DashaTimeline = () => {
  const timeline = kundaliData?.dasha_timeline || [];
  const now = new Date();

  const DASHA_YEARS = {
    Ketu: 7, Venus: 20, Sun: 6, Moon: 10,
    Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17,
  };

  const DASHA_ORDER = [
    "Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury",
  ];

  const planetColors = {
    Sun: "#f59e0b", Moon: "#a78bfa", Mars: "#ef4444",
    Mercury: "#10b981", Jupiter: "#f59e0b", Venus: "#ec4899",
    Saturn: "#6366f1", Rahu: "#64748b", Ketu: "#78716c",
  };

  const generateAntardashas = (mahadasha) => {
    const lord = mahadasha.lord;
    const totalYears = DASHA_YEARS[lord];
    const startIndex = DASHA_ORDER.indexOf(lord);
    const antardashas = [];
    let currentDate = new Date(mahadasha.start);
    for (let i = 0; i < DASHA_ORDER.length; i++) {
      const antarLord = DASHA_ORDER[(startIndex + i) % DASHA_ORDER.length];
      const antarYears = (DASHA_YEARS[antarLord] * totalYears) / 120;
      const days = antarYears * 365.25;
      const endDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
      antardashas.push({ lord: antarLord, start: new Date(currentDate), end: new Date(endDate) });
      currentDate = endDate;
    }
    return antardashas;
  };

  const currentMaha = timeline.find(d => now >= new Date(d.start) && now <= new Date(d.end));
  const [expandedIdx, setExpandedIdx] = useState(
    timeline.findIndex(d => now >= new Date(d.start) && now <= new Date(d.end))
  );

  const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const getProgress = (start, end) => {
    const total = new Date(end) - new Date(start);
    const elapsed = now - new Date(start);
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  if (!timeline.length) {
    return (
      <div className="text-center py-16" style={{ color: r(0.3) }}>
        <p className="text-sm font-light">Dasha data not available. Please regenerate this Kundali.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header card */}
      <div style={glass(COLORS.amber.border)}>
        <div className="px-6 py-4" style={{ borderBottom: `1px solid ${r(0.07)}` }}>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: r(0.3) }}>
            {lang === "hi" ? "विंशोत्तरी दशा" : "Vimshottari Dasha"}
          </p>
          <h3 className="text-sm font-light tracking-wider" style={{ color: r(0.85) }}>
            {lang === "hi" ? "महादशा काल रेखा" : "Mahadasha Timeline"}
          </h3>
        </div>
        {currentMaha && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: lang === "hi" ? "वर्तमान महादशा" : "Current Mahadasha", value: currentMaha.lord },
              { label: lang === "hi" ? "प्रारंभ" : "Started", value: fmt(currentMaha.start) },
              { label: lang === "hi" ? "समाप्ति" : "Ends", value: fmt(currentMaha.end) },
            ].map(({ label, value }) => (
              <div key={label} className="text-center p-4 rounded-xl"
                style={{ background: COLORS.amber.bg, border: `1px solid ${COLORS.amber.border}` }}>
                <p className="text-[10px] tracking-wider uppercase mb-1.5" style={{ color: r(0.35) }}>{label}</p>
                <p className="text-sm font-light" style={{ color: r(0.9) }}>{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div style={glass()}>
        <div className="px-6 py-4" style={{ borderBottom: `1px solid ${r(0.07)}` }}>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: r(0.3) }}>
            {lang === "hi" ? "सभी महादशा" : "All Mahadashas"}
          </p>
          <h3 className="text-sm font-light tracking-wider" style={{ color: r(0.85) }}>
            {lang === "hi" ? "दशा विस्तार" : "Click to expand Antardashas"}
          </h3>
        </div>
        <div className="p-4 space-y-2">
          {timeline.map((dasha, idx) => {
            const isCurrent = currentMaha && new Date(dasha.start).getTime() === new Date(currentMaha.start).getTime();
            const isPast = now > new Date(dasha.end);
            const isExpanded = expandedIdx === idx;
            const progress = isCurrent ? getProgress(dasha.start, dasha.end) : 0;
            const antardashas = isExpanded ? generateAntardashas(dasha) : [];
            const color = planetColors[dasha.lord] || COLORS.amber.text;

            return (
              <div key={idx}>
                <button
                  onClick={() => setExpandedIdx(isExpanded ? -1 : idx)}
                  className="w-full text-left p-4 rounded-xl transition-all duration-200"
                  style={{
                    background: isCurrent ? `${color}15` : r(0.03),
                    border: `1px solid ${isCurrent ? color + "40" : r(0.07)}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: isPast ? r(0.2) : color }} />
                      <span className="text-sm font-light" style={{ color: isPast ? r(0.35) : r(0.9) }}>
                        {dasha.lord} {lang === "hi" ? "महादशा" : "Mahadasha"}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-light"
                          style={{ background: `${color}25`, color, border: `1px solid ${color}40` }}>
                          {lang === "hi" ? "वर्तमान" : "Current"}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-light hidden sm:block" style={{ color: r(0.35) }}>
                        {fmt(dasha.start)} — {fmt(dasha.end)}
                      </span>
                      <span style={{ color: r(0.3), fontSize: "10px" }}>{isExpanded ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  <div className="sm:hidden text-xs font-light mb-2" style={{ color: r(0.3) }}>
                    {fmt(dasha.start)} — {fmt(dasha.end)}
                  </div>
                  {isCurrent && (
                    <div className="mt-2 rounded-full overflow-hidden" style={{ height: "3px", background: r(0.08) }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, background: color }} />
                    </div>
                  )}
                </button>

                {/* Antardashas */}
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1 pl-3" style={{ borderLeft: `1px solid ${r(0.08)}` }}>
                    {antardashas.map((antar, ai) => {
                      const isCurrentAntar = now >= new Date(antar.start) && now <= new Date(antar.end);
                      const isAntarPast = now > new Date(antar.end);
                      const antarColor = planetColors[antar.lord] || COLORS.amber.text;
                      return (
                        <div key={ai} className="p-3 rounded-lg"
                          style={{
                            background: isCurrentAntar ? `${antarColor}10` : r(0.02),
                            border: `1px solid ${isCurrentAntar ? antarColor + "30" : r(0.05)}`,
                          }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: isAntarPast ? r(0.15) : antarColor }} />
                              <span className="text-xs font-light"
                                style={{ color: isAntarPast ? r(0.3) : r(0.75) }}>
                                {dasha.lord}-{antar.lord}
                              </span>
                              {isCurrentAntar && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full"
                                  style={{ background: `${antarColor}20`, color: antarColor }}>
                                  {lang === "hi" ? "अभी" : "Now"}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-light" style={{ color: r(0.25) }}>
                              {fmt(antar.start)} — {fmt(antar.end)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ── YogaDetection ─────────────────────────────────────────────────────────
const YogaDetection = () => {
  const planets = kundaliData?.data?.planets || [];
  const rasi = kundaliData?.data?.chart?.rasi || [];

  const getPlanet = (name) => planets.find(p => p.name === name);
  const getHouseOf = (name) => getPlanet(name)?.house;
  const isConjunct = (p1, p2) => getHouseOf(p1) === getHouseOf(p2);

  const yogas = [];

  const moon = getPlanet("Moon");
  const jupiter = getPlanet("Jupiter");

  // Gajakesari Yoga
  if (moon && jupiter) {
    const diff = ((jupiter.house - moon.house + 12) % 12);
    if ([0, 3, 6, 9].includes(diff)) {
      yogas.push({
        name: "Gajakesari Yoga",
        Sanskrit: "गजकेसरी योग",
        present: true,
        what: "Formed when Jupiter occupies a kendra house (1st, 4th, 7th, or 10th) from the Moon.",
        impact: "Blesses the native with sharp intellect, strong personality, fame, and wealth. The person is often respected in society and has natural leadership qualities.",
        areas: "Career, reputation, wisdom, social status",
        strength: "Strong",
        color: COLORS.amber,
      });
    }
  }

  // Budhaditya Yoga
  if (isConjunct("Sun", "Mercury")) {
    yogas.push({
      name: "Budhaditya Yoga",
      Sanskrit: "बुधादित्य योग",
      present: true,
      what: "Formed when Sun and Mercury are conjunct in the same house.",
      impact: "Gives exceptional intelligence, eloquence, and communication skills. The native excels in fields requiring analytical thinking, writing, or public speaking.",
      areas: "Intelligence, communication, business, education",
      strength: "Strong",
      color: COLORS.amber,
    });
  }

  // Chandra-Mangal Yoga
  if (isConjunct("Moon", "Mars")) {
    yogas.push({
      name: "Chandra-Mangal Yoga",
      Sanskrit: "चंद्र-मंगल योग",
      present: true,
      what: "Formed when Moon and Mars occupy the same house in the birth chart.",
      impact: "Gives strong determination, courage, and drive. Often associated with financial success through one's own efforts. The native is emotionally intense and highly motivated.",
      areas: "Finance, ambition, real estate, courage",
      strength: "Moderate",
      color: COLORS.teal,
    });
  }

  // Mahabhagya Yoga
  const beneficsInTrikona = ["Jupiter", "Venus", "Moon"].filter(p =>
    [1, 5, 9].includes(getHouseOf(p))
  );
  if (beneficsInTrikona.length >= 2) {
    yogas.push({
      name: "Mahabhagya Yoga",
      Sanskrit: "महाभाग्य योग",
      present: true,
      what: "Formed when two or more natural benefics (Jupiter, Venus, Moon) are placed in trine houses (1st, 5th, or 9th).",
      impact: "One of the most auspicious yogas. Indicates exceptional luck, divine blessings, and a life filled with opportunities. The native is generally fortunate in most endeavors.",
      areas: "Overall fortune, spirituality, relationships, success",
      strength: "Strong",
      color: COLORS.amber,
    });
  }

  // Raj Yoga
  const kendraHouses = [1, 4, 7, 10];
  const trikonaHouses = [1, 5, 9];
  const kendraLords = kendraHouses.map(h => rasi.find(r => r.house === h)?.lord).filter(Boolean);
  const trikonaLords = trikonaHouses.map(h => rasi.find(r => r.house === h)?.lord).filter(Boolean);
  const rajYogaPlanets = kendraLords.filter(p => trikonaLords.includes(p));
  if (rajYogaPlanets.length > 0) {
    yogas.push({
      name: "Raj Yoga",
      Sanskrit: "राज योग",
      present: true,
      what: "Formed when the lord of a kendra house (1,4,7,10) is also the lord of a trikona house (1,5,9).",
      impact: "The most celebrated yoga in Vedic astrology. Indicates rise to power, authority, and high status. The native achieves success in career and is respected like royalty in their field.",
      areas: "Career, authority, fame, political or social power",
      strength: "Strong",
      color: COLORS.amber,
    });
  }

  // Dhana Yoga
  const lord2 = rasi.find(r => r.house === 2)?.lord;
  const lord11 = rasi.find(r => r.house === 11)?.lord;
  if (lord2 && lord11 && lord2 !== lord11) {
    const l2House = getHouseOf(lord2);
    const l11House = getHouseOf(lord11);
    if (l2House === l11House || l2House === 11 || l11House === 2) {
      yogas.push({
        name: "Dhana Yoga",
        Sanskrit: "धन योग",
        present: true,
        what: "Formed when the lords of the 2nd house (wealth) and 11th house (gains) are conjunct or placed in each other's houses.",
        impact: "Indicates strong potential for financial prosperity and wealth accumulation. The native often earns well and is able to build significant assets over their lifetime.",
        areas: "Wealth, income, savings, financial security",
        strength: "Moderate",
        color: COLORS.teal,
      });
    }
  }

  // Saraswati Yoga
  const saraswatiPlanets = ["Jupiter", "Venus", "Mercury"].filter(p =>
    [...kendraHouses, ...trikonaHouses].includes(getHouseOf(p))
  );
  if (saraswatiPlanets.length === 3) {
    yogas.push({
      name: "Saraswati Yoga",
      Sanskrit: "सरस्वती योग",
      present: true,
      what: "Formed when Jupiter, Venus, and Mercury are all placed in kendra or trikona houses simultaneously.",
      impact: "Blesses the native with extraordinary intelligence, artistic talent, and creative expression. Such persons often excel in arts, music, literature, or academia and gain widespread recognition.",
      areas: "Arts, creativity, education, music, literature",
      strength: "Strong",
      color: COLORS.amber,
    });
  }

  // Kemadruma Yoga
  if (moon) {
    const moonH = moon.house;
    const prev = ((moonH - 2 + 12) % 12) + 1;
    const next = (moonH % 12) + 1;
    const adjPlanets = planets.filter(p =>
      p.name !== "Moon" && p.name !== "Rahu" && p.name !== "Ketu" &&
      (p.house === prev || p.house === next)
    );
    if (adjPlanets.length === 0) {
      yogas.push({
        name: "Kemadruma Yoga",
        Sanskrit: "केमद्रुम योग",
        present: true,
        what: "Formed when no planet (except Rahu/Ketu) occupies the 2nd or 12th house from the Moon.",
        impact: "May bring emotional instability, periods of loneliness, or struggles in early life. However, strong placements elsewhere can mitigate its effects significantly. Often the native develops great inner resilience.",
        areas: "Mental peace, emotional stability, relationships",
        strength: "Challenging",
        color: COLORS.rose,
      });
    }
  }

  // Vipareeta Raj Yoga
  const lord6 = rasi.find(r => r.house === 6)?.lord;
  const lord8 = rasi.find(r => r.house === 8)?.lord;
  const lord12 = rasi.find(r => r.house === 12)?.lord;
  const dusthanaLords = [lord6, lord8, lord12].filter(Boolean);
  const dusthanaHouses = [6, 8, 12];
  const vipareetaPlanets = dusthanaLords.filter(p => dusthanaHouses.includes(getHouseOf(p)));
  if (vipareetaPlanets.length >= 2) {
    yogas.push({
      name: "Vipareeta Raj Yoga",
      Sanskrit: "विपरीत राज योग",
      present: true,
      what: "Formed when lords of the 6th, 8th, or 12th houses (dusthana) are placed in other dusthana houses.",
      impact: "Indicates unexpected success and rise, often after going through difficulties or losses. The native tends to benefit from hidden sources. Success comes in a surprising or unconventional way.",
      areas: "Hidden gains, overcoming adversity, unexpected success",
      strength: "Moderate",
      color: COLORS.teal,
    });
  }

  const presentYogas = yogas.filter(y => y.present);

  return (
    <div className="space-y-5">
      <div style={glass(COLORS.amber.border)}>
        <div className="px-6 py-4" style={{ borderBottom: `1px solid ${r(0.07)}` }}>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: r(0.3) }}>
            {lang === "hi" ? "ग्रह योग" : "Planetary Yogas"}
          </p>
          <h3 className="text-sm font-light tracking-wider" style={{ color: r(0.85) }}>
            {lang === "hi" ? "योग विश्लेषण" : "Yoga Analysis"}
          </h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: lang === "hi" ? "कुल योग" : "Yogas Found", value: presentYogas.length },
            { label: lang === "hi" ? "शुभ योग" : "Auspicious", value: presentYogas.filter(y => y.color !== COLORS.rose).length },
            { label: lang === "hi" ? "चुनौती" : "Challenging", value: presentYogas.filter(y => y.color === COLORS.rose).length },
          ].map(({ label, value }) => (
            <div key={label} className="text-center p-4 rounded-xl"
              style={{ background: COLORS.amber.bg, border: `1px solid ${COLORS.amber.border}` }}>
              <p className="text-[10px] tracking-wider uppercase mb-1.5" style={{ color: r(0.35) }}>{label}</p>
              <p className="text-2xl font-light" style={{ color: r(0.9) }}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={glass()}>
        <div className="px-6 py-4" style={{ borderBottom: `1px solid ${r(0.07)}` }}>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: r(0.3) }}>
            {lang === "hi" ? "विस्तार" : "Details"}
          </p>
          <h3 className="text-sm font-light tracking-wider" style={{ color: r(0.85) }}>
            {lang === "hi" ? "आपके योग" : "Your Yogas"}
          </h3>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {presentYogas.length === 0 ? (
            <div className="col-span-2 text-center py-10">
              <p className="text-sm font-light" style={{ color: r(0.3) }}>No major yogas detected in this chart.</p>
            </div>
          ) : (
            presentYogas.map((yoga, i) => (
              <div key={i} className="p-4 rounded-xl"
                style={{
                  background: `${yoga.color.text}08`,
                  border: `1px solid ${yoga.color.text}25`,
                }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="text-sm font-light tracking-wide" style={{ color: yoga.color.text }}>
                      {yoga.name}
                    </h4>
                    <p className="text-[10px] font-light mt-0.5" style={{ color: r(0.3) }}>
                      {yoga.Sanskrit}
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 font-light"
                    style={{
                      background: `${yoga.color.text}15`,
                      color: yoga.color.text,
                      border: `1px solid ${yoga.color.text}30`,
                    }}>
                    {yoga.strength}
                  </span>
                </div>
                <div style={{ height: "1px", background: `${yoga.color.text}15`, marginBottom: "10px" }} />
                {[
                  { label: "What it is", value: yoga.what },
                  { label: "Impact", value: yoga.impact },
                  { label: "Life areas", value: yoga.areas },
                ].map(({ label, value }) => (
                  <div key={label} className="mb-2.5">
                    <p className="text-[10px] tracking-wider uppercase mb-1" style={{ color: r(0.3) }}>
                      {label}
                    </p>
                    <p className="text-xs font-light leading-relaxed" style={{ color: r(0.62) }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

  // ── AskAI — NEW TAB ───────────────────────────────────────────────────────
  const AskAI = () => {
    console.log("AskAI kundaliData._id:", kundaliData?._id);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [historyLoaded, setHistoryLoaded] = useState(false);
    const bottomRef = useRef(null);

    const SUGGESTIONS = [
      "What does my chart say about career?",
      "Tell me about my love life",
      "What are my strengths?",
      "Health insights from my chart",
      "When is a good time for new beginnings?",
    ];

    // Load chat history when tab opens
    useEffect(() => {
      const loadHistory = async () => {
        if (!kundaliData?._id) {
          // No saved kundali id, show welcome message only
          setMessages([
            {
              role: "ai",
              text: `Namaste${name ? ` ${name}` : ""}! I am Nakshatra AI. I have your Kundali details. Ask me anything about your birth chart.`,
            },
          ]);
          setHistoryLoaded(true);
          return;
        }

        try {
          const res = await fetch(
            `${BACKEND_URL}/api/ai/history/${kundaliData._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
          const data = await res.json();
          console.log("kundali data", data);

          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          } else {
            setMessages([
              {
                role: "ai",
                text: `Namaste${name ? ` ${name}` : ""}! I am Nakshatra AI. I have your Kundali details. Ask me anything about your birth chart.`,
              },
            ]);
          }
        } catch {
          setMessages([
            {
              role: "ai",
              text: `Namaste${name ? ` ${name}` : ""}! I am Nakshatra AI. Ask me anything about your Kundali.`,
            },
          ]);
        }
        setHistoryLoaded(true);
      };

      loadHistory();
    }, []);

    useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (text) => {
      const question = text || input.trim();
      if (!question) return;

      setMessages((prev) => [...prev, { role: "user", text: question }]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch(`${BACKEND_URL}/api/ai/ask`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            kundali_id: kundaliData?._id,
            message: question,
          }),
        });

        console.log(
          "Sending kundali_id:",
          kundaliData?._id,
          "full kundaliData keys:",
          Object.keys(kundaliData || {}),
        );
        console.log("kundaliData", kundaliData);

        const data = await res.json();

        if (!res.ok) {
          const errorMsg =
            res.status === 403
              ? "You have used all your free AI messages. Please upgrade to continue."
              : "Sorry, I couldn't process that. Please try again.";
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              text: errorMsg,
            },
          ]);
        } else {
          setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: "Server error. Please try again." },
        ]);
      }

      setLoading(false);
    };

    const handleKey = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };

    return (
      <div style={glass()}>
        {/* Header */}
        <div
          className="px-6 py-4"
          style={{ borderBottom: `1px solid ${r(0.07)}` }}
        >
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
            style={{ color: r(0.3) }}
          >
           Nakshatra - AI Astrologer
          </p>
          <h3
            className="text-sm font-light tracking-wider"
            style={{ color: r(0.85) }}
          >
            Ask About Your Kundali
          </h3>
        </div>

        {/* Suggestion chips */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s)}
              className="text-xs font-light px-3 py-1.5 rounded-full transition-all duration-200 hover:opacity-90"
              style={{
                background: COLORS.amber.bg,
                border: `1px solid ${COLORS.amber.border}`,
                color: COLORS.amber.text,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div
          className="px-6 py-4 space-y-4 overflow-y-auto"
          style={{ minHeight: "320px", maxHeight: "420px" }}
        >
          {!historyLoaded ? (
            <div className="flex justify-center items-center h-32">
              <span className="text-xs font-light" style={{ color: r(0.3) }}>
                Loading conversation...
              </span>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={
                    msg.role === "ai"
                      ? {
                          background: COLORS.amber.bg,
                          border: `1px solid ${COLORS.amber.border}`,
                          color: COLORS.amber.text,
                        }
                      : {
                          background: r(0.08),
                          border: `1px solid ${r(0.12)}`,
                          color: r(0.7),
                        }
                  }
                >
                  {msg.role === "ai" ? "N" : sidebarUser.initial}
                </div>
                <div
                  className="max-w-[78%] px-4 py-3 rounded-2xl text-sm font-light leading-relaxed"
                  style={
                    msg.role === "ai"
                      ? {
                          background: r(0.05),
                          border: `1px solid ${r(0.08)}`,
                          color: r(0.82),
                        }
                      : {
                          background: COLORS.amber.bg,
                          border: `1px solid ${COLORS.amber.border}`,
                          color: r(0.9),
                        }
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: COLORS.amber.bg,
                  border: `1px solid ${COLORS.amber.border}`,
                  color: COLORS.amber.text,
                }}
              >
                N
              </div>
              <div
                className="px-4 py-3 rounded-2xl"
                style={{ background: r(0.05), border: `1px solid ${r(0.08)}` }}
              >
                <div className="flex gap-1 items-center h-5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: COLORS.amber.text,
                        opacity: 0.6,
                        animation: `bounce 1s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-6 pb-6">
          <div
            className="flex gap-3 items-end"
            style={{ borderTop: `1px solid ${r(0.07)}`, paddingTop: "16px" }}
          >
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything about your Kundali..."
              className="flex-1 resize-none text-sm font-light rounded-xl px-4 py-3 outline-none transition-all duration-200"
              style={{
                background: r(0.05),
                border: `1px solid ${r(0.1)}`,
                color: r(0.85),
                maxHeight: "120px",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#d97706,#b45309)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <p
            className="text-[10px] font-light mt-2 text-center"
            style={{ color: r(0.2) }}
          >
            AI-generated insights are for guidance purposes only, not
            professional advice.
          </p>
        </div>

        <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
      </div>
    );
  };

  // ── Tabs config — AI tab added ────────────────────────────────────────────
  const tabs = [
    {
      id: "chart", label: lang === "hi" ? "कुंडली" : "Birth Chart", icon: <FaStroopwafel />,},
    { id: "planets", label: lang === "hi" ? "ग्रह" : "Planets", icon: <IoPlanetSharp /> },
    { id: "houses", label: lang === "hi" ? "भाव" : "Houses", icon: <GiHouse /> },
    { id: "birth", label: lang === "hi" ? "विवरण" : "Details", icon: <BiSolidDetail /> },
    { id: "dasha", label: lang === "hi" ? "दशा" : "Dasha", icon: <GiTimeSynchronization /> },
    { id: "yoga", label: lang === "hi" ? "योग" : "Yogas", icon: <GiYinYang /> },
    { id: "ai", label: lang === "hi" ? "AI ज्योतिष" : "Ask AI", icon: <RiRobot3Line /> },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={pageBg}
    >
      <Stars />
      <DecorativeElement />
      <ZodiacRing />
      <AmbientGlow />

      <UserSidebar
        active=""
        setActive={(tab) => navigate("/dashboard", { state: { tab } })}
        sideOpen={sideOpen}
        setSideOpen={setSideOpen}
        onGenerate={() => navigate("/generate-kundali")}
        onLogout={() => {
          logout();
          navigate("/");
        }}
        user={sidebarUser}
      />

      <div className="lg:pl-64 min-h-screen flex flex-col">
        <header
          className="sticky top-0 z-20 px-5 md:px-7 py-3.5 flex items-center justify-between"
          style={{
            background: "rgba(15,23,42,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: `1px solid ${r(0.08)}`,
          }}
        >
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => setSideOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-light tracking-[0.2em] uppercase">
              <button
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer transition-opacity hover:opacity-100"
                style={{ color: r(0.3) }}
              >
                Dashboard
              </button>
              <span style={{ color: r(0.15) }}>·</span>
              <button
                onClick={() => navigate("/generate-kundali")}
                className="cursor-pointer transition-opacity hover:opacity-100"
                style={{ color: r(0.3) }}
              >
                Kundali
              </button>
              <span style={{ color: r(0.15) }}>·</span>
              <span style={{ color: COLORS.amber.text }} className="font-medium">
                {name ? `${name}'s Chart` : "Birth Chart"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1 p-1 rounded-full"
              style={{ background: r(0.05), border: `1px solid ${r(0.1)}` }}
            >
              {["en", "hi"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="cursor-pointer px-3 py-1 rounded-full text-xs font-light tracking-wider transition-all duration-200"
                  style={
                    lang === l
                      ? { background: COLORS.amber.text, color: "#000" }
                      : { color: r(0.4) }
                  }
                >
                  {l === "en" ? "EN" : "हिं"}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate("/generate-kundali")}
              className="cursor-pointer hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-light tracking-widest uppercase transition-all hover:opacity-80"
              style={{
                background: r(0.05),
                border: `1px solid ${r(0.1)}`,
                color: r(0.55),
              }}
            >
              <MdOutlineKeyboardBackspace />
              Back
            </button>

            <button
              onClick={() =>
                navigate("/dashboard", { state: { tab: "profile" } })
              }
              className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center text-sm font-light opacity-80 hover:opacity-100 transition-all"
              style={{
                background: COLORS.amber.bg,
                border: `1px solid ${COLORS.amber.border}`,
                color: COLORS.amber.text,
              }}
            >
              {sidebarUser.initial}
            </button>
          </div>
        </header>

        <main className="flex-1 px-5 md:px-7 py-8 relative z-10 w-full max-w-6xl mx-auto">
          <div className="mb-8">
            <p
              className="text-[10px] tracking-[0.35em] uppercase mb-1"
              style={{ color: r(0.3) }}
            >
              {lang === "hi" ? "जन्म कुंडली" : "Janam Kundali"}
            </p>
            <h1
              className="text-2xl md:text-3xl font-light tracking-wider"
              style={{ color: r(0.92) }}
            >
              {name ? (
                lang === "hi" ? (
                  `${name} `
                ) : (
                  <>
                    {name}'s{" "}
                    <span style={{ color: COLORS.amber.text }}>Kundali</span>
                  </>
                )
              ) : (
                <span style={{ color: COLORS.amber.text }}>Your Kundali</span>
              )}
            </h1>
            {birthDetails && (
              <p
                className="text-sm font-light mt-1.5 tracking-wide"
                style={{ color: r(0.4) }}
              >
                {birthDetails.date} · {birthDetails.time} · {birthDetails.place}
              </p>
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-7 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-wider transition-all duration-200"
                style={
                  activeTab === tab.id
                    ? {
                        background: COLORS.amber.text,
                        color: "#000",
                        boxShadow: `0 4px 15px ${COLORS.amber.glow}`,
                      }
                    : {
                        background: r(0.04),
                        border: `1px solid ${r(0.1)}`,
                        color: r(0.55),
                      }
                }
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div>
            {activeTab === "chart" && (
              <div style={glass()}>
                <div
                  className="px-6 py-4"
                  style={{ borderBottom: `1px solid ${r(0.07)}` }}
                >
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
                    style={{ color: r(0.3) }}
                  >
                    {lang === "hi" ? "उत्तर भारतीय" : "North Indian"}
                  </p>
                  <h3
                    className="text-sm font-light tracking-wider"
                    style={{ color: r(0.85) }}
                  >
                    {L.chartTitle}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex justify-center mb-7">
                    <VedicChart />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
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
                        kundaliData?.data?.birth_details?.ayanamsaName ||
                          "Lahiri",
                      ],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="text-center p-4 rounded-xl"
                        style={{
                          background: COLORS.amber.bg,
                          border: `1px solid ${COLORS.amber.border}`,
                        }}
                      >
                        <p
                          className="text-[10px] tracking-wider uppercase mb-1.5"
                          style={{ color: r(0.35) }}
                        >
                          {label}
                        </p>
                        <p
                          className="text-sm font-light"
                          style={{ color: r(0.85) }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "planets" && (
              <div>
                <div className="mb-5">
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
                    style={{ color: r(0.3) }}
                  >
                    {lang === "hi" ? "नवग्रह" : "Nine Planets"}
                  </p>
                  <h3
                    className="text-base font-light tracking-wider"
                    style={{ color: r(0.85) }}
                  >
                    {lang === "hi" ? "ग्रह स्थिति" : "Planetary Positions"}
                  </h3>
                </div>
                <PlanetaryPositions />
              </div>
            )}

            {activeTab === "houses" && (
              <div>
                <div className="mb-5">
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
                    style={{ color: r(0.3) }}
                  >
                    {lang === "hi" ? "द्वादश भाव" : "Twelve Houses"}
                  </p>
                  <h3
                    className="text-base font-light tracking-wider"
                    style={{ color: r(0.85) }}
                  >
                    {lang === "hi" ? "भाव विश्लेषण" : "House Analysis"}
                  </h3>
                </div>
                <HouseDetails />
              </div>
            )}

            {activeTab === "birth" && <BirthDetails />}

            {activeTab === "dasha" && (
  <div>
    <div className="mb-5">
      <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: r(0.3) }}>
        {lang === "hi" ? "विंशोत्तरी दशा" : "Vimshottari Dasha"}
      </p>
      <h3 className="text-base font-light tracking-wider" style={{ color: r(0.85) }}>
        {lang === "hi" ? "महादशा एवं अंतर्दशा" : "Mahadasha & Antardasha"}
      </h3>
    </div>
    <DashaTimeline />
  </div>
)}

{activeTab === "yoga" && (
  <div>
    <div className="mb-5">
      <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: r(0.3) }}>
        {lang === "hi" ? "ग्रह योग" : "Planetary Yogas"}
      </p>
      <h3 className="text-base font-light tracking-wider" style={{ color: r(0.85) }}>
        {lang === "hi" ? "योग विश्लेषण" : "Yoga Analysis"}
      </h3>
    </div>
    <YogaDetection />
  </div>
)}

            {/* ── NEW AI TAB ── */}

            <div style={{ display: activeTab === "ai" ? "block" : "none" }}>
              <AskAI />
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-xs font-light" style={{ color: r(0.2) }}>
              {lang === "hi"
                ? "वैदिक ज्योतिष • लाहिरी अयनांश • केवल शैक्षिक उद्देश्य के लिए"
                : "Vedic Astrology · Lahiri Ayanamsa · For educational purposes only"}
            </p>
          </div>
        </main>

        <footer
          className="px-7 py-4"
          style={{ borderTop: `1px solid ${r(0.07)}` }}
        >
          <p
            className="text-[10px] font-light tracking-[0.3em] uppercase text-center"
            style={{ color: r(0.15) }}
          >
            Kundali Marg · Vedic Astrology · For Educational Purposes Only
          </p>
        </footer>
      </div>

      <BottomDecorativeElement />
    </div>
  );
};

export default ShowKundali;
