// pages/UserDashboard.jsx
// User-facing dashboard. Imports from components/user/ and components/dashboard/.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout   from "../../components/dashboard/DashboardLayout";
import UserSidebar       from "../../components/user/Sidebar";
import StatCard          from "../../components/dashboard/StatCard";
import ChartCard         from "../../components/dashboard/ChartCard";
import ElementChart      from "../../components/dashboard/ElementChart";
import HouseStrengthBar  from "../../components/dashboard/HouseStrengthBar";
import DashaTimeline     from "../../components/dashboard/DashaTimeline";
import PanchangCard      from "../../components/dashboard/PanchangCard";
import RecentChartsTable from "../../components/dashboard/RecentChartsTable";
import TransitCard       from "../../components/dashboard/TransitCard";
import NotificationsFeed from "../../components/dashboard/NotificationsFeed";

const ACCENT = { text:"#f59e0b", bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.22)" };
const USER   = { name:"Aditya Kaushik", initial:"A", line1:"Cancer Lagna · Sun Dasha" };

const STATS = [
  { label:"Total Charts", value:"4",    sub:"Kundalis generated", color:"amber", icon:"🔮" },
  { label:"This Month",   value:"2",    sub:"New readings",        color:"teal",  icon:"📅" },
  { label:"Saved",        value:"4",    sub:"In library",          color:"violet",icon:"⭐" },
  { label:"Dasha Ends",   value:"2027", sub:"Sun Mahadasha",       color:"rose",  icon:"⏳" },
];

const CHARTS = [
  { id:1, name:"Aditya Kaushik", dob:"06 Apr 2000", time:"12:54 PM", place:"Etawah, UP", lagna:"Cancer",    dasha:"Sun",    isSelf:true  },
  { id:2, name:"Priya Sharma",   dob:"14 Jan 1995", time:"08:30 AM", place:"Delhi",      lagna:"Scorpio",   dasha:"Moon",   isSelf:false },
  { id:3, name:"Rohan Mehta",    dob:"22 Jul 1988", time:"06:15 PM", place:"Mumbai, MH", lagna:"Capricorn", dasha:"Saturn", isSelf:false },
  { id:4, name:"Ananya Singh",   dob:"03 Mar 2002", time:"11:20 AM", place:"Bangalore",  lagna:"Virgo",     dasha:"Rahu",   isSelf:false },
];

const ELEMENT_DATA = [
  { element:"Fire",  count:4, color:"#f59e0b", signs:"Aries, Leo, Sagittarius"  },
  { element:"Water", count:3, color:"#38bdf8", signs:"Cancer, Scorpio, Pisces"  },
  { element:"Earth", count:1, color:"#2dd4bf", signs:"Taurus, Virgo, Capricorn" },
  { element:"Air",   count:1, color:"#a78bfa", signs:"Gemini, Libra, Aquarius"  },
];

const HOUSE_DATA = [
  {house:1,name:"Lagna",  planets:1,sign:"Cancer"},{house:2,name:"Dhana",  planets:0,sign:"Leo"},
  {house:3,name:"Sahaja", planets:0,sign:"Virgo"}, {house:4,name:"Sukha",  planets:0,sign:"Libra"},
  {house:5,name:"Putra",  planets:0,sign:"Scorpio"},{house:6,name:"Ripu",  planets:0,sign:"Sagittarius"},
  {house:7,name:"Kalatra",planets:1,sign:"Capricorn"},{house:8,name:"Ayur",planets:1,sign:"Aquarius"},
  {house:9,name:"Bhagya", planets:2,sign:"Pisces"},{house:10,name:"Karma",planets:4,sign:"Aries"},
  {house:11,name:"Labha", planets:0,sign:"Taurus"},{house:12,name:"Vyaya",planets:0,sign:"Gemini"},
];

