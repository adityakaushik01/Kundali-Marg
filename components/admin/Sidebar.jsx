// components/admin/Sidebar.jsx
// Admin dashboard sidebar — violet/indigo accent, system management focus.
// No CTA button. Shows system status widget.

import SidebarBase from "../dashboard/SidebarBase";

const ACCENT = { text:"#a78bfa", bg:"rgba(167,139,250,0.1)", border:"rgba(167,139,250,0.22)", glow:"rgba(167,139,250,0.1)" };
const I = (d) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;

const NAV = [
  { id:"overview",     label:"Overview",       icon:I("M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z M9 21V12h6v9") },
  { id:"users",        label:"Users",          icon:I("M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75") },
  { id:"astrologers",  label:"Astrologers",    icon:I("M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z") },
  { id:"charts",       label:"All Charts",     icon:I("M12 2a10 10 0 1 0 10 10H12V2z M12 2a10 10 0 0 1 10 10"), separator:true },
  { id:"revenue",      label:"Revenue",        icon:I("M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6") },
  { id:"analytics",    label:"Analytics",      icon:I("M18 20V10 M12 20V4 M6 20v-6") },
  { id:"reports",      label:"Reports",        icon:I("M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8"), badge:"3", separator:true },
  { id:"settings",     label:"Settings",       icon:I("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z") },
];

// System health widget
const SystemStatus = () => (
  <div className="p-3 rounded-xl" style={{ background:"rgba(167,139,250,0.06)", border:"1px solid rgba(167,139,250,0.12)" }}>
    <p className="text-[9px] tracking-[0.25em] uppercase mb-2.5" style={{ color:"rgba(255,255,255,0.25)" }}>System Status</p>
    <div className="space-y-2">
      {[
        { label:"API",       status:"Online",   ok:true  },
        { label:"Database",  status:"Online",   ok:true  },
        { label:"SwissEph",  status:"Online",   ok:true  },
        { label:"Queue",     status:"2 pending",ok:false },
      ].map(s => (
        <div key={s.label} className="flex items-center justify-between">
          <span className="text-[10px] font-light" style={{ color:"rgba(255,255,255,0.4)" }}>{s.label}</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.ok ? "#2dd4bf" : "#fb923c" }} />
            <span className="text-[10px] font-light" style={{ color: s.ok ? "#2dd4bf" : "#fb923c" }}>{s.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminSidebar = ({ active, setActive, sideOpen, setSideOpen, onLogout, user = { name:"Super Admin", initial:"SA", line1:"Administrator · Full Access" } }) => (
  <SidebarBase
    navItems={NAV}
    active={active} setActive={setActive}
    sideOpen={sideOpen} setSideOpen={setSideOpen}
    accent={ACCENT}
    cta={null}
    user={user}
    onLogout={onLogout}
    logo={{ top:"Kundali", bottom:"ADMIN" }}
  >
    <SystemStatus />
  </SidebarBase>
);

export default AdminSidebar;