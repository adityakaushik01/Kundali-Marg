// components/dashboard/NotificationsFeed.jsx
// Notification list. Reusable across all dashboard types.
//
// Props:
//   notifications  array   — notification objects
//   onMarkAll      fn      — mark all as read
//   onMarkOne      fn      — (id) => mark one as read
//   limit          number  — max items shown (default all)

import ChartCard from "./ChartCard";

const DEFAULT_NOTES = [
  { id:1, title:"Mercury goes Retrograde",  desc:"Apr 1–25. Avoid signing contracts.",        time:"2h ago", read:false, icon:"☿"  },
  { id:2, title:"Sun Dasha continues",       desc:"Focus on career and authority until 2026.", time:"1d ago", read:false, icon:"☀️" },
  { id:3, title:"Auspicious day tomorrow",   desc:"Siddha Yoga — great for new beginnings.",  time:"2d ago", read:false, icon:"✦"  },
  { id:4, title:"Kundali generated",         desc:"Ananya Singh's chart is ready.",            time:"3d ago", read:true,  icon:"🔮" },
  { id:5, title:"Full Moon in Virgo",        desc:"Activates your 3rd house of communication.",time:"5d ago", read:true,  icon:"🌕" },
];

const NotificationsFeed = ({
  notifications = DEFAULT_NOTES,
  onMarkAll,
  onMarkOne,
  limit,
}) => {
  const visible = limit ? notifications.slice(0, limit) : notifications;
  const unread  = notifications.filter(n => !n.read).length;

  const action = onMarkAll && unread > 0 && (
    <button onClick={onMarkAll}
      className="text-[11px] font-light tracking-wider"
      style={{ color:"rgba(245,158,11,0.65)" }}>
      Mark all read
    </button>
  );

  return (
    <ChartCard title={`Notifications${unread > 0 ? ` (${unread})` : ""}`} subtitle="Inbox" action={action} noPad>
      <div>
        {visible.map((note, i) => (
          <div
            key={note.id}
            onClick={() => onMarkOne?.(note.id)}
            className={`px-6 py-4 flex items-start gap-4 transition-colors ${onMarkOne ? "cursor-pointer hover:bg-white/[0.02]" : ""}`}
            style={{
              borderBottom: i < visible.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              opacity:       note.read ? 0.5 : 1,
            }}
          >
            {/* Icon */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: !note.read ? "rgba(245,158,11,0.08)" : "rgba(255,255,255,0.04)",
                border:     !note.read ? "1px solid rgba(245,158,11,0.15)" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span style={{ fontSize:"14px" }}>{note.icon}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-light leading-snug"
                  style={{ color: !note.read ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)" }}>
                  {note.title}
                </p>
                <span className="text-[10px] font-light flex-shrink-0 mt-0.5"
                  style={{ color:"rgba(255,255,255,0.2)" }}>
                  {note.time}
                </span>
              </div>
              <p className="text-xs font-light mt-1 leading-relaxed"
                style={{ color:"rgba(255,255,255,0.35)" }}>
                {note.desc}
              </p>
            </div>

            {/* Unread dot */}
            {!note.read && (
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                style={{ background:"#f59e0b" }} />
            )}
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

export default NotificationsFeed;