const INIT_NOTES = [
  { id:1, title:"Mercury goes Retrograde",  desc:"Apr 1–25. Avoid signing contracts.",        time:"2h ago", read:false, icon:"☿"  },
  { id:2, title:"Sun Dasha active",          desc:"Focus on career and authority until 2027.", time:"1d ago", read:false, icon:"☀️" },
  { id:3, title:"Auspicious day tomorrow",   desc:"Siddha Yoga — great for new beginnings.",  time:"2d ago", read:false, icon:"✦"  },
  { id:4, title:"Kundali generated",         desc:"Ananya Singh's chart is ready.",            time:"3d ago", read:true,  icon:"🔮" },
  { id:5, title:"Full Moon in Virgo",        desc:"Activates your 3rd house this week.",       time:"5d ago", read:true,  icon:"🌕" },
];

const r = (o) => `rgba(255,255,255,${o})`;

// ── Tab: Overview ─────────────────────────────────────────────────────────────
const Overview = ({ navigate, setActive, notes, setNotes }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase mb-1.5" style={{ color:r(0.3) }}>
          {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}
        </p>
        <h1 className="text-3xl md:text-4xl font-light tracking-wider" style={{ color:r(0.92) }}>
          Namaste, <span style={{ color:"#f59e0b" }}>Aditya</span> 🙏
        </h1>
        <p className="text-sm font-light mt-1.5 tracking-wide" style={{ color:r(0.45) }}>
          Cancer Lagna · Sun Mahadasha · Pushya Nakshatra
        </p>
      </div>
      <button onClick={() => navigate("/generate-kundali")}
        className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-light tracking-widest uppercase transition-all hover:opacity-90"
        style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", color:"#f59e0b" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        New Chart
      </button>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((s,i) => <StatCard key={i} {...s} />)}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2">
        <RecentChartsTable charts={CHARTS} onViewAll={() => setActive("charts")} onView={()=>{}} />
      </div>
      <PanchangCard />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <ElementChart data={ELEMENT_DATA} />
      <HouseStrengthBar data={HOUSE_DATA} />
    </div>

    <DashaTimeline />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <TransitCard />
      <NotificationsFeed
        notifications={notes} limit={4}
        onMarkAll={() => setNotes(n => n.map(x => ({...x,read:true})))}
        onMarkOne={id => setNotes(n => n.map(x => x.id===id?{...x,read:true}:x))}
      />
    </div>
  </div>
);

