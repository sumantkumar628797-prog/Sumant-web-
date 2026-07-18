import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { WhatsAppLogo, PhoneCallLogo } from './BrandIcons';

interface ScrollProgressProps {
  onOpenBooking: () => void;
  onOpenAiScope: () => void;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ onOpenBooking, onOpenAiScope }) => {
  const { data: { AGENCY_BRAND } } = useCMS();

  const [progress, setProgress] = useState(0);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setProgress(Number(scroll) * 100);

      if (totalScroll > 100) {
        setShowFloating(true);
      } else {
        setShowFloating(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${AGENCY_BRAND.whatsapp}?text=${encodeURIComponent(
    "Hello Sumant Web! I'm interested in a bespoke high-end website (₹65,000–₹80,000+). Can we schedule a brief consultation?"
  )}`;

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Action Buttons */}
      <AnimatePresence>
        {showFloating && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto"
          >
            {/* AI Scope button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenAiScope}
              className="p-3 rounded-2xl bg-slate-900 border border-purple-500/40 text-purple-300 shadow-xl shadow-purple-950/50 hover:bg-purple-950/40 transition-all flex items-center gap-2 text-xs font-mono font-bold"
              title="Instant AI Project Scope & Quote"
            >
              <Sparkles className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="hidden sm:inline">AI Quote</span>
            </motion.button>

            {/* Direct 1-Click Phone Call Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${AGENCY_BRAND.phone}`}
              className="px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-xl shadow-emerald-500/30 flex items-center gap-2 hover:bg-emerald-400 transition-all border border-emerald-300"
              title={`Direct One-Click Call: ${AGENCY_BRAND.phone}`}
            >
              <PhoneCallLogo className="w-5 h-5 animate-pulse" />
              <span>Call {AGENCY_BRAND.phone}</span>
            </motion.a>

            {/* WhatsApp Chat Button with Original Logo */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl bg-[#25D366] text-slate-950 font-extrabold text-xs shadow-xl shadow-[#25D366]/30 flex items-center gap-2 hover:bg-[#20bd5a] transition-all border border-green-300"
              title="Chat with Founder on WhatsApp"
            >
              <WhatsAppLogo className="w-5 h-5" />
              <span>WhatsApp Direct</span>
            </motion.a>

            {/* Quick Book Consultation CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenBooking}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/30 flex items-center gap-1.5"
            >
              <span>Book Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
