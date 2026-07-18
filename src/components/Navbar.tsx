import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sun, Moon, ShieldCheck, PhoneCall, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { ThemeMode } from '../types';
import { useCMS } from '../context/CMSContext';
import { BrandLogoSW, PhoneCallLogo, WhatsAppLogo } from './BrandIcons';

interface NavbarProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenAiScope: () => void;
  onOpenNetlifyGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  setTheme,
  onOpenBooking,
  onOpenAdmin,
  onOpenAiScope,
  onOpenNetlifyGuide,
}) => {
  const { data: { AGENCY_BRAND } } = useCMS();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'ROI Calculator', href: '#roi-calc' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50 py-3'
            : 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-lg shadow-slate-200/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <BrandLogoSW size="md" />
            <div className="flex flex-col">
              <span className={`font-extrabold text-lg tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'} group-hover:text-amber-500 transition-colors`}>
                {AGENCY_BRAND.name.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-amber-500/90 uppercase font-semibold">
                Luxury Web Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  theme === 'dark'
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            {/* AI Scope Advisor Trigger */}
            <button
              onClick={onOpenAiScope}
              className="ml-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 hover:border-purple-500/60 transition-all flex items-center gap-1.5 animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Scope & Quote</span>
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-800/80 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Portal Switcher */}
            <button
              onClick={onOpenAdmin}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border flex items-center gap-1.5 transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-amber-500/50 hover:text-amber-400'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-amber-600 hover:text-amber-700'
              }`}
              title="Agency Admin Lead Dashboard"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>Admin Portal</span>
            </button>

            {/* Netlify Deployment Setup */}
            <button
              onClick={onOpenNetlifyGuide}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border flex items-center gap-1.5 transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-700 text-cyan-400 hover:border-cyan-500/50'
                  : 'bg-slate-100 border-slate-300 text-cyan-700 hover:border-cyan-600'
              }`}
              title="Netlify Deployment Guide & Webhooks"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
              <span>Netlify Ready</span>
            </button>

            {/* Direct Phone Call Icon CTA */}
            <a
              href={`tel:${AGENCY_BRAND.phone}`}
              className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:scale-105 transition-all flex items-center gap-1.5 group"
              title={`Call Founder Directly: ${AGENCY_BRAND.phone}`}
            >
              <PhoneCallLogo className="w-6 h-6 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-400 hidden xl:inline">{AGENCY_BRAND.phone}</span>
            </a>

            {/* Direct WhatsApp CTA */}
            <a
              href={`https://wa.me/${AGENCY_BRAND.whatsapp}?text=${encodeURIComponent("Hi Sumant Web! I'm interested in a bespoke high-end website.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:scale-105 transition-all flex items-center gap-1.5"
              title="Chat with Founder on WhatsApp"
            >
              <WhatsAppLogo className="w-6 h-6" />
            </a>

            {/* Primary CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center gap-2 group"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-full ${
                theme === 'dark' ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className={`p-2.5 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`lg:hidden px-6 pt-4 pb-8 mt-3 border-b ${
            theme === 'dark'
              ? 'bg-slate-950/95 border-slate-800 text-white'
              : 'bg-white/95 border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-base font-semibold border-b ${
                  theme === 'dark' ? 'border-slate-800/60 text-slate-200' : 'border-slate-100 text-slate-700'
                }`}
              >
                {link.name}
              </a>
            ))}

            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiScope();
                }}
                className="py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Scope</span>
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Admin Portal</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNetlifyGuide();
              }}
              className="py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-xs flex items-center justify-center gap-1.5 mt-1"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Netlify & Webhook Setup Suite</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <span>Book VIP Consultation</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <a
                href={`tel:${AGENCY_BRAND.phone}`}
                className="w-full py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-center text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-emerald-500/25 shadow-md shadow-emerald-500/10"
              >
                <PhoneCallLogo className="w-5 h-5 animate-pulse" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${AGENCY_BRAND.whatsapp}?text=${encodeURIComponent("Hi Sumant Web! I'm interested in a bespoke high-end website.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-center text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-[#25D366]/25 shadow-md shadow-[#25D366]/10"
              >
                <WhatsAppLogo className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};
