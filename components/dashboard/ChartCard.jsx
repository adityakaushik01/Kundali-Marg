// components/dashboard/ChartCard.jsx
// Reusable card wrapper for any chart or data section.
//
// Props:
//   title     string   — card heading
//   subtitle  string   — optional small label above title
//   action    node     — optional JSX for top-right (button, link)
//   children  node     — chart content
//   noPad     bool     — remove inner padding (for full-bleed charts)

import { glass } from "./theme";

const ChartCard = ({ title, subtitle, action, children, noPad = false }) => (
  <div style={glass()}>
    {/* Header */}
    <div
      className="px-6 py-4 flex items-center justify-between"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div>
        {subtitle && (
          <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            {subtitle}
          </p>
        )}
        <h3 className="text-sm font-light tracking-wider"
          style={{ color: "rgba(255,255,255,0.85)" }}>
          {title}
        </h3>
      </div>
      {action && <div>{action}</div>}
    </div>

    {/* Content */}
    <div className={noPad ? "" : "p-6"}>
      {children}
    </div>
  </div>
);

export default ChartCard;