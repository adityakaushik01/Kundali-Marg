import Navbar from "../../components/layout/Navbar";
import Stars from "../../components/decorations/Stars";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import ZodiacCircle from "../../src/assets/images/zodiacCircle.png";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import { Link } from "react-router-dom";

const values = [
  {
    title: "Rooted in Tradition",
    desc: "Every calculation uses Swiss Ephemeris — the same planetary engine trusted by professional astrologers worldwide.",
  },
  {
    title: "Empowered by AI",
    desc: "Our AI guide interprets your birth chart using classical Jyotish principles, making ancient wisdom approachable.",
  },
  {
    title: "Privacy First",
    desc: "Your birth data is yours alone. We use secure JWT authentication and never sell your personal information.",
  },
  {
    title: "Always Growing",
    desc: "Dasha timelines, Ashtakavarga, Kundali Milan, and transit reports are all on the horizon.",
  },
];

const team = [
  {
    initials: "A",
    name: "Aditya Kaushik",
    role: "Founder & Lead Developer",
    bio: "Full-stack developer passionate about blending ancient Vedic wisdom with modern technology. Built Kundali Marg as a bridge between timeless astrological knowledge and accessible digital tools.",
  },
  {
    initials: "N",
    name: "Nakshatra (AI)",
    role: "AI Astrology Advisor",
    bio: "Guided by classical Vedic principles, Nakshatra interprets your chart, answers your questions, and offers personalised insights 24/7.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-teal-900 text-white relative overflow-hidden">
      <Stars />
      <ZodiacRing/>
      <DecorativeElement />
      <AmbientGlow />
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 text-center px-6 py-24 md:py-32">
        <p className="text-amber-400 text-xs tracking-[0.4em] mb-4 uppercase">
          Our Story
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-6">
          THE PATH OF THE STARS,
          <br />
          <span className="font-normal">MADE ACCESSIBLE</span>
        </h1>
        <p className="text-sm font-light opacity-60 max-w-xl mx-auto leading-relaxed">
          Kundali Marg — meaning <em>Path of the Birth Chart</em> — was built to
          bring the depth of Vedic Jyotish into the digital age, combining
          precise astronomical calculations with the clarity of modern
          technology.
        </p>
      </section>

      {/* Mission */}
      <section className="relative z-10 py-24 px-6 bg-black/20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-600/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-400 text-xs tracking-[0.4em] mb-3 uppercase">
              Our Mission
            </p>
            <h2 className="text-3xl font-light tracking-wider mb-6">
              ANCIENT WISDOM,
              <br />
              MODERN CLARITY
            </h2>
            <p className="text-sm font-light opacity-60 leading-relaxed mb-4">
              Vedic astrology has guided human lives for over 5,000 years. Yet
              its depth has often remained locked behind complex Sanskrit texts
              and specialist practitioners.
            </p>
            <p className="text-sm font-light opacity-60 leading-relaxed">
              We believe everyone deserves access to their Kundali — not just a
              birth chart, but a living document of their cosmic blueprint, with
              an AI guide to help interpret every placement and planetary
              period.
            </p>
          </div>

          {/* Mini chart */}
          <div className="flex justify-center">
            <div className="w-90 h-90 border border-amber-500/20 rounded-2xl bg-white/3 backdrop-blur-md">
              <svg
                preserveAspectRatio="none"
                viewBox="0 0 480 480"
                width="100%"
                style={{
                  padding: "10px",
                  display: "block",
                  background: "rgba(10,15,30,0.95)",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(245,158,11,0.35)",
                  boxShadow: "0 0 40px rgba(245,158,11,0.08)",
                }}
              >
                <defs>
                  <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(245,158,11,0.04)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </radialGradient>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="480"
                  height="480"
                  fill="url(#bgGrad)"
                />
                <line
                  x1="10"
                  y1="10"
                  x2="10"
                  y2="472"
                  strokeWidth="1"
                  stroke="rgba(245,158,11,0.55)"
                />
                <line
                  x1="10"
                  y1="472"
                  x2="472"
                  y2="472"
                  strokeWidth="1"
                  stroke="rgba(245,158,11,0.55)"
                />
                <line
                  x1="472"
                  y1="472"
                  x2="472"
                  y2="10"
                  strokeWidth="1"
                  stroke="rgba(245,158,11,0.55)"
                />
                <line
                  x1="472"
                  y1="10"
                  x2="10"
                  y2="10"
                  strokeWidth="1"
                  stroke="rgba(245,158,11,0.55)"
                />
                <line
                  x1="10"
                  y1="10"
                  x2="472"
                  y2="472"
                  strokeWidth="1"
                  stroke="rgba(245,158,11,0.4)"
                />
                <line
                  x1="10"
                  y1="472"
                  x2="472"
                  y2="10"
                  strokeWidth="1"
                  stroke="rgba(245,158,11,0.4)"
                />
                <line
                  x1="242"
                  y1="10"
                  x2="472"
                  y2="242"
                  strokeWidth="1"
                  stroke="rgba(245,158,11,0.55)"
                />
                <line
                  x1="472"
                  y1="242"
                  x2="242"
                  y2="472"
                  strokeWidth="1"
                  stroke="rgba(245,158,11,0.55)"
                />
                <line
                  x1="242"
                  y1="472"
                  x2="10"
                  y2="242"
                  strokeWidth="1"
                  stroke="rgba(245,158,11,0.55)"
                />
                <line
                  x1="10"
                  y1="242"
                  x2="242"
                  y2="10"
                  strokeWidth="1"
                  stroke="rgba(245,158,11,0.55)"
                />
              </svg>
              <p className="mt-3 text-center text-amber-500 font-medium text-xs tracking-[0.2em] uppercase">
                North Indian Chart
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-amber-400 text-xs tracking-[0.4em] mb-3 uppercase">
            What We Stand For
          </p>
          <h2 className="text-center text-3xl font-light tracking-wider mb-16">
            OUR PRINCIPLES
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:border-amber-400/40 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full border border-amber-500/40 flex items-center justify-center mb-4">
                  <span className="text-amber-400 text-xs font-light">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-sm font-normal tracking-wider mb-3">
                  {v.title}
                </h3>
                <p className="text-xs font-light opacity-55 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative z-10 py-16 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-amber-400 text-xs tracking-[0.4em] mb-3 uppercase">
            Behind the App
          </p>
          <h2 className="text-center text-3xl font-light tracking-wider mb-16">
            MEET THE TEAM
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((t, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-950/20 to-transparent hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center justify-center text-amber-400 font-light text-lg flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-base font-normal tracking-wider">
                      {t.name}
                    </p>
                    <p className="text-xs text-amber-400 tracking-widest opacity-70 mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-light opacity-60 leading-relaxed">
                  {t.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — same pattern as Home */}
      <section className="relative z-10 py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full bg-amber-600/10 blur-[50px]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[420px] h-[420px] rounded-full border border-amber-500/10" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-amber-500/8" />
        </div>
        <p className="relative text-amber-400 text-xs tracking-[0.4em] mb-4 uppercase">
          Begin Your Journey
        </p>
        <h2 className="relative text-4xl md:text-5xl font-light tracking-wider mb-5">
          Your Stars
          <br />
          Are Waiting
        </h2>
        <p className="relative opacity-50 mb-10 text-sm font-light tracking-wide">
          Generate your Kundali and start your reading in under a minute.
        </p>
        <Link
          to="/signup"
          className="relative inline-block bg-amber-600 hover:bg-amber-500 text-white px-14 py-4 rounded-full font-medium tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(217,119,6,0.4)]"
        >
          CREATE YOUR KUNDALI
        </Link>
      </section>

      {/* Footer */}
      <section className="relative z-10 py-16 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-light opacity-30 leading-relaxed mb-10 italic">
            The information provided, whether free or paid, must not be
            considered as indicating an opinion in the realms of psychology,
            economy/finance, medicine, legal matters, real estate or others, and
            must in no case be used as a basis for decision making, investment,
            or medical advice. Judgments are free, not-for-sale opinions that
            may not yield identical results for everybody. Please also read the
            Terms of Use.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-light opacity-40 mb-2">
            {[
              "Home",
              "Terms of Service",
              "Privacy Policy",
              "Ethical Rules",
              "GDPR",
              "Cookie Policy",
            ].map((l) => (
              <a
                key={l}
                href="#"
                className="hover:text-amber-400 hover:opacity-100 transition-all duration-200"
              >
                {l}
              </a>
            ))}
          </div>

          <p className="text-xs opacity-20 mt-8 tracking-widest">
            © {new Date().getFullYear()} KUNDALI MARG
          </p>
        </div>
      </section>

      <BottomDecorativeElement />
    </div>
  );
};

export default About;