// ── Tab: Charts ───────────────────────────────────────────────────────────────
const MyCharts = ({ navigate }) => (
  <div className="space-y-5">
    <div className="flex items-end justify-between">
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>Library</p>
        <h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>My Charts</h2>
      </div>
      <button onClick={() => navigate("/generate-kundali")}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-light tracking-widest uppercase hover:opacity-90"
        style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", color:"#f59e0b" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        Generate New
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {CHARTS.map(chart => (
        <div key={chart.id}
          className="p-5 rounded-2xl cursor-pointer transition-all duration-200"
          style={{ background:"rgba(15,20,40,0.65)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border: chart.isSelf?"1px solid rgba(245,158,11,0.18)":"1px solid rgba(255,255,255,0.09)", borderRadius:"16px" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = chart.isSelf?"rgba(245,158,11,0.35)":r(0.18)}
          onMouseLeave={e => e.currentTarget.style.borderColor = chart.isSelf?"rgba(245,158,11,0.18)":"rgba(255,255,255,0.09)"}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-light"
                style={{ background:chart.isSelf?"rgba(245,158,11,0.1)":r(0.05), border:chart.isSelf?"1px solid rgba(245,158,11,0.22)":`1px solid ${r(0.1)}`, color:chart.isSelf?"#f59e0b":r(0.45) }}>
                {chart.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-light" style={{ color:r(0.82) }}>{chart.name}</p>
                  {chart.isSelf && <span className="text-[9px] px-1.5 py-0.5 rounded tracking-wider" style={{ background:"rgba(245,158,11,0.1)", color:"#f59e0b", border:"1px solid rgba(245,158,11,0.2)" }}>PRIMARY</span>}
                </div>
                <p className="text-xs font-light" style={{ color:r(0.35) }}>{chart.dob} · {chart.time}</p>
              </div>
            </div>
          </div>
          <div style={{ height:"1px", background:r(0.07), marginBottom:"14px" }} />
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[["Lagna",chart.lagna],["Place",chart.place.split(",")[0]],["Dasha",chart.dasha+" Dasha"]].map(([l,v]) => (
              <div key={l} className="text-center p-2.5 rounded-xl" style={{ background:r(0.04), border:`1px solid ${r(0.07)}` }}>
                <p className="text-xs font-light" style={{ color:r(0.75) }}>{v}</p>
                <p className="text-[10px] font-light mt-0.5 tracking-wider" style={{ color:r(0.3) }}>{l}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button className="text-xs font-light tracking-wider" style={{ color:"rgba(245,158,11,0.55)" }}>View Chart →</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Tab: Profile ──────────────────────────────────────────────────────────────
const MyProfile = () => (
  <div className="space-y-5 max-w-3xl">
    <div>
      <p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>Account</p>
      <h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>My Profile</h2>
    </div>
    <div className="p-6 rounded-2xl relative overflow-hidden"
      style={{ background:"rgba(15,20,40,0.65)", backdropFilter:"blur(20px)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:"18px" }}>
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-light flex-shrink-0"
          style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", color:"#f59e0b" }}>A</div>
        <div className="flex-1">
          <h3 className="text-xl font-light tracking-wider mb-1" style={{ color:r(0.9) }}>Aditya Kaushik</h3>
          <p className="text-sm font-light mb-3" style={{ color:r(0.4) }}>aditya@example.com</p>
          <div className="flex flex-wrap gap-2">
            {[{t:"Cancer Lagna",c:"#f59e0b"},{t:"Sun Mahadasha",c:"#2dd4bf"},{t:"Pushya Nakshatra",c:"#a78bfa"}].map(tag => (
              <span key={tag.t} className="text-xs px-3 py-1 rounded-full font-light" style={{ background:`${tag.c}14`, color:tag.c, border:`1px solid ${tag.c}30` }}>{tag.t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
    <ChartCard title="Birth Details" subtitle="Janam Vivaran">
      <div className="-mx-6 -mb-6">
        {[["Full Name","Aditya Kaushik"],["Date","06 April 2000"],["Time","12:54 PM IST"],["Place","Etawah, Uttar Pradesh, India"],["Ayanamsa","Lahiri · 23.86°"]].map(([l,v],i,arr) => (
          <div key={l} className="px-6 py-3.5 flex items-center justify-between" style={{ borderBottom:i<arr.length-1?`1px solid ${r(0.07)}`:"none" }}>
            <span className="text-sm font-light" style={{ color:r(0.4) }}>{l}</span>
            <span className="text-sm font-light" style={{ color:r(0.8) }}>{v}</span>
          </div>
        ))}
      </div>
    </ChartCard>
    <ChartCard title="Astrological Summary" subtitle="Kundali Overview">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[{label:"Lagna",value:"Cancer",icon:"♋"},{label:"Moon Sign",value:"Aries",icon:"♈"},{label:"Sun Sign",value:"Pisces",icon:"♓"},{label:"Nakshatra",value:"Pushya",icon:"⭐"},{label:"Pada",value:"2nd",icon:"🔢"},{label:"Dasha",value:"Sun",icon:"☀️"}].map(item => (
          <div key={item.label} className="p-4 rounded-xl" style={{ background:r(0.04), border:`1px solid ${r(0.07)}` }}>
            <div className="flex items-center gap-2 mb-2"><span style={{ fontSize:"13px" }}>{item.icon}</span><p className="text-[10px] tracking-wider uppercase" style={{ color:r(0.25) }}>{item.label}</p></div>
            <p className="text-sm font-light" style={{ color:r(0.78) }}>{item.value}</p>
          </div>
        ))}
      </div>
    </ChartCard>
  </div>
);

// ── Tab: Explore ──────────────────────────────────────────────────────────────
const ZODIAC = [{symbol:"♈",sign:"Aries",lord:"Mars",element:"Fire",quality:"Cardinal",dates:"Mar 21–Apr 19"},{symbol:"♉",sign:"Taurus",lord:"Venus",element:"Earth",quality:"Fixed",dates:"Apr 20–May 20"},{symbol:"♊",sign:"Gemini",lord:"Mercury",element:"Air",quality:"Mutable",dates:"May 21–Jun 20"},{symbol:"♋",sign:"Cancer",lord:"Moon",element:"Water",quality:"Cardinal",dates:"Jun 21–Jul 22"},{symbol:"♌",sign:"Leo",lord:"Sun",element:"Fire",quality:"Fixed",dates:"Jul 23–Aug 22"},{symbol:"♍",sign:"Virgo",lord:"Mercury",element:"Earth",quality:"Mutable",dates:"Aug 23–Sep 22"},{symbol:"♎",sign:"Libra",lord:"Venus",element:"Air",quality:"Cardinal",dates:"Sep 23–Oct 22"},{symbol:"♏",sign:"Scorpio",lord:"Mars",element:"Water",quality:"Fixed",dates:"Oct 23–Nov 21"},{symbol:"♐",sign:"Sagittarius",lord:"Jupiter",element:"Fire",quality:"Mutable",dates:"Nov 22–Dec 21"},{symbol:"♑",sign:"Capricorn",lord:"Saturn",element:"Earth",quality:"Cardinal",dates:"Dec 22–Jan 19"},{symbol:"♒",sign:"Aquarius",lord:"Saturn",element:"Air",quality:"Fixed",dates:"Jan 20–Feb 18"},{symbol:"♓",sign:"Pisces",lord:"Jupiter",element:"Water",quality:"Mutable",dates:"Feb 19–Mar 20"}];

const Explore = () => {
  const [sel, setSel] = useState(null);
  return (
    <div className="space-y-5">
      <div><p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>Discover</p><h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>Explore Zodiac</h2></div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {ZODIAC.map((z,i) => { const isSel=sel?.sign===z.sign; return (
          <button key={i} onClick={() => setSel(isSel?null:z)}
            className="p-4 rounded-2xl flex flex-col items-center gap-2 transition-all duration-200"
            style={{ background:isSel?"rgba(245,158,11,0.1)":r(0.04), border:isSel?"1px solid rgba(245,158,11,0.3)":`1px solid ${r(0.08)}`, transform:isSel?"scale(1.05)":"scale(1)" }}>
            <span style={{ fontSize:"22px" }}>{z.symbol}</span>
            <span className="text-[10px] font-light tracking-wider" style={{ color:isSel?"#f59e0b":r(0.45) }}>{z.sign}</span>
          </button>
        );})}
      </div>
      {sel && (
        <ChartCard title={sel.sign} subtitle={sel.dates}>
          <div className="grid grid-cols-3 gap-3">
            {[["Lord",sel.lord],["Element",sel.element],["Quality",sel.quality]].map(([l,v]) => (
              <div key={l} className="text-center p-4 rounded-xl" style={{ background:r(0.04), border:`1px solid ${r(0.07)}` }}>
                <p className="text-[10px] tracking-wider uppercase mb-2" style={{ color:r(0.25) }}>{l}</p>
                <p className="text-sm font-light" style={{ color:r(0.78) }}>{v}</p>
              </div>
            ))}
          </div>
        </ChartCard>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5"><TransitCard /></div>
    </div>
  );
};

// ── Tab: Notifications ────────────────────────────────────────────────────────
const NotificationsTab = ({ notes, setNotes }) => (
  <div className="space-y-5 max-w-2xl">
    <div><p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>Inbox</p><h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>Notifications</h2></div>
    <NotificationsFeed notifications={notes}
      onMarkAll={() => setNotes(n => n.map(x => ({...x,read:true})))}
      onMarkOne={id => setNotes(n => n.map(x => x.id===id?{...x,read:true}:x))}
    />
  </div>
);

// ── Tab: Settings ─────────────────────────────────────────────────────────────
const SettingsTab = () => {
  const [tog, setTog] = useState({ panchang:true, retro:true, dasha:false, email:false });
  return (
    <div className="space-y-7 max-w-2xl">
      <div><p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color:r(0.3) }}>Preferences</p><h2 className="text-2xl font-light tracking-wider" style={{ color:r(0.9) }}>Settings</h2></div>
      {[
        { title:"Chart Preferences", items:[
          { label:"Ayanamsa System", desc:"Sidereal calculation method", value:"Lahiri",     type:"select" },
          { label:"House System",    desc:"Chart division method",        value:"Whole Sign", type:"select" },
          { label:"Language",        desc:"Chart display language",       value:"English",    type:"select" },
        ]},
        { title:"Notifications", items:[
          { label:"Daily Panchang",    desc:"Daily cosmic updates",       toggle:"panchang" },
          { label:"Retrograde Alerts", desc:"Planet retrograde alerts",   toggle:"retro"    },
          { label:"Dasha Reminders",   desc:"Mahadasha period changes",   toggle:"dasha"    },
          { label:"Email Digest",      desc:"Weekly astrology email",     toggle:"email"    },
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
                    style={{ background:tog[item.toggle]?"rgba(245,158,11,0.35)":r(0.1), border:tog[item.toggle]?"1px solid rgba(245,158,11,0.45)":`1px solid ${r(0.12)}` }}>
                    <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all duration-300"
                      style={{ background:tog[item.toggle]?"#f59e0b":r(0.4), left:tog[item.toggle]?"calc(100% - 18px)":"2px" }} />
                  </button>
                )}
                {item.type==="select" && <span className="text-xs px-3 py-1.5 rounded-lg font-light flex-shrink-0" style={{ background:"rgba(245,158,11,0.08)", color:"rgba(245,158,11,0.8)", border:"1px solid rgba(245,158,11,0.18)" }}>{item.value}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Dashboard ─────────────────────────────────────────────────────────────────
const UserDashboard = () => {
  const navigate  = useNavigate();
  const [active,   setActive]   = useState("overview");
  const [sideOpen, setSideOpen] = useState(false);
  const [notes,    setNotes]    = useState(INIT_NOTES);
  const unreadCount = notes.filter(n => !n.read).length;

  const renderContent = () => {
    switch (active) {
      case "overview":      return <Overview navigate={navigate} setActive={setActive} notes={notes} setNotes={setNotes} />;
      case "charts":        return <MyCharts navigate={navigate} />;
      case "profile":       return <MyProfile />;
      case "explore":       return <Explore />;
      case "notifications": return <NotificationsTab notes={notes} setNotes={setNotes} />;
      case "settings":      return <SettingsTab />;
      default:              return <Overview navigate={navigate} setActive={setActive} notes={notes} setNotes={setNotes} />;
    }
  };

  return (
    <DashboardLayout
      sidebar={
        <UserSidebar
          active={active} setActive={setActive}
          sideOpen={sideOpen} setSideOpen={setSideOpen}
          onGenerate={() => navigate("/generate-kundali")}
          onLogout={() => {}}
          user={USER}
        />
      }
      active={active}
      sideOpen={sideOpen}
      setSideOpen={setSideOpen}
      accent={ACCENT}
      onNewChart={() => navigate("/generate-kundali")}
      ctaLabel="New Chart"
      onNotifications={() => setActive("notifications")}
      onProfile={() => setActive("profile")}
      unreadCount={unreadCount}
      user={USER}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default UserDashboard;