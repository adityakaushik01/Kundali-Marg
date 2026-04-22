import { Link } from "react-router-dom";
import logoImage from "../../src/assets/logo/logo.png";
import { LuLogOut } from "react-icons/lu";

const SidebarBase = ({
  navItems    = [],
  active,
  setActive,
  sideOpen,
  setSideOpen,
  accent      = { text:"#f59e0b", bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.2)", glow:"rgba(245,158,11,0.08)" },
  cta         = null,
  user        = { name:"User", initial:"U", line1:"" },
  onLogout,
  logo        = { top:"Kundali", bottom:"MARG" },
  children,
}) => (
  <>
    {/* Mobile backdrop */}
    {sideOpen && (
      <div
        className="fixed inset-0 z-30 lg:hidden"
        style={{ background:"rgba(0,0,0,0.65)", backdropFilter:"blur(4px)" }}
        onClick={() => setSideOpen(false)}
      />
    )}

    <aside
      className={`fixed top-0 left-0 h-full z-40 flex flex-col w-64 transition-transform duration-300 ease-in-out ${sideOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      style={{
        background:           "rgba(8,12,26,0.97)",
        backdropFilter:       "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRight:          "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* ── Logo ── */}
      <div className="px-6 pt-7 pb-5 flex items-center justify-between flex-shrink-0">
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-105"
            style={{ background:accent.bg, border:`1px solid ${accent.border}`, boxShadow:`0 0 16px ${accent.glow}` }}
          >
            <img src={logoImage} className="w-5" alt="Logo" />
          </div>
          <div className="leading-tight">
            <p className="text-white text-xs font-light tracking-[0.22em] uppercase">{logo.top}</p>
            <p className="text-[10px] tracking-[0.35em]" style={{ color:accent.text }}>{logo.bottom}</p>
          </div>
        </Link>
        <button
          className="lg:hidden transition-colors"
          style={{ color:"rgba(255,255,255,0.3)" }}
          onClick={() => setSideOpen(false)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* ── CTA ── */}
      {cta && (
        <div className="px-4 pb-4 flex-shrink-0">
          <button
            onClick={() => { cta.onClick?.(); setSideOpen(false); }}
            className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-normal tracking-widest uppercase transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: cta.gradient, color:"#fff", boxShadow:`0 4px 20px ${accent.glow}` }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d={cta.icon || "M12 5v14M5 12h14"}/>
            </svg>
            {cta.label}
          </button>
        </div>
      )}

      {/* ── Divider ── */}
      <div style={{ height:"1px", background:"rgba(255,255,255,0.07)", margin:"0 20px 14px" }} className="flex-shrink-0" />

      {/* ── Nav items ── */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] tracking-[0.3em] uppercase" style={{ color:"rgba(255,255,255,0.2)" }}>
          Menu
        </p>
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <div key={item.id}>
              <button
                onClick={() => { setActive(item.id); setSideOpen(false); }}
                className="cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left relative"
                style={isActive
                  ? { background:accent.bg, border:`1px solid ${accent.border}`, color:accent.text }
                  : { border:"1px solid transparent", color:"rgba(255,255,255,0.45)" }
                }
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color="rgba(255,255,255,0.78)"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color="rgba(255,255,255,0.45)"; e.currentTarget.style.background="transparent"; }}}
              >
                {/* Active bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full" style={{ background:accent.text }} />
                )}
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="text-sm font-light tracking-wide flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-normal flex-shrink-0"
                    style={{ background:accent.bg, color:accent.text, border:`1px solid ${accent.border}` }}>
                    {item.badge}
                  </span>
                )}
              </button>
              {/* Section separator */}
              {item.separator && (
                <div style={{ height:"1px", background:"rgba(255,255,255,0.06)", margin:"6px 12px" }} />
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Extra slot (quick stats etc.) ── */}
      {children && (
        <div className="px-4 pb-3 flex-shrink-0">
          {children}
        </div>
      )}

      {/* ── Divider ── */}
      <div style={{ height:"1px", background:"rgba(255,255,255,0.07)", margin:"12px 20px 12px" }} className="flex-shrink-0" />

      {/* ── User card ── */}
      <div className="px-4 pb-6 flex-shrink-0">
        <div className="py-3.5 px-2 rounded-xl flex items-center gap-3"
          style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-light"
            style={{ background:accent.bg, border:`1px solid ${accent.border}`, color:accent.text }}
          >
            {user.initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-light tracking-wide truncate" style={{ color:"rgba(255,255,255,0.82)" }}>
              {user.name}
            </p>
            <p className="text-[10px] font-light tracking-wide truncate" style={{ color:"rgba(255,255,255,0.32)" }}>
              {user.line1}
            </p>
          </div>
          {onLogout && (
            <button onClick={onLogout} title="Logout"
              className="p-2 rounded-xl hover:bg-rose-400 hover:border-rose-400 cursor-pointer flex-shrink-0 text-white transition-all duration-300"
              style={{ opacity:0.5 }}>
              <LuLogOut/>
            </button>
          )}
        </div>
      </div>
    </aside>
  </>
);

export default SidebarBase;