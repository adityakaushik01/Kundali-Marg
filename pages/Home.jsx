import Navbar from "../components/Navbar";
import ZodiacSignSection from "../components/ZodiacSignSection";
import Stars from "../components/Stars";
import DecorativeElement from "../components/DecorativeElement";
import BottomDecorativeElement from "../components/BottomDecorativeElement";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-teal-900 text-white relative overflow-hidden">
      {/* Animated Stars Background */}
      <Stars />

      {/* Decorative Elements */}
      <DecorativeElement />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 text-center px-6 md:py-6">
        <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-wider">
          GET <span className="font-normal">CLARITY,</span>
          <br />
          <span className="font-normal">GUIDANCE</span> AND{" "}
          <span className="font-normal">PEACE</span>
          <br />
          OF MIND
        </h1>

        <p className="text-lg font-light mb-12 max-w-2xl mx-auto opacity-80 leading-relaxed">
          Your birth was written in the stars — now it's time to read what they
          have to say.
        </p>

        <Link
          to="/GenerateKundali"
          className="font-medium bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-full tracking-wider transition-colors"
        >
          GET BIRTH CHART
        </Link>
      </section>

      {/* Zodiac Section */}
      <ZodiacSignSection />

      {/* Disclaimer Section */}
      <section className="relative z-10 py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light tracking-wider mb-8">
            DISCLAIMER
          </h2>
          <p className="text-sm font-light opacity-70 leading-relaxed mb-8">
            THE INFORMATION PROVIDED, WHETHER FREE OR PAID, MUST NOT BE
            CONSIDERED AS INDICATING AN OPINION IN THE REALMS OF PSYCHOLOGY,
            ECONOMY/FINANCE, MEDICINE, LEGAL MATTERS, REAL ESTATE OR OTHERS AND
            MUST IN NO CASE BE USED AS A BASIS FOR DECISION
            MAKING/INVESTMENT/MEDICAL ADVICE AND JUDGMENTS ARE FREE, NOT FOR
            SALE OPINIONS THAT IN NO CASE MAY IDENTICAL RESULTS FOR EVERYBODY.
            PLEASE ALSO READ THE TERMS OF USE.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-light opacity-60">
            <a href="#" className="hover:text-amber-400 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Terms of service
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Privacy policy
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Ethical Rules
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-light opacity-60 mt-4">
            <a href="#" className="hover:text-amber-400 transition-colors">
              GDPR
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </section>

      {/* Bottom decorative elements */}
      <BottomDecorativeElement />
    </div>
  );
};

export default Home;
