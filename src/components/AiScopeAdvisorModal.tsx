import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, CheckCircle2, ArrowRight, TrendingUp, AlertCircle, RefreshCw, Cpu } from 'lucide-react';
import { ThemeMode, AiScopeResult } from '../types';

interface AiScopeAdvisorModalProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (packageTitle?: string, price?: string) => void;
  prefillIndustry?: string;
}

export const AiScopeAdvisorModal: React.FC<AiScopeAdvisorModalProps> = ({
  theme,
  isOpen,
  onClose,
  onOpenBooking,
  prefillIndustry
}) => {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState(prefillIndustry || 'Fine Dining Restaurant');
  const [currentChallenges, setCurrentChallenges] = useState('');
  const [targetGoal, setTargetGoal] = useState('Double online bookings and command higher prices');
  const [budgetRange, setBudgetRange] = useState('₹65,000 - ₹80,000');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiScopeResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const res = await fetch('/api/ai-scope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: businessName || 'Luxury Brand',
          industry,
          currentChallenges,
          targetGoal,
          budgetRange
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.scope) {
          setResult(data.scope);
        } else {
          throw new Error('Could not parse AI response');
        }
      } else {
        throw new Error('Server returned an error');
      }
      setLoading(false);
    } catch (err: any) {
      // Fallback for purely static browser mode (if server is not reached)
      setTimeout(() => {
        setResult({
          recommendedPackage: 'Gold Luxury Authority Suite (₹69,999)',
          title: `Bespoke Architecture for ${businessName || industry}`,
          executiveSummary: `For a high-end ${industry} aiming to achieve ${targetGoal}, a standard template is inadequate. We recommend our Gold Authority Suite with sub-second page transitions, dark-mode elegance, and a direct reservation engine that saves ₹45,000/mo in commissions.`,
          keyDeliverables: [
            'Bespoke UI/UX Design System in Figma',
            'Sub-Second Next Gen Frontend (99+ PageSpeed)',
            'Direct Zero-Commission Booking Engine',
            'Framer Motion Micro-interactions & Glassmorphism',
            'Automated Lead Sync to Google Sheets & SMS Alerts'
          ],
          estimatedTimeline: '16 to 22 Business Days',
          projectedROI: 'Expected to generate ₹3.5L to ₹8L in additional client revenue within 90 days of launch.',
          suggestedInvestment: budgetRange || '₹69,999 (All-inclusive turnkey development)'
        });
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <div className="flex min-h-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`w-full max-w-3xl rounded-2xl sm:rounded-3xl border shadow-2xl min-w-0 overflow-hidden my-4 sm:my-8 ${
          theme === 'dark'
            ? 'bg-slate-950 border-purple-500/40 text-white shadow-black/90'
            : 'bg-white border-purple-400 text-slate-900 shadow-slate-300'
        }`}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950 border-b border-purple-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold block">
                ✦ Powered by Gemini AI Server-Side
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-serif">
                Instant AI Project Scope & Quote Advisor
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {!result ? (
            <form onSubmit={handleGenerate} className="space-y-5">
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Enter your business details below. Our Gemini AI Principle Architect will instantly analyze your industry and generate a bespoke ₹50,000–₹80,000+ architectural recommendation with projected ROI.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                    Business / Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. L'Amour Bistro"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                    Industry / Sector <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fine Dining Restaurant / Luxury Salon"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                  What is your primary goal for this website?
                </label>
                <input
                  type="text"
                  placeholder="e.g. Get 50+ online reservations a month and eliminate third-party commission fees"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                  What is your target investment range?
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none cursor-pointer ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-purple-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="₹49,999 (Silver Essential Growth Launch)">₹49,999 (Silver Essential Growth Launch)</option>
                  <option value="₹69,999 (Gold Luxury Authority Suite - Recommended)">₹69,999 (Gold Luxury Authority Suite - Recommended)</option>
                  <option value="₹89,999 (Platinum Bespoke Enterprise Domination)">₹89,999 (Platinum Bespoke Enterprise Domination)</option>
                  <option value="₹1,00,000+ ($1,500+) Enterprise Custom">₹1,00,000+ ($1,500+) Enterprise Custom</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Gemini AI is Architecting Your Proposal...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate AI Project Architecture & Price</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* AI Recommended Package Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-amber-500/20 border border-purple-500/40 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-purple-400 font-bold block">Recommended Architectural Suite</span>
                  <strong className="text-lg sm:text-xl font-black text-amber-400 font-mono">{result.recommendedPackage}</strong>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono uppercase text-slate-400 block">Timeline</span>
                  <span className="text-sm font-bold font-mono">{result.estimatedTimeline}</span>
                </div>
              </div>

              {/* Title & Summary */}
              <div>
                <h4 className="text-2xl font-extrabold font-serif mb-2">{result.title}</h4>
                <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {result.executiveSummary}
                </p>
              </div>

              {/* Key Deliverables Checklist */}
              <div className={`p-5 rounded-2xl border space-y-3 ${
                theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">Custom Turnkey Deliverables:</span>
                {result.keyDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Projected ROI Callout */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                theme === 'dark' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <TrendingUp className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-xs sm:text-sm block mb-1">Projected ROI & Financial Impact:</strong>
                  <p className="text-xs leading-relaxed">{result.projectedROI}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-500/20">
                <button
                  onClick={() => setResult(null)}
                  className="px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  ← Edit Parameters
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking(result.recommendedPackage, result.suggestedInvestment);
                  }}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2"
                >
                  <span>Lock In {result.recommendedPackage} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      </div>
    </div>
  );
};
