import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Stars from "../../components/decorations/Stars";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import UserSidebar from "../../components/user/Sidebar";
import StatCard from "../../components/dashboard/StatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import { glass, COLORS, pageBg } from "../../components/dashboard/theme";
import useAuth from "../../hooks/useAuth";
import { FaHandsPraying } from "react-icons/fa6";
import { FaStroopwafel } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdDelete } from "react-icons/md";

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

const formatMemberDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "long",
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

// ── Custom hook: fetch user data ──────────────────────────────────────────────
const useUserData = (getToken) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/user/me`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (!res.ok) throw new Error();
        setUserData(await res.json());
      } catch {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  return { userData, loading };
};

// ── Custom hook: fetch kundali list ───────────────────────────────────────────
const useKundaliList = (getToken) => {
  const [kundalis, setKundalis] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchKundalis = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/kundali/my`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setKundalis(data.kundalis || []);
    } catch {
      setKundalis([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKundalis();
  }, []);

  return { kundalis, loading, refetch: fetchKundalis, setKundalis };
};

// ─────────────────────────────────────────────────────────────────────────────
// OVERVIEW TAB
// ─────────────────────────────────────────────────────────────────────────────
// FIX: Added onView to props — used when user clicks a recent kundali row
const Overview = ({
  navigate,
  setActive,
  userData,
  userLoading,
  kundalis,
  kundaliLoading,
  onView,
}) => {
  const stats = [
    {
      label: "Kundalis Created",
      value: userLoading ? "…" : String(userData?.kundali_created_count ?? 0),
      sub: "Birth charts generated",
      color: "amber",
      icon: <FaStroopwafel />,
    },
    {
      label: "AI Questions",
      value: userLoading ? "…" : String(userData?.ai_question_count ?? 0),
      sub: "Asked to AI",
      color: "teal",
      icon: <FaRobot />,
    },
    {
      label: "PDFs Generated",
      value: userLoading ? "…" : String(userData?.pdf_generated_count ?? 0),
      sub: "Reports downloaded",
      color: "violet",
      icon: <FaFilePdf />,
    },
    {
      label: "Member Since",
      value: userLoading
        ? "…"
        : formatMemberDate(userData?.member_since).split(" ")[0].slice(0, 3),
      sub: userLoading ? "—" : formatMemberDate(userData?.member_since),
      color: "rose",
      icon: <MdOutlineAccessTimeFilled />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-2"
            style={{ color: r(0.3) }}
          >
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
          {userLoading ? (
            <Skeleton w="280px" h="44px" rounded="10px" />
          ) : (
            <div className="text-3xl md:text-4xl flex items-center">
              <h1
                className="font-light tracking-wider"
                style={{ color: r(0.92) }}
              >
                Namaste,{" "}
                <span style={{ color: COLORS.amber.text }}>
                  {userData?.first_name || "Friend"}
                </span>
              </h1>
              <FaHandsPraying
                className="mx-3"
                style={{ color: COLORS.amber.text }}
              />
            </div>
          )}
          <p
            className="text-sm font-light mt-2 tracking-wide"
            style={{ color: r(0.4) }}
          >
            Welcome to your personal Vedic astrology portal
          </p>
        </div>
        <button
          onClick={() => navigate("/generate-kundali")}
          className="cursor-pointer flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full font-medium tracking-widest uppercase text-white text-xs transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(135deg,#d97706,#b45309)",
            boxShadow: `0 4px 20px ${COLORS.amber.glow}`,
          }}
        >
          <FaPlus />
          Generate Kundali
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Recent Kundalis */}
      <ChartCard
        title="Recent Kundalis"
        subtitle="Your Charts"
        action={
          <button
            onClick={() => setActive("kundali")}
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
        }
        noPad
      >
        {kundaliLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} h="48px" rounded="12px" />
            ))}
          </div>
        ) : kundalis.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-light mb-3" style={{ color: r(0.4) }}>
              No kundalis generated yet
            </p>
            <button
              onClick={() => navigate("/generate-kundali")}
              className="cursor-pointer text-xs font-light tracking-widest uppercase px-4 py-2 rounded-full transition-all opacity-50 hover:opacity-100"
              style={{
                background: COLORS.amber.bg,
                color: COLORS.amber.text,
                border: `1px solid ${COLORS.amber.border}`,
              }}
            >
              Generate Your First Kundali
            </button>
          </div>
        ) : (
          kundalis.slice(0, 3).map((k, i, arr) => (
            <div
              key={k._id}
              className="px-6 py-4 flex items-center gap-4 cursor-pointer hover:bg-white/[0.03] transition-colors group"
              style={{
                borderBottom:
                  i < arr.length - 1 ? `1px solid ${r(0.06)}` : "none",
              }}
              onClick={() => onView(k)}
            >
              {/* FIX: was navigate(...k.kundali_data...) — now calls onView which fetches full data */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-light"
                style={{
                  background: i === 0 ? COLORS.amber.bg : r(0.04),
                  border:
                    i === 0
                      ? `1px solid ${COLORS.amber.border}`
                      : `1px solid ${r(0.2)}`,
                  color: i === 0 ? COLORS.amber.text : r(0.45),
                }}
              >
                {k.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-light truncate"
                  style={{ color: r(0.85) }}
                >
                  {k.name}
                </p>
                <p
                  className="text-xs font-light mt-0.5"
                  style={{ color: r(0.35) }}
                >
                  {k.birth_details?.date} · {k.birth_details?.place || "—"}
                </p>
              </div>
              <p
                className="text-xs font-light flex-shrink-0"
                style={{ color: r(0.3) }}
              >
                {formatDate(k.createdAt)}
              </p>
              <IoIosArrowForward style={{ color: r(0.3) }} />
            </div>
          ))
        )}
      </ChartCard>

      {/* Quick Actions */}
      <ChartCard title="Quick Actions" subtitle="What would you like to do?">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Generate Kundali */}
          <button
            onClick={() => navigate("/generate-kundali")}
            className="cursor-pointer p-5 rounded-xl text-left transition-all duration-200 hover:scale-[1.02]"
            style={glass(COLORS.amber.border)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "#f59e0b80")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = COLORS.amber.border)
            }
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: COLORS.amber.bg,
                border: `1px solid ${COLORS.amber.border}`,
              }}
            >
              <span style={{ fontSize: "20px", color: COLORS.amber.text }}>
                <FaStroopwafel />
              </span>
            </div>
            <h3
              className="text-sm font-light tracking-wide mb-1.5"
              style={{ color: r(0.88) }}
            >
              Generate Kundali
            </h3>
            <p
              className="text-xs font-light leading-relaxed"
              style={{ color: r(0.4) }}
            >
              Create your Vedic birth chart with accurate planetary positions
            </p>
            <div className="font-light text-xs mt-3 flex items-center gap-2">
              <p
                className="tracking-wider"
                style={{ color: COLORS.amber.text }}
              >
                Get Started
              </p>
              <FaLongArrowAltRight
                style={{ color: COLORS.amber.text }}
                className="font-light"
              />
            </div>
          </button>

          {/* Ask AI */}
          <div
            className="p-5 rounded-xl text-left relative"
            style={glass(COLORS.teal.border)}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: COLORS.teal.bg,
                border: `1px solid ${COLORS.teal.border}`,
              }}
            >
              <span style={{ fontSize: "20px", color: COLORS.teal.text }}>
                <FaRobot />
              </span>
            </div>
            <h3
              className="text-sm font-light tracking-wide mb-1.5"
              style={{ color: r(0.5) }}
            >
              Ask AI
            </h3>
            <p
              className="text-xs font-light leading-relaxed"
              style={{ color: r(0.3) }}
            >
              Get personalised astrological insights powered by AI
            </p>
          </div>

          {/* Download PDF — coming soon */}
          <div
            className="p-5 rounded-xl text-left relative"
            style={glass(COLORS.violet.border)}
          >
            <span
              className="absolute top-4 right-4 text-[10px] px-2 py-0.5 rounded-full tracking-wider"
              style={{
                background: COLORS.violet.bg,
                color: COLORS.violet.text,
                border: `1px solid ${COLORS.violet.border}`,
              }}
            >
              SOON
            </span>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: COLORS.violet.bg,
                border: `1px solid ${COLORS.violet.border}`,
              }}
            >
              <span style={{ fontSize: "20px", color: COLORS.violet.text }}>
                <FaFilePdf />
              </span>
            </div>
            <h3
              className="text-sm font-light tracking-wide mb-1.5"
              style={{ color: r(0.5) }}
            >
              Download PDF
            </h3>
            <p
              className="text-xs font-light leading-relaxed"
              style={{ color: r(0.3) }}
            >
              Save your detailed Kundali report as a PDF
            </p>
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// KUNDALI TAB — full list from database
// ─────────────────────────────────────────────────────────────────────────────
// FIX: Added onView to props — used when user clicks a kundali card
const MyKundalis = ({ navigate, kundalis, loading, onDelete, onView }) => {
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // don't trigger row click
    if (!confirm("Delete this Kundali?")) return;
    onDelete(id);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <p
            className="text-[10px] tracking-[0.35em] uppercase mb-1"
            style={{ color: r(0.3) }}
          >
            Library
          </p>
          <h2
            className="text-2xl font-light tracking-wider"
            style={{ color: r(0.9) }}
          >
            My Kundalis
          </h2>
        </div>
        <button
          onClick={() => navigate("/generate-kundali")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#d97706,#b45309)" }}
        >
          <FaPlus />
          Generate New
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} h="80px" rounded="16px" />
          ))}
        </div>
      ) : kundalis.length === 0 ? (
        // Empty state
        <div className="py-20 text-center" style={glass()}>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{
              background: COLORS.amber.bg,
              border: `1px solid ${COLORS.amber.border}`,
            }}
          >
            <span style={{ fontSize: "36px", color: COLORS.amber.text }}>
              <FaStroopwafel />
            </span>
          </div>
          <h3
            className="text-lg font-light tracking-wider mb-2"
            style={{ color: r(0.8) }}
          >
            No Kundalis Yet
          </h3>
          <p className="text-sm font-light mb-6" style={{ color: r(0.4) }}>
            Generate your first birth chart to get started
          </p>
          <button
            onClick={() => navigate("/generate-kundali")}
            className="px-8 py-3 rounded-full font-medium tracking-widest uppercase text-white text-xs transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#d97706,#b45309)" }}
          >
            Generate Kundali
          </button>
        </div>
      ) : (
        // Kundali cards grid
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kundalis.map((k, i) => (
            <div
              key={k._id}
              className="p-5 rounded-2xl cursor-pointer transition-all duration-200 group"
              style={glass(i === 0 ? COLORS.amber.border : r(0.1))}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor =
                  i === 0 ? "#f59e0b80" : r(0.2))
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor =
                  i === 0 ? COLORS.amber.border : r(0.1))
              }
              onClick={() => onView(k)}
            >
              {/* FIX: was navigate(...k.kundali_data...) — now calls onView which fetches full data */}

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-light flex-shrink-0"
                  style={{
                    background: i === 0 ? COLORS.amber.bg : r(0.04),
                    border:
                      i === 0
                        ? `1px solid ${COLORS.amber.border}`
                        : `1px solid ${r(0.09)}`,
                    color: i === 0 ? COLORS.amber.text : r(0.45),
                  }}
                >
                  {k.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      className="text-sm font-light truncate"
                      style={{ color: r(0.88) }}
                    >
                      {k.name}
                    </p>
                    {i === 0 && (
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded tracking-wider flex-shrink-0"
                        style={{
                          background: COLORS.amber.bg,
                          color: COLORS.amber.text,
                          border: `1px solid ${COLORS.amber.border}`,
                        }}
                      >
                        LATEST
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs font-light mt-0.5"
                    style={{ color: r(0.35) }}
                  >
                    {k.birth_details?.date} · {k.birth_details?.time}
                  </p>
                </div>
                {/* Delete button — visible on hover */}
                <button
                  onClick={(e) => handleDelete(e, k._id)}
                  className="cursor-pointer opacity-0 p-2 group-hover:opacity-100 transition-all duration-200 flex-shrink-0 rounded-md"
                  style={{ color: r(0.3), backgroundColor: "transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(251,113,133,0.9)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(251,113,133,0.1)";
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
              <div
                style={{
                  height: "1px",
                  background: r(0.07),
                  marginBottom: "14px",
                }}
              />

              {/* Details */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  ["Place", k.birth_details?.place || "—"],
                  ["Saved on", formatDate(k.createdAt)],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    className="p-2.5 rounded-xl"
                    style={{
                      background: r(0.04),
                      border: `1px solid ${r(0.07)}`,
                    }}
                  >
                    <p
                      className="text-[10px] font-light mb-0.5"
                      style={{ color: r(0.3) }}
                    >
                      {l}
                    </p>
                    <p
                      className="text-xs font-light truncate"
                      style={{ color: r(0.72) }}
                    >
                      {v}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="flex justify-end items-center gap-2"
                style={{ color: `${COLORS.amber.text}99` }}
              >
                <p className="text-xs font-medium tracking-wider">
                  View Full Chart{" "}
                </p>
                <FaLongArrowAltRight className="text-xs font-light" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE TAB
// ─────────────────────────────────────────────────────────────────────────────
const MyProfile = ({ userData, loading }) => (
  <div className="space-y-5 max-w-2xl">
    <div>
      <p
        className="text-[10px] tracking-[0.35em] uppercase mb-1"
        style={{ color: r(0.3) }}
      >
        Account
      </p>
      <h2
        className="text-2xl font-light tracking-wider"
        style={{ color: r(0.9) }}
      >
        Profile
      </h2>
    </div>

    {/* Hero */}
    <div
      className="p-6 rounded-2xl relative overflow-hidden"
      style={glass(COLORS.amber.border)}
    >
      <div
        className="absolute top-0 right-0 w-40 h-40 -mr-14 -mt-14 rounded-full"
        style={{ background: COLORS.amber.glow, filter: "blur(24px)" }}
      />
      <div className="relative flex items-center gap-5">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-light flex-shrink-0"
          style={{
            background: COLORS.amber.bg,
            border: `2px solid ${COLORS.amber.border}`,
            color: COLORS.amber.text,
          }}
        >
          {loading
            ? "?"
            : userData?.first_name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="space-y-2">
              <Skeleton w="180px" h="22px" />
              <Skeleton w="220px" h="16px" />
            </div>
          ) : (
            <>
              <h3
                className="text-lg font-light tracking-wider"
                style={{ color: r(0.9) }}
              >
                {userData?.first_name} {userData?.last_name}
              </h3>
              <p
                className="text-sm font-light mt-0.5"
                style={{ color: r(0.4) }}
              >
                {userData?.email_address}
              </p>
              <div className="flex items-center gap-2 mt-2.5">
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full tracking-wider"
                  style={{
                    background: COLORS.amber.bg,
                    color: COLORS.amber.text,
                    border: `1px solid ${COLORS.amber.border}`,
                  }}
                >
                  {userData?.user_role}
                </span>
                <span
                  className="text-[11px] font-light"
                  style={{ color: r(0.3) }}
                >
                  Member since {formatMemberDate(userData?.member_since)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    {/* Account details */}
    <ChartCard title="Personal Information" subtitle="Account Details">
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} h="18px" />
          ))}
        </div>
      ) : (
        <div className="-mx-6 -mb-6">
          {[
            ["First Name", userData?.first_name],
            ["Last Name", userData?.last_name],
            ["Email", userData?.email_address],
            ["Role", userData?.user_role],
            ["Member Since", formatMemberDate(userData?.member_since)],
          ].map(([l, v], i, arr) => (
            <div
              key={l}
              className="px-6 py-3.5 flex items-center justify-between"
              style={{
                borderBottom:
                  i < arr.length - 1 ? `1px solid ${r(0.07)}` : "none",
              }}
            >
              <span className="text-sm font-light" style={{ color: r(0.4) }}>
                {l}
              </span>
              <span className="text-sm font-light" style={{ color: r(0.8) }}>
                {v || "—"}
              </span>
            </div>
          ))}
        </div>
      )}
    </ChartCard>

    {/* Usage stats */}
    <ChartCard title="Activity Stats" subtitle="Usage">
      <div className="grid grid-cols-3 -mx-6 -mb-6">
        {[
          {
            label: "Kundalis",
            value: userData?.kundali_created_count ?? 0,
            color: COLORS.amber,
          },
          {
            label: "AI Chats",
            value: userData?.ai_question_count ?? 0,
            color: COLORS.teal,
          },
          {
            label: "PDFs",
            value: userData?.pdf_generated_count ?? 0,
            color: COLORS.violet,
          },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            className="p-5 text-center"
            style={{
              borderRight: i < arr.length - 1 ? `1px solid ${r(0.07)}` : "none",
            }}
          >
            {loading ? (
              <div className="flex justify-center mt-2">
                <Skeleton w="30px" h="28px" />
              </div>
            ) : (
              <p
                className="text-2xl font-light mt-1.5"
                style={{ color: item.color.text }}
              >
                {item.value}
              </p>
            )}
            <p
              className="text-[11px] font-light mt-0.5"
              style={{ color: r(0.35) }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </ChartCard>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SETTINGS TAB
// ─────────────────────────────────────────────────────────────────────────────
const SettingsTab = ({ logout, navigate }) => {
  const [tog, setTog] = useState({ email: true, alerts: false });

  return (
    <div className="space-y-7 max-w-2xl">
      <div>
        <p
          className="text-[10px] tracking-[0.35em] uppercase mb-1"
          style={{ color: r(0.3) }}
        >
          Preferences
        </p>
        <h2
          className="text-2xl font-light tracking-wider"
          style={{ color: r(0.9) }}
        >
          Settings
        </h2>
      </div>

      <ChartCard title="Notifications" subtitle="Communication">
        <div className="-mx-6 -mb-6">
          {[
            {
              key: "email",
              label: "Email Updates",
              desc: "Receive product updates and news via email",
            },
            {
              key: "alerts",
              label: "Planet Alerts",
              desc: "Get notified about major planetary events",
            },
          ].map((item, i, arr) => (
            <div
              key={item.key}
              className="px-6 py-4 flex items-center justify-between gap-4"
              style={{
                borderBottom:
                  i < arr.length - 1 ? `1px solid ${r(0.07)}` : "none",
              }}
            >
              <div>
                <p className="text-sm font-light" style={{ color: r(0.72) }}>
                  {item.label}
                </p>
                <p
                  className="text-xs font-light mt-0.5"
                  style={{ color: r(0.32) }}
                >
                  {item.desc}
                </p>
              </div>
              <button
                onClick={() =>
                  setTog((t) => ({ ...t, [item.key]: !t[item.key] }))
                }
                className="w-11 h-6 rounded-full flex-shrink-0 relative transition-all duration-300"
                style={{
                  background: tog[item.key] ? `${COLORS.amber.text}60` : r(0.1),
                  border: tog[item.key]
                    ? `1px solid ${COLORS.amber.border}`
                    : `1px solid ${r(0.12)}`,
                }}
              >
                <div
                  className="w-4 h-4 rounded-full absolute top-0.5 transition-all duration-300"
                  style={{
                    background: tog[item.key] ? COLORS.amber.text : r(0.4),
                    left: tog[item.key] ? "calc(100% - 18px)" : "2px",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </ChartCard>

      <ChartCard title="Account" subtitle="Manage">
        <div className="-mx-6 -mb-6">
          <div
            className="px-6 py-4 flex items-center justify-between gap-4"
            style={{ borderBottom: `1px solid ${r(0.07)}` }}
          >
            <div>
              <p className="text-sm font-light" style={{ color: r(0.72) }}>
                Change Password
              </p>
              <p
                className="text-xs font-light mt-0.5"
                style={{ color: r(0.32) }}
              >
                Update your account password
              </p>
            </div>
            <button
              className="cursor-pointer text-xs px-3 py-1.5 rounded-lg font-light flex-shrink-0 transition-all duration-300"
              style={{
                background: r(0.05),
                color: r(0.5),
                border: `1px solid ${r(0.1)}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = r(0.1);
                e.currentTarget.style.color = r(0.8);
                e.currentTarget.style.border = `1px solid ${r(0.2)}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = r(0.05);
                e.currentTarget.style.color = r(0.5);
                e.currentTarget.style.border = `1px solid ${r(0.1)}`;
              }}
            >
              Update
            </button>
          </div>
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-light" style={{ color: r(0.72) }}>
                Logout
              </p>
              <p
                className="text-xs font-light mt-0.5"
                style={{ color: r(0.32) }}
              >
                Sign out of your account
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="cursor-pointer text-xs px-3 py-1.5 rounded-lg font-light flex-shrink-0 transition-all duration-300"
              style={{
                background: COLORS.rose.bg,
                color: COLORS.rose.text,
                border: `1px solid ${COLORS.rose.border}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.rose.border;
                e.currentTarget.style.color = COLORS.rose.text;
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLORS.rose.bg;
                e.currentTarget.style.color = COLORS.rose.text;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, getToken } = useAuth();

  // FIX 1: Read active tab from URL ?tab= so sidebar nav on other pages works
  const location = useLocation();
  const [active, setActive] = useState(location.state?.tab || "overview");
  const [sideOpen, setSideOpen] = useState(false);
  useEffect(() => {
    if (location.state?.tab) {
      window.history.replaceState({}, "");
    }
  }, []);

  // Real data hooks
  const { userData, loading: userLoading } = useUserData(getToken);
  const {
    kundalis,
    loading: kundaliLoading,
    setKundalis,
  } = useKundaliList(getToken);

  // FIX 2: Fetch full kundali data before navigating to ShowKundali
  // The list API excludes kundali_data for performance, so we fetch it here on click
  const handleViewKundali = async (k) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/kundali/${k._id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const full = await res.json();
      navigate("/show-kundali", {
        state: {
          kundaliData: { ...full.kundali_data, _id: full._id },
          name: full.name,
          birthDetails: full.birth_details,
        },
      });
    } catch {
      alert("Failed to load kundali. Please try again.");
    }
  };

  // Delete kundali
  const handleDelete = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/api/kundali/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setKundalis((prev) => prev.filter((k) => k._id !== id));
    } catch {
      alert("Failed to delete kundali");
    }
  };

  const sidebarUser = {
    name: userLoading
      ? "Loading…"
      : `${userData?.first_name || ""} ${userData?.last_name || ""}`.trim() ||
        "User",
    initial: userLoading
      ? "U"
      : userData?.first_name?.charAt(0)?.toUpperCase() || "U",
    line1: userLoading ? "" : userData?.email_address || "",
  };

  const NAV_LABEL = {
    overview: "Overview",
    kundali: "Kundalis",
    profile: "Profile",
    settings: "Settings",
  };

  const renderContent = () => {
    switch (active) {
      case "overview":
        return (
          <Overview
            navigate={navigate}
            setActive={setActive}
            userData={userData}
            userLoading={userLoading}
            kundalis={kundalis}
            kundaliLoading={kundaliLoading}
            onView={handleViewKundali}
          />
        );
      case "kundali":
        return (
          <MyKundalis
            navigate={navigate}
            kundalis={kundalis}
            loading={kundaliLoading}
            onDelete={handleDelete}
            onView={handleViewKundali}
          />
        );
      case "profile":
        return <MyProfile userData={userData} loading={userLoading} />;
      case "settings":
        return <SettingsTab logout={logout} navigate={navigate} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={pageBg}
    >
      {/* Same decorations as Home.jsx */}
      <Stars />
      <DecorativeElement />
      <ZodiacRing />
      <AmbientGlow />

      {/* Sidebar */}
      <UserSidebar
        active={active}
        setActive={setActive}
        sideOpen={sideOpen}
        setSideOpen={setSideOpen}
        onGenerate={() => navigate("/generate-kundali")}
        onLogout={() => {
          logout();
          navigate("/");
        }}
        user={sidebarUser}
      />

      {/* Main */}
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
              className="lg:hidden opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => setSideOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-light tracking-[0.2em] uppercase">
              <span style={{ color: r(0.35) }}>Dashboard</span>
              <span style={{ color: r(0.15) }}>·</span>
              <span
                style={{ color: COLORS.amber.text }}
                className="font-medium"
              >
                {NAV_LABEL[active]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/generate-kundali")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#d97706,#b45309)" }}
            >
              <FaPlus />
              New Chart
            </button>
            <button
              onClick={() => setActive("profile")}
              className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center text-sm font-light opacity-80 hover:opacity-100 transition-all"
              style={{
                background: COLORS.amber.bg,
                border: `1px solid ${COLORS.amber.border}`,
                color: COLORS.amber.text,
              }}
            >
              {sidebarUser.initial}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-5 md:px-7 py-8 relative z-10 w-full max-w-5xl mx-auto">
          {renderContent()}
        </main>

        <footer
          className="px-7 py-4"
          style={{ borderTop: `1px solid ${r(0.07)}` }}
        >
          <p
            className="text-[10px] font-light tracking-[0.3em] uppercase text-center"
            style={{ color: r(0.15) }}
          >
            Kundali Marg · Vedic Astrology · For Educational Purposes Only
          </p>
        </footer>
      </div>

      <BottomDecorativeElement />
    </div>
  );
};

export default UserDashboard;
