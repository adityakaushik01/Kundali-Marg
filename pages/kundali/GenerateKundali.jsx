import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

// Decorations — same as dashboard
import Stars from "../../components/decorations/Stars";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";

// Sidebar — same as dashboard
import UserSidebar from "../../components/user/Sidebar";

// Theme tokens — same glass, colors, background as dashboard
import { glass, COLORS, pageBg } from "../../components/dashboard/theme";

// Auth
import useAuth from "../../hooks/useAuth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

// ── MUI dark theme — amber accents ────────────────────────────────────────────
const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#f59e0b" },
    background: { default: "#1f2937", paper: "rgba(15,20,40,0.97)" },
    text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.6)" },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            backdropFilter: "blur(20px)",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(245,158,11,0.5)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(255,255,255,0.08)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f59e0b",
                borderWidth: "1.5px",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.12)",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255,255,255,0.4)",
            "&.Mui-focused": { color: "#f59e0b" },
          },
          "& .MuiInputBase-input": {
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: 300,
          },
          "& .MuiSvgIcon-root": { color: "rgba(245,158,11,0.7)" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(15,20,40,0.97)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(245,158,11,0.2)",
          borderRadius: "16px",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&:hover": { backgroundColor: "rgba(245,158,11,0.15)" },
          "&.Mui-selected": {
            backgroundColor: "#f59e0b",
            color: "#000",
            "&:hover": { backgroundColor: "#d97706" },
          },
        },
      },
    },
    MuiClock: {
      styleOverrides: {
        pin: { backgroundColor: "#f59e0b" },
        clock: {
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(245,158,11,0.2)",
        },
        amButton: {
          color: "#ffffff",
          "&.Mui-selected": { backgroundColor: "#f59e0b", color: "#000" },
        },
        pmButton: {
          color: "#ffffff",
          "&.Mui-selected": { backgroundColor: "#f59e0b", color: "#000" },
        },
      },
    },
    MuiClockNumber: {
      styleOverrides: {
        root: {
          color: "rgba(255,255,255,0.8)",
          "&.Mui-selected": { backgroundColor: "#f59e0b", color: "#000" },
        },
      },
    },
    MuiClockPointer: {
      styleOverrides: {
        root: { backgroundColor: "#f59e0b" },
        thumb: { backgroundColor: "#f59e0b", borderColor: "#f59e0b" },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: { color: "#ffffff" },
        switchViewButton: { color: "#f59e0b" },
        iconButton: { color: "#f59e0b" },
      },
    },
    MuiTimeClock: {
      styleOverrides: {
        root: { backgroundColor: "rgba(15,20,40,0.97)", padding: "20px" },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          "& .MuiButton-root": {
            color: "#f59e0b",
            "&:hover": { backgroundColor: "rgba(245,158,11,0.1)" },
          },
        },
      },
    },
  },
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const r = (o) => `rgba(255,255,255,${o})`;

// Input style — matches dashboard glass inputs
const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 300,
  outline: "none",
  transition: "border-color 0.2s, background 0.2s",
};

