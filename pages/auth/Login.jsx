import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Stars from "../../components/decorations/Stars";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    email_address: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email_address || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: formData.email_address.trim(), // FIX
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message?.includes("not verified")) {
          toast.error("Please verify your email. OTP sent again.");

          navigate("/verify-email", {
            state: { email: data.email_address || formData.email_address },
          });
        } else {
          toast.error(data.message || "Login failed");
        }

        setLoading(false);
        return;
      }

      login(data.token); // saves token + sets auth state

      toast.success("Login successful");

      setLoading(false);

      const redirectTo = searchParams.get("redirect");
      const roleDashboard = {
        USER: "/dashboard",
        ASTROLOGER: "/astrologer-dashboard",
        SUPER_ADMIN: "/admin-dashboard",
      };
      const destination =
        redirectTo || roleDashboard[data.user?.user_role] || "/";

      setTimeout(() => {
        navigate(destination, { replace: true });
      }, 1000);
    } catch (error) {
      toast.error("Server error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-teal-900 text-white relative overflow-hidden">
      <Stars />
      <DecorativeElement />
      <ZodiacRing />
      <AmbientGlow />
      <Navbar />

      <div className="flex items-center justify-center px-6 md:py-6 relative z-10">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-10">
          <h2 className="text-lg md:text-2xl font-light text-center mb-8 tracking-wider">
            LOGIN TO YOUR ACCOUNT
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 mt-10">
            {/* Email */}
            <div>
              <label className="block text-sm mb-2 opacity-80">
                Email Address
              </label>

              <input
                type="email"
                name="email_address"
                value={formData.email_address}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2 opacity-80">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 pr-10 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-amber-400 transition"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <Link
                to="/forgot-password"
                className="hover:text-amber-400 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full py-3 bg-amber-600 hover:bg-amber-700 rounded-full tracking-wider transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-sm mt-6 opacity-80">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="ml-2 text-sm font-medium tracking-wider border border-amber-500 text-amber-400 px-3 py-1 rounded-full transition-all duration-300 hover:bg-amber-600 hover:text-white hover:border-amber-600"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <BottomDecorativeElement />
    </div>
  );
};

export default Login;
