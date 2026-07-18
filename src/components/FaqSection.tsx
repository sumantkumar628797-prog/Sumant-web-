import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ShieldCheck, MessageCircle } from 'lucide-react';
import { ThemeMode } from '../types';
import { useCMS } from '../context/CMSContext';

interface FaqSectionProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ theme, onOpenBooking }) => {
  const { data: { FAQ_DATA } } = useCMS();

  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first FAQ by default
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Pricing & ROI', 'Process', 'Technical & SEO'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter(f => f.category === selectedCategory);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className={`py-24 sm:py-32 relative transition-colors ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-500 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block mb-3">
            07 / Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-serif">
            Everything You Need to Know Before Investing.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            We believe in complete architectural transparency. Have questions about our ₹50,000–₹80,000+ pricing structure, Netlify serverless hosting, or delivery timelines? Read below.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : theme === 'dark'
                    ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? theme === 'dark'
                      ? 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-black/50'
                      : 'bg-white border-amber-500 shadow-md shadow-amber-500/10'
                    : theme === 'dark'
                      ? 'bg-slate-900/40 border-white/10 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className={`text-base sm:text-lg font-bold ${
                    isOpen ? 'text-amber-500 font-serif' : theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-amber-500 text-slate-950' : theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`px-6 pb-6 pt-2 text-sm sm:text-base leading-relaxed border-t ${
                        theme === 'dark' ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-600'
                      }`}>
                        {faq.answer}
                        <div className="mt-4 pt-3 border-t border-slate-500/10 flex items-center justify-between text-xs font-mono text-amber-500">
                          <span>Category: {faq.category}</span>
                          <button
                            onClick={onOpenBooking}
                            className="underline underline-offset-4 hover:text-amber-400 font-bold"
                          >
                            Discuss this in a Strategy Call →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className={`mt-16 rounded-3xl p-8 border text-center flex flex-col sm:flex-row items-center justify-between gap-6 ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Have a specific bespoke requirement?</h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Speak directly with our Principle Architect on WhatsApp or book a private consultation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-md"
            >
              Book Discovery Call
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
