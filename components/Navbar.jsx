import { useState } from 'react';
import LogoPng from '../src/assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-3xl">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between gap-8 lg:gap-12">
          <a href="#" className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors">
            HOME
          </a>
          <a href="#" className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors">
            ABOUT US
          </a>
          
          <div className="mx-4 lg:mx-8">
            <img src={LogoPng} className="w-16 md:w-20" alt="Logo" />
          </div>
          
          <a href="#" className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors">
            SERVICES
          </a>
          <a href="#" className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors">
            BLOG
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <img src={LogoPng} className="w-16" alt="Logo" />
            </div>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className={`mt-4 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="flex flex-col space-y-4 py-4">
              <a 
                href="#" 
                className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors text-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </a>
              <a 
                href="#" 
                className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors text-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT US
              </a>
              <a 
                href="#" 
                className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors text-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                SERVICES
              </a>
              <a 
                href="#" 
                className="text-sm font-medium tracking-wider hover:text-amber-400 transition-colors text-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                BLOG
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;