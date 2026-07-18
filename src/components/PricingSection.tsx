import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles, ArrowRight, Calculator, TrendingUp, ShieldCheck, HelpCircle } from 'lucide-react';
import { ThemeMode, PricingPackage } from '../types';
import { useCMS } from '../context/CMSContext';

interface PricingSectionProps {
  theme: ThemeMode;
  onOpenBooking: (packageTitle?: string, price?: string) => void;
  onOpenAiScope: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  theme,
  onOpenBooking,
  onOpenAiScope
}) => {
  const { data: { PRICING_PACKAGES } } = useCMS();

  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  
  // Interactive ROI Calculator State
  const [avgOrderValue, setAvgOrderValue] = useState<number>(3000);
  const [selectedPackagePrice, setSelectedPackagePrice] = useState<number>(69999);

  const calculateBreakEven = () => {
    if (avgOrderValue <= 0) return 1;
    return Math.ceil(selectedPackagePrice / avgOrderValue);
  };

  return (
    <section id="pricing" className={`py-24 sm:py-32 relative transition-colors ${
      theme === 'dark' ? 'bg-slate-900/60 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-500 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block mb-3">
            06 / Transparent Turnkey Investment
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-serif">
            Investment Packages Engineered for <span className="text-amber-500 font-mono italic">300%+ ROI</span>.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            No vague quotes or endless billing surprises. Choose a transparent turnkey development suite. Every package includes full source code ownership and zero-cost Netlify edge hosting forever.
          </p>

          {/* Currency Switcher */}
          <div className="flex justify-center mt-8">
            <div className={`p-1.5 rounded-2xl border flex gap-2 ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  currency === 'INR'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ₹ Indian Rupees (INR)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  currency === 'USD'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                $ USD (International)
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg, idx) => {
            const isPopular = pkg.popular;
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? theme === 'dark'
                      ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-amber-500 shadow-2xl shadow-amber-500/20 lg:-translate-y-4'
                      : 'bg-white border-2 border-amber-500 shadow-2xl shadow-amber-500/15 lg:-translate-y-4'
                    : theme === 'dark'
                      ? 'bg-slate-950/80 border-white/10 hover:border-slate-700'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-lg'
                }`}
              >
                {/* Popular Banner */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Most Popular & Best ROI</span>
                  </div>
                )}

                <div>
                  {/* Package Title */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md ${
                      isPopular ? 'bg-amber-500/15 text-amber-500' : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      {pkg.recommendedFor}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold mb-2 font-serif">{pkg.name}</h3>
                  <p className={`text-xs leading-relaxed mb-6 min-h-[36px] ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {pkg.tagline}
                  </p>

                  {/* Price Display */}
                  <div className="mb-6 pb-6 border-b border-slate-500/15">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-amber-500">
                        {currency === 'INR' ? pkg.priceINR : pkg.priceUSD}
                      </span>
                      <span className={`text-xs font-mono uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        / One-time turnkey
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono block mt-1.5">
                      ✓ Zero monthly server hosting or CRM fees
                    </span>
                  </div>

                  {/* Delivery & Support Info */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-6 p-3 rounded-xl bg-slate-500/10 border border-slate-500/20">
                    <div>
                      <span className="text-slate-400 block">Delivery Timeline:</span>
                      <strong className="text-amber-500">{pkg.deliveryDays}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Post-Launch Support:</span>
                      <strong className="text-cyan-400">{pkg.postLaunchSupport}</strong>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                      What is included:
                    </span>
                    {pkg.features.map((feat, i) => (
                      <div key={i} className={`flex items-start gap-2.5 text-xs ${
                        !feat.included ? 'opacity-40 line-through' : feat.highlight ? 'font-semibold text-amber-400' : ''
                      }`}>
                        {feat.included ? (
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${feat.highlight ? 'text-amber-500' : 'text-emerald-400'}`} />
                        ) : (
                          <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                          {feat.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onOpenBooking(pkg.name, currency === 'INR' ? pkg.priceINR : pkg.priceUSD)}
                    className={`w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                      isPopular
                        ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 shadow-amber-500/30 hover:scale-102 hover:shadow-amber-500/50'
                        : theme === 'dark'
                          ? 'bg-slate-900 text-white border border-slate-700 hover:bg-slate-800 hover:border-amber-500'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>Get Started with {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* INTERACTIVE ROI & BREAK-EVEN CALCULATOR */}
        <motion.div
          id="roi-calc"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mt-20 rounded-3xl p-8 sm:p-12 border shadow-2xl relative overflow-hidden ${
            theme === 'dark'
              ? 'glass-card-dark border-amber-500/30 shadow-black/80'
              : 'glass-card-light border-amber-400 shadow-slate-300 bg-white/90'
          }`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Calculator Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-amber-500">
                <Calculator className="w-6 h-6 animate-bounce" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">
                  Interactive Conversion & Break-Even Simulator
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-serif">
                See How Fast You Earn Back Your Investment.
              </h3>
              
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                A custom luxury website is not an expense—it is a sales machine. Select your preferred package and input your average client or order value below:
              </p>

              {/* Package Tier selector in calculator */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                  1. Select Investment Suite:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setSelectedPackagePrice(49999)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      selectedPackagePrice === 49999
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                        : theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    Silver (₹49,999)
                  </button>
                  <button
                    onClick={() => setSelectedPackagePrice(69999)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      selectedPackagePrice === 69999
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                        : theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    Gold (₹69,999) ★
                  </button>
                  <button
                    onClick={() => setSelectedPackagePrice(89999)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      selectedPackagePrice === 89999
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                        : theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    Platinum (₹89,999)
                  </button>
                </div>
              </div>

              {/* Average Order Value Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    2. Your Average Client / Sale Value:
                  </label>
                  <span className="text-lg font-black font-mono text-amber-500">
                    ₹{avgOrderValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>₹500 (Cafe Table)</span>
                  <span>₹15,000 (Salon Bridal)</span>
                  <span>₹50,000+ (Real Estate/B2B)</span>
                </div>
              </div>
            </div>

            {/* Break Even Result Display Box */}
            <div className={`lg:col-span-5 rounded-3xl p-8 border text-center flex flex-col justify-center ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-amber-500/40 shadow-2xl shadow-amber-500/10'
                : 'bg-amber-50 border-amber-400 shadow-xl shadow-amber-500/15'
            }`}>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3 font-semibold">
                Break-Even Goal
              </span>

              <div className="my-4">
                <span className="text-6xl sm:text-7xl font-black font-mono text-amber-500 block leading-none">
                  {calculateBreakEven()}
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-300 block mt-2">
                  New Clients or Table Bookings Needed
                </span>
              </div>

              <p className={`text-xs leading-relaxed my-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Once your new luxury website brings in just <strong>{calculateBreakEven()} new customers</strong>, your entire ₹{selectedPackagePrice.toLocaleString('en-IN')} investment is 100% paid for. Every single booking after that is <strong>pure net profit forever</strong>.
              </p>

              <button
                onClick={() => onOpenBooking(`Custom ROI Package (₹${selectedPackagePrice.toLocaleString('en-IN')})`, `₹${selectedPackagePrice.toLocaleString('en-IN')}`)}
                className="mt-2 w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 hover:scale-102 transition-transform"
              >
                Lock In This ROI Suite Now →
              </button>
            </div>
          </div>
        </motion.div>

        {/* AI Custom Scope Trigger */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenAiScope}
            className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 underline underline-offset-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Not sure which tier fits your business? Ask our AI Project Scope Advisor for an instant recommendation.</span>
          </button>
        </div>

      </div>
    </section>
  );
};
