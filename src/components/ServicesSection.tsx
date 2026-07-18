import React from 'react';
import { motion } from 'motion/react';
import { 
  UtensilsCrossed, 
  Sparkles, 
  Building2, 
  Briefcase, 
  ShoppingBag, 
  Target, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { ThemeMode, ServiceItem } from '../types';
import { useCMS } from '../context/CMSContext';

interface ServicesSectionProps {
  theme: ThemeMode;
  onSelectService: (serviceTitle: string) => void;
  onOpenAiScope: (prefillIndustry?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  theme, 
  onSelectService,
  onOpenAiScope 
}) => {
  const { data: { SERVICES_DATA } } = useCMS();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6 text-amber-500" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-rose-400" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-blue-400" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-emerald-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-purple-400" />;
      case 'Target': return <Target className="w-6 h-6 text-amber-400" />;
      default: return <Sparkles className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="services" className={`py-24 sm:py-32 relative transition-colors ${
      theme === 'dark' ? 'bg-slate-900/60 text-white' : 'bg-slate-100/70 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-500 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block mb-3">
            02 / Bespoke Digital Ateliers
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-serif">
            Architected to Command <span className="text-amber-500 font-mono italic">₹50,000–₹80,000+</span> in Value.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Every industry has unique psychological triggers. We engineer tailored booking funnels, interactive menus, and visual showrooms designed specifically to close your ideal high-ticket clients.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={`rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                theme === 'dark'
                  ? 'bg-slate-950/80 border-white/10 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10'
                  : 'bg-white border-slate-200/80 hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10'
              }`}
            >
              {/* Background Ambient Glow */}
              <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${service.accentGradient} pointer-events-none`} />

              <div>
                {/* Category & Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl border ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
                  }`}>
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-500 font-semibold px-2.5 py-1 rounded-full bg-amber-500/10">
                    {service.category}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight group-hover:text-amber-500 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-6 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>

                {/* Investment & Timeline Pills */}
                <div className={`p-3.5 rounded-2xl border mb-6 flex items-center justify-between ${
                  theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Investment Range</span>
                    <span className="text-sm font-bold font-mono text-amber-500">{service.investmentRange}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Timeline</span>
                    </span>
                    <span className="text-xs font-semibold font-mono">{service.timeline}</span>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="mb-6 space-y-2.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">Key Architecture Deliverables:</span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* ROI Callout */}
                <div className={`p-3 rounded-xl border mb-6 text-xs flex items-start gap-2.5 ${
                  theme === 'dark' ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <TrendingUp className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block mb-0.5">ROI Projection:</strong>
                    <span>{service.roiProjection}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenAiScope(service.category)}
                    className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                      theme === 'dark'
                        ? 'border-purple-500/40 text-purple-300 hover:bg-purple-500/10'
                        : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>AI Quote</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Bespoke Scope Banner */}
        <div className={`mt-16 rounded-3xl p-8 border flex flex-col sm:flex-row items-center justify-between gap-6 ${
          theme === 'dark' ? 'glass-card-dark border-white/10' : 'glass-card-light border-slate-200 shadow-xl'
        }`}>
          <div>
            <h3 className="text-xl font-bold mb-2 font-serif">Need a Custom Turnkey Architecture Above ₹80,000?</h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              We also design enterprise portals, fintech SaaS dashboards, and multi-location hospitality chains with dedicated team retainers.
            </p>
          </div>
          <button
            onClick={() => onSelectService("Custom Bespoke Enterprise Project")}
            className="px-6 py-3 rounded-full bg-slate-900 text-amber-400 border border-amber-500/40 font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-slate-950 transition-all whitespace-nowrap shrink-0"
          >
            Request Enterprise Proposal
          </button>
        </div>

      </div>
    </section>
  );
};
