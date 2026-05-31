import Navbar from "../../components/layout/Navbar";
import Stars from "../../components/decorations/Stars";
import ZodiacRing from "../../components/decorations/ZodiacRing";
import DecorativeElement from "../../components/decorations/DecorativeElement";
import BottomDecorativeElement from "../../components/decorations/BottomDecorativeElement";
import AmbientGlow from "../../components/decorations/AmbientGlow";
import { Link } from "react-router-dom";
import ZodiacCircle from "../../src/assets/images/zodiacCircle.png";
import Dosh from "../../src/assets/images/dosh.png";
import Yog from "../../src/assets/images/yog.png";
import Dasha from "../../src/assets/images/dasha.png";

const services = [
  {
    title: "Kundali Generation",
    badge: "Free",
    desc: "Generate your authentic North Indian Kundali using Swiss Ephemeris — the most precise astronomical calculation engine available. Enter your birth details and receive a detailed chart instantly.",
    features: [
      "Swiss Ephemeris precision calculations",
      "North Indian diamond-style chart",
      "All 9 Grahas with exact degrees",
      "12 Bhava (house) placements",
      "Ascendant (Lagna) detection",
      "Rashi (zodiac sign) placements",
    ],
  },
  {
    title: "AI Jyotish Advisor",
    badge: "Premium",
    desc: "Meet Nakshatra — your personal AI guide. Ask about your planetary placements, career timing, relationships, and life themes based on your unique Kundali.",
    features: [
      "Context-aware chart interpretations",
      "Classical Vedic Jyotish principles",
      "Persistent conversation history",
      "Planetary strength analysis",
      "Dasha & transit questions",
      "Personalised life area guidance",
    ],
  },
];

const upcoming = [
  "Vimshottari Dasha timelines",
  "Ashtakavarga strength analysis",
  "Divisional charts (D-1 to D-9)",
  "Kundali Milan (compatibility)",
  "Transit & Gochar analysis",
];

const Services = () => {
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
          What We Offer
        </p>
        <h1 className="text-4xl md:text-6xl font-light tracking-wider mb-6">
          SERVICES BUILT FOR
          <br />
          <span className="font-normal">THE MODERN SEEKER</span>
        </h1>
        <p className="text-sm font-light opacity-60 max-w-xl mx-auto leading-relaxed">
          From precise chart generation to AI-powered interpretations, every
          feature in Kundali Marg is crafted with both technical rigour and
          spiritual depth.
        </p>
      </section>

      {/* Core Services */}
      <section className="relative z-10 py-16 px-6 bg-black/20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-600/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-amber-400 text-xs tracking-[0.4em] mb-3 uppercase">
            Core Services
          </p>
          <h2 className="text-center text-3xl font-light tracking-wider mb-16">
            WHAT YOU GET
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-950/20 to-transparent hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-normal tracking-wider">{s.title}</h3>
                  <span className="text-xs tracking-widest text-amber-400 border border-amber-500/30 rounded-full px-3 py-1 bg-amber-500/5">
                    {s.badge}
                  </span>
                </div>
                <p className="text-sm font-light opacity-60 leading-relaxed mb-6">{s.desc}</p>
                <div className="border-t border-white/5 pt-6">
                  <p className="text-xs tracking-[0.3em] opacity-40 uppercase mb-4">Includes</p>
                  <ul className="space-y-2">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-xs font-light opacity-70">
                        <div className="w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent" />
                  <span className="text-amber-400 text-xs tracking-widest opacity-70">
                    {i === 0 ? "INSTANT CHARTS" : "POWERED BY AI"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid — reuses the same pattern as Home */}
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
              { image: ZodiacCircle, label: "Kundali Charts", desc: "Full birth chart with all 12 houses" },
              { image: Dosh, label: "Dosha Detection", desc: "Identify Mangal, Kaal Sarp & more" },
              { image: Yog, label: "Yoga Analysis", desc: "Auspicious planetary combinations" },
              { image: Dasha, label: "Dasha Predictions", desc: "Period-wise life forecasts" },
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
                <p className="text-xs font-normal tracking-wider text-white/90">{f.label}</p>
                <p className="text-xs font-light opacity-50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="relative z-10 py-16 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-amber-400 text-xs tracking-[0.4em] mb-3 uppercase">
            The Roadmap
          </p>
          <h2 className="text-center text-3xl font-light tracking-wider mb-16">
            COMING SOON
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {upcoming.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-md flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400/40 flex-shrink-0" />
                <p className="text-xs font-light opacity-60">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
          Ready to Read
          <br />
          the Stars?
        </h2>
        <p className="relative opacity-50 mb-10 text-sm font-light tracking-wide">
          Create a free account and generate your Kundali in under a minute.
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

export default Services;