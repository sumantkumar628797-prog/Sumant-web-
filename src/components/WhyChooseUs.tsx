import React from 'react';
import { motion } from 'motion/react';
import { Zap, TrendingUp, ShieldCheck, Award, Smartphone, Clock, CheckCircle2 } from 'lucide-react';
import { ThemeMode } from '../types';
import { useCMS } from '../context/CMSContext';

interface WhyChooseUsProps {
  theme: ThemeMode;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ theme }) => {
  const { data: { WHY_CHOOSE_US_DATA } } = useCMS();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
      case 'Award': return <Award className="w-6 h-6 text-purple-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-rose-400" />;
      case 'Clock': return <Clock className="w-6 h-6 text-amber-500" />;
      default: return <Award className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="why-us" className={`py-24 sm:py-32 relative transition-colors ${
      theme === 'dark' ? 'bg-slate-900/40 text-white' : 'bg-slate-100/60 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-500 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block mb-3">
            04 / Why Ambitious Brands Choose Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-serif">
            Engineering Superiority over <span className="text-amber-500 font-mono italic">Templates</span>.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            We don't outsource your project to interns or install bloated plugins. Here is how our custom React & Tailwind architecture gives your business an unfair competitive advantage.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`rounded-3xl p-8 border flex flex-col justify-between transition-all relative overflow-hidden group ${
                theme === 'dark'
                  ? 'bg-slate-950/80 border-white/10 hover:border-amber-500/40 shadow-xl'
                  : 'bg-white border-slate-200 hover:border-amber-500 shadow-lg'
              }`}
            >
              <div>
                {/* Header with Stat badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3.5 rounded-2xl border ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {getIcon(item.iconName)}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black font-mono text-amber-500 block">
                      {item.stat}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      {item.statLabel}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-amber-500 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-500/10 flex items-center gap-2 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified in production across 48+ projects</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
