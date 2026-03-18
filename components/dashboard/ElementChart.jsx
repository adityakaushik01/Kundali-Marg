// components/dashboard/ElementChart.jsx
// Donut chart showing elemental balance of planets.
// Uses recharts PieChart.
//
// Props:
//   data   array  — [{ element:"Fire", count:3, color:"#f59e0b" }, ...]
//                   defaults to demo data if not provided

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ChartCard from "./ChartCard";

const DEFAULT_DATA = [
  { element: "Fire",  count: 4, color: "#f59e0b", signs: "Aries, Leo, Sagittarius"    },
  { element: "Earth", count: 2, color: "#2dd4bf", signs: "Taurus, Virgo, Capricorn"   },
  { element: "Air",   count: 2, color: "#a78bfa", signs: "Gemini, Libra, Aquarius"    },
  { element: "Water", count: 1, color: "#38bdf8", signs: "Cancer, Scorpio, Pisces"     },
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
      <p className="text-sm font-light" style={{ color: d.color }}>{d.element}</p>
      <p className="text-xs font-light mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
        {d.count} planet{d.count !== 1 ? "s" : ""}
      </p>
      <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{d.signs}</p>
    </div>
  );
};

const CustomLegend = ({ data }) => (
  <div className="flex flex-wrap justify-center gap-3 mt-2">
    {data.map(d => (
      <div key={d.element} className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
        <span className="text-xs font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
          {d.element}
        </span>
        <span className="text-xs font-light" style={{ color: "rgba(255,255,255,0.3)" }}>
          {d.count}
        </span>
      </div>
    ))}
  </div>
);

const ElementChart = ({ data = DEFAULT_DATA }) => {
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <ChartCard title="Element Balance" subtitle="Planetary Distribution">
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="element"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} opacity={0.85} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-light" style={{ color: "rgba(255,255,255,0.85)" }}>{total}</p>
          <p className="text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>PLANETS</p>
        </div>
      </div>

      <CustomLegend data={data} />
    </ChartCard>
  );
};

export default ElementChart;