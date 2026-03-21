import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/layout/Navbar";
import Stars from "../../components/decorations/Stars";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email_address: location.state?.email || "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: formData.email_address.trim(),
          otp: formData.otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Verification failed");
        setLoading(false);
        return;
      }

      // AUTO LOGIN
      login(data.token);

      toast.success("Email verified successfully!");

      setTimeout(() => {
        navigate("/user-dashboard");
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

      <section className="relative z-10 flex items-center justify-center px-6 md:py-10">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-xl">
          <h2 className="text-lg md:text-2xl font-light tracking-wider text-center mb-8">
            VERIFY YOUR EMAIL
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm opacity-80">Email Address</label>

              <input
                type="email"
                name="email_address"
                value={formData.email_address}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </div>

            {/* OTP */}
            <div>
              <label className="text-sm opacity-80">Enter OTP</label>

              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
                maxLength={6}
                className="w-full p-3 text-center tracking-[6px] text-lg rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                placeholder="------"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full mt-4 bg-amber-600 hover:bg-amber-700 py-3 rounded-full tracking-wider transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "VERIFY OTP"}
            </button>
          </form>
        </div>
      </section>

      <BottomDecorativeElement />
    </div>
  );
};

export default VerifyEmail;
