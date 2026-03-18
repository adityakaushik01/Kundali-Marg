// components/dashboard/RecentChartsTable.jsx
// List of recently generated / saved kundali charts.
// Reusable — works for User, Admin, Astrologer views.
//
// Props:
//   charts      array   — chart objects
//   onViewAll   fn      — "view all" button handler
//   onView      fn      — row click handler (chart) => void
//   showOwner   bool    — show owner column (for Admin/Astrologer)
//   limit       number  — max rows to show (default 5)

import ChartCard from "./ChartCard";

const DEFAULT_CHARTS = [
  { id:1, name:"Aditya Kaushik", dob:"06 Apr 2000", time:"12:54 PM", place:"Etawah, UP",  lagna:"Cancer",    dasha:"Sun",    isSelf:true  },
  { id:2, name:"Priya Sharma",   dob:"14 Jan 1995", time:"08:30 AM", place:"Delhi",       lagna:"Scorpio",   dasha:"Moon",   isSelf:false },
  { id:3, name:"Rohan Mehta",    dob:"22 Jul 1988", time:"06:15 PM", place:"Mumbai, MH",  lagna:"Capricorn", dasha:"Saturn", isSelf:false },
  { id:4, name:"Ananya Singh",   dob:"03 Mar 2002", time:"11:20 AM", place:"Bangalore",   lagna:"Virgo",     dasha:"Rahu",   isSelf:false },
];

const RecentChartsTable = ({
  charts    = DEFAULT_CHARTS,
  onViewAll,
  onView,
  showOwner = false,
  limit     = 5,
}) => {
  const visible = charts.slice(0, limit);

  const action = onViewAll && (
    <button onClick={onViewAll}
      className="text-[11px] font-light tracking-wider transition-opacity hover:opacity-100"
      style={{ color:"rgba(245,158,11,0.65)" }}>
      View all →
    </button>
  );

  return (
    <ChartCard title="Recent Charts" subtitle="Kundali Library" action={action} noPad>
      <div>
        {visible.map((chart, i) => (
          <div
            key={chart.id}
            onClick={() => onView?.(chart)}
            className={`px-6 py-4 flex items-center gap-4 transition-colors ${onView ? "cursor-pointer hover:bg-white/[0.02]" : ""} group`}
            style={{ borderBottom: i < visible.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
          >
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-light"
              style={{
                background: chart.isSelf ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.05)",
                border:     chart.isSelf ? "1px solid rgba(245,158,11,0.25)" : "1px solid rgba(255,255,255,0.1)",
                color:      chart.isSelf ? "#f59e0b" : "rgba(255,255,255,0.5)",
              }}
            >
              {chart.name.charAt(0)}
            </div>

            {/* Name + place */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-light truncate" style={{ color:"rgba(255,255,255,0.82)" }}>
                  {chart.name}
                </p>
                {chart.isSelf && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded tracking-wider flex-shrink-0"
                    style={{ background:"rgba(245,158,11,0.1)", color:"#f59e0b", border:"1px solid rgba(245,158,11,0.2)" }}>
                    YOU
                  </span>
                )}
              </div>
              <p className="text-xs font-light" style={{ color:"rgba(255,255,255,0.3)" }}>
                {chart.dob} · {chart.place}
              </p>
            </div>

            {/* Lagna badge */}
            <div className="text-right flex-shrink-0">
              <span className="text-xs px-2.5 py-1 rounded-lg font-light"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color:      "rgba(255,255,255,0.55)",
                  border:     "1px solid rgba(255,255,255,0.09)",
                }}>
                {chart.lagna}
              </span>
              <p className="text-[10px] font-light mt-1" style={{ color:"rgba(255,255,255,0.25)" }}>
                {chart.dasha} Dasha
              </p>
            </div>

            {/* Arrow */}
            {onView && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"
                className="flex-shrink-0 group-hover:stroke-amber-500/40 transition-colors">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            )}
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

export default RecentChartsTable;