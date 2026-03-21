// pages/kundali/ShowKundali.jsx
// Same logic, same data, same tabs, same VedicChart SVG.
// Only change: dashboard layout (pageBg, glass(), COLORS, UserSidebar, topbar, footer)

import { useLocation, useNavigate } from "react-router-dom";
import { useState }                 from "react";

// Decorations — same as dashboard
import Stars                   from "../../components/decorations/Stars";
import DecorativeElement       from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import ZodiacRing              from "../../components/decorations/ZodiacRing";
import AmbientGlow             from "../../components/decorations/AmbientGlow";

// Sidebar — same as dashboard
import UserSidebar from "../../components/user/Sidebar";

// Theme — same tokens as dashboard
import { glass, COLORS, pageBg } from "../../components/dashboard/theme";

// Auth
import useAuth from "../../hooks/useAuth";

// Planet icons — unchanged
import SunImage     from "../../src/assets/planets-icon/sun.png";
import MoonImage    from "../../src/assets/planets-icon/moon.png";
import MarsImage    from "../../src/assets/planets-icon/mars.png";
import MercuryImage from "../../src/assets/planets-icon/mercury.png";
import JupiterImage from "../../src/assets/planets-icon/jupiter.png";
import VenusImage   from "../../src/assets/planets-icon/venus.png";
import SaturnImage  from "../../src/assets/planets-icon/saturn.png";
import RahuImage    from "../../src/assets/planets-icon/rahu.png";
import KetuImage    from "../../src/assets/planets-icon/ketu.png";

// ── Language data — UNCHANGED ─────────────────────────────────────────────────
const LANG = {
  en: {
    abbr:  { Sun:"Su", Moon:"Mo", Mars:"Ma", Mercury:"Me", Jupiter:"Ju", Venus:"Ve", Saturn:"Sa", Rahu:"Ra", Ketu:"Ke" },
    full:  { Sun:"Sun", Moon:"Moon", Mars:"Mars", Mercury:"Mercury", Jupiter:"Jupiter", Venus:"Venus", Saturn:"Saturn", Rahu:"Rahu", Ketu:"Ketu" },
    signs: ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"],
    nakshatras: ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"],
    asc: "Asc", chartTitle: "North Indian Rasi Chart", lagnaLabel: "Lagna",
  },
  hi: {
    abbr:  { Sun:"सू", Moon:"च", Mars:"मं", Mercury:"बु", Jupiter:"गु", Venus:"शु", Saturn:"श", Rahu:"रा", Ketu:"के" },
    full:  { Sun:"सूर्य", Moon:"चंद्र", Mars:"मंगल", Mercury:"बुध", Jupiter:"गुरु", Venus:"शुक्र", Saturn:"शनि", Rahu:"राहु", Ketu:"केतु" },
    signs: ["मेष","वृषभ","मिथुन","कर्क","सिंह","कन्या","तुला","वृश्चिक","धनु","मकर","कुम्भ","मीन"],
    nakshatras: ["अश्विनी","भरणी","कृत्तिका","रोहिणी","मृगशिरा","आर्द्रा","पुनर्वसु","पुष्य","आश्लेषा","मघा","पूर्व फाल्गुनी","उत्तर फाल्गुनी","हस्त","चित्रा","स्वाती","विशाखा","अनुराधा","ज्येष्ठा","मूल","पूर्वाषाढ़","उत्तराषाढ़","श्रवण","धनिष्ठा","शतभिषा","पूर्व भाद्रपद","उत्तर भाद्रपद","रेवती"],
    asc: "लग्न", chartTitle: "उत्तर भारतीय राशि कुंडली", lagnaLabel: "लग्न",
  },
};

