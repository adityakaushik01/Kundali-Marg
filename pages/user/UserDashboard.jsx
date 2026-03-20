import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import UserSidebar from "../../components/user/Sidebar";
import StatCard from "../../components/dashboard/StatCard";
import RecentChartsTable from "../../components/dashboard/RecentChartsTable";

import useAuth from "../../hooks/useAuth";

const ACCENT = {
  text: "#f59e0b",
  bg: "rgba(245,158,11,0.1)",
  border: "rgba(245,158,11,0.22)",
};

const USER = {
  name: "Aditya Kaushik",
  initial: "A",
  line1: "Kundali Insights",
};

const r = (o) => `rgba(255,255,255,${o})`;

const UserDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [active, setActive] = useState("overview");
  const [sideOpen, setSideOpen] = useState(false);

  const [charts, setCharts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch charts from backend
  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/kundli`
        );
        const data = await res.json();
        setCharts(data || []);
      } catch (err) {
        console.error("Error fetching charts:", err);
        setCharts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  // 🔥 Dynamic Stats
  const STATS = [
    {
      label: "Total Charts",
      value: charts.length,
      sub: "Generated",
      color: "amber",
      icon: "🔮",
    },
    {
      label: "This Month",
      value: charts.length,
      sub: "Recent activity",
      color: "teal",
      icon: "📅",
    },
    {
      label: "Saved",
      value: charts.length,
      sub: "In library",
      color: "violet",
      icon: "⭐",
    },
  ];

  // 🔥 Overview Tab
  const Overview = () => (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] tracking-[0.35em]" style={{ color: r(0.3) }}>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>

          <h1 className="text-3xl font-light">
            Welcome, <span style={{ color: "#f59e0b" }}>Aditya</span> 👋
          </h1>
        </div>

        <button
          onClick={() => navigate("/generate-kundali")}
          className="px-5 py-2 rounded-xl text-xs tracking-widest uppercase transition-all"
          style={{
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.25)",
            color: "#f59e0b",
          }}
        >
          New Chart
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Charts */}
      <RecentChartsTable
        charts={charts}
        loading={loading}
        onViewAll={() => setActive("charts")}
      />
    </div>
  );

  // 🔥 Charts Tab
  const MyCharts = () => (
    <div className="space-y-5">
      <h2 className="text-2xl font-light">My Charts</h2>

      <RecentChartsTable charts={charts} loading={loading} />
    </div>
  );

  // 🔥 Render
  const renderContent = () => {
    switch (active) {
      case "overview":
        return <Overview />;
      case "charts":
        return <MyCharts />;
      default:
        return <Overview />;
    }
  };

  return (
    <DashboardLayout
      sidebar={
        <UserSidebar
          active={active}
          setActive={setActive}
          sideOpen={sideOpen}
          setSideOpen={setSideOpen}
          onGenerate={() => navigate("/generate-kundali")}
          onLogout={() => {
            logout();
            navigate("/login", { replace: true });
          }}
          user={USER}
        />
      }
      active={active}
      sideOpen={sideOpen}
      setSideOpen={setSideOpen}
      accent={ACCENT}
      onNewChart={() => navigate("/generate-kundali")}
      onNotifications={() => {}}
      onProfile={() => {}}
      unreadCount={0}
      user={USER}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default UserDashboard;