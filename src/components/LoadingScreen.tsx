import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { BrandLogoSW } from './BrandIcons';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const { data: { AGENCY_BRAND } } = useCMS();

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (onFinish) onFinish();
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 text-white overflow-hidden"
        >
          {/* Background Ambient glow */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-amber-500/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10 text-center max-w-sm w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mx-auto mb-6"
            >
              <BrandLogoSW size="lg" />
            </motion.div>

            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif mb-2"
            >
              {AGENCY_BRAND.name.toUpperCase()}
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs font-mono tracking-widest text-amber-500 uppercase font-semibold mb-8"
            >
              {AGENCY_BRAND.tagline}
            </motion.p>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-3 border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>Initializing Luxury Architecture</span>
              <span className="text-amber-400 font-bold">{Math.min(progress, 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