// ── Chart layout constants — UNCHANGED ───────────────────────────────────────
const SIGN_POS = {
  1:{x:241,y:216}, 2:{x:123,y:98},  3:{x:98,y:123},  4:{x:216,y:241},
  5:{x:98,y:359},  6:{x:123,y:384}, 7:{x:233,y:266},  8:{x:351,y:384},
  9:{x:376,y:359}, 10:{x:266,y:241},11:{x:384,y:123}, 12:{x:359,y:98},
};
const PLANET_ZONE = {
  1:{xMin:195,xMax:285,yMin:85,yMax:165},  2:{xMin:80,xMax:160,yMin:35,yMax:110},
  3:{xMin:20,xMax:95,yMin:90,yMax:165},    4:{xMin:150,xMax:230,yMin:205,yMax:275},
  5:{xMin:20,xMax:95,yMin:305,yMax:375},   6:{xMin:80,xMax:160,yMin:360,yMax:440},
  7:{xMin:195,xMax:285,yMin:310,yMax:385}, 8:{xMin:310,xMax:390,yMin:360,yMax:440},
  9:{xMin:385,xMax:460,yMin:305,yMax:375}, 10:{xMin:285,xMax:355,yMin:205,yMax:275},
  11:{xMin:385,xMax:460,yMin:90,yMax:165}, 12:{xMin:310,xMax:390,yMin:35,yMax:110},
};

// ── Helper ────────────────────────────────────────────────────────────────────
const r = (o) => `rgba(255,255,255,${o})`;

