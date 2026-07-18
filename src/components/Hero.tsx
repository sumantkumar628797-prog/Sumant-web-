import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Award, CheckCircle2, Play, Code2 } from 'lucide-react';
import { ThemeMode } from '../types';
import { useCMS } from '../context/CMSContext';

interface HeroProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
  onOpenAiScope: () => void;
}

export const Hero: React.FC<HeroProps> = ({ theme, onOpenBooking, onOpenAiScope }) => {
  const { data: { AGENCY_BRAND } } = useCMS();

  return (
    <section className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-32 flex items-center justify-center overflow-hidden">
      {/* Background Ambient Glow & Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 transition-all duration-1000 ${
          theme === 'dark' ? 'bg-amber-500/30' : 'bg-amber-400/40'
        }`} />
        <div className={`absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 transition-all duration-1000 ${
          theme === 'dark' ? 'bg-violet-600/30' : 'bg-indigo-500/25'
        }`} />
        <div className={`absolute bottom-0 left-1/3 w-[700px] h-[400px] rounded-full blur-[180px] opacity-15 transition-all duration-1000 ${
          theme === 'dark' ? 'bg-cyan-500/20' : 'bg-sky-400/30'
        }`} />
        
        {/* Subtle grid pattern overlay */}
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Top Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-amber-500/30 shadow-sm"
          >
            <Award className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className={`text-xs sm:text-sm font-semibold tracking-wide uppercase ${
              theme === 'dark' ? 'text-amber-400' : 'text-amber-800'
            }`}>
              Apple & Awwwards Level Digital Craftsmanship
            </span>
          </motion.div>

          {/* Powerful Luxury Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            We Build Digital Masterpieces Worth{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 font-serif italic font-normal">
              ₹80,000+
            </span>
            . You Close High-Ticket Clients on Autopilot.
          </motion.h1>

          {/* Value Proposition Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg sm:text-xl md:text-2xl font-normal max-w-3xl mx-auto mb-10 leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Stop losing premium deals to generic ₹10k WordPress templates. We engineer high-speed, bespoke React & Tailwind web applications designed for luxury restaurants, salons, real estate developers, and elite enterprises.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-extrabold text-base sm:text-lg shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-3 group"
            >
              <span>Book VIP Strategy Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenAiScope}
              className={`w-full sm:w-auto px-8 py-4 rounded-full border text-base sm:text-lg font-bold flex items-center justify-center gap-2.5 transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-purple-500/40 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/80 shadow-lg shadow-purple-950/40'
                  : 'bg-white border-purple-400 text-purple-700 hover:bg-purple-50 shadow-md shadow-purple-100'
              }`}
            >
              <Sparkles className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>AI Instant Project Quote</span>
            </motion.button>
          </motion.div>

          {/* 3 Core Guarantee Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-slate-400 pt-6 border-t border-slate-500/20 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>100% Hand-Coded (No WordPress)</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>99+ Google PageSpeed Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>1-Year Full Code Warranty</span>
            </div>
          </motion.div>

        </div>

        {/* Animated Statistics Bento Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className={`mt-16 sm:mt-20 rounded-3xl p-6 sm:p-10 border shadow-2xl ${
            theme === 'dark'
              ? 'glass-card-dark border-white/10 shadow-black/80'
              : 'glass-card-light border-slate-200/80 shadow-slate-300/50 bg-white/90'
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-500/20">
            {AGENCY_BRAND.stats.map((stat, idx) => (
              <div key={idx} className={`flex flex-col items-center justify-center text-center ${idx > 0 ? 'pt-6 lg:pt-0 lg:pl-6' : ''}`}>
                <span className="text-3xl sm:text-5xl font-black font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
                  {stat.value}
                </span>
                <span className={`text-xs sm:text-sm font-semibold tracking-wide uppercase ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Demo Preview Callout */}
        <div className="mt-12 text-center">
          <a
            href="#portfolio"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
              theme === 'dark'
                ? 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-amber-400 border border-slate-800'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-amber-700 border border-slate-300'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Scroll Down to Preview Our Live ₹65k–₹80k Flagship Projects</span>
            <ArrowRight className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
};
