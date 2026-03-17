import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Stars from "../../components/decorations/Stars";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [formData, setFormData] = useState({
    email_address: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Login failed");
      setLoading(false);
      return;
    }

    // Save token
    localStorage.setItem("token", data.token);

    toast.success("Login successful");

    setTimeout(() => {
      navigate("/");
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
              <label className="block text-sm mb-2 opacity-80">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                placeholder="Enter your password"
              />
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
              className="cursor-pointer w-full py-3 bg-amber-600 hover:bg-amber-700 rounded-full tracking-wider transition-colors"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-white/20"></div>
            <span className="px-4 text-sm opacity-60">OR</span>
            <div className="flex-grow h-px bg-white/20"></div>
          </div>

          {/* Google Login */}
        <button
//   onClick={() => googleLogin()}
  className="flex items-center justify-center gap-3 w-full py-3 border border-white/20 rounded-full hover:bg-white/10 transition-all"
>
  <FcGoogle size={22} />
  Continue with Google
</button>

          {/* Signup */}
          <p className="text-center text-sm mt-6 opacity-80">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-amber-400 hover:text-amber-300"
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