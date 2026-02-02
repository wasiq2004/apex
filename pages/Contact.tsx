import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Youtube, Linkedin } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm';

const Reveal = ({ children, delay = 0, y = 30 }: { children?: React.ReactNode, delay?: number, y?: number }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const Contact: React.FC = () => {
  return (
    <div className="pt-44 pb-32 overflow-hidden min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="text-left mb-24 space-y-6">
          <Reveal delay={0.1}>
            <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none uppercase">
              Get in <span className="text-gold">Touch</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="w-16 h-1 bg-gold-metallic mb-6 opacity-50"></div>
            <p className="text-lg lg:text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed">
              Reach out to our professional strategists for elite career advisory and corporate intake.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-16">
            <div className="space-y-10">
              <Reveal delay={0.3}>
                <h3 className="text-xl font-black text-white uppercase tracking-[0.2em] border-b border-white/5 pb-4">Protocol Support</h3>
              </Reveal>
              <div className="space-y-12">
                <Reveal delay={0.4}>
                  <div className="flex items-start space-x-6 group">
                    <div className="bg-zinc-900/60 p-5 rounded-sm border border-white/5 text-[#D4AF37] group-hover:bg-gold-metallic group-hover:text-black transition-all duration-500 shadow-xl">
                      <Mail className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-600 uppercase tracking-[0.4em] text-[8px] mb-2">Corporate Relations</h4>
                      <p className="text-lg font-black text-white tracking-tight">admissions@apexskill.in</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.5}>
                  <div className="flex items-start space-x-6 group">
                    <div className="bg-zinc-900/60 p-5 rounded-sm border border-white/5 text-[#D4AF37] group-hover:bg-gold-metallic group-hover:text-black transition-all duration-500 shadow-xl">
                      <Phone className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-600 uppercase tracking-[0.4em] text-[8px] mb-2">Operational Line</h4>
                      <p className="text-lg font-black text-white tracking-tight">+91 80882 79615</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.6}>
                  <div className="flex items-start space-x-6 group">
                    <div className="bg-zinc-900/60 p-5 rounded-sm border border-white/5 text-[#D4AF37] group-hover:bg-gold-metallic group-hover:text-black transition-all duration-500 shadow-xl">
                      <MapPin className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-black text-zinc-600 uppercase tracking-[0.4em] text-[8px] mb-2">HQ Address</h4>
                      <p className="text-base text-white font-bold leading-relaxed">HSR Layout, Singasandra,<br />Bengaluru, Karnataka 560068</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.7}>
              <div className="space-y-6 pt-10 border-t border-white/5">
                <h3 className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em]">Digital Protocol</h3>
                <div className="flex space-x-4">
                  {[Linkedin, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="p-4 bg-zinc-900/40 border border-white/5 rounded-sm text-zinc-500 hover:text-[#D4AF37] transition-all duration-500">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form Side - Given more columns (8 of 12) for more width */}
          <div className="lg:col-span-8 w-full">
            <Reveal delay={0.4} y={30}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;