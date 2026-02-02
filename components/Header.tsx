import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const handleLMSClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("LMS Portal: Coming Soon");
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'COURSES', path: '/programs' },
    { name: 'CAREERS', path: '/careers' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-black/90 backdrop-blur-2xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            {/* Logo Image - Bigger, no text */}
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="absolute inset-0 bg-[#D4AF37]/10 blur-md rounded-lg group-hover:bg-[#D4AF37]/30 transition-all"></div>
              <img
                src="/Logobgblack-removebg-preview.png"
                alt="Apex Skill Technologies"
                className="w-16 h-16 object-contain relative z-10 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
              />
            </motion.div>
          </Link>

          <nav className="hidden xl:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-[10px] font-black tracking-[0.2em] transition-all hover:text-[#D4AF37] ${location.pathname === item.path ? 'text-[#D4AF37]' : 'text-white/80'}`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLMSClick}
              className="px-7 py-3 rounded-sm border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black tracking-[0.2em] hover:bg-gold-metallic hover:text-black transition-all"
            >
              LMS LOGIN
            </button>
          </nav>

          <div className="xl:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#D4AF37]">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-black border-t border-white/10"
          >
            <div className="px-6 py-10 space-y-6">
              {navItems.map((item) => (
                <Link key={item.name} to={item.path} className="block text-xs font-black text-white/80 hover:text-[#D4AF37] tracking-widest uppercase">
                  {item.name}
                </Link>
              ))}
              <button onClick={handleLMSClick} className="w-full text-left text-xs font-black text-[#D4AF37] tracking-widest uppercase">
                LMS LOGIN (COMING SOON)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;