// ── ShowKundali ───────────────────────────────────────────────────────────────
const ShowKundali = () => {
  const location               = useLocation();
  const navigate               = useNavigate();
  const { user, logout }       = useAuth();
  const { kundaliData, name, birthDetails } = location.state || {};

  const [activeTab, setActiveTab] = useState("chart");
  const [lang,      setLang]      = useState("en");
  const [sideOpen,  setSideOpen]  = useState(false);

  const L = LANG[lang];

  // Sidebar user — same as GenerateKundali
  const sidebarUser = {
    name:    user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User" : "User",
    initial: user?.first_name?.charAt(0)?.toUpperCase() || "U",
    line1:   user?.email || "",
  };

  const getNakshatraDisplay = (englishName) => {
    const idx = LANG.en.nakshatras.findIndex(n => n.toLowerCase() === englishName?.toLowerCase());
    return idx >= 0 ? L.nakshatras[idx] : englishName || "—";
  };

  // ── No data guard — same logic, updated style ─────────────────────────────
  if (!kundaliData || !kundaliData.data) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center" style={pageBg}>
        <Stars /><ZodiacRing /><AmbientGlow />
        <div className="text-center p-10 rounded-2xl relative z-10" style={glass(COLORS.amber.border)}>
          <div className="text-5xl mb-4">🔮</div>
          <h2 className="text-xl font-light tracking-wider mb-3" style={{ color:COLORS.amber.text }}>
            No Kundali Data Found
          </h2>
          <p className="text-sm font-light mb-6" style={{ color:r(0.4) }}>
            Please generate your Kundali first.
          </p>
          <button onClick={() => navigate("/generate-kundali")}
            className="px-6 py-2.5 rounded-full text-xs font-light tracking-widest uppercase text-white transition-all hover:opacity-90"
            style={{ background:"linear-gradient(135deg,#d97706,#b45309)" }}>
            Generate Kundali
          </button>
        </div>
      </div>
    );
  }

  // ── Data helpers — UNCHANGED ──────────────────────────────────────────────
  const rasi = kundaliData?.data?.chart?.rasi ?? [];
  const getHouse = (n) => rasi.find(h => h.house === n);
  const getPlanetsInHouse = (n) => {
    const h = getHouse(n);
    if (!h || !h.planet) return [];
    return h.planet.split(",").map(p => p.trim()).filter(Boolean);
  };
  const getSignInHouse = (n) => { const h = getHouse(n); return h ? h.sign : ""; };
  const getSignLord = (name) => (lang === "hi" ? (L.full[name] ?? name) : name);
  const getNakLord  = (name) => (lang === "hi" ? (L.full[name] ?? name) : name);

  // ── VedicChart SVG — COMPLETELY UNCHANGED ────────────────────────────────
  const VedicChart = () => {
    const renderPlanets = (h) => {
      const data = getHouse(h);
      const zone = PLANET_ZONE[h];
      if (!data || !zone) return null;
      const items = h === 1 ? [L.asc, ...(data.planets ?? [])] : [...(data.planets ?? [])];
      if (!items.length) return null;
      const count = items.length;
      const padding = 12;
      const xMin = zone.xMin + padding, xMax = zone.xMax - padding;
      const yMin = zone.yMin + padding, yMax = zone.yMax - padding;
      const width = xMax - xMin, height = yMax - yMin;
      let cols = 1;
      if (count >= 3) cols = 2;
      if (count >= 7) cols = 3;
      const rows = Math.ceil(count / cols);
      const colSpacing = width / cols, rowSpacing = height / rows;
      let fontSize = 15;
      if (count >= 5) fontSize = 13;
      if (count >= 7) fontSize = 11;
      return items.map((planet, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const x = xMin + colSpacing * col + colSpacing / 2;
        const y = yMin + rowSpacing * row + rowSpacing / 2;
        const label = planet === L.asc || planet === "Asc" ? L.asc : (L.abbr[planet] ?? planet.slice(0, 2));
        return (
          <text key={`p-${h}-${i}`} x={x} y={y} fontSize={fontSize} fontWeight="600"
            fontFamily="sans-serif" fill="#fb923c" textAnchor="middle" dominantBaseline="middle">
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
        <text key={`sign-${h}`} x={pos.x} y={pos.y} fontSize="12" fontFamily="sans-serif"
          fill="rgba(253,230,138,0.65)" dominantBaseline="middle" textAnchor="middle" pointerEvents="none">
          {String(data.signIndex + 1).padStart(2, "0")}
        </text>
      );
    };

    return (
      <div style={{ width:"100%", maxWidth:"480px", margin:"0 auto" }}>
        <svg preserveAspectRatio="none" viewBox="0 0 480 480" width="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display:"block", background:"rgba(10,15,30,0.95)", borderRadius:"12px", border:"1.5px solid rgba(245,158,11,0.35)", boxShadow:"0 0 40px rgba(245,158,11,0.08)" }}>
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(245,158,11,0.04)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="480" height="480" fill="url(#bgGrad)" />
          <line x1="10"  y1="10"  x2="10"  y2="472" strokeWidth="1" stroke="rgba(245,158,11,0.55)" />
          <line x1="10"  y1="472" x2="472" y2="472" strokeWidth="1" stroke="rgba(245,158,11,0.55)" />
          <line x1="472" y1="472" x2="472" y2="10"  strokeWidth="1" stroke="rgba(245,158,11,0.55)" />
          <line x1="472" y1="10"  x2="10"  y2="10"  strokeWidth="1" stroke="rgba(245,158,11,0.55)" />
          <line x1="10"  y1="10"  x2="472" y2="472" strokeWidth="1" stroke="rgba(245,158,11,0.4)"  />
          <line x1="10"  y1="472" x2="472" y2="10"  strokeWidth="1" stroke="rgba(245,158,11,0.4)"  />
          <line x1="242" y1="10"  x2="472" y2="242" strokeWidth="1" stroke="rgba(245,158,11,0.55)" />
          <line x1="472" y1="242" x2="242" y2="472" strokeWidth="1" stroke="rgba(245,158,11,0.55)" />
          <line x1="242" y1="472" x2="10"  y2="242" strokeWidth="1" stroke="rgba(245,158,11,0.55)" />
          <line x1="10"  y1="242" x2="242" y2="10"  strokeWidth="1" stroke="rgba(245,158,11,0.55)" />
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(renderSign)}
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(renderPlanets)}
        </svg>
        {/* Planet legend — unchanged */}
        <div style={{ marginTop:"12px", display:"flex", flexWrap:"wrap", gap:"6px", justifyContent:"center" }}>
          {Object.entries(L.abbr).map(([en, short]) => (
            <span key={en} style={{ fontSize:"11px", padding:"2px 8px", borderRadius:"20px", background:"rgba(251,146,60,0.08)", color:"rgba(251,146,60,0.85)", border:"1px solid rgba(251,146,60,0.2)", fontFamily:"sans-serif" }}>
              {short} = {L.full[en]}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // ── PlanetaryPositions — same logic, updated card style ───────────────────
  const PlanetaryPositions = () => {
    const planets = kundaliData?.data?.planets || [];
    const icons = { Sun:SunImage, Moon:MoonImage, Mars:MarsImage, Mercury:MercuryImage, Jupiter:JupiterImage, Venus:VenusImage, Saturn:SaturnImage, Rahu:RahuImage, Ketu:KetuImage };
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {planets.map((planet, i) => (
          <div key={i} className="p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
            style={glass()}>
            <div className="flex items-center gap-3 mb-4" style={{ minHeight:"48px" }}>
              <img src={icons[planet.name]} alt={planet.name}
                style={{ width:"40px", height:"40px", objectFit:"contain", flexShrink:0 }} />
              <h3 className="text-sm font-light tracking-wider" style={{ color:COLORS.amber.text }}>
                {lang === "hi" ? L.full[planet.name] : planet.name}
              </h3>
              {planet.retrograde && (
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-light"
                  style={{ background:COLORS.rose.bg, color:COLORS.rose.text, border:`1px solid ${COLORS.rose.border}` }}>
                  ℞
                </span>
              )}
            </div>
            <div style={{ height:"1px", background:r(0.07), marginBottom:"12px" }} />
            <div className="space-y-2">
              {[
                [lang==="hi"?"राशि":"Sign",          lang==="hi"?L.signs[planet.signIndex]:planet.sign],
                [lang==="hi"?"भाव":"House",           planet.house],
                [lang==="hi"?"राशि स्वामी":"Sign Lord", getSignLord(planet.signLord)],
                [lang==="hi"?"अंश":"Degree",          planet.degree?`${planet.degree}°`:null],
                [lang==="hi"?"नक्षत्र":"Nakshatra",   getNakshatraDisplay(planet.nakshatra)],
                [lang==="hi"?"नक्षत्र पद":"Nakshatra Pada", planet.degree?`${planet.nakshatraPada}°`:null],
                [lang==="hi"?"नक्षत्र स्वामी":"Nakshatra Lord", getNakLord(planet.nakshatraLord)],
              ].filter(([,v]) => v).map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs font-light" style={{ color:r(0.4) }}>{label}</span>
                  <span className="text-xs font-light" style={{ color:r(0.82) }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── HouseDetails — same logic, updated card style ─────────────────────────
  const HouseDetails = () => {
    const houseNames = {
      1:lang==="hi"?"लग्न — स्वयं":"Lagna — Self & Body",
      2:lang==="hi"?"धन — संपत्ति":"Dhana — Wealth & Family",
      3:lang==="hi"?"सहज — भाई-बहन":"Sahaja — Siblings & Courage",
      4:lang==="hi"?"सुख — घर":"Sukha — Home & Mother",
      5:lang==="hi"?"पुत्र — संतान":"Putra — Children & Mind",
      6:lang==="hi"?"रिपु — शत्रु":"Ripu — Enemies & Health",
      7:lang==="hi"?"कलत्र — जीवनसाथी":"Kalatra — Spouse & Partners",
      8:lang==="hi"?"आयु — रहस्य":"Ayur — Longevity & Occult",
      9:lang==="hi"?"भाग्य — धर्म":"Bhagya — Fortune & Dharma",
      10:lang==="hi"?"कर्म — व्यवसाय":"Karma — Career & Fame",
      11:lang==="hi"?"लाभ — मित्र":"Labha — Gains & Friends",
      12:lang==="hi"?"व्यय — मोक्ष":"Vyaya — Losses & Moksha",
    };
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(house => {
          const planets  = getPlanetsInHouse(house);
          const signIdx  = getHouse(house)?.signIndex ?? 0;
          const signDisp = lang==="hi" ? L.signs[signIdx] : getSignInHouse(house);
          const planetsDisp = planets.map(p => lang==="hi" ? (L.full[p]??p) : p);
          return (
            <div key={house} className="p-5 rounded-xl" style={glass()}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-light tracking-wide" style={{ color:COLORS.amber.text }}>
                  {lang==="hi"?`भाव ${house}`:`House ${house}`}
                </span>
                <span className="text-xs font-light text-right leading-snug max-w-[160px]" style={{ color:r(0.35) }}>
                  {houseNames[house]}
                </span>
              </div>
              <div style={{ height:"1px", background:r(0.07), marginBottom:"10px" }} />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-light" style={{ color:r(0.4) }}>{lang==="hi"?"राशि":"Sign"}</span>
                  <span className="text-xs font-light" style={{ color:r(0.82) }}>{signDisp||"—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-light" style={{ color:r(0.4) }}>{lang==="hi"?"ग्रह":"Planets"}</span>
                  <span className="text-xs font-light text-right max-w-[55%]" style={{ color:COLORS.amber.text, opacity:0.85 }}>
                    {planetsDisp.length > 0 ? planetsDisp.join(", ") : lang==="hi"?"खाली":"Empty"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── BirthDetails — same logic, updated card style ─────────────────────────
  const BirthDetails = () => {
    const bd    = kundaliData?.data?.birth_details || {};
    const isHi  = lang === "hi";
    const fields = [
      [isHi?"पूरा नाम":"Full Name",         name||bd.name||"—"],
      [isHi?"जन्म तिथि":"Date of Birth",    birthDetails?.date||"—"],
      [isHi?"जन्म समय":"Time of Birth",     birthDetails?.time||"—"],
      [isHi?"जन्म स्थान":"Place of Birth",  birthDetails?.place||"—"],
      [isHi?"अक्षांश":"Latitude",           bd.latitude||"—"],
      [isHi?"देशांतर":"Longitude",          bd.longitude||"—"],
      [isHi?"अयनांश":"Ayanamsa",            `${bd.ayanamsaName||"Lahiri"} (${bd.ayanamsa||""}°)`],
    ];
    const lagnaSign = lang==="hi" ? L.signs[getHouse(1)?.signIndex??0] : getSignInHouse(1);
    const moonSign  = kundaliData?.data?.planets?.find(p => p.name==="Moon");
    const sunSign   = kundaliData?.data?.planets?.find(p => p.name==="Sun");

    return (
      <div className="space-y-5">
        {/* Birth info */}
        <div style={glass(COLORS.amber.border)}>
          <div className="px-6 py-4" style={{ borderBottom:`1px solid ${r(0.07)}` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color:r(0.3) }}>
              {isHi?"जन्म विवरण":"Birth Information"}
            </p>
            <h3 className="text-sm font-light tracking-wider" style={{ color:r(0.85) }}>
              {isHi?"जन्म की जानकारी":"Your Birth Details"}
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {fields.map(([label, value]) => (
              <div key={label} className="flex justify-between items-center p-3 rounded-xl"
                style={{ background:r(0.04), border:`1px solid ${r(0.07)}` }}>
                <span className="text-xs font-light" style={{ color:r(0.4) }}>{label}</span>
                <span className="text-xs font-light text-right max-w-[55%]" style={{ color:r(0.82) }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart summary */}
        <div style={glass()}>
          <div className="px-6 py-4" style={{ borderBottom:`1px solid ${r(0.07)}` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color:r(0.3) }}>
              {isHi?"कुंडली सारांश":"Chart Summary"}
            </p>
            <h3 className="text-sm font-light tracking-wider" style={{ color:r(0.85) }}>
              {isHi?"राशि एवं लग्न":"Signs & Ascendant"}
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label:isHi?"लग्न राशि":"Ascendant (Lagna)", value:lagnaSign,      sub:isHi?"उदय राशि":"Rising sign" },
              { label:isHi?"चंद्र राशि":"Moon Sign (Rashi)", value:isHi?L.signs[moonSign?.signIndex??0]:moonSign?.sign, sub:isHi?"भावनात्मक स्व":"Emotional self" },
              { label:isHi?"सूर्य राशि":"Sun Sign",          value:isHi?L.signs[sunSign?.signIndex??0]:sunSign?.sign,   sub:isHi?"मूल पहचान":"Core identity" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="text-center p-5 rounded-xl"
                style={{ background:COLORS.amber.bg, border:`1px solid ${COLORS.amber.border}` }}>
                <p className="text-[10px] tracking-wider uppercase mb-2" style={{ color:r(0.35) }}>{label}</p>
                <p className="text-lg font-light mb-1" style={{ color:r(0.9) }}>{value||"—"}</p>
                <p className="text-xs font-light" style={{ color:r(0.3) }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── Tabs config — UNCHANGED ───────────────────────────────────────────────
  const tabs = [
    { id:"chart",   label:lang==="hi"?"कुंडली":"Birth Chart", icon:"🔮" },
    { id:"planets", label:lang==="hi"?"ग्रह":"Planets",       icon:"🪐" },
    { id:"houses",  label:lang==="hi"?"भाव":"Houses",          icon:"🏠" },
    { id:"birth",   label:lang==="hi"?"विवरण":"Details",      icon:"📋" },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    // pageBg from theme.js — same as dashboard
    <div className="min-h-screen text-white relative overflow-hidden" style={pageBg}>

      {/* Same decorations as dashboard */}
      <Stars />
      <DecorativeElement />
      <ZodiacRing />
      <AmbientGlow />

      {/* Same sidebar as dashboard */}
      <UserSidebar
        active=""
        setActive={(tab) => navigate("/user-dashboard", { state: { tab } })}
        sideOpen={sideOpen}
        setSideOpen={setSideOpen}
        onGenerate={() => navigate("/generate-kundali")}
        onLogout={() => { logout(); navigate("/"); }}
        user={sidebarUser}
      />

      {/* Main — same lg:pl-64 as dashboard */}
      <div className="lg:pl-64 min-h-screen flex flex-col">

        {/* Topbar — same as GenerateKundali */}
        <header className="sticky top-0 z-20 px-5 md:px-7 py-3.5 flex items-center justify-between"
          style={{ background:"rgba(15,23,42,0.85)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:`1px solid ${r(0.08)}` }}>

          {/* Left — hamburger + breadcrumb */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => setSideOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-light tracking-[0.2em] uppercase">
              <button onClick={() => navigate("/user-dashboard")}
                className="transition-opacity hover:opacity-100" style={{ color:r(0.3) }}>
                Dashboard
              </button>
              <span style={{ color:r(0.15) }}>·</span>
              <button onClick={() => navigate("/generate-kundali")}
                className="transition-opacity hover:opacity-100" style={{ color:r(0.3) }}>
                Kundali
              </button>
              <span style={{ color:r(0.15) }}>·</span>
              <span style={{ color:COLORS.amber.text }}>
                {name ? `${name}'s Chart` : "Birth Chart"}
              </span>
            </div>
          </div>

          {/* Right — language toggle + new chart + avatar */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="flex items-center gap-1 p-1 rounded-full"
              style={{ background:r(0.05), border:`1px solid ${r(0.1)}` }}>
              {["en","hi"].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className="px-3 py-1 rounded-full text-xs font-light tracking-wider transition-all duration-200"
                  style={lang===l
                    ? { background:COLORS.amber.text, color:"#000" }
                    : { color:r(0.4) }}>
                  {l==="en"?"EN":"हिं"}
                </button>
              ))}
            </div>

            <button onClick={() => navigate("/generate-kundali")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-light tracking-widest uppercase transition-all hover:opacity-80"
              style={{ background:r(0.05), border:`1px solid ${r(0.1)}`, color:r(0.55) }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>

            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-light"
              style={{ background:COLORS.amber.bg, border:`1px solid ${COLORS.amber.border}`, color:COLORS.amber.text }}>
              {sidebarUser.initial}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-5 md:px-7 py-8 relative z-10 w-full max-w-6xl mx-auto">

          {/* Page title */}
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>
              {lang==="hi"?"जन्म कुंडली":"Janam Kundali"}
            </p>
            <h1 className="text-2xl md:text-3xl font-light tracking-wider" style={{ color:r(0.92) }}>
              {name
                ? lang==="hi" ? `${name} ` : <>{name}'s <span style={{ color:COLORS.amber.text }}>Kundali</span></>
                : <span style={{ color:COLORS.amber.text }}>Your Kundali</span>
              }
            </h1>
            {birthDetails && (
              <p className="text-sm font-light mt-1.5 tracking-wide" style={{ color:r(0.4) }}>
                {birthDetails.date} · {birthDetails.time} · {birthDetails.place}
              </p>
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-7 flex-wrap">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-light tracking-wider transition-all duration-200"
                style={activeTab===tab.id
                  ? { background:COLORS.amber.text, color:"#000", boxShadow:`0 4px 15px ${COLORS.amber.glow}` }
                  : { background:r(0.04), border:`1px solid ${r(0.1)}`, color:r(0.55) }
                }>
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div>

            {/* Birth Chart tab */}
            {activeTab==="chart" && (
              <div style={glass()}>
                <div className="px-6 py-4" style={{ borderBottom:`1px solid ${r(0.07)}` }}>
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color:r(0.3) }}>
                    {lang==="hi"?"उत्तर भारतीय":"North Indian"}
                  </p>
                  <h3 className="text-sm font-light tracking-wider" style={{ color:r(0.85) }}>
                    {L.chartTitle}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex justify-center mb-7">
                    <VedicChart />
                  </div>
                  {/* Summary strip */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      [lang==="hi"?"लग्न":"Lagna",        lang==="hi"?L.signs[getHouse(1)?.signIndex??0]:getSignInHouse(1)],
                      [lang==="hi"?"कुंडली":"Chart Type",  lang==="hi"?"राशि (D-1)":"Rasi (D-1)"],
                      [lang==="hi"?"अयनांश":"Ayanamsa",    kundaliData?.data?.birth_details?.ayanamsaName||"Lahiri"],
                    ].map(([label,value]) => (
                      <div key={label} className="text-center p-4 rounded-xl"
                        style={{ background:COLORS.amber.bg, border:`1px solid ${COLORS.amber.border}` }}>
                        <p className="text-[10px] tracking-wider uppercase mb-1.5" style={{ color:r(0.35) }}>{label}</p>
                        <p className="text-sm font-light" style={{ color:r(0.85) }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Planets tab */}
            {activeTab==="planets" && (
              <div>
                <div className="mb-5">
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color:r(0.3) }}>
                    {lang==="hi"?"नवग्रह":"Nine Planets"}
                  </p>
                  <h3 className="text-base font-light tracking-wider" style={{ color:r(0.85) }}>
                    {lang==="hi"?"ग्रह स्थिति":"Planetary Positions"}
                  </h3>
                </div>
                <PlanetaryPositions />
              </div>
            )}

            {/* Houses tab */}
            {activeTab==="houses" && (
              <div>
                <div className="mb-5">
                  <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color:r(0.3) }}>
                    {lang==="hi"?"द्वादश भाव":"Twelve Houses"}
                  </p>
                  <h3 className="text-base font-light tracking-wider" style={{ color:r(0.85) }}>
                    {lang==="hi"?"भाव विश्लेषण":"House Analysis"}
                  </h3>
                </div>
                <HouseDetails />
              </div>
            )}

            {/* Details tab */}
            {activeTab==="birth" && <BirthDetails />}

          </div>

          {/* Footer note */}
          <div className="mt-10 text-center">
            <p className="text-xs font-light" style={{ color:r(0.2) }}>
              {lang==="hi"
                ? "वैदिक ज्योतिष • लाहिरी अयनांश • केवल शैक्षिक उद्देश्य के लिए"
                : "Vedic Astrology · Lahiri Ayanamsa · For educational purposes only"}
            </p>
          </div>

        </main>

        {/* Footer — same as dashboard */}
        <footer className="px-7 py-4" style={{ borderTop:`1px solid ${r(0.07)}` }}>
          <p className="text-[10px] font-light tracking-[0.3em] uppercase text-center" style={{ color:r(0.15) }}>
            Kundali Marg · Vedic Astrology · For Educational Purposes Only
          </p>
        </footer>
      </div>

      <BottomDecorativeElement />
    </div>
  );
};

export default ShowKundali;