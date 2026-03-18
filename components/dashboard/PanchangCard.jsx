// components/dashboard/PanchangCard.jsx
// Today's Panchang (Hindu calendar data).
// Reusable — pass any panchang data.
//
// Props:
//   data     array   — [{ label, value, icon }]
//   date     string  — display date string

import ChartCard from "./ChartCard";

const DEFAULT_DATA = [
  { label:"Tithi",     value:"Panchami",  icon:"🌙", detail:"Shukla Paksha" },
  { label:"Nakshatra", value:"Ardra",     icon:"⭐", detail:"Rahu ruled"    },
  { label:"Yoga",      value:"Siddha",    icon:"✦",  detail:"Auspicious"   },
  { label:"Karana",    value:"Bava",      icon:"☀️", detail:"First half"   },
  { label:"Var",       value:"Wednesday", icon:"🪐", detail:"Mercury's day" },
  { label:"Moon",      value:"Gemini",    icon:"♊", detail:"Air sign"      },
  { label:"Sun",       value:"Pisces",    icon:"♓", detail:"Water sign"    },
  { label:"Rahu Kaal", value:"12:00–1:30",icon:"⚠️", detail:"Avoid starts"  },
];

const PanchangCard = ({ data = DEFAULT_DATA, date }) => (
  <ChartCard
    title="Today's Panchang"
    subtitle={date || new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long" })}
  >
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i}
          className="flex items-center justify-between py-1"
          style={{ borderBottom: i < data.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
        >
          <div className="flex items-center gap-2.5">
            <span style={{ fontSize:"13px", width:"18px", textAlign:"center" }}>{item.icon}</span>
            <div>
              <p className="text-xs font-light" style={{ color:"rgba(255,255,255,0.4)" }}>{item.label}</p>
              {item.detail && (
                <p className="text-[10px] font-light" style={{ color:"rgba(255,255,255,0.2)" }}>{item.detail}</p>
              )}
            </div>
          </div>
          <p className="text-sm font-light" style={{ color:"rgba(255,255,255,0.75)" }}>{item.value}</p>
        </div>
      ))}
    </div>
  </ChartCard>
);

export default PanchangCard;