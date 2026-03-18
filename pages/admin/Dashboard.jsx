// pages/AdminDashboard.jsx
// Admin dashboard. Violet accent. No CTA. System management focus.
// Tabs: Overview, Users, Astrologers, All Charts, Revenue, Analytics, Reports, Settings.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout   from "../components/dashboard/DashboardLayout";
import AdminSidebar      from "../components/admin/Sidebar";
import StatCard          from "../components/dashboard/StatCard";
import ChartCard         from "../components/dashboard/ChartCard";
import RecentChartsTable from "../components/dashboard/RecentChartsTable";
import NotificationsFeed from "../components/dashboard/NotificationsFeed";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, PieChart, Pie } from "recharts";

const ACCENT = { text:"#a78bfa", bg:"rgba(167,139,250,0.1)", border:"rgba(167,139,250,0.22)" };
const USER   = { name:"Super Admin", initial:"SA", line1:"Administrator · Full Access" };
const r = (o) => `rgba(255,255,255,${o})`;

const STATS = [
  { label:"Total Users",        value:"1,248", sub:"Registered accounts",    color:"violet",icon:"👥" },
  { label:"Active Astrologers", value:"24",    sub:"Currently active",       color:"teal",  icon:"🌟" },
  { label:"Charts Generated",   value:"8,492", sub:"All time",               color:"amber", icon:"🔮" },
  { label:"Monthly Revenue",    value:"₹1.8L", sub:"March 2026",             color:"rose",  icon:"💰" },
];

const USERS = [
  { id:1, name:"Aditya Kaushik", dob:"06 Apr 2000", time:"12:54 PM", place:"Etawah, UP", lagna:"Cancer",    dasha:"Sun",    isSelf:false },
  { id:2, name:"Priya Sharma",   dob:"14 Jan 1995", time:"08:30 AM", place:"Delhi",      lagna:"Scorpio",   dasha:"Moon",   isSelf:false },
  { id:3, name:"Rohan Mehta",    dob:"22 Jul 1988", time:"06:15 PM", place:"Mumbai, MH", lagna:"Capricorn", dasha:"Saturn", isSelf:false },
  { id:4, name:"Ananya Singh",   dob:"03 Mar 2002", time:"11:20 AM", place:"Bangalore",  lagna:"Virgo",     dasha:"Rahu",   isSelf:false },
];

const MONTHLY_DATA = [
  { month:"Oct", users:85, charts:620, revenue:120000 },
  { month:"Nov", users:102,charts:740, revenue:145000 },
  { month:"Dec", users:95, charts:680, revenue:132000 },
  { month:"Jan", users:130,charts:890, revenue:168000 },
  { month:"Feb", users:118,charts:820, revenue:152000 },
  { month:"Mar", users:145,charts:980, revenue:182000 },
];

const ASTROLOGERS = [
  { name:"Pandit Sharma",    speciality:"Vedic",       clients:48, rating:"4.9", status:"active"   },
  { name:"Dr. Priya Joshi",  speciality:"KP System",   clients:32, rating:"4.7", status:"active"   },
  { name:"Acharya Gupta",    speciality:"Nadi",        clients:28, rating:"4.8", status:"active"   },
  { name:"Swami Prakash",    speciality:"Vedic+Vastu", clients:19, rating:"4.6", status:"inactive" },
];

const INIT_NOTES = [
  { id:1, title:"New astrologer application",  desc:"Dr. Anjali Mehta applied to join the platform.", time:"2h ago", read:false, icon:"👤" },
  { id:2, title:"Revenue milestone",            desc:"Platform crossed ₹10L total revenue.",          time:"5h ago", read:false, icon:"💰" },
  { id:3, title:"Server load high",             desc:"API response time > 2s. Consider scaling.",     time:"1d ago", read:false, icon:"⚠️" },
  { id:4, title:"Weekly report ready",          desc:"March week 3 analytics report is generated.",   time:"2d ago", read:true,  icon:"📊" },
];

