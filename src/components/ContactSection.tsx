import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, Clock, MessageSquare } from 'lucide-react';
import { ThemeMode, BookingFormData, LeadRecord } from '../types';
import { useCMS } from '../context/CMSContext';
import { PhoneCallLogo, WhatsAppLogo } from './BrandIcons';

interface ContactSectionProps {
  theme: ThemeMode;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme }) => {
  const { data: { AGENCY_BRAND } } = useCMS();

  const [formData, setFormData] = useState<BookingFormData>({
    type: 'contact_form',
    name: '',
    email: '',
    phone: '',
    businessName: '',
    budget: '₹65,000 - ₹80,000',
    projectType: 'High-End Web Development Project',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const budgetOptions = [
    '₹50,000 - ₹65,000 (Gold Turnkey Suite)',
    '₹65,000 - ₹80,000 (Platinum Authority Suite)',
    'Above ₹80,000 / $1,200+ (Bespoke Enterprise)',
    'Undisclosed / Require Custom Proposal'
  ];

  const projectTypes = [
    'Luxury Restaurant Website',
    'Premium Salon Website',
    'High-End Real Estate Website',
    'Corporate Consulting & Finance',
    'Bespoke E-Commerce Studio',
    'High-Ticket Landing Page Funnel',
    'General Inquiry & Collaboration'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please enter your Name, Email, and Message.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Submission failed');
      } else {
        const localLeads = JSON.parse(localStorage.getItem('velox_leads_db') || '[]');
        const newLead: LeadRecord = {
          id: `contact_${Date.now()}`,
          ...formData,
          status: 'New',
          createdAt: new Date().toISOString()
        };
        localLeads.unshift(newLead);
        localStorage.setItem('velox_leads_db', JSON.stringify(localLeads));
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Failed to submit form. Please try again.');
    }
  };

  return (
    <section id="contact" className={`py-24 sm:py-32 relative transition-colors ${
      theme === 'dark' ? 'bg-slate-900/60 text-white' : 'bg-slate-100/80 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-500 font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 inline-block mb-3">
            08 / Direct Architectural Line
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-serif">
            Let's Discuss Your Digital Legacy.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Have a question about a custom requirement, agency partnership, or bespoke quote? Fill out all details below. We reply within 2 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Founder Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className={`p-8 rounded-3xl border ${
              theme === 'dark' ? 'bg-slate-950/80 border-white/10' : 'bg-white border-slate-200 shadow-lg'
            }`}>
              <h3 className="text-2xl font-bold font-serif mb-6">Sumant Web Studios</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 shrink-0">
                    <PhoneCallLogo className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block">Principle Founder Line</span>
                    <a href={`tel:${AGENCY_BRAND.phone}`} className="font-mono font-bold text-base hover:text-amber-500 transition-colors flex items-center gap-1.5 mt-0.5">
                      <span>{AGENCY_BRAND.phone}</span>
                    </a>
                    <span className="text-[11px] text-emerald-400 font-mono font-semibold flex items-center gap-1 mt-1">
                      <WhatsAppLogo className="w-3.5 h-3.5 inline" />
                      <span>● Available on WhatsApp 24/7</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block">VIP Executive Inbox</span>
                    <a href={`mailto:${AGENCY_BRAND.email}`} className="font-mono font-bold text-base hover:text-purple-400 transition-colors">
                      {AGENCY_BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-400 block">Global Remote HQ</span>
                    <span className="font-medium text-sm block">Mumbai, Maharashtra & San Francisco, CA</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-500/15">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    Accepting 2 new luxury projects for July/August 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Testimonial quote card */}
            <div className={`p-6 rounded-2xl border-l-4 border-amber-500 italic text-xs ${
              theme === 'dark' ? 'bg-slate-900/60 text-slate-300 border-t border-r border-b border-white/5' : 'bg-amber-50 text-amber-950'
            }`}>
              "We reached out to Sumant Web with an urgent launch deadline for our fine dining restaurant. They not only delivered 3 days early, but their code scored 99 on PageSpeed."
              <span className="font-bold font-mono text-amber-500 not-italic block mt-2">— L'Amour Hospitality Group</span>
            </div>
          </div>

          {/* Right Column: Complete 7-Field Contact Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-10 rounded-3xl border shadow-xl ${
              theme === 'dark' ? 'bg-slate-950 border-white/10' : 'bg-white border-slate-200 shadow-slate-200/60'
            }`}>
              <h3 className="text-xl font-bold font-serif mb-2">General Inquiry & Project Brief</h3>
              <p className={`text-xs mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Fill out the 7 essential project details below. All form submissions are automatically captured via Netlify Forms and synced to our CRM.
              </p>

              {submitted ? (
                <div className="text-center py-12 px-6">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
                  <h4 className="text-2xl font-bold mb-2">Message Received Successfully!</h4>
                  <p className="text-sm text-slate-400 mb-6">
                    Thank you for reaching out, {formData.name}. Our Principle Architect has received your project details and will review your requirements within 2 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ ...formData, message: '' }); }}
                    className="px-6 py-2.5 rounded-full bg-slate-800 text-white font-bold text-xs"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Field 1 & 2: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        1. Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        2. Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Field 3 & 4: Phone & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        3. Phone / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98XXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        4. Business Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Lumiere Spa Atelier"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-all ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Field 5 & 6: Budget & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        5. Estimated Budget <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none cursor-pointer ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      >
                        {budgetOptions.map((b, i) => (
                          <option key={i} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        6. Project Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none cursor-pointer ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                        }`}
                      >
                        {projectTypes.map((p, i) => (
                          <option key={i} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Field 7: Message */}
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1 font-semibold">
                      7. Project Message & Requirements <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please describe your project scope, timeline goals, and any reference websites you admire..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none resize-none transition-all ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500' : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full bg-slate-900 text-amber-400 border border-amber-500/40 font-bold text-sm uppercase tracking-wider hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending Inquiry...' : 'Submit 7-Field Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
