import Navbar from "../../components/layout/Navbar";
import Stars from "../../components/decorations/Stars";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup successful!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(data.message || "Signup failed");
      }
      console.log("Signup Response:", data);
    } catch (error) {
      
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-teal-900 text-white relative overflow-hidden">
      <Stars />
      <DecorativeElement />
      <ZodiacRing />
      <AmbientGlow />

      <Navbar />

      <section className="relative z-10 flex items-center justify-center px-6 md:py-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-xl">
          <h2 className="text-lg md:text-2xl font-light tracking-wider text-center mb-8">
            CREATE ACCOUNT
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label className="text-sm opacity-80">First Name</label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm opacity-80">Last Name</label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                placeholder="Enter your last name"
              />
            </div>

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
                placeholder="Enter your email address"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm opacity-80">Password</label>

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

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-amber-600 hover:bg-amber-700 py-3 rounded-full tracking-wider transition-colors"
            >
              SIGN UP
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-white/20"></div>
            <span className="px-4 text-sm opacity-60">OR</span>
            <div className="flex-grow h-px bg-white/20"></div>
          </div>

          {/* Google Signup */}
          <button className="flex items-center justify-center gap-3 w-full py-3 border border-white/20 rounded-full hover:bg-white/10 transition-all">
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-sm text-center mt-6 opacity-70">
            Already have an account?
            <Link
              to="/login"
              className="ml-2 text-amber-400 hover:text-amber-500"
            >
              Login
            </Link>
          </p>
        </div>
      </section>

      <BottomDecorativeElement />
    </div>
  );
};

export default Signup;