// Growth chart
const GrowthChart = () => (
  <ChartCard title="Platform Growth" subtitle="Users & Charts Per Month">
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={MONTHLY_DATA} margin={{ top:4, right:8, left:-20, bottom:0 }}>
        <XAxis dataKey="month" tick={{ fill:r(0.35), fontSize:10 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill:r(0.25), fontSize:10 }} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ background:"rgba(10,15,30,0.95)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:"10px", color:r(0.8), fontSize:"12px" }} cursor={{ stroke:"rgba(167,139,250,0.1)" }} />
        <Line type="monotone" dataKey="users"  stroke="#a78bfa" strokeWidth={1.5} dot={false} name="New Users" />
        <Line type="monotone" dataKey="charts" stroke="#2dd4bf" strokeWidth={1.5} dot={false} name="Charts" />
      </LineChart>
    </ResponsiveContainer>
    <div className="flex gap-4 mt-2">
      {[{color:"#a78bfa",label:"New Users"},{color:"#2dd4bf",label:"Charts"}].map(l => (
        <div key={l.label} className="flex items-center gap-1.5">
          <div className="w-3 h-0.5" style={{ background:l.color }} />
          <span className="text-[10px] font-light" style={{ color:r(0.4) }}>{l.label}</span>
        </div>
      ))}
    </div>
  </ChartCard>
);

