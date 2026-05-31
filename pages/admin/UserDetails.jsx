import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import Stars from "../../components/decorations/Stars";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import AdminSidebar from "../../components/admin/Sidebar";
import { glass, COLORS, pageBg } from "../../components/dashboard/theme";
import useAuth from "../../hooks/useAuth";
import { FaStroopwafel, FaRobot, FaFilePdf } from "react-icons/fa6";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const r = (o) => `rgba(255,255,255,${o})`;

const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
};

const Skeleton = ({ h = "20px", rounded = "8px" }) => (
  <div className="animate-pulse" style={{ height: h, borderRadius: rounded, background: r(0.07) }} />
);

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout, getToken } = useAuth();
  const [sideOpen, setSideOpen] = useState(false);
  const [data, setData] = useState(null);       // { user, kundalis }
  const [loading, setLoading] = useState(true);

  const sidebarUser = {
    name: user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || "Admin" : "Admin",
    initial: user?.first_name?.charAt(0)?.toUpperCase() || "A",
    line1: user?.email_address || "",
  };

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin/users/${id}/kundalis`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData(json);
      } catch {
        toast.error("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [id]);

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
      toast.error("Failed to load kundali");
    }
  };

  const u = data?.user;
  const kundalis = data?.kundalis ?? [];

  const infoFields = u ? [
    ["First Name",   u.first_name],
    ["Last Name",    u.last_name],
    ["Email",        u.email_address],
    ["Role",         u.user_role],
    ["Premium",      u.is_premium ? "Yes" : "No"],
    ["Verified",     u.email_verified ? "Yes" : "No"],
    ["Active",       u.is_active ? "Yes" : "No"],
    ["Joined",       formatDate(u.createdAt)],
  ] : [];

  const statCards = u ? [
    { label: "Kundalis",      value: kundalis.length,          icon: <FaStroopwafel />, color: "amber" },
    { label: "AI Questions",  value: u.ai_question_count ?? 0, icon: <FaRobot />,       color: "violet" },
    { label: "PDFs",          value: u.pdf_generated_count ?? 0, icon: <FaFilePdf />,   color: "rose" },
  ] : [];

  return (
    <div className="min-h-screen text-white relative overflow-hidden" style={pageBg}>
      <Stars />
      <DecorativeElement />
      <ZodiacRing />
      <AmbientGlow />

      <AdminSidebar
        active="users"
        setActive={(tab) => navigate("/admin-dashboard", { state: { tab } })}
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
            <button className="cursor-pointer lg:hidden opacity-50 hover:opacity-100" onClick={() => setSideOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-light tracking-[0.2em] uppercase">
              <button onClick={() => navigate("/admin-dashboard", { state: { tab: "users" } })} style={{ color: r(0.35) }}>
                Admin
              </button>
              <span style={{ color: r(0.15) }}>·</span>
              <button onClick={() => navigate("/admin-dashboard", { state: { tab: "users" } })} style={{ color: r(0.35) }}>
                Users
              </button>
              <span style={{ color: r(0.15) }}>·</span>
              <span style={{ color: COLORS.amber.text }} className="font-medium">
                {loading ? "Loading…" : `${u?.first_name} ${u?.last_name}`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin-dashboard", { state: { tab: "users" } })}
              className="cursor-pointer hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-light tracking-widest uppercase transition-all hover:opacity-80"
              style={{ background: r(0.05), border: `1px solid ${r(0.1)}`, color: r(0.55) }}
            >
              <MdOutlineKeyboardBackspace /> Back
            </button>
            <span
              className="text-[10px] px-3 py-1 rounded-full tracking-widest uppercase"
              style={{ background: COLORS.violet.bg, color: COLORS.violet.text, border: `1px solid ${COLORS.violet.border}` }}
            >
              Super Admin
            </span>
          </div>
        </header>

        <main className="flex-1 px-5 md:px-7 py-8 relative z-10 w-full max-w-5xl mx-auto space-y-8">
          {/* Page heading */}
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: r(0.3) }}>User Profile</p>
            {loading ? (
              <Skeleton h="36px" rounded="8px" />
            ) : (
              <h1 className="text-3xl font-light tracking-wider" style={{ color: r(0.92) }}>
                {u?.first_name} <span style={{ color: COLORS.amber.text }}>{u?.last_name}</span>
              </h1>
            )}
          </div>

          {/* Stat mini-cards */}
          {!loading && (
            <div className="grid grid-cols-3 gap-4">
              {statCards.map((s) => (
                <div key={s.label} className="p-4 rounded-2xl text-center" style={glass()}>
                  <div className="flex justify-center mb-2" style={{ color: COLORS[s.color].text, fontSize: "20px" }}>
                    {s.icon}
                  </div>
                  <p className="text-2xl font-light" style={{ color: r(0.9) }}>{s.value}</p>
                  <p className="text-[10px] tracking-wider uppercase mt-1" style={{ color: r(0.3) }}>{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* User info */}
          <div className="rounded-2xl overflow-hidden" style={glass()}>
            <div className="px-6 py-4" style={{ borderBottom: `1px solid ${r(0.07)}` }}>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: r(0.3) }}>Account</p>
              <h3 className="text-sm font-light tracking-wider" style={{ color: r(0.85) }}>User Information</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {loading
                ? [1,2,3,4,5,6].map(i => <Skeleton key={i} h="44px" rounded="12px" />)
                : infoFields.map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center p-3 rounded-xl"
                    style={{ background: r(0.04), border: `1px solid ${r(0.07)}` }}>
                    <span className="text-xs font-light" style={{ color: r(0.4) }}>{label}</span>
                    <span className="text-xs font-light text-right max-w-[55%] truncate" style={{ color: r(0.82) }}>{value ?? "—"}</span>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Kundalis */}
          <div className="rounded-2xl overflow-hidden" style={glass()}>
            <div className="px-6 py-4" style={{ borderBottom: `1px solid ${r(0.07)}` }}>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: r(0.3) }}>Charts</p>
              <h3 className="text-sm font-light tracking-wider" style={{ color: r(0.85) }}>
                Kundalis ({loading ? "…" : kundalis.length})
              </h3>
            </div>

            {loading ? (
              <div className="p-6 space-y-3">{[1,2,3].map(i => <Skeleton key={i} h="80px" rounded="12px" />)}</div>
            ) : kundalis.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm font-light" style={{ color: r(0.4) }}>No kundalis generated yet</p>
              </div>
            ) : (
              kundalis.map((k, i, arr) => (
                <button
                  key={k._id}
                  onClick={() => handleViewKundali(k)}
                  className="w-full text-left px-6 py-4 flex items-center gap-4 transition-colors hover:bg-white/[0.02] cursor-pointer"
                  style={{ borderBottom: i < arr.length - 1 ? `1px solid ${r(0.05)}` : "none" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: COLORS.amber.bg, border: `1px solid ${COLORS.amber.border}`, color: COLORS.amber.text }}
                  >
                    {k.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-light" style={{ color: r(0.85) }}>{k.name}</p>
                    <p className="text-xs font-light mt-0.5" style={{ color: r(0.35) }}>
                      {k.birth_details?.date} · {k.birth_details?.place}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-light" style={{ color: r(0.3) }}>{formatDate(k.createdAt)}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: COLORS.amber.text }}>View →</p>
                  </div>
                </button>
              ))
            )}
          </div>
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

export default UserDetail;