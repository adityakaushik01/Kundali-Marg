// components/dashboard/theme.js
// Shared design tokens for all dashboards.
// Import these instead of hardcoding colors/styles everywhere.

export const COLORS = {
  amber:  { text:"#f59e0b", bg:"rgba(245,158,11,0.08)",  border:"rgba(245,158,11,0.18)",  glow:"rgba(245,158,11,0.12)"  },
  teal:   { text:"#2dd4bf", bg:"rgba(45,212,191,0.08)",  border:"rgba(45,212,191,0.18)",  glow:"rgba(45,212,191,0.12)"  },
  violet: { text:"#a78bfa", bg:"rgba(167,139,250,0.08)", border:"rgba(167,139,250,0.18)", glow:"rgba(167,139,250,0.12)" },
  rose:   { text:"#fb7185", bg:"rgba(251,113,133,0.08)", border:"rgba(251,113,133,0.18)", glow:"rgba(251,113,133,0.12)" },
  sky:    { text:"#38bdf8", bg:"rgba(56,189,248,0.08)",  border:"rgba(56,189,248,0.18)",  glow:"rgba(56,189,248,0.12)"  },
  gold:   { text:"#fbbf24", bg:"rgba(251,191,36,0.08)",  border:"rgba(251,191,36,0.18)",  glow:"rgba(251,191,36,0.12)"  },
};

// Glassmorphism card style — matches Home.jsx aesthetic
export const glass = (borderColor = "rgba(255,255,255,0.1)") => ({
  background:           "rgba(15,20,40,0.6)",
  backdropFilter:       "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border:               `1px solid ${borderColor}`,
  borderRadius:         "16px",
});

// Page background — matches slate-900 → gray-800 → teal-900
export const pageBg = {
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #0f2027 65%, #0f172a 100%)",
};

// Sidebar background
export const sidebarBg = {
  background:     "rgba(10,15,30,0.97)",
  backdropFilter: "blur(24px)",
  borderRight:    "1px solid rgba(255,255,255,0.08)",
};

// Text readability scale
export const TEXT = {
  primary:   "rgba(255,255,255,0.92)",
  secondary: "rgba(255,255,255,0.60)",
  muted:     "rgba(255,255,255,0.35)",
  label:     "rgba(255,255,255,0.25)",
};