// Revenue bar chart
const RevenueChart = () => (
  <ChartCard title="Monthly Revenue" subtitle="₹ Earned">
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={MONTHLY_DATA} barSize={16} margin={{ top:4, right:4, left:-20, bottom:0 }}>
        <XAxis dataKey="month" tick={{ fill:r(0.35), fontSize:10 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill:r(0.25), fontSize:10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v/1000}k`} />
        <Tooltip contentStyle={{ background:"rgba(10,15,30,0.95)", border:"1px solid rgba(167,139,250,0.2)", borderRadius:"10px", color:r(0.8), fontSize:"12px" }} formatter={v => [`₹${v.toLocaleString()}`, "Revenue"]} cursor={{ fill:"rgba(167,139,250,0.04)" }} />
        <Bar dataKey="revenue" radius={[4,4,0,0]}>
          {MONTHLY_DATA.map((_,i) => <Cell key={i} fill={i===MONTHLY_DATA.length-1?"#a78bfa":"rgba(167,139,250,0.35)"} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
);

// Astrologers table
const AstrologersTable = () => (
  <ChartCard title="Astrologers" subtitle="Active Practitioners" noPad>
    {ASTROLOGERS.map((a,i) => (
      <div key={i} className="px-6 py-4 flex items-center gap-4"
        style={{ borderBottom:i<ASTROLOGERS.length-1?`1px solid ${r(0.06)}`:"none" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-light"
          style={{ background:"rgba(167,139,250,0.1)", border:"1px solid rgba(167,139,250,0.2)", color:"#a78bfa" }}>
          {a.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-light" style={{ color:r(0.82) }}>{a.name}</p>
          <p className="text-xs font-light" style={{ color:r(0.35) }}>{a.speciality} · {a.clients} clients</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs font-light" style={{ color:"#f59e0b" }}>{a.rating}★</p>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-light"
            style={{ background:a.status==="active"?"rgba(45,212,191,0.1)":"rgba(255,255,255,0.05)", color:a.status==="active"?"#2dd4bf":r(0.35), border:`1px solid ${a.status==="active"?"rgba(45,212,191,0.2)":r(0.08)}` }}>
            {a.status}
          </span>
        </div>
      </div>
    ))}
  </ChartCard>
);

// ── Tabs ──────────────────────────────────────────────────────────────────────
const Overview = ({ setActive, notes, setNotes }) => (
  <div className="space-y-6">
    <div>
      <p className="text-[10px] tracking-[0.35em] uppercase mb-1.5" style={{ color:r(0.3) }}>
        {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}
      </p>
      <h1 className="text-3xl md:text-4xl font-light tracking-wider" style={{ color:r(0.92) }}>
        Admin <span style={{ color:"#a78bfa" }}>Overview</span>
      </h1>
      <p className="text-sm font-light mt-1.5" style={{ color:r(0.45) }}>Platform health looks good · 3 pending actions</p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((s,i) => <StatCard key={i} {...s} />)}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <GrowthChart />
      <RevenueChart />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2"><AstrologersTable /></div>
      <NotificationsFeed notifications={notes} limit={4}
        onMarkAll={() => setNotes(n => n.map(x => ({...x,read:true})))}
        onMarkOne={id => setNotes(n => n.map(x => x.id===id?{...x,read:true}:x))}
      />
    </div>

    <RecentChartsTable charts={USERS} onViewAll={() => setActive("charts")} onView={()=>{}} />
  </div>
);

const Analytics = () => (
  <div className="space-y-5">
    <div><p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>Data</p><h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>Analytics</h2></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><GrowthChart /><RevenueChart /></div>
  </div>
);

const SettingsTab = () => {
  const [tog, setTog] = useState({ maintenance:false, registrations:true, payments:true, alerts:true });
  return (
    <div className="space-y-7 max-w-2xl">
      <div><p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>System</p><h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>Settings</h2></div>
      {[
        { title:"Platform", items:[
          { label:"Maintenance Mode",   desc:"Take platform offline for maintenance", toggle:"maintenance" },
          { label:"User Registrations", desc:"Allow new user sign-ups",               toggle:"registrations" },
          { label:"Payment Processing", desc:"Enable payment gateway",                toggle:"payments" },
          { label:"System Alerts",      desc:"Admin email alerts for errors",         toggle:"alerts" },
        ]},
        { title:"Danger Zone", items:[
          { label:"Clear Cache",        desc:"Clear all cached data",         value:"Clear",  type:"action" },
          { label:"Reset Analytics",    desc:"Clear all analytics data",      value:"Reset",  type:"danger"  },
          { label:"Export All Data",    desc:"Download full platform backup", value:"Export", type:"action" },
        ]},
      ].map(section => (
        <div key={section.title}>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color:r(0.25) }}>{section.title}</p>
          <div className="rounded-2xl overflow-hidden" style={{ background:"rgba(15,20,40,0.65)", backdropFilter:"blur(20px)", border:`1px solid ${r(0.09)}`, borderRadius:"16px" }}>
            {section.items.map((item,i,arr) => (
              <div key={item.label} className="px-5 py-4 flex items-center justify-between gap-4" style={{ borderBottom:i<arr.length-1?`1px solid ${r(0.07)}`:"none" }}>
                <div><p className="text-sm font-light" style={{ color:r(0.72) }}>{item.label}</p><p className="text-xs font-light mt-0.5" style={{ color:r(0.32) }}>{item.desc}</p></div>
                {item.toggle && (
                  <button onClick={() => setTog(t => ({...t,[item.toggle]:!t[item.toggle]}))}
                    className="w-11 h-6 rounded-full flex-shrink-0 relative transition-all duration-300"
                    style={{ background:tog[item.toggle]?"rgba(167,139,250,0.35)":r(0.1), border:tog[item.toggle]?"1px solid rgba(167,139,250,0.45)":`1px solid ${r(0.12)}` }}>
                    <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all duration-300"
                      style={{ background:tog[item.toggle]?"#a78bfa":r(0.4), left:tog[item.toggle]?"calc(100% - 18px)":"2px" }} />
                  </button>
                )}
                {item.type==="action" && <button className="text-xs px-3 py-1.5 rounded-lg font-light flex-shrink-0" style={{ background:r(0.05), color:r(0.45), border:`1px solid ${r(0.1)}` }}>{item.value}</button>}
                {item.type==="danger" && <button className="text-xs px-3 py-1.5 rounded-lg font-light flex-shrink-0" style={{ background:"rgba(251,113,133,0.08)", color:"rgba(251,113,133,0.75)", border:"1px solid rgba(251,113,133,0.2)" }}>{item.value}</button>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate  = useNavigate();
  const [active,   setActive]   = useState("overview");
  const [sideOpen, setSideOpen] = useState(false);
  const [notes,    setNotes]    = useState(INIT_NOTES);
  const unreadCount = notes.filter(n => !n.read).length;

  const renderContent = () => {
    switch (active) {
      case "overview":     return <Overview setActive={setActive} notes={notes} setNotes={setNotes} />;
      case "users":        return <RecentChartsTable charts={USERS} onView={()=>{}} />;
      case "astrologers":  return <AstrologersTable />;
      case "charts":       return <RecentChartsTable charts={USERS} onView={()=>{}} />;
      case "revenue":      return <div className="space-y-5"><RevenueChart /></div>;
      case "analytics":    return <Analytics />;
      case "reports":      return <div className="space-y-5 max-w-2xl"><NotificationsFeed notifications={notes} onMarkAll={() => setNotes(n => n.map(x => ({...x,read:true})))} onMarkOne={id => setNotes(n => n.map(x => x.id===id?{...x,read:true}:x))} /></div>;
      case "settings":     return <SettingsTab />;
      default:             return <Overview setActive={setActive} notes={notes} setNotes={setNotes} />;
    }
  };

  return (
    <DashboardLayout
      sidebar={
        <AdminSidebar
          active={active} setActive={setActive}
          sideOpen={sideOpen} setSideOpen={setSideOpen}
          onLogout={() => {}}
          user={USER}
        />
      }
      active={active}
      sideOpen={sideOpen}
      setSideOpen={setSideOpen}
      accent={ACCENT}
      onNewChart={null}
      onNotifications={() => setActive("reports")}
      onProfile={() => {}}
      unreadCount={unreadCount}
      user={USER}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;