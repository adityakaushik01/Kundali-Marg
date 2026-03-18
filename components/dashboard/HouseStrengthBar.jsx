// components/dashboard/HouseStrengthBar.jsx
// Bar chart showing planet count per house.
// Uses recharts BarChart.
//
// Props:
//   data   array  — [{ house:1, name:"Lagna", planets:2, sign:"Cancer" }, ...]

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import ChartCard from "./ChartCard";

const DEFAULT_DATA = [
  { house:1,  name:"Lagna",   planets:1, sign:"Cancer"      },
  { house:2,  name:"Dhana",   planets:0, sign:"Leo"         },
  { house:3,  name:"Sahaja",  planets:0, sign:"Virgo"       },
  { house:4,  name:"Sukha",   planets:0, sign:"Libra"       },
  { house:5,  name:"Putra",   planets:0, sign:"Scorpio"     },
  { house:6,  name:"Ripu",    planets:0, sign:"Sagittarius" },
  { house:7,  name:"Kalatra", planets:1, sign:"Capricorn"   },
  { house:8,  name:"Ayur",    planets:1, sign:"Aquarius"    },
  { house:9,  name:"Bhagya",  planets:2, sign:"Pisces"      },
  { house:10, name:"Karma",   planets:4, sign:"Aries"       },
  { house:11, name:"Labha",   planets:0, sign:"Taurus"      },
  { house:12, name:"Vyaya",   planets:0, sign:"Gemini"      },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background:     "rgba(10,15,30,0.95)",
      border:         "1px solid rgba(255,255,255,0.1)",
      borderRadius:   "10px",
      padding:        "10px 14px",
      backdropFilter: "blur(12px)",
    }}>
      <p className="text-xs font-light" style={{ color: "rgba(245,158,11,0.9)" }}>
        House {d.house} — {d.name}
      </p>
      <p className="text-xs font-light mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>
        {d.sign}
      </p>
      <p className="text-xs font-light mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
        {d.planets} planet{d.planets !== 1 ? "s" : ""}
      </p>
    </div>
  );
};

const HouseStrengthBar = ({ data = DEFAULT_DATA }) => (
  <ChartCard title="House Occupancy" subtitle="12 Houses">
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} barSize={14} margin={{ top:4, right:4, left:-28, bottom:0 }}>
        <XAxis
          dataKey="house"
          tick={{ fill:"rgba(255,255,255,0.35)", fontSize:10, fontWeight:300 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill:"rgba(255,255,255,0.25)", fontSize:10 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill:"rgba(255,255,255,0.03)" }} />
        <Bar dataKey="planets" radius={[4,4,0,0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.planets > 0 ? "rgba(245,158,11,0.7)" : "rgba(255,255,255,0.07)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>

    {/* Legend */}
    <div className="flex items-center gap-4 mt-3">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-2 rounded-sm" style={{ background:"rgba(245,158,11,0.7)" }} />
        <span className="text-[10px] font-light" style={{ color:"rgba(255,255,255,0.4)" }}>Occupied</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-2 rounded-sm" style={{ background:"rgba(255,255,255,0.07)" }} />
        <span className="text-[10px] font-light" style={{ color:"rgba(255,255,255,0.4)" }}>Empty</span>
      </div>
    </div>
  </ChartCard>
);

export default HouseStrengthBar;