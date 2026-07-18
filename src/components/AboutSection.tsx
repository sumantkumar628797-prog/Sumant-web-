import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Award, Cpu, TrendingDown, Check, X } from 'lucide-react';
import { ThemeMode } from '../types';

interface AboutSectionProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ theme, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'comparison'>('comparison');

  return (
    <section id="about" className={`py-24 sm:py-32 relative transition-colors ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-500 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block mb-3">
            01 / Architectural Vision
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-serif">
            Why We Refuse to Build <span className="line-through text-slate-500 font-sans font-normal">₹10,000</span> Websites.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            When a high-net-worth investor or luxury dining customer opens your website, they form a subconscious judgment about your brand in 50 milliseconds. An amateur, slow-loading template instantly destroys your pricing authority.
          </p>
        </div>

        {/* Interactive Switcher */}
        <div className="flex justify-center mb-12">
          <div className={`p-1.5 rounded-2xl border flex gap-2 ${
            theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'comparison'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Speed & Quality Benchmark</span>
            </button>
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'philosophy'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Our Craftsmanship Philosophy</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Speed & Quality Comparison Matrix */}
        {activeTab === 'comparison' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
          >
            {/* The Cheap Freelancer / WordPress Way */}
            <div className={`rounded-3xl p-8 border flex flex-col justify-between relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-slate-900/40 border-rose-500/20 text-slate-300'
                : 'bg-white border-rose-200 text-slate-700 shadow-lg shadow-rose-100/50'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    The ₹10,000 Template Trap
                  </span>
                  <span className="text-xs font-mono text-rose-400 font-semibold">Typical Freelancer</span>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Generic WordPress & Elementor Themes
                </h3>
                <p className="text-sm mb-6 leading-relaxed">
                  Built on 40+ heavy plugins, bloatware templates, and shared budget hosting. Looks identical to thousands of other websites online.
                </p>

                {/* Performance Gauge Simulation */}
                <div className="bg-rose-500/10 rounded-2xl p-4 border border-rose-500/20 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-rose-400 uppercase font-mono font-semibold block">Google PageSpeed</span>
                    <span className="text-2xl font-black text-rose-500 font-mono">42 / 100 (Fails)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-rose-400 uppercase font-mono font-semibold block">Load Time</span>
                    <span className="text-2xl font-black text-rose-500 font-mono">6.4 Seconds</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-rose-400/90">
                    <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>High Bounce Rate:</strong> 60%+ of mobile users leave before the page even loads.</span>
                  </li>
                  <li className="flex items-start gap-3 text-rose-400/90">
                    <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Constant Security Hacks:</strong> Unpatched plugin vulnerabilities expose client data.</span>
                  </li>
                  <li className="flex items-start gap-3 text-rose-400/90">
                    <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span><strong>Zero Pricing Authority:</strong> Clients see an amateur site and immediately ask for discounts.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-500/20 text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                  Result: Lost sales & damaged brand reputation
                </span>
              </div>
            </div>

            {/* The Sumant Web Luxury Standard */}
            <div className={`rounded-3xl p-8 border-2 flex flex-col justify-between relative overflow-hidden ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border-amber-500/50 shadow-2xl shadow-amber-500/10 text-white'
                : 'bg-gradient-to-br from-white via-white to-amber-50/80 border-amber-500 text-slate-900 shadow-2xl shadow-amber-500/15'
            }`}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
                    The ₹65,000+ Luxury Standard
                  </span>
                  <span className="text-xs font-mono text-amber-500 font-bold uppercase">Sumant Web Custom</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 font-serif">
                  Bespoke React 19 & Tailwind CSS Engine
                </h3>
                <p className={`text-sm mb-6 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Hand-coded from the ground up without a single line of bloatware. Hosted on ultra-fast global edge networks with automatic SSL and zero-maintenance serverless forms.
                </p>

                {/* Performance Gauge Simulation */}
                <div className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 rounded-2xl p-4 border border-amber-500/40 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-amber-500 uppercase font-mono font-bold block">Google PageSpeed</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono">99.4 / 100 (Elite)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-amber-500 uppercase font-mono font-bold block">Load Time</span>
                    <span className="text-2xl font-black text-amber-400 font-mono">0.4 Seconds</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Instant Sub-Second Transitions:</strong> Keeps visitors engaged and doubles booking conversions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Command ₹1L+ Retainers:</strong> Your website projects Apple-grade authority and prestige.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Monthly Server Hosting Costs:</strong> Deploys on Netlify Global Edge for free forever.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-amber-500/30 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold">
                  Result: ROI recouped within 14–30 days
                </span>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/20"
                >
                  Book This Architecture
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Our Craftsmanship Philosophy */}
        {activeTab === 'philosophy' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl p-8 sm:p-12 border ${
              theme === 'dark'
                ? 'bg-slate-900/50 border-white/10'
                : 'bg-white border-slate-200 shadow-xl shadow-slate-200/60'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">1. Pure Custom Engineering</h3>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Every layout is sketched in Figma and programmed line-by-line using React 19, Tailwind CSS, and Framer Motion. No third-party site builders or clunky drag-and-drop code.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">2. Zero Commission Engines</h3>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  We integrate direct table booking engines, salon calendars, and private real estate scheduling that bypass platforms like OpenTable or UrbanCompany—saving you ₹50k+ every month.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">3. Lifetime Code Ownership</h3>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  When your project is finished, we hand over the full GitHub repository and Netlify deployment pipeline. You own your code 100% with zero vendor lock-in or mandatory retainers.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-amber-500/20">
                  SW
                </div>
                <div>
                  <h4 className="font-bold text-base">Principal Architectural Team</h4>
                  <p className="text-xs text-amber-500 font-mono">Sumant Web Studio • Mumbai & Global</p>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform"
              >
                Schedule Founder Discovery Call
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
