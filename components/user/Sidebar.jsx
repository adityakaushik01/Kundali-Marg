// components/user/Sidebar.jsx
// User dashboard sidebar — amber accent, kundali-focused nav.

import SidebarBase from "../dashboard/SidebarBase";

const ACCENT = { text:"#f59e0b", bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.22)", glow:"rgba(245,158,11,0.1)" };
const I = (d) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;

const NAV = [
  { id:"overview",      label:"Overview",       icon:I("M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z M9 21V12h6v9") },
  { id:"charts",        label:"My Charts",      icon:I("M12 2a10 10 0 1 0 10 10H12V2z M12 2a10 10 0 0 1 10 10") },
  { id:"profile",       label:"My Profile",     icon:I("M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z") },
  { id:"explore",       label:"Explore",        icon:I("M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"), separator:true },
  { id:"notifications", label:"Notifications",  icon:I("M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0"), badge:3 },
  { id:"settings",      label:"Settings",       icon:I("M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z") },
];

const UserSidebar = ({ active, setActive, sideOpen, setSideOpen, onGenerate, onLogout, user = { name:"Aditya Kaushik", initial:"A", line1:"Cancer Lagna · Sun Dasha" } }) => (
  <SidebarBase
    navItems={NAV}
    active={active} setActive={setActive}
    sideOpen={sideOpen} setSideOpen={setSideOpen}
    accent={ACCENT}
    cta={{ label:"New Chart", gradient:"linear-gradient(135deg,#d97706,#b45309)", onClick:onGenerate }}
    user={user}
    onLogout={onLogout}
    logo={{ top:"Kundali", bottom:"MARG" }}
  />
);

export default UserSidebar;