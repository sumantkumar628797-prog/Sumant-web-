import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle2, Quote, TrendingUp } from 'lucide-react';
import { ThemeMode } from '../types';
import { useCMS } from '../context/CMSContext';

interface TestimonialsSectionProps {
  theme: ThemeMode;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ theme }) => {
  const { data: { TESTIMONIALS_DATA } } = useCMS();

  return (
    <section id="testimonials" className={`py-24 sm:py-32 relative transition-colors ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-500 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block mb-3">
            05 / Verified Client Proof
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-serif">
            What Happens When You Invest <span className="text-amber-500 font-mono italic">₹65,000+</span>?
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Don't just take our word for it. Hear directly from restaurant founders, real estate directors, and aesthetic spa owners who scaled their revenue with Sumant Web.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-white/10 shadow-xl shadow-black/50'
                  : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'
              }`}
            >
              <div>
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    {test.projectValue}
                  </span>
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-amber-500/30 mb-4" />

                {/* Content */}
                <p className={`text-sm leading-relaxed italic mb-8 ${
                  theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  "{test.content}"
                </p>
              </div>

              <div>
                {/* Result Metric Banner */}
                <div className={`p-3.5 rounded-2xl border mb-6 flex items-center gap-3 ${
                  theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}>
                  <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Verified Result:</span>
                    <strong className="font-mono text-xs sm:text-sm font-bold block">{test.resultMetric}</strong>
                  </div>
                </div>

                {/* Author Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-500/10">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm">{test.name}</h4>
                      {test.verified && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" title="Verified Client" />}
                    </div>
                    <span className={`text-xs block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {test.role}, <strong className="text-amber-500">{test.company}</strong>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Guarantee */}
        <div className="mt-16 text-center">
          <p className={`text-xs font-mono uppercase tracking-widest ${
            theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
          }`}>
            ✦ All client reviews are 100% verified with direct contact references available upon request ✦
          </p>
        </div>

      </div>
    </section>
  );
};
