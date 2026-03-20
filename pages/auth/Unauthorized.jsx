// pages/auth/Unauthorized.jsx
import { Link, useNavigate } from "react-router-dom";
import Stars from "../../components/decorations/Stars";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import useAuth from "../../hooks/useAuth";
import { FcCancel } from "react-icons/fc";

const ROLE_DASHBOARD = {
  USER: "/user-dashboard",
  ASTROLOGER: "/astrologer-dashboard",
  SUPER_ADMIN: "/admin-dashboard",
};

const Unauthorized = () => {
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-teal-900 text-white relative overflow-hidden flex justify-center">
      <Stars />
      <DecorativeElement />
      <ZodiacRing />
      <AmbientGlow />

      <section className="relative z-10 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          {/* Icon */}
          <div className="text-6xl mb-6 flex items-center justify-center">
            <FcCancel />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wider">
            ACCESS <span className="font-normal">DENIED</span>
          </h1>

          {/* Message */}
          <p className="text-lg font-light mb-4 max-w-sm mx-auto opacity-80 leading-relaxed">
            You don't have permission to access this page.
          </p>

          {role && (
            <p className="text-sm font-light mb-10 opacity-70">
              Your role is{" "}
              <span className="text-amber-400 font-medium tracking-wider">
                {role}
              </span>
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-4 items-center">
            {role && (
              <button
                onClick={() => navigate(ROLE_DASHBOARD[role] || "/")}
                className="cursor-pointer font-medium bg-amber-600 hover:bg-amber-700 px-12 py-4 rounded-full tracking-wider transition-all duration-300"
              >
                GO TO MY DASHBOARD
              </button>
            )}

            <Link
              to="/"
              className="font-medium border border-amber-500 text-amber-400 hover:text-white transition-all duration-300 hover:bg-amber-600 px-12 py-4 rounded-full tracking-wider"
            >
              GO TO HOME
            </Link>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="cursor-pointer text-sm font-light hover:opacity-80 hover:text-amber-500 transition-all duration-300 tracking-wider mt-2"
            >
              Sign out and use a different account
            </button>
          </div>
        </div>
      </section>

      <BottomDecorativeElement />
    </div>
  );
};

export default Unauthorized;
