import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Code2, Sparkles, CheckCircle2, TrendingUp, ArrowRight, Play, Eye } from 'lucide-react';
import { ThemeMode, PortfolioProject } from '../types';
import { useCMS } from '../context/CMSContext';

interface PortfolioSectionProps {
  theme: ThemeMode;
  onOpenDemoModal: (project: PortfolioProject) => void;
  onOpenBooking: (prefillProject?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  theme,
  onOpenDemoModal,
  onOpenBooking
}) => {
  const { data: { PORTFOLIO_PROJECTS } } = useCMS();

  return (
    <section id="portfolio" className={`py-24 sm:py-32 relative transition-colors ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-500 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block mb-3">
            03 / Flagship Live Masterpieces
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-serif">
            Recent <span className="text-amber-500 font-mono italic">₹65,000–₹80,000</span> Flagship Projects.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            We don't show conceptual mockups. Explore three live interactive production websites built by our architects. Click "Experience Live Demo" to interact with their reservation engines, ROI calculators, and luxury styling suites.
          </p>
        </div>

        {/* 3 Flagship Cards */}
        <div className="space-y-20 sm:space-y-28">
          {PORTFOLIO_PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Large Preview Image with Premium Hover Animation */}
                <div className={`lg:col-span-7 relative group ${isEven ? '' : 'lg:col-start-6'}`}>
                  <div className={`relative rounded-3xl overflow-hidden border shadow-2xl aspect-[16/10] ${
                    theme === 'dark' ? 'border-white/10 shadow-black/80' : 'border-slate-200 shadow-slate-300/60'
                  }`}>
                    {/* Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                    {/* Top Tag & Price Value Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase bg-slate-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                        {project.industry}
                      </span>
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase bg-amber-500 text-slate-950 shadow-lg">
                        ₹65,000 – ₹80,000 Value
                      </span>
                    </div>

                    {/* Hover Live Preview Trigger Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-slate-950/40 backdrop-blur-sm">
                      <button
                        onClick={() => onOpenDemoModal(project)}
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <Play className="w-4 h-4 fill-slate-950" />
                        <span>Experience Interactive Demo</span>
                      </button>
                    </div>

                    {/* Bottom Tech Badges overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 pointer-events-none">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-black/60 text-white border border-white/10 backdrop-blur-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Details & Features */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? '' : 'lg:col-start-1'}`}>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block mb-2">
                      {project.clientName}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 font-serif">
                      {project.title}
                    </h3>
                    <p className={`text-base leading-relaxed ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {project.tagline}
                    </p>
                  </div>

                  {/* Client Metrics / ROI Grid */}
                  <div className={`grid grid-cols-3 gap-3 p-4 rounded-2xl border ${
                    theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    {project.metrics.map((m, i) => (
                      <div key={i} className="text-center">
                        <span className="text-lg sm:text-xl font-black font-mono text-amber-500 block">
                          {m.value}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-slate-400 block leading-tight">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      Architectural Highlights:
                    </span>
                    {project.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial Snippet */}
                  {project.testimonialQuote && (
                    <div className={`p-4 rounded-2xl border-l-4 border-amber-500 text-xs italic ${
                      theme === 'dark' ? 'bg-amber-500/5 text-amber-200' : 'bg-amber-50 text-amber-900'
                    }`}>
                      <p className="mb-1">"{project.testimonialQuote}"</p>
                      <span className="font-semibold font-mono text-[11px] text-amber-500 not-italic block">— {project.testimonialAuthor}</span>
                    </div>
                  )}

                  {/* Action Buttons: Live Demo & Source Code */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => onOpenDemoModal(project)}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center gap-2 group"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Live Demo</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {project.sourceCodeUrl && (
                      <a
                        href={project.sourceCodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-5 py-3 rounded-full border text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                          theme === 'dark'
                            ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-500 hover:text-amber-400'
                            : 'bg-white border-slate-300 text-slate-700 hover:border-slate-800'
                        }`}
                      >
                        <Code2 className="w-4 h-4 text-amber-500" />
                        <span>Source Code</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    )}

                    <button
                      onClick={() => onOpenBooking(project.title)}
                      className="text-xs font-mono underline underline-offset-4 text-amber-500 hover:text-amber-400 ml-auto"
                    >
                      Build Similar Site →
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action footer banner */}
        <div className="mt-24 text-center">
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-4 rounded-full bg-slate-900 text-amber-400 border border-amber-500/40 font-extrabold text-sm sm:text-base shadow-xl hover:bg-amber-500 hover:text-slate-950 transition-all"
          >
            Ready to Build Your Own ₹80,000 Digital Flagship? Let's Talk.
          </button>
        </div>

      </div>
    </section>
  );
};
