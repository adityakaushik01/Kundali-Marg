// pages/AstrologerDashboard.jsx
// Astrologer-facing dashboard. Teal accent.
// Tabs: Overview, My Clients, Readings, Schedule, Transits, Earnings, Settings.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout    from "../components/dashboard/DashboardLayout";
import AstrologerSidebar  from "../components/astrologer/Sidebar";
import StatCard           from "../components/dashboard/StatCard";
import ChartCard          from "../components/dashboard/ChartCard";
import TransitCard        from "../components/dashboard/TransitCard";
import RecentChartsTable  from "../components/dashboard/RecentChartsTable";
import NotificationsFeed  from "../components/dashboard/NotificationsFeed";
import PanchangCard       from "../components/dashboard/PanchangCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const ACCENT = { text:"#2dd4bf", bg:"rgba(45,212,191,0.1)", border:"rgba(45,212,191,0.22)" };
const USER   = { name:"Pandit Sharma", initial:"P", line1:"Vedic · 4.9★ · 248 readings" };
const r = (o) => `rgba(255,255,255,${o})`;

const STATS = [
  { label:"Total Clients",  value:"48",   sub:"Registered",        color:"teal",  icon:"👥" },
  { label:"This Month",     value:"₹28k", sub:"Revenue earned",    color:"amber", icon:"💰" },
  { label:"Readings Done",  value:"248",  sub:"All time",          color:"violet",icon:"🔮" },
  { label:"Avg Rating",     value:"4.9★", sub:"From 186 reviews",  color:"rose",  icon:"⭐" },
];

const CLIENTS = [
  { id:1, name:"Aditya Kaushik", dob:"06 Apr 2000", time:"12:54 PM", place:"Etawah, UP", lagna:"Cancer",    dasha:"Sun",    isSelf:false },
  { id:2, name:"Priya Sharma",   dob:"14 Jan 1995", time:"08:30 AM", place:"Delhi",      lagna:"Scorpio",   dasha:"Moon",   isSelf:false },
  { id:3, name:"Rohan Mehta",    dob:"22 Jul 1988", time:"06:15 PM", place:"Mumbai, MH", lagna:"Capricorn", dasha:"Saturn", isSelf:false },
  { id:4, name:"Ananya Singh",   dob:"03 Mar 2002", time:"11:20 AM", place:"Bangalore",  lagna:"Virgo",     dasha:"Rahu",   isSelf:false },
];

const SCHEDULE = [
  { time:"10:00 AM", client:"Aditya Kaushik", type:"Kundali Reading",  duration:"60 min", status:"confirmed" },
  { time:"11:30 AM", client:"Priya Sharma",   type:"Marriage Muhurta", duration:"45 min", status:"confirmed" },
  { time:"02:00 PM", client:"Rohan Mehta",    type:"Career Analysis",  duration:"60 min", status:"pending"   },
  { time:"04:00 PM", client:"New Client",     type:"First Reading",    duration:"90 min", status:"pending"   },
];

const REVENUE_DATA = [
  { month:"Oct", amount:18000 },{ month:"Nov", amount:22000 },{ month:"Dec", amount:19000 },
  { month:"Jan", amount:25000 },{ month:"Feb", amount:21000 },{ month:"Mar", amount:28000 },
];

const INIT_NOTES = [
  { id:1, title:"New booking request",   desc:"Ananya Singh wants a Kundali reading tomorrow.", time:"1h ago", read:false, icon:"📅" },
  { id:2, title:"Payment received",       desc:"₹2,500 from Rohan Mehta for career analysis.",  time:"3h ago", read:false, icon:"💰" },
  { id:3, title:"Review received",        desc:"Priya Sharma left a 5★ review.",                time:"1d ago", read:false, icon:"⭐" },
  { id:4, title:"Mercury Retrograde",     desc:"Heads up — advise clients to postpone new starts.", time:"2d ago", read:true, icon:"☿" },
];

