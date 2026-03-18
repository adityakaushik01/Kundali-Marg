// components/dashboard/TransitCard.jsx
// Shows today's planetary positions (transits).
// Useful for User and Astrologer dashboards.
//
// Props:
//   transits   array   — [{ planet, sign, nakshatra, retrograde, icon }]

import ChartCard from "./ChartCard";

const DEFAULT_TRANSITS = [
  { planet:"Sun",     icon:"☀️", sign:"Pisces",      nakshatra:"Revati",    retrograde:false },
  { planet:"Moon",    icon:"🌙", sign:"Gemini",      nakshatra:"Ardra",     retrograde:false },
  { planet:"Mars",    icon:"♂",  sign:"Aquarius",    nakshatra:"Shatabhisha",retrograde:false },
  { planet:"Mercury", icon:"☿",  sign:"Pisces",      nakshatra:"Uttara Bhadrapada",retrograde:true },
  { planet:"Jupiter", icon:"♃",  sign:"Taurus",      nakshatra:"Rohini",    retrograde:false },
  { planet:"Venus",   icon:"♀",  sign:"Aquarius",    nakshatra:"Dhanishtha",retrograde:false },
  { planet:"Saturn",  icon:"♄",  sign:"Aquarius",    nakshatra:"Shatabhisha",retrograde:false },
  { planet:"Rahu",    icon:"☊",  sign:"Pisces",      nakshatra:"Revati",    retrograde:true  },
  { planet:"Ketu",    icon:"☋",  sign:"Virgo",       nakshatra:"Chitra",    retrograde:true  },
];

const TransitCard = ({ transits = DEFAULT_TRANSITS }) => (
  <ChartCard title="Today's Transits" subtitle="Current Planetary Positions">
    <div className="space-y-2">
      {transits.map((t, i) => (
        <div key={i}
          className="flex items-center gap-3 py-2 px-3 rounded-xl transition-colors hover:bg-white/[0.03]"
          style={{ border:"1px solid transparent" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
        >
          {/* Planet icon */}
          <span style={{ fontSize:"15px", width:"20px", textAlign:"center" }}>{t.icon}</span>

          {/* Planet name */}
          <p className="text-sm font-light w-16 flex-shrink-0" style={{ color:"rgba(255,255,255,0.75)" }}>
            {t.planet}
          </p>

          {/* Sign */}
          <div className="flex-1">
            <span className="text-xs font-light" style={{ color:"rgba(255,255,255,0.55)" }}>{t.sign}</span>
            <span className="text-[10px] font-light ml-1.5" style={{ color:"rgba(255,255,255,0.25)" }}>
              {t.nakshatra}
            </span>
          </div>

          {/* Retrograde badge */}
          {t.retrograde && (
            <span className="text-[10px] px-1.5 py-0.5 rounded font-light flex-shrink-0"
              style={{ background:"rgba(251,113,133,0.1)", color:"#fb7185", border:"1px solid rgba(251,113,133,0.2)" }}>
              ℞
            </span>
          )}
        </div>
      ))}
    </div>
  </ChartCard>
);

export default TransitCard;