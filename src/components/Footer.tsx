import React from 'react';
import { ArrowUp, Heart, ShieldCheck, Terminal, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';
import { useCMS } from '../context/CMSContext';
import { BrandLogoSW, WhatsAppLogo, PhoneCallLogo } from './BrandIcons';

interface FooterProps {
  theme: ThemeMode;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenNetlifyGuide: () => void;
  onOpenAiScope: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme,
  onOpenBooking,
  onOpenAdmin,
  onOpenNetlifyGuide,
  onOpenAiScope
}) => {
  const { data: { AGENCY_BRAND } } = useCMS();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`pt-20 pb-12 border-t transition-colors ${
      theme === 'dark'
        ? 'bg-slate-950 border-white/10 text-slate-400'
        : 'bg-slate-900 border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <BrandLogoSW size="md" />
              <span className="font-extrabold text-xl tracking-tight text-white">
                {AGENCY_BRAND.name.toUpperCase()}
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-sm">
              We design Apple & Awwwards-level digital flagships for restaurants, salons, real estate titans, and high-ticket consulting brands.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${AGENCY_BRAND.phone}`}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2 hover:bg-emerald-500/30 transition-all"
              >
                <PhoneCallLogo className="w-4 h-4 animate-pulse" />
                <span>Call {AGENCY_BRAND.phone}</span>
              </a>

              <a
                href={`https://wa.me/${AGENCY_BRAND.whatsapp}?text=Hi%20Sumant%20Ved%20team,%20I'm%20interested%20in%20a%20high-end%20custom%20website%20worth%20₹65,000+.%20Can%20we%20schedule%20a%20consultation?`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-mono font-bold flex items-center gap-2 hover:bg-[#25D366]/30 transition-all"
              >
                <WhatsAppLogo className="w-4 h-4" />
                <span>WhatsApp Founder Direct</span>
              </a>

              <button
                onClick={onOpenAiScope}
                className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-purple-500/30 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Scope Advisor</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-white font-mono uppercase text-xs tracking-wider font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Bespoke Ateliers</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Flagship Live Projects</a></li>
              <li><a href="#why-us" className="hover:text-amber-400 transition-colors">Why Custom Beats Templates</a></li>
              <li><a href="#pricing" className="hover:text-amber-400 transition-colors">Turnkey Investment Tiers</a></li>
              <li><a href="#roi-calc" className="hover:text-amber-400 transition-colors">Interactive ROI Calculator</a></li>
              <li><a href="#testimonials" className="hover:text-amber-400 transition-colors">Verified Client Proof</a></li>
            </ul>
          </div>

          {/* Column 3: Flagship Live Projects */}
          <div>
            <h4 className="text-white font-mono uppercase text-xs tracking-wider font-bold mb-4">
              Live Case Studies
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">L'Amour Dining Engine</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Lumière Spa Sanctuary</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Vanguard Luxury Villas</a></li>
              <li><a href="#booking" className="hover:text-amber-400 transition-colors">Custom Bespoke Quote</a></li>
            </ul>
          </div>

          {/* Column 4: Agency Portal & Netlify Suite */}
          <div>
            <h4 className="text-white font-mono uppercase text-xs tracking-wider font-bold mb-4">
              Architectural Portal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={onOpenAdmin} className="hover:text-amber-400 flex items-center gap-1.5 transition-colors text-left">
                  <Terminal className="w-3.5 h-3.5 text-amber-500" />
                  <span>Admin Lead Portal</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenNetlifyGuide} className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors text-left">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Netlify Deployment Guide</span>
                </button>
              </li>
              <li><a href="#booking" className="hover:text-amber-400 transition-colors">Book Discovery Call</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition-colors">7-Field Inquiry Form</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {AGENCY_BRAND.name} Studio. All rights reserved.</span>
            <span className="hidden sm:inline">●</span>
            <span className="text-emerald-400">Netlify Zero-Cost Serverless Ready</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-slate-800 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center gap-1"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
