import Navbar from "../../components/layout/Navbar";
import ZodiacSignSection from "../../components/layout/ZodiacSignSection";
import Stars from "../../components/decorations/Stars";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import { Link } from "react-router-dom";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import ZodiacCircle from "../../src/assets/images/zodiacCircle.png";
import Dosh from "../../src/assets/images/dosh.png";
import Yog from "../../src/assets/images/yog.png";
import Dasha from "../../src/assets/images/dasha.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-teal-900 text-white relative overflow-hidden">
      <Stars />
      <DecorativeElement />
      <ZodiacRing />
      <AmbientGlow />
      <Navbar />

      {/* Hero Section — UNCHANGED */}
      <section className="relative z-10 text-center px-6 py-20 md:py-28">
        <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-wider">
          GET <span className="font-normal">CLARITY,</span>
          <br />
          <span className="font-normal">GUIDANCE</span> AND{" "}
          <span className="font-normal">PEACE</span>
          <br />
          OF MIND
        </h1>
        <p className="text-lg font-light mb-12 max-w-2xl mx-auto opacity-80 leading-relaxed">
          Your birth was written in the stars — now it&apos;s time to read what
          they have to say.
        </p>
        <Link
          to="/signup"
          className="font-medium bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-full duration-300 tracking-wider transition-all"
        >
          GET BIRTH CHART
        </Link>
      </section>

      {/* Zodiac Section — UNCHANGED */}
      <ZodiacSignSection />

      {/* Discover Section — UNCHANGED */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-light tracking-wider mb-12">
            WHAT YOU WILL DISCOVER
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Career & Success",
                desc: "Understand your true strengths and the path where you will thrive.",
              },
              {
                title: "Love & Relationships",
                desc: "Decode compatibility, emotional patterns, and future possibilities.",
              },
              {
                title: "Health & Life Purpose",
                desc: "Find deeper meaning and direction aligned with your destiny.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md hover:border-amber-400 duration-300 transition-all"
              >
                <h3 className="text-lg font-normal mb-3">{item.title}</h3>
                <p className="text-sm font-light opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI ASTROLOGY ── */}
      <section className="relative z-10 py-24 px-6 bg-black/20 overflow-hidden">
        {/* background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-600/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto">
          <p className="text-center text-amber-400 text-xs tracking-[0.4em] mb-3 uppercase">
            Powered by Technology
          </p>
          <h2 className="text-center text-3xl font-light tracking-wider mb-4">
            AI-POWERED ASTROLOGY
          </h2>
          <p className="text-center text-sm font-light opacity-50 max-w-xl mx-auto mb-16 leading-relaxed">
            Ancient Vedic wisdom meets modern artificial intelligence — for
            readings that are deeper, faster, and more personalised than ever
            before.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* large left card */}
            <div className="relative p-8 rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-950/20 to-transparent group hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                {/* <span className="text-3xl mb-5 block">🤖</span> */}
                <h3 className="text-lg font-normal tracking-wider mb-3">
                  AI Kundali Interpretation
                </h3>
                <p className="text-sm font-light opacity-60 leading-relaxed">
                  Our platform uses advanced AI to interpret your Kundali with
                  deep contextual understanding — delivering nuanced insights in
                  seconds.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
                <span className="text-amber-400 text-xs tracking-widest opacity-70">
                  INSTANT READINGS
                </span>
              </div>
            </div>

            {/* right column — two smaller cards */}
            <div className="flex flex-col gap-6">
              <div className="relative p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-amber-500/25 transition-all duration-300 group">
                {/* <span className="text-2xl mb-4 block">💬</span> */}
                <h3 className="text-sm font-normal tracking-wider mb-2">
                  Ask Anything
                </h3>
                <p className="text-xs font-light opacity-55 leading-relaxed">
                  Chat with our AI astrologer. Ask about your career,
                  relationships, health, or any life question — and get answers
                  grounded in your unique chart.
                </p>
              </div>
              <div className="relative p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-amber-500/25 transition-all duration-300 group">
                {/* <span className="text-2xl mb-4 block">🔮</span> */}
                <h3 className="text-sm font-normal tracking-wider mb-2">
                  Predictive Intelligence
                </h3>
                <p className="text-xs font-light opacity-55 leading-relaxed">
                  AI-driven Dasha and transit analysis identifies your most
                  favourable windows — for decisions, relationships, and new
                  beginnings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — redesigned ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-amber-400 text-xs tracking-[0.4em] mb-3 uppercase">
            The Process
          </p>
          <h2 className="text-center text-3xl font-light tracking-wider mb-20">
            HOW IT WORKS
          </h2>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
            {/* connecting line */}
            <div className="hidden md:block absolute top-7 left-[calc(16.6%)] right-[calc(16.6%)] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            {[
              {
                num: "01",
                title: "Enter Details",
                desc: "Provide your birth date, time, and place of birth.",
              },
              {
                num: "02",
                title: "Planetary Analysis",
                desc: "We map every planet's position at your exact moment of birth.",
              },
              {
                num: "03",
                title: "Your Insights",
                desc: "Receive a detailed, personalised Kundali reading instantly.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full border border-amber-500/40 flex items-center justify-center mb-6 group-hover:border-amber-400 group-hover:bg-amber-500/10 transition-all duration-300 relative bg-slate-900">
                  <span className="text-amber-400 text-sm font-light tracking-widest">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-base font-normal tracking-wider mb-3">
                  {step.title}
                </h3>
                <p className="text-sm font-light opacity-60 leading-relaxed max-w-[180px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — redesigned ── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-amber-400 text-xs tracking-[0.4em] mb-3 uppercase">
            What&apos;s Included
          </p>
          <h2 className="text-center text-3xl font-light tracking-wider mb-16">
            POWERFUL FEATURES
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                image: ZodiacCircle,
                label: "Kundali Charts",
                desc: "Full birth chart with all 12 houses",
              },
              {
                image: Dosh,
                label: "Dosha Detection",
                desc: "Identify Mangal, Kaal Sarp & more",
              },
              {
                image: Yog,
                label: "Yoga Analysis",
                desc: "Auspicious planetary combinations",
              },
              {
                image: Dasha,
                label: "Dasha Predictions",
                desc: "Period-wise life forecasts",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-amber-500/5 hover:border-amber-500/30 transition-all duration-300 text-center flex flex-col items-center gap-3"
              >
                <img
                  src={f.image}
                  alt=""
                  className="w-12 h-12 rounded-3xl group-hover:scale-110 transition-all duration-300"
                />
                <p className="text-xs font-normal tracking-wider text-white/90">
                  {f.label}
                </p>
                <p className="text-xs font-light opacity-50 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — redesigned ── */}
      <section className="relative z-10 py-28 px-6 text-center overflow-hidden">
        {/* glow behind */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full bg-amber-600/10 blur-[50px]" />
        </div>
        {/* decorative ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[420px] h-[420px] rounded-full border border-amber-500/10" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-amber-500/8" />
        </div>

        <p className="relative text-amber-400 text-xs tracking-[0.4em] mb-4 uppercase">
          Begin Your Journey
        </p>
        <h2 className="relative text-4xl md:text-5xl font-light tracking-wider mb-5">
          Your Destiny
          <br />
          Is Waiting
        </h2>
        <p className="relative opacity-50 mb-10 text-sm font-light tracking-wide">
          Discover what the universe has written for you.
        </p>
        <Link
          to="/signup"
          className="relative inline-block bg-amber-600 hover:bg-amber-500 text-white px-14 py-4 rounded-full font-medium tracking-widest text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(217,119,6,0.4)]"
        >
          CREATE YOUR KUNDALI
        </Link>
      </section>

      {/* ── DISCLAIMER / FOOTER — redesigned ── */}
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

export default Home;
