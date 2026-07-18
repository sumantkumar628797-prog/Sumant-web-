import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Code2, CheckCircle2, ShieldCheck, Sparkles, Wine, Calendar, Scissors, Clock, Home, Compass, ArrowRight } from 'lucide-react';
import { ThemeMode, PortfolioProject } from '../types';

interface LiveDemoModalProps {
  theme: ThemeMode;
  project: PortfolioProject | null;
  onClose: () => void;
  onOpenBooking: (projectTitle?: string) => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  theme,
  project,
  onClose,
  onOpenBooking
}) => {
  const [guests, setGuests] = useState('2 Guests (Intimate Table)');
  const [winePairing, setWinePairing] = useState('Grand Cru Sommelier Pairing (+₹4,500)');
  const [treatment, setTreatment] = useState('Royal Gold Bridal Makeover & Styling (₹45,000)');
  const [villaBudget, setVillaBudget] = useState('₹25 Cr Beachfront Infinity Villa');
  const [currency, setCurrency] = useState('INR');
  const [simulatedSuccess, setSimulatedSuccess] = useState(false);

  if (!project) return null;

  const handleSimulatedAction = () => {
    setSimulatedSuccess(true);
    setTimeout(() => {
      setSimulatedSuccess(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
      <div className="flex min-h-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-4 sm:my-8 ${
          theme === 'dark'
            ? 'bg-slate-950 border-amber-500/40 text-white shadow-black/90'
            : 'bg-white border-amber-500 text-slate-900 shadow-slate-300'
        }`}
      >
        {/* Top Browser Bar Simulation */}
        <div className="px-6 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs font-mono text-slate-400 ml-3 hidden sm:inline">
              https://preview.sumantweb.com/{project.category}-live-preview
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Interactive Live Demo
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Section of the Simulated Site */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] overflow-hidden flex items-center justify-center text-center p-6 sm:p-10">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono tracking-widest uppercase text-amber-400 font-bold block mb-2">
              ✦ {project.clientName} ✦
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight mb-2">
              {project.demoContent.heroTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              {project.demoContent.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Interactive Simulation Dashboard */}
        <div className="p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {project.demoContent.previewFeatures.map((f, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border ${
                theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-3 font-bold">
                  ★
                </div>
                <h4 className="font-bold text-sm mb-1">{f.title}</h4>
                <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Widget Box based on Category */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            theme === 'dark' ? 'bg-slate-900 border-amber-500/30' : 'bg-amber-50 border-amber-400 shadow-md'
          }`}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-500/20">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-bold block">
                  Interactive Production Engine Test
                </span>
                <h4 className="text-xl font-bold font-serif">
                  {project.category === 'restaurant' && "Live Table Reservation Simulator"}
                  {project.category === 'salon' && "Automated VIP Styling Booking Engine"}
                  {project.category === 'real_estate' && "HNWI Villa Inspection & Currency Walkthrough"}
                </h4>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                ● Live Sync Active
              </span>
            </div>

            {simulatedSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 animate-bounce" />
                <h5 className="text-lg font-bold">Simulated Production Booking Locked!</h5>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  In the real deployed website, this action instantly triggers a SMS confirmation via Twilio and logs the booking directly into the client's Google Sheet or CRM without paying $1 in monthly platform commissions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {project.category === 'restaurant' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Select Table Configuration</label>
                      <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white text-xs border border-slate-700">
                        <option>2 Guests (Intimate Candlelight Table)</option>
                        <option>4 Guests (Chef's Tasting Alcove)</option>
                        <option>8+ VIP Guests (Private Wine Cellar Dining Room)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Sommelier Wine Pairing Option</label>
                      <select value={winePairing} onChange={(e) => setWinePairing(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white text-xs border border-slate-700">
                        <option>Grand Cru Sommelier Pairing (+₹4,500/guest)</option>
                        <option>Organic Biodynamic French Selection (+₹3,200/guest)</option>
                        <option>Standard À la Carte Beverage Menu</option>
                      </select>
                    </div>
                  </div>
                )}

                {project.category === 'salon' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Select VIP Sanctuary Package</label>
                      <select value={treatment} onChange={(e) => setTreatment(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white text-xs border border-slate-700">
                        <option>Royal Gold Bridal Makeover & Styling (₹45,000)</option>
                        <option>Cellular Diamond Skin Rejuvenation Spa (₹18,500)</option>
                        <option>Bespoke Hair Sculpting & Botanical Keratin (₹12,000)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Preferred Master Aesthetician</label>
                      <select className="w-full p-3 rounded-xl bg-slate-800 text-white text-xs border border-slate-700">
                        <option>Sanya Kapoor (Principle Founder & Stylist)</option>
                        <option>Aiden Miller (Senior Hair Sculptor)</option>
                        <option>Dr. Elena Rostova (Medical Dermatologist)</option>
                      </select>
                    </div>
                  </div>
                )}

                {project.category === 'real_estate' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Select Architectural Trophy Property</label>
                      <select value={villaBudget} onChange={(e) => setVillaBudget(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white text-xs border border-slate-700">
                        <option>₹25 Cr Beachfront Infinity Villa (Alibaug)</option>
                        <option>₹45 Cr Triplex Penthouse (Worli Sea Face)</option>
                        <option>₹18 Cr Modernist Golf Sanctuary (Pune)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-mono text-slate-400 block mb-1">Investor Currency Display</label>
                      <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full p-3 rounded-xl bg-slate-800 text-white text-xs border border-slate-700">
                        <option value="INR">₹ Indian Rupees (INR - ₹25 Crores)</option>
                        <option value="USD">$ US Dollars (USD - ~$3.05 Million)</option>
                        <option value="AED">د.إ Emirates Dirham (AED - ~11.2 Million)</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="pt-3 flex justify-end">
                  <button
                    onClick={handleSimulatedAction}
                    className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg"
                  >
                    Test Live Interactive Trigger →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Call to Action for Agency Hiring */}
          <div className="mt-8 pt-6 border-t border-slate-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 block">Like this engineering quality?</span>
              <h5 className="font-bold text-base">We can build this exact level of custom interactivity for your business.</h5>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenBooking(`Build Similar to ${project.title}`, "₹69,999 (Gold Turnkey Suite)");
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg whitespace-nowrap"
            >
              Build My Custom Site Like This →
            </button>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};
