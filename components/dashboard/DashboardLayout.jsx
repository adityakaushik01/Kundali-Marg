// Reusable layout wrapper. Handles sidebar + topbar + main content.
// Use this in User, Admin, and Astrologer dashboards.
//
// Props:
//   sidebar       node    — <DashboardSidebar .../> instance
//   active        string  — current tab id (for breadcrumb)
//   navLabel      string  — display name of active tab
//   children      node    — page content
//   onNewChart    fn      — topbar "New Chart" button
//   onNotifications fn    — bell icon click
//   unreadCount   number  — notification badge count
//   user          object  — { name, initial } for topbar avatar
//   onProfile     fn      — avatar click
//   sideOpen      bool    — mobile sidebar state
//   setSideOpen   fn      — toggle mobile sidebar

import Stars from "../decorations/Stars";
import AmbientGlow from "../decorations/AmbientGlow";
import ZodiacRing from "../decorations/ZodiacRing";
import { pageBg } from "./theme";

const DashboardLayout = ({
  sidebar,
  active,
  navLabel,
  children,
  onNewChart,
  onNotifications,
  unreadCount        = 0,
  user               = { name:"Aditya Kaushik", initial:"A" },
  onProfile,
  sideOpen,
  setSideOpen,
  topbarAccentColor  = "#f59e0b",   // amber for User, teal for Astrologer, violet for Admin
}) => {
  const ac  = topbarAccentColor;
  const acA = (o) => `${ac}${Math.round(o*255).toString(16).padStart(2,"0")}`;
  return (
  <div className="min-h-screen relative" style={pageBg}>

    {/* Background decorations */}
    <Stars />
    <AmbientGlow />
    <ZodiacRing />

    {/* Sidebar (passed as prop — different per role) */}
    {sidebar}

    {/* Main content area */}
    <div className="lg:pl-64 min-h-screen flex flex-col">

      {/* ── Topbar ── */}
      <header
        className="sticky top-0 z-20 px-5 md:px-7 py-3.5 flex items-center justify-between"
        style={{
          background:           "rgba(10,18,36,0.88)",
          backdropFilter:       "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom:         "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Left: hamburger + breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden transition-colors"
            style={{ color:"rgba(255,255,255,0.45)" }}
            onClick={() => setSideOpen?.(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-light tracking-[0.2em] uppercase">
            <span style={{ color:"rgba(255,255,255,0.25)" }}>Dashboard</span>
            <span style={{ color:"rgba(255,255,255,0.15)" }}>·</span>
            <span style={{ color:`${ac}bf` }}>
              {navLabel || (active ? active.charAt(0).toUpperCase() + active.slice(1) : "Overview")}
            </span>
          </div>
        </div>

        {/* Right: bell + new chart + avatar */}
        <div className="flex items-center gap-2">

          {/* Notification bell */}
          <button
            onClick={onNotifications}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-white/[0.05]"
            style={{ border:"1px solid rgba(255,255,255,0.09)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-semibold"
                style={{ background:ac, color:"#000" }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* New chart */}
          {onNewChart && (
            <button
              onClick={onNewChart}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-light tracking-widest uppercase transition-all hover:opacity-90"
              style={{ background:`${ac}1a`, border:`1px solid ${ac}38`, color:ac }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              New Chart
            </button>
          )}

          {/* Avatar */}
          <button
            onClick={onProfile}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-light transition-all hover:opacity-80"
            style={{ background:`${ac}1f`, border:`1px solid ${ac}40`, color:ac }}
          >
            {user.initial}
          </button>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 px-5 md:px-7 py-7 relative z-10 w-full max-w-7xl mx-auto">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="px-7 py-4" style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-[10px] font-light tracking-[0.3em] uppercase text-center"
          style={{ color:"rgba(255,255,255,0.12)" }}>
          Kundali Marg · Vedic Astrology · For Educational Purposes Only
        </p>
      </footer>
    </div>
  </div>
  );
};

export default DashboardLayout;