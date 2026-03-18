// components/dashboard/DashaTimeline.jsx
// Visual Vimshottari Dasha timeline.
// Shows Mahadasha periods as proportional bars + current position marker.
//
// Props:
//   dashas       array   — dasha period objects
//   currentYear  number  — current year to place the marker

import ChartCard from "./ChartCard";

const DEFAULT_DASHAS = [
  { planet:"Ketu",    years:7,  start:2000, end:2007, color:"#fb7185" },
  { planet:"Venus",   years:20, start:2007, end:2027, color:"#f59e0b" },
  { planet:"Sun",     years:6,  start:2027, end:2033, color:"#fbbf24" },
  { planet:"Moon",    years:10, start:2033, end:2043, color:"#38bdf8" },
  { planet:"Mars",    years:7,  start:2043, end:2050, color:"#fb7185" },
  { planet:"Rahu",    years:18, start:2050, end:2068, color:"#a78bfa" },
  { planet:"Jupiter", years:16, start:2068, end:2084, color:"#2dd4bf" },
  { planet:"Saturn",  years:19, start:2084, end:2103, color:"#94a3b8" },
  { planet:"Mercury", years:17, start:2103, end:2120, color:"#34d399" },
];

// Current dasha antardasha (sub-periods within Venus Mahadasha)
const SUB_PERIODS = [
  { planet:"Venus",   end:"Jun 2023" },
  { planet:"Sun",     end:"Oct 2024" },
  { planet:"Moon",    end:"Jun 2026", current:true },
  { planet:"Mars",    end:"Aug 2027" },
  { planet:"Rahu",    end:"Aug 2030" },
];

const TOTAL_YEARS = 120;
const LIFE_START  = 2000;

const DashaTimeline = ({
  dashas      = DEFAULT_DASHAS,
  subPeriods  = SUB_PERIODS,
  currentYear = new Date().getFullYear(),
}) => {
  const currentPct = Math.min(100, ((currentYear - LIFE_START) / TOTAL_YEARS) * 100);
  const currentDasha = dashas.find(d => currentYear >= d.start && currentYear < d.end);

  return (
    <ChartCard title="Vimshottari Dasha" subtitle="120 Year Life Cycle">

      {/* Current dasha callout */}
      {currentDasha && (
        <div className="flex items-center gap-3 mb-5 p-3 rounded-xl"
          style={{ background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.15)" }}>
          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background:currentDasha.color }} />
          <div>
            <p className="text-xs font-light" style={{ color:"rgba(255,255,255,0.75)" }}>
              Currently in <span style={{ color:currentDasha.color }}>{currentDasha.planet} Mahadasha</span>
            </p>
            <p className="text-[10px] font-light mt-0.5" style={{ color:"rgba(255,255,255,0.3)" }}>
              {currentDasha.start} – {currentDasha.end} · {currentDasha.years} years
            </p>
          </div>
        </div>
      )}

      {/* Main timeline bar */}
      <div className="relative mb-6">
        <div className="flex w-full h-8 rounded-xl overflow-hidden" style={{ gap:"1px" }}>
          {dashas.map((dasha, i) => {
            const widthPct = (dasha.years / TOTAL_YEARS) * 100;
            const isCurrent = currentYear >= dasha.start && currentYear < dasha.end;
            return (
              <div
                key={i}
                title={`${dasha.planet}: ${dasha.start}–${dasha.end}`}
                className="relative flex items-center justify-center transition-opacity hover:opacity-100 cursor-pointer"
                style={{
                  width:      `${widthPct}%`,
                  background: isCurrent ? dasha.color : `${dasha.color}40`,
                  opacity:    isCurrent ? 1 : 0.7,
                  flexShrink: 0,
                }}
              >
                {widthPct > 8 && (
                  <span className="text-[9px] font-light tracking-wide text-white/80 truncate px-1">
                    {dasha.planet.slice(0,3)}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Current year marker */}
        <div
          className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
          style={{ left:`${currentPct}%`, transform:"translateX(-50%)" }}
        >
          <div className="w-0.5 h-8 rounded-full" style={{ background:"#ffffff" }} />
          <div className="mt-1 text-[9px] font-light px-1.5 py-0.5 rounded"
            style={{ background:"rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.8)", whiteSpace:"nowrap" }}>
            {currentYear}
          </div>
        </div>
      </div>

      {/* Dasha labels */}
      <div className="flex flex-wrap gap-2 mb-6">
        {dashas.map((dasha, i) => {
          const isCurrent = currentYear >= dasha.start && currentYear < dasha.end;
          return (
            <span key={i}
              className="text-[10px] px-2 py-0.5 rounded-full font-light"
              style={{
                background: isCurrent ? `${dasha.color}20` : "rgba(255,255,255,0.04)",
                color:      isCurrent ? dasha.color : "rgba(255,255,255,0.4)",
                border:     isCurrent ? `1px solid ${dasha.color}40` : "1px solid rgba(255,255,255,0.07)",
              }}>
              {dasha.planet} ({dasha.years}y)
            </span>
          );
        })}
      </div>

      {/* Sub-periods */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"16px" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color:"rgba(255,255,255,0.3)" }}>
          Antardasha — Sub Periods
        </p>
        <div className="space-y-2">
          {subPeriods.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg"
              style={{
                background: s.current ? "rgba(245,158,11,0.07)" : "transparent",
                border:     s.current ? "1px solid rgba(245,158,11,0.15)" : "1px solid transparent",
              }}>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full"
                  style={{ background: s.current ? "#f59e0b" : "rgba(255,255,255,0.2)" }} />
                <span className="text-xs font-light"
                  style={{ color: s.current ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)" }}>
                  {s.planet} Antardasha
                </span>
                {s.current && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded tracking-wider"
                    style={{ background:"rgba(245,158,11,0.1)", color:"#f59e0b", border:"1px solid rgba(245,158,11,0.2)" }}>
                    CURRENT
                  </span>
                )}
              </div>
              <span className="text-[11px] font-light" style={{ color:"rgba(255,255,255,0.3)" }}>
                until {s.end}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
};

export default DashaTimeline;