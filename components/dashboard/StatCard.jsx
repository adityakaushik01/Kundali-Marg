// Reusable stat card. Use in User, Admin, Astrologer dashboards.
//
// Props:
//   label     string   — "Total Charts"
//   value     string   — "24"
//   sub       string   — "Generated this month"
//   color     string   — key from COLORS: "amber" | "teal" | "violet" | "rose" | "sky"
//   icon      string   — emoji or text symbol
//   onClick   fn       — optional click handler

import { COLORS } from "./theme";

const StatCard = ({ label, value, sub, color = "amber", icon, onClick }) => {
  const c = COLORS[color] ?? COLORS.amber;

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl relative overflow-hidden transition-all duration-200 ${onClick ? "cursor-pointer hover:scale-[1.02]" : ""}`}
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-5 -right-5 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: c.glow, filter: "blur(20px)" }}
      />

      <div className="relative z-10">
        {/* Icon + value row */}
        <div className="flex items-start justify-between mb-2">
          {icon && (
            <span className="text-xl leading-none" style={{ color: c.text }}>{icon}</span>
          )}
          <p className="text-3xl font-light leading-none" style={{ color: c.text }}>
            {value}
          </p>
        </div>

        {/* Label */}
        <p className="text-sm font-light tracking-wide" style={{ color: "rgba(255,255,255,0.75)" }}>
          {label}
        </p>

        {/* Sub */}
        {sub && (
          <p className="text-xs font-light mt-0.5 tracking-wider" style={{ color: "rgba(255,255,255,0.50)" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;