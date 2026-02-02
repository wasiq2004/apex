import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Linkedin, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-zinc-600 pt-24 pb-12 border-t border-white/5 relative z-10">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start gap-12 pb-16 border-b border-white/5">
          <div className="flex flex-col items-center xl:items-start space-y-6">
            <Link to="/" className="flex items-center group">
              <img
                src="/Logobgblack-removebg-preview.png"
                alt="Apex Skill Technologies"
                className="w-14 h-14 object-contain transition-transform group-hover:scale-110 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
              />
            </Link>
            <p className="text-[10px] font-medium tracking-widest max-w-sm text-center xl:text-left leading-relaxed uppercase opacity-50">
              Skill Development | Internships | Career Enablement. Bridging the gap between academic education and modern industry needs.
            </p>
          </div>

          <div className="flex flex-wrap justify-center xl:justify-end gap-10 text-[10px] font-black tracking-[0.4em] uppercase">
            <Link to="/about" className="hover:text-[#D4AF37] transition-all">About Us</Link>
            <Link to="/programs" className="hover:text-[#D4AF37] transition-all">Courses</Link>
            <Link to="/careers" className="hover:text-[#D4AF37] transition-all">Careers</Link>
            <Link to="/contact" className="hover:text-[#D4AF37] transition-all">Contact</Link>
          </div>

          <div className="flex space-x-6">
            {[Linkedin, Instagram, Youtube].map((Icon, idx) => (
              <a key={idx} href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-all">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black text-zinc-800 tracking-[0.4em] uppercase">
          <p>&copy; 2026 APEX SKILLS TECHNOLOGY PVT. LTD. ALL RIGHTS RESERVED.</p>
          <p className="text-[#D4AF37]/50 tracking-[0.2em]">MADE WITH ♥ BY DIGIEAGLES.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-zinc-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-600 transition-colors">Protocol</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;