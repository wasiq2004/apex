import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COURSES, Category } from '../constants';

const Reveal = ({ children, delay = 0, y = 30 }: { children?: React.ReactNode, delay?: number, y?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const Programs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const filteredCourses = selectedCategory === 'All'
    ? COURSES
    : COURSES.filter(c => c.category === selectedCategory);

  return (
    <div className="pt-44 pb-32 overflow-hidden min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="mb-24 space-y-8">
          <Reveal delay={0.1}>
            <p className="text-[#D4AF37] font-black uppercase tracking-[0.4em] text-[10px]">Strategic Specializations</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none uppercase">
              Elite <span className="text-gold">Courses</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="w-16 h-1 bg-gold-metallic mb-8 opacity-50"></div>
            <p className="text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed">
              Curated precision curriculums engineered to transition elite talent from core logic to high-scale production dominance.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <div className="mb-16 flex flex-col lg:flex-row lg:items-center justify-between space-y-8 lg:space-y-0 border-b border-white/5 pb-12">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-10 py-3 rounded-sm text-[10px] font-black tracking-[0.3em] transition-all uppercase ${selectedCategory === 'All' ? 'bg-[#D4AF37] text-black shadow-gold-glow' : 'bg-white/5 text-zinc-500 hover:bg-white/10 border border-white/5'}`}
              >
                All Courses
              </button>
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-10 py-3 rounded-sm text-[10px] font-black tracking-[0.3em] transition-all uppercase ${selectedCategory === cat ? 'bg-[#D4AF37] text-black shadow-gold-glow' : 'bg-white/5 text-zinc-500 hover:bg-white/10 border border-white/5'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-black text-zinc-600 tracking-[0.2em] uppercase">
              <Filter size={14} />
              <span>{filteredCourses.length} ACTIVE TRACKS</span>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 mb-40">
          {filteredCourses.map((course, idx) => (
            <Reveal key={course.id} delay={0.1 + (idx % 4) * 0.1}>
              <div className="group h-full bg-zinc-900/30 border border-white/5 rounded-sm p-8 hover:border-[#D4AF37]/40 transition-all duration-700 flex flex-col shadow-xl relative overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 shadow-lg border border-white/5">
                  <img src={`https://picsum.photos/seed/p${course.id}/800/600`} alt={course.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000" />
                  {course.isBestSeller && (
                    <span className="absolute top-4 right-4 bg-[#D4AF37] text-black text-[9px] font-black uppercase px-3 py-1.5 rounded-sm shadow-xl">Elite Priority</span>
                  )}
                </div>

                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Star className="text-[#D4AF37] w-4 h-4 fill-current" />
                      <span className="text-xs font-black text-white">{course.rating}</span>
                    </div>
                    <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{course.enrollments} ENROLLED</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-5 uppercase leading-tight group-hover:text-[#D4AF37] transition-colors tracking-tight">{course.title}</h3>
                  <p className="text-base text-zinc-500 mb-10 font-medium line-clamp-3 leading-relaxed">{course.description}</p>
                  
                  <div className="mt-auto space-y-6 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                      <span className="bg-white/5 px-2 py-0.5 rounded-sm">{course.modules} Modules</span>
                      <span>{course.duration}</span>
                    </div>
                    <Link to="/contact" className="flex items-center justify-between w-full py-4 px-8 bg-zinc-900/60 text-white border border-white/10 rounded-sm font-black text-[10px] tracking-[0.3em] uppercase hover:bg-gold-metallic hover:text-black hover:border-transparent transition-all shadow-lg group/btn">
                      <span>Apply Protocol</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;