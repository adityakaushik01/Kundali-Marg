// components/astrologer/Sidebar.jsx
// Astrologer dashboard sidebar — teal accent, client/reading focus.

import SidebarBase from "../dashboard/SidebarBase";

const ACCENT = { text:"#2dd4bf", bg:"rgba(45,212,191,0.1)", border:"rgba(45,212,191,0.22)", glow:"rgba(45,212,191,0.1)" };
const I = (d) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;

const NAV = [
  { id:"overview",  label:"Overview",        icon:I("M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z M9 21V12h6v9") },
  { id:"clients",   label:"My Clients",      icon:I("M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75") },
  { id:"readings",  label:"Readings",        icon:I("M12 2a10 10 0 1 0 10 10H12V2z M12 2a10 10 0 0 1 10 10") },
  { id:"schedule",  label:"Schedule",        icon:I("M8 2v4 M16 2v4 M3 10h18 M21 8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z"), badge:2, separator:true },
  { id:"transits",  label:"Today's Transits",icon:I("M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M2 12h20") },
  { id:"earnings",  label:"Earnings",        icon:I("M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"), separator:true },
  { id:"settings",  label:"Settings",        icon:I("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z") },
];

// Quick stats panel shown inside sidebar (above user card)
const TodayStats = () => (
  <div className="p-3 rounded-xl" style={{ background:"rgba(45,212,191,0.06)", border:"1px solid rgba(45,212,191,0.12)" }}>
    <p className="text-[9px] tracking-[0.25em] uppercase mb-2.5" style={{ color:"rgba(255,255,255,0.25)" }}>Today</p>
    <div className="grid grid-cols-2 gap-2">
      {[{ label:"Clients", value:"4" },{ label:"Readings", value:"6" },{ label:"Pending", value:"2" },{ label:"Rating", value:"4.9★" }].map(s => (
        <div key={s.label} className="text-center">
          <p className="text-sm font-light" style={{ color:"#2dd4bf" }}>{s.value}</p>
          <p className="text-[9px] font-light" style={{ color:"rgba(255,255,255,0.28)" }}>{s.label}</p>
        </div>
      ))}
    </div>
  </div>
);

const AstrologerSidebar = ({ active, setActive, sideOpen, setSideOpen, onNewReading, onLogout, user = { name:"Pandit Sharma", initial:"P", line1:"Vedic · 4.9★ · 248 readings" } }) => (
  <SidebarBase
    navItems={NAV}
    active={active} setActive={setActive}
    sideOpen={sideOpen} setSideOpen={setSideOpen}
    accent={ACCENT}
    cta={{ label:"New Reading", gradient:"linear-gradient(135deg,#0d9488,#0f766e)", onClick:onNewReading }}
    user={user}
    onLogout={onLogout}
    logo={{ top:"Kundali", bottom:"JYOTISHI" }}
  >
    <TodayStats />
  </SidebarBase>
);

export default AstrologerSidebar;