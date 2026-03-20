import { useState } from "react";
import LogoPng from "../../src/assets/logo/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex items-center justify-center py-6 px-4 relative z-50">
      <div className="w-full max-w-4xl">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between gap-6 lg:gap-10">
          <Link
            to="/"
            className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors duration-300"
          >
            HOME
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors duration-300"
          >
            ABOUT US
          </Link>

          <Link
            to="/services"
            className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors duration-300"
          >
            SERVICES
          </Link>

          {/* Logo */}
          <Link to="/">
            <img src={LogoPng} className="w-16 md:w-20 mx-2" alt="Logo" />
          </Link>

          <Link
            to="/blog"
            className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors duration-300"
          >
            BLOG
          </Link>

          <Link
            to="/login"
            className="text-sm font-medium tracking-wider border border-amber-500 text-amber-400 px-4 py-2 rounded-full transition-all duration-300 hover:bg-amber-600 hover:text-white hover:border-amber-600"
          >
            LOGIN
          </Link>

          {/* Signup Button */}
          <Link
            to="/signup"
            className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-full text-sm tracking-wider transition-colors duration-300"
          >
            SIGN UP
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <img src={LogoPng} className="w-16" alt="Logo" />
            </Link>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none"
            >
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`mt-4 transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="flex flex-col space-y-4 py-6 px-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/10 shadow-xl">
              <Link
                to="/"
                className="text-sm tracking-wider text-center hover:text-amber-400 duration-300"
                onClick={closeMenu}
              >
                HOME
              </Link>

              <Link
                to="/about"
                className="text-sm tracking-wider text-center hover:text-amber-400 duration-300"
                onClick={closeMenu}
              >
                ABOUT US
              </Link>

              <Link
                to="/services"
                className="text-sm tracking-wider text-center hover:text-amber-400 duration-300"
                onClick={closeMenu}
              >
                SERVICES
              </Link>

              <Link
                to="/blog"
                className="text-sm tracking-wider text-center hover:text-amber-400 duration-300"
                onClick={closeMenu}
              >
                BLOG
              </Link>

              <Link
                to="/login"
                className="border border-amber-500 text-amber-400 rounded-full py-2 text-center text-sm tracking-wider transition-all duration-300 hover:bg-amber-600 hover:text-white"
                onClick={closeMenu}
              >
                LOGIN
              </Link>

              {/* Signup Button */}
              <Link
                to="/signup"
                className="bg-amber-600 hover:bg-amber-700 rounded-full py-2 text-center text-sm tracking-wider duration-300"
                onClick={closeMenu}
              >
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
