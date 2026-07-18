import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ScrollDirectionButtonProps {
  theme: 'light' | 'dark';
}

export const ScrollDirectionButton: React.FC<ScrollDirectionButtonProps> = ({ theme }) => {
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // If we've scrolled past 50% of the page, arrow points UP (to head)
      // Otherwise it points DOWN (to footer)
      if (windowHeight > 0 && totalScroll > windowHeight * 0.5) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isNearBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 p-3.5 rounded-full shadow-2xl transition-all flex items-center justify-center ${
        theme === 'dark' 
          ? 'bg-slate-900 border border-slate-700 text-amber-500 hover:bg-slate-800 hover:border-amber-500/50 hover:shadow-amber-900/20' 
          : 'bg-white border border-slate-200 text-amber-600 hover:bg-slate-50 hover:border-amber-400 hover:shadow-amber-200'
      }`}
      title={isNearBottom ? "Scroll to Header" : "Scroll to Footer"}
    >
      <AnimatePresence mode="wait">
        {isNearBottom ? (
          <motion.div
            key="up"
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="down"
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