// ── Component ─────────────────────────────────────────────────────────────────
const GenerateKundali = () => {
  const navigate = useNavigate();
  const { user, logout, getToken } = useAuth();

  const [sideOpen, setSideOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    birthDate: dayjs(),
    birthTime: dayjs(),
    address: "",
    latitude: null,
    longitude: null,
    timezone: null,
    timezoneOffset: null,
  });

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const sidebarUser = {
    name: user
      ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || "User"
      : "User",
    initial: user?.first_name?.charAt(0)?.toUpperCase() || "U",
    line1: user?.email || "",
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSearch = async (value) => {
    handleChange("address", value);
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&limit=5&apiKey=${API_KEY}`,
      );
      const data = await res.json();
      setSuggestions(data.features || []);
    } catch {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const p = suggestion.properties;
    setFormData((prev) => ({
      ...prev,
      address: `${p.city || p.name}, ${p.state}, ${p.country}`,
      latitude: p.lat,
      longitude: p.lon,
      timezone: p.timezone?.name,
      timezoneOffset: p.timezone?.offset_STD_seconds,
    }));
    setSuggestions([]);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Please enter the full name");
      return false;
    }
    if (!formData.birthDate) {
      setError("Please select a birth date");
      return false;
    }
    if (!formData.birthTime) {
      setError("Please select a birth time");
      return false;
    }
    if (!formData.address.trim()) {
      setError("Please enter the birth place");
      return false;
    }
    if (!formData.latitude || !formData.longitude) {
      setError("Please select a valid location from the suggestions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    setLoading(true);

    const combinedDateTime = formData.birthDate
      .hour(formData.birthTime.hour())
      .minute(formData.birthTime.minute())
      .second(0)
      .millisecond(0);

    try {
      const response = await fetch(`${BACKEND_URL}/api/kundli`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`, // useAuth — not localStorage
        },
        body: JSON.stringify({
          datetime: combinedDateTime.toISOString(),
          latitude: formData.latitude,
          longitude: formData.longitude,
          name: formData.name.trim(),
          timezone: formData.timezone,
          timezoneOffset: formData.timezoneOffset,
          place: formData.address, // saves to DB
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.message || errData.error || `Error ${response.status}`,
        );
      }

      const data = await response.json();

      if (data.status === "success" && data.data) {
        navigate("/show-kundali", {
  state: {
    kundaliData: { ...data, _id: data.kundali_id, dasha_timeline: data.dasha_timeline },
    name: formData.name.trim(),
    birthDetails: {
      date: combinedDateTime.format("DD/MM/YYYY"),
      time: combinedDateTime.format("hh:mm A"),
      place: formData.address,
    },
  },
});
      } else {
        throw new Error(data.message || "Failed to generate kundali");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    // pageBg from theme.js — same as dashboard
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={pageBg}
    >
      {/* Same decorations as dashboard */}
      <Stars />
      <DecorativeElement />
      <ZodiacRing />
      <AmbientGlow />

      {/* Same sidebar as dashboard — no active tab since this is a separate page */}
      <UserSidebar
        active=""
        setActive={() => {}}
        sideOpen={sideOpen}
        setSideOpen={setSideOpen}
        onGenerate={() => {}}
        onLogout={() => {
          logout();
          navigate("/");
        }}
        user={sidebarUser}
      />

      {/* Main — same lg:pl-64 as dashboard */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* Topbar — same style as dashboard topbar */}
        <header
          className="sticky top-0 z-20 px-5 md:px-7 py-3.5 flex items-center justify-between"
          style={{
            background: "rgba(15,23,42,0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: `1px solid ${r(0.08)}`,
          }}
        >
          {/* Left — hamburger + breadcrumb */}
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
            {/* Breadcrumb: Dashboard → Generate Kundali */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-light tracking-[0.2em] uppercase">
              <button
                onClick={() => navigate("/dashboard")}
                className="transition-opacity hover:opacity-100 uppercase"
                style={{ color: r(0.3) }}
              >
                Dashboard
              </button>
              <span style={{ color: r(0.15) }}>·</span>
              <span style={{ color: COLORS.amber.text }}>Generate Kundali</span>
            </div>
          </div>

          {/* Right — back button + avatar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-light tracking-widest uppercase transition-all hover:opacity-80"
              style={{
                background: r(0.05),
                border: `1px solid ${r(0.1)}`,
                color: r(0.55),
              }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back
            </button>
            <button
              onClick={() =>
                navigate("/dashboard", { state: { tab: "profile" } })
              }
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

        {/* Page content */}
        <main className="flex-1 px-5 md:px-7 py-8 relative z-10 w-full max-w-5xl mx-auto">
          {/* Page title — same style as dashboard section titles */}
          <div className="mb-8">
            <p
              className="text-[10px] tracking-[0.35em] uppercase mb-1"
              style={{ color: r(0.3) }}
            >
              Kundali
            </p>
            <h1
              className="text-2xl md:text-3xl font-light tracking-wider"
              style={{ color: r(0.92) }}
            >
              Generate{" "}
              <span style={{ color: COLORS.amber.text }}>Janam Kundali</span>
            </h1>
            <p
              className="text-sm font-light mt-1.5 tracking-wide"
              style={{ color: r(0.4) }}
            >
              Enter birth details to calculate the Vedic birth chart
            </p>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form card — 2/3 width, uses glass() from theme.js */}
            <div className="lg:col-span-2">
              <div style={glass()}>
                {/* Card header — same as ChartCard header style */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ borderBottom: `1px solid ${r(0.07)}` }}
                >
                  <div>
                    <p
                      className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
                      style={{ color: r(0.3) }}
                    >
                      Birth Information
                    </p>
                    <h3
                      className="text-sm font-light tracking-wider"
                      style={{ color: r(0.85) }}
                    >
                      Fill in the details below
                    </h3>
                  </div>
                  <span style={{ fontSize: "20px" }}>🔮</span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Error — uses COLORS.rose from theme.js */}
                  {error && (
                    <div
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{
                        background: COLORS.rose.bg,
                        border: `1px solid ${COLORS.rose.border}`,
                      }}
                    >
                      <span style={{ fontSize: "14px", flexShrink: 0 }}>
                        ⚠️
                      </span>
                      <p
                        className="text-sm font-light"
                        style={{ color: COLORS.rose.text }}
                      >
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label
                      className="block text-xs font-light tracking-[0.2em] uppercase mb-2.5"
                      style={{ color: r(0.4) }}
                    >
                      Full Name{" "}
                      <span style={{ color: COLORS.amber.text }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter full name"
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = COLORS.amber.border;
                        e.target.style.background = "rgba(255,255,255,0.07)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.12)";
                        e.target.style.background = "rgba(255,255,255,0.05)";
                      }}
                      required
                    />
                  </div>

                  {/* Date + Time */}
                  <div>
                    <label
                      className="block text-xs font-light tracking-[0.2em] uppercase mb-2.5"
                      style={{ color: r(0.4) }}
                    >
                      Date & Time of Birth{" "}
                      <span style={{ color: COLORS.amber.text }}>*</span>
                    </label>
                    <ThemeProvider theme={muiTheme}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <DatePicker
                            value={formData.birthDate}
                            onChange={(v) => handleChange("birthDate", v)}
                            open={openDate}
                            onClose={() => setOpenDate(false)}
                            onOpen={() => setOpenDate(true)}
                            maxDate={dayjs()}
                            format="DD/MM/YYYY"
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: "outlined",
                                onClick: () => setOpenDate(true),
                                InputProps: {
                                  style: {
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    fontWeight: 300,
                                  },
                                  readOnly: true,
                                },
                              },
                            }}
                          />
                          <TimePicker
                            value={formData.birthTime}
                            onChange={(v) => handleChange("birthTime", v)}
                            open={openTime}
                            onClose={() => setOpenTime(false)}
                            onOpen={() => setOpenTime(true)}
                            viewRenderers={{
                              hours: renderTimeViewClock,
                              minutes: renderTimeViewClock,
                            }}
                            views={["hours", "minutes"]}
                            format="hh:mm A"
                            ampm
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                variant: "outlined",
                                onClick: () => setOpenTime(true),
                                InputProps: {
                                  style: {
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    fontWeight: 300,
                                  },
                                  readOnly: true,
                                },
                              },
                            }}
                          />
                        </div>
                      </LocalizationProvider>
                    </ThemeProvider>
                  </div>

                  {/* Place of Birth */}
                  <div>
                    <label
                      className="block text-xs font-light tracking-[0.2em] uppercase mb-1"
                      style={{ color: r(0.4) }}
                    >
                      Place of Birth{" "}
                      <span style={{ color: COLORS.amber.text }}>*</span>
                    </label>
                    <p
                      className="text-xs font-light mb-2.5"
                      style={{ color: r(0.28) }}
                    >
                      Type and select from the suggestions
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search birth city..."
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = COLORS.amber.border;
                          e.target.style.background = "rgba(255,255,255,0.07)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(255,255,255,0.12)";
                          e.target.style.background = "rgba(255,255,255,0.05)";
                        }}
                      />

                      {/* Suggestions dropdown */}
                      {suggestions.length > 0 && (
                        <div
                          className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50"
                          style={{
                            background: "rgba(10,15,30,0.98)",
                            backdropFilter: "blur(24px)",
                            border: `1px solid ${COLORS.amber.border}`,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                            maxHeight: "220px",
                            overflowY: "auto",
                          }}
                        >
                          {suggestions.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSelectSuggestion(item)}
                              className="px-4 py-3.5 cursor-pointer transition-colors"
                              style={{
                                borderBottom:
                                  idx < suggestions.length - 1
                                    ? `1px solid ${r(0.06)}`
                                    : "none",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background =
                                  COLORS.amber.bg)
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                  "transparent")
                              }
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  style={{
                                    fontSize: "13px",
                                    marginTop: "2px",
                                    flexShrink: 0,
                                  }}
                                >
                                  📍
                                </span>
                                <div>
                                  <p
                                    className="text-sm font-light"
                                    style={{ color: r(0.82) }}
                                  >
                                    {item.properties.formatted}
                                  </p>
                                  <p
                                    className="text-xs font-light mt-0.5"
                                    style={{ color: r(0.3) }}
                                  >
                                    {parseFloat(item.properties.lat).toFixed(4)}
                                    °,{" "}
                                    {parseFloat(item.properties.lon).toFixed(4)}
                                    °
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Location confirmed — uses COLORS.teal from theme.js */}
                    {formData.latitude && formData.longitude && (
                      <div
                        className="mt-3 flex items-center gap-2 px-4 py-2.5 rounded-xl"
                        style={{
                          background: COLORS.teal.bg,
                          border: `1px solid ${COLORS.teal.border}`,
                        }}
                      >
                        <div className="flex items-center gap-2"></div>
                        <span
                          style={{ fontSize: "12px", color: COLORS.teal.text }}
                        >
                          ✓
                        </span>
                        <p
                          className="text-xs font-light"
                          style={{ color: COLORS.teal.text }}
                        >
                          {formData.address}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submit — same gradient as sidebar CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-xs font-light tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: "linear-gradient(135deg,#d97706,#b45309)",
                      color: "#fff",
                      boxShadow: loading
                        ? "none"
                        : `0 4px 24px ${COLORS.amber.glow}`,
                    }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Calculating positions...
                      </div>
                    ) : (
                      <div className="cursor-pointer flex items-center justify-center gap-2">
                        Generate Kundali
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Info panel — 1/3 width, all use glass() from theme.js */}
            <div className="space-y-4">
              {/* Why accuracy matters */}
              <div style={glass(COLORS.amber.border)}>
                <div
                  className="px-5 py-4"
                  style={{ borderBottom: `1px solid ${r(0.07)}` }}
                >
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
                    style={{ color: r(0.3) }}
                  >
                    Important
                  </p>
                  <h3
                    className="text-sm font-light tracking-wider"
                    style={{ color: r(0.85) }}
                  >
                    Why accuracy matters
                  </h3>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    {
                      icon: "📅",
                      title: "Date",
                      desc: "Determines exact planetary positions",
                    },
                    {
                      icon: "⏰",
                      title: "Time",
                      desc: "Critical for Lagna (ascendant) calculation",
                    },
                    {
                      icon: "📍",
                      title: "Place",
                      desc: "Affects all 12 house placements",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: COLORS.amber.bg,
                          border: `1px solid ${COLORS.amber.border}`,
                        }}
                      >
                        <span style={{ fontSize: "14px" }}>{item.icon}</span>
                      </div>
                      <div>
                        <p
                          className="text-xs font-light tracking-wide mb-0.5"
                          style={{ color: r(0.75) }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-xs font-light leading-relaxed"
                          style={{ color: r(0.38) }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What you'll receive */}
              <div style={glass()}>
                <div
                  className="px-5 py-4"
                  style={{ borderBottom: `1px solid ${r(0.07)}` }}
                >
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
                    style={{ color: r(0.3) }}
                  >
                    Output
                  </p>
                  <h3
                    className="text-sm font-light tracking-wider"
                    style={{ color: r(0.85) }}
                  >
                    What you'll receive
                  </h3>
                </div>
                <div className="p-5 space-y-2.5">
                  {[
                    "Rasi (birth) chart",
                    "All 9 planetary positions",
                    "Lagna & nakshatra details",
                    "12 house analysis",
                    "Vimshottari Dasha periods",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: COLORS.amber.text, opacity: 0.6 }}
                      />
                      <span
                        className="text-xs font-light"
                        style={{ color: r(0.55) }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy */}
              <div style={glass()}>
                <div className="p-5 flex items-start gap-3">
                  <span style={{ fontSize: "16px", flexShrink: 0 }}>🔒</span>
                  <div>
                    <p
                      className="text-xs font-light tracking-wide mb-1"
                      style={{ color: r(0.65) }}
                    >
                      Your data is private
                    </p>
                    <p
                      className="text-xs font-light leading-relaxed"
                      style={{ color: r(0.32) }}
                    >
                      Birth details are stored securely and only visible to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer — same as dashboard */}
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

export default GenerateKundali;