// Revenue chart
const RevenueChart = () => (
  <ChartCard title="Monthly Revenue" subtitle="Earnings (₹)">
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={REVENUE_DATA} barSize={20} margin={{ top:4, right:4, left:-20, bottom:0 }}>
        <XAxis dataKey="month" tick={{ fill:r(0.35), fontSize:10 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fill:r(0.25), fontSize:10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v/1000}k`} />
        <Tooltip
          contentStyle={{ background:"rgba(10,15,30,0.95)", border:"1px solid rgba(45,212,191,0.2)", borderRadius:"10px", color:r(0.8), fontSize:"12px" }}
          formatter={v => [`₹${v.toLocaleString()}`, "Revenue"]}
          cursor={{ fill:"rgba(45,212,191,0.04)" }}
        />
        <Bar dataKey="amount" radius={[4,4,0,0]}>
          {REVENUE_DATA.map((_,i) => <Cell key={i} fill={i === REVENUE_DATA.length-1 ? "#2dd4bf" : "rgba(45,212,191,0.35)"} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
);

// Today's schedule
const TodaySchedule = () => (
  <ChartCard title="Today's Schedule" subtitle="Appointments" noPad>
    {SCHEDULE.map((s,i) => (
      <div key={i} className="px-6 py-4 flex items-center gap-4"
        style={{ borderBottom:i<SCHEDULE.length-1?`1px solid ${r(0.06)}`:"none" }}>
        <div className="text-right flex-shrink-0 w-20">
          <p className="text-xs font-light" style={{ color:"#2dd4bf" }}>{s.time}</p>
          <p className="text-[10px] font-light mt-0.5" style={{ color:r(0.25) }}>{s.duration}</p>
        </div>
        <div className="w-px h-10 flex-shrink-0" style={{ background:"rgba(45,212,191,0.2)" }} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-light truncate" style={{ color:r(0.82) }}>{s.client}</p>
          <p className="text-xs font-light" style={{ color:r(0.35) }}>{s.type}</p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 font-light"
          style={{ background:s.status==="confirmed"?"rgba(45,212,191,0.1)":"rgba(251,146,60,0.1)", color:s.status==="confirmed"?"#2dd4bf":"#fb923c", border:`1px solid ${s.status==="confirmed"?"rgba(45,212,191,0.2)":"rgba(251,146,60,0.2)"}` }}>
          {s.status}
        </span>
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
        Namaste, <span style={{ color:"#2dd4bf" }}>Pandit Sharma</span> 🙏
      </h1>
      <p className="text-sm font-light mt-1.5" style={{ color:r(0.45) }}>4 appointments today · ₹28,000 this month</p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((s,i) => <StatCard key={i} {...s} />)}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2"><TodaySchedule /></div>
      <PanchangCard />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <RevenueChart />
      <RecentChartsTable charts={CLIENTS} onViewAll={() => setActive("clients")} onView={()=>{}} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <TransitCard />
      <NotificationsFeed notifications={notes} limit={4}
        onMarkAll={() => setNotes(n => n.map(x => ({...x,read:true})))}
        onMarkOne={id => setNotes(n => n.map(x => x.id===id?{...x,read:true}:x))}
      />
    </div>
  </div>
);

const Clients = () => (
  <div className="space-y-5">
    <div><p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>Client List</p><h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>My Clients</h2></div>
    <RecentChartsTable charts={CLIENTS} onView={()=>{}} />
  </div>
);

const Schedule = () => (
  <div className="space-y-5 max-w-3xl">
    <div><p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>Calendar</p><h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>Schedule</h2></div>
    <TodaySchedule />
  </div>
);

const Earnings = () => (
  <div className="space-y-5 max-w-3xl">
    <div><p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>Finance</p><h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>Earnings</h2></div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[{label:"This Month",value:"₹28,000",color:"teal"},{label:"Last Month",value:"₹21,000",color:"amber"},{label:"Total",value:"₹3.2L",color:"violet"},{label:"Pending",value:"₹4,500",color:"rose"}].map((s,i) => <StatCard key={i} {...s} />)}
    </div>
    <RevenueChart />
  </div>
);

const NotificationsTab = ({ notes, setNotes }) => (
  <div className="space-y-5 max-w-2xl">
    <div><p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>Inbox</p><h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>Notifications</h2></div>
    <NotificationsFeed notifications={notes}
      onMarkAll={() => setNotes(n => n.map(x => ({...x,read:true})))}
      onMarkOne={id => setNotes(n => n.map(x => x.id===id?{...x,read:true}:x))}
    />
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const AstrologerDashboard = () => {
  const navigate  = useNavigate();
  const [active,   setActive]   = useState("overview");
  const [sideOpen, setSideOpen] = useState(false);
  const [notes,    setNotes]    = useState(INIT_NOTES);
  const unreadCount = notes.filter(n => !n.read).length;

  const renderContent = () => {
    switch (active) {
      case "overview":      return <Overview setActive={setActive} notes={notes} setNotes={setNotes} />;
      case "clients":       return <Clients />;
      case "readings":      return <RecentChartsTable charts={CLIENTS} onView={()=>{}} />;
      case "schedule":      return <Schedule />;
      case "transits":      return <div className="max-w-2xl"><TransitCard /></div>;
      case "earnings":      return <Earnings />;
      case "notifications": return <NotificationsTab notes={notes} setNotes={setNotes} />;
      default:              return <Overview setActive={setActive} notes={notes} setNotes={setNotes} />;
    }
  };

  return (
    <DashboardLayout
      sidebar={
        <AstrologerSidebar
          active={active} setActive={setActive}
          sideOpen={sideOpen} setSideOpen={setSideOpen}
          onNewReading={() => {}}
          onLogout={() => {}}
          user={USER}
        />
      }
      active={active}
      sideOpen={sideOpen}
      setSideOpen={setSideOpen}
      accent={ACCENT}
      onNewChart={() => {}}
      ctaLabel="New Reading"
      onNotifications={() => setActive("notifications")}
      onProfile={() => {}}
      unreadCount={unreadCount}
      user={USER}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default AstrologerDashboard;