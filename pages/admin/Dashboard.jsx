import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Stars from "../../components/decorations/Stars";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import { glass, COLORS, pageBg } from "../../components/dashboard/theme";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";

import { FaUsers } from "react-icons/fa6";
import { FaStroopwafel } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { FaShieldHalved } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa6";
import AdminSidebar from "../../components/admin/Sidebar";
import StatCard from "../../components/dashboard/StatCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// ── Helpers ───────────────────────────────────────────────────────────────────
const r = (o) => `rgba(255,255,255,${o})`;

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
const Skeleton = ({ w = "100%", h = "20px", rounded = "8px" }) => (
  <div
    className="animate-pulse"
    style={{ width: w, height: h, borderRadius: rounded, background: r(0.07) }}
  />
);

// ─────────────────────────────────────────────────────────────────────────────
// OVERVIEW TAB
// ─────────────────────────────────────────────────────────────────────────────
const Overview = ({ stats, statsLoading, recentUsers, setActive }) => {
  const cards = [
    { label: "Total Users", value: statsLoading ? "…" : String(stats?.total_users ?? 0), sub: "Registered accounts", color: "amber", icon: <FaUsers /> },
    { label: "Total Kundalis", value: statsLoading ? "…" : String(stats?.total_kundalis ?? 0), sub: "Birth charts generated", color: "teal", icon: <FaStroopwafel /> },
    { label: "AI Questions", value: statsLoading ? "…" : String(stats?.total_ai_questions ?? 0), sub: "Total AI interactions", color: "violet", icon: <FaRobot /> },
    { label: "PDFs Generated", value: statsLoading ? "…" : String(stats?.total_pdfs ?? 0), sub: "Reports downloaded", color: "rose", icon: <FaFilePdf /> },
  ];

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: r(0.3) }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
        </p>
        <h1 className="text-3xl md:text-4xl font-light tracking-wider" style={{ color: r(0.92) }}>
          Admin <span style={{ color: COLORS.amber.text }}>Overview</span>
        </h1>
        <p className="text-sm font-light mt-2" style={{ color: r(0.4) }}>
          Platform-wide statistics and recent activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Recent Users */}
      <div className="rounded-2xl overflow-hidden" style={glass()}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${r(0.07)}` }}>
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: r(0.3) }}>Latest</p>
            <h3 className="text-base font-light tracking-wider" style={{ color: r(0.88) }}>Recent Users</h3>
          </div>
          <button
            onClick={() => setActive("users")}
            className="rounded-full px-3 py-1 cursor-pointer flex items-center gap-2 text-[11px] font-light tracking-wider transition-all duration-300"
            style={{
              border: `1px solid ${COLORS.amber.border}`,
              color: COLORS.amber.text,
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.amber.bg;
              e.currentTarget.style.borderColor = COLORS.amber.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = COLORS.amber.border;
            }}
          >
            View all <FaLongArrowAltRight />
          </button>
        </div>
        {statsLoading ? (
          <div className="p-6 space-y-3">
            {[1,2,3].map(i => <Skeleton key={i} h="48px" rounded="12px" />)}
          </div>
        ) : recentUsers.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-light" style={{ color: r(0.4) }}>No users yet</p>
          </div>
        ) : (
          recentUsers.slice(0, 5).map((u, i, arr) => (
            <div
              key={u._id}
              className="px-6 py-4 flex items-center gap-4"
              style={{ borderBottom: i < arr.length - 1 ? `1px solid ${r(0.05)}` : "none" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-light flex-shrink-0"
                style={{ background: COLORS.amber.bg, border: `1px solid ${COLORS.amber.border}`, color: COLORS.amber.text }}
              >
                {u.first_name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-light truncate" style={{ color: r(0.85) }}>
                  {u.first_name} {u.last_name}
                </p>
                <p className="text-xs font-light mt-0.5 truncate" style={{ color: r(0.35) }}>
                  {u.email_address}
                </p>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full tracking-wider flex-shrink-0"
                style={{ background: COLORS.teal.bg, color: COLORS.teal.text, border: `1px solid ${COLORS.teal.border}` }}
              >
                {u.user_role}
              </span>
              <p className="text-xs font-light flex-shrink-0" style={{ color: r(0.3) }}>
                {formatDate(u.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// USERS TAB
// ─────────────────────────────────────────────────────────────────────────────
const UsersTab = ({ users, loading, onDelete }) => {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email_address?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color: r(0.3) }}>Manage</p>
          <h2 className="text-2xl font-light tracking-wider" style={{ color: r(0.9) }}>All Users</h2>
        </div>
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="px-4 py-2 rounded-xl text-sm font-light focus:outline-none focus:border-amber-400 transition-all"
          style={{
            background: r(0.05),
            border: `1px solid ${r(0.12)}`,
            color: r(0.85),
            width: "260px",
          }}
        />
      </div>

      <div className="rounded-2xl overflow-hidden" style={glass()}>
        {/* Table header */}
        <div
          className="px-6 py-3 grid grid-cols-12 gap-4 text-[10px] tracking-[0.25em] uppercase"
          style={{ color: r(0.3), borderBottom: `1px solid ${r(0.07)}` }}
        >
          <span className="col-span-4">User</span>
          <span className="col-span-3 hidden md:block">Email</span>
          <span className="col-span-2">Role</span>
          <span className="col-span-2 hidden sm:block">Joined</span>
          <span className="col-span-1"></span>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[1,2,3,4,5].map(i => <Skeleton key={i} h="52px" rounded="12px" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-light" style={{ color: r(0.4) }}>No users found</p>
          </div>
        ) : (
          filtered.map((u, i, arr) => (
            <div
              key={u._id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center group hover:bg-white/[0.02] transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? `1px solid ${r(0.05)}` : "none" }}
            >
              {/* Name + avatar */}
              <div className="col-span-4 flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-light flex-shrink-0"
                  style={{ background: COLORS.amber.bg, border: `1px solid ${COLORS.amber.border}`, color: COLORS.amber.text }}
                >
                  {u.first_name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <p className="text-sm font-light truncate" style={{ color: r(0.85) }}>
                  {u.first_name} {u.last_name}
                </p>
              </div>

              {/* Email */}
              <p className="col-span-3 text-xs font-light truncate hidden md:block" style={{ color: r(0.4) }}>
                {u.email_address}
              </p>

              {/* Role */}
              <div className="col-span-2">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full tracking-wider"
                  style={{
                    background: u.user_role === "SUPER_ADMIN" ? COLORS.violet.bg : COLORS.teal.bg,
                    color: u.user_role === "SUPER_ADMIN" ? COLORS.violet.text : COLORS.teal.text,
                    border: `1px solid ${u.user_role === "SUPER_ADMIN" ? COLORS.violet.border : COLORS.teal.border}`,
                  }}
                >
                  {u.user_role}
                </span>
              </div>

              {/* Joined */}
              <p className="col-span-2 text-xs font-light hidden sm:block" style={{ color: r(0.3) }}>
                {formatDate(u.createdAt)}
              </p>

              {/* Delete */}
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => onDelete(u._id)}
                  className="cursor-pointer opacity-0 group-hover:opacity-100 p-2 rounded-md transition-all"
                  style={{ color: r(0.3) }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(251,113,133,0.9)";
                    e.currentTarget.style.backgroundColor = "rgba(251,113,133,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = r(0.3);
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  title="Delete user"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// KUNDALIS TAB
// ─────────────────────────────────────────────────────────────────────────────
const KundalisTab = ({ kundalis, loading, onDelete, onView  }) => {
  const [search, setSearch] = useState("");

  const filtered = kundalis.filter(
    (k) =>
      k.name?.toLowerCase().includes(search.toLowerCase()) ||
      k.birth_details?.place?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] tracking-[0.35em] uppercase mb-1" style={{ color: r(0.3) }}>Manage</p>
          <h2 className="text-2xl font-light tracking-wider" style={{ color: r(0.9) }}>All Kundalis</h2>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or place…"
          className="px-4 py-2 rounded-xl text-sm font-light focus:outline-none focus:border-amber-400 transition-all"
          style={{ background: r(0.05), border: `1px solid ${r(0.12)}`, color: r(0.85), width: "260px" }}
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} h="180px" rounded="16px" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center" style={glass()}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: COLORS.amber.bg, border: `1px solid ${COLORS.amber.border}` }}
          >
            <span style={{ fontSize: "36px", color: COLORS.amber.text }}><FaStroopwafel /></span>
          </div>
          <h3 className="text-lg font-light tracking-wider mb-2" style={{ color: r(0.8) }}>No Kundalis Found</h3>
          <p className="text-sm font-light" style={{ color: r(0.4) }}>Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((k, i) => (
            <div
            onClick={() => onView(k)}
              key={k._id}
              className="cursor-pointer p-5 rounded-2xl transition-all duration-200 group"
              style={glass(i === 0 ? COLORS.amber.border : r(0.1))}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = i === 0 ? "#f59e0b80" : r(0.2))}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = i === 0 ? COLORS.amber.border : r(0.1))}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-light flex-shrink-0"
                  style={{
                    background: i === 0 ? COLORS.amber.bg : r(0.04),
                    border: i === 0 ? `1px solid ${COLORS.amber.border}` : `1px solid ${r(0.09)}`,
                    color: i === 0 ? COLORS.amber.text : r(0.45),
                  }}
                >
                  {k.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-light truncate" style={{ color: r(0.88) }}>{k.name}</p>
                    {i === 0 && (
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded tracking-wider flex-shrink-0"
                        style={{ background: COLORS.amber.bg, color: COLORS.amber.text, border: `1px solid ${COLORS.amber.border}` }}
                      >
                        LATEST
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-light mt-0.5" style={{ color: r(0.35) }}>
                    {k.birth_details?.date} · {k.birth_details?.time}
                  </p>
                </div>
                {/* Delete */}
                <button
                  onClick={() => onDelete(k._id)}
                  className="cursor-pointer opacity-0 p-2 group-hover:opacity-100 transition-all duration-200 flex-shrink-0 rounded-md"
                  style={{ color: r(0.3), backgroundColor: "transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(251,113,133,0.9)";
                    e.currentTarget.style.backgroundColor = "rgba(251,113,133,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = r(0.3);
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  title="Delete"
                >
                  <MdDelete />
                </button>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: r(0.07), marginBottom: "14px" }} />

              {/* Details */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Place", k.birth_details?.place || "—"],
                  ["Saved on", formatDate(k.createdAt)],
                ].map(([l, v]) => (
                  <div key={l} className="p-2.5 rounded-xl" style={{ background: r(0.04), border: `1px solid ${r(0.07)}` }}>
                    <p className="text-[10px] font-light mb-0.5" style={{ color: r(0.3) }}>{l}</p>
                    <p className="text-xs font-light truncate" style={{ color: r(0.72) }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, getToken } = useAuth();

  const [active, setActive] = useState(location.state?.tab || "overview");

  useEffect(() => {
  if (location.state?.tab) {
    window.history.replaceState({}, "");
  }
}, []);
  const [sideOpen, setSideOpen] = useState(false);

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [kundalis, setKundalis] = useState([]);
  const [kundalisLoading, setKundalisLoading] = useState(true);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setStats(data);
      } catch {
        setStats(null);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUsers(data.users || []);
      } catch {
        setUsers([]);
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch all kundalis
  useEffect(() => {
    const fetchKundalis = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin/kundalis`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setKundalis(data.kundalis || []);
      } catch {
        setKundalis([]);
      } finally {
        setKundalisLoading(false);
      }
    };
    fetchKundalis();
  }, []);

  // Delete user
  const handleDeleteUser = (id) => {
    toast("Delete this user?", {
      description: "This will permanently remove the account.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await fetch(`${BACKEND_URL}/api/admin/users/${id}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${getToken()}` },
            });
            setUsers((prev) => prev.filter((u) => u._id !== id));
            toast.success("User deleted successfully");
          } catch {
            toast.error("Failed to delete user");
          }
        },
      },
      cancel: { label: "Cancel" },
    });
  };

  // Delete kundali
  const handleDeleteKundali = (id) => {
    toast("Delete this Kundali?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await fetch(`${BACKEND_URL}/api/kundali/${id}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${getToken()}` },
            });
            setKundalis((prev) => prev.filter((k) => k._id !== id));
            toast.success("Kundali deleted successfully");
          } catch {
            toast.error("Failed to delete kundali");
          }
        },
      },
      cancel: { label: "Cancel" },
    });
  };

  const handleViewKundali = async (k) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/kundali/${k._id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error();
    const full = await res.json();
    navigate("/admin/show-kundali", {
      state: {
        kundaliData: { ...full.kundali_data, _id: full._id, dasha_timeline: full.dasha_timeline },
        name: full.name,
        birthDetails: full.birth_details,
      },
    });
  } catch {
    toast.error("Failed to load kundali. Please try again.");
  }
};

  const sidebarUser = {
  name: user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || "Admin" : "Admin",
  initial: user?.first_name?.charAt(0)?.toUpperCase() || "A",
  line1: user?.email || "",   // ← add this
};

  const NAV_LABEL = {
    overview: "Overview",
    users: "Users",
    kundalis: "Kundalis",
  };

  const renderContent = () => {
    switch (active) {
      case "overview":
        return (
          <Overview
            stats={stats}
            statsLoading={statsLoading}
            recentUsers={users}
            setActive={setActive}
          />
        );
      case "users":
        return (
          <UsersTab
            users={users}
            loading={usersLoading}
            onDelete={handleDeleteUser}
          />
        );
      case "kundalis":
        return (
          <KundalisTab
            kundalis={kundalis}
            loading={kundalisLoading}
            onDelete={handleDeleteKundali}
            onView={handleViewKundali}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={pageBg}>
      <Stars />
      <DecorativeElement />
      <ZodiacRing />
      <AmbientGlow />

      <AdminSidebar
        active={active}
        setActive={setActive}
        sideOpen={sideOpen}
        setSideOpen={setSideOpen}
        onLogout={() => { logout(); navigate("/"); }}
        user={sidebarUser}
      />

      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* Topbar */}
        <header
          className="sticky top-0 z-20 px-5 md:px-7 py-3.5 flex items-center justify-between"
          style={{
            background: "rgba(15,23,42,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: `1px solid ${r(0.08)}`,
          }}
        >
          <div className="flex items-center gap-4">
            <button
              className="cursor-pointer lg:hidden opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => setSideOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-light tracking-[0.2em] uppercase">
              <span style={{ color: r(0.35) }}>Admin</span>
              <span style={{ color: r(0.15) }}>·</span>
              <span style={{ color: COLORS.amber.text }} className="font-medium">
                {NAV_LABEL[active]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-[10px] px-3 py-1 rounded-full tracking-widest uppercase"
              style={{ background: COLORS.violet.bg, color: COLORS.violet.text, border: `1px solid ${COLORS.violet.border}` }}
            >
              Super Admin
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-light"
              style={{ background: COLORS.amber.bg, border: `1px solid ${COLORS.amber.border}`, color: COLORS.amber.text }}
            >
              {sidebarUser.initial}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-5 md:px-7 py-8 relative z-10 w-full max-w-5xl mx-auto">
          {renderContent()}
        </main>

        <footer className="px-7 py-4" style={{ borderTop: `1px solid ${r(0.07)}` }}>
          <p className="text-[10px] font-light tracking-[0.3em] uppercase text-center" style={{ color: r(0.15) }}>
            Nakshatra AI · Admin Panel · Restricted Access
          </p>
        </footer>
      </div>

      <BottomDecorativeElement />
    </div>
  );
};

export default AdminDashboard;