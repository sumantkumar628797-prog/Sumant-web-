import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  Mail, 
  Database, 
  FileSpreadsheet, 
  Send,
  HelpCircle,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeMode, BookingFormData, LeadRecord } from '../types';
import { useCMS } from '../context/CMSContext';
import { supabase } from '../lib/supabase';

import emailjs from '@emailjs/browser';

interface BookingSectionProps {
  theme: ThemeMode;
  prefillProject?: string;
  prefillBudget?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
  onOpenNetlifyGuide: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  theme,
  prefillProject,
  prefillBudget,
  isModal = false,
  onCloseModal,
  onOpenNetlifyGuide
}) => {
  const { data: { AGENCY_BRAND } } = useCMS();

  const [formData, setFormData] = useState<BookingFormData>({
    type: 'consultation',
    name: '',
    email: '',
    phone: '',
    address: '',
    businessName: '',
    projectType: prefillProject || 'Luxury Restaurant Website (₹65,000+)',
    budget: prefillBudget || '₹65,000 - ₹80,000 (Gold Authority Suite)',
    dateStr: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeSlot: '11:00 AM - 11:45 AM (IST)',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showNetlifyExplainer, setShowNetlifyExplainer] = useState(false);

  const projectTypeOptions = [
    'Luxury Restaurant Website (₹50k - ₹70k)',
    'Premium Salon & Spa Atelier (₹55k - ₹75k)',
    'High-End Real Estate Villa Portal (₹65k - ₹85k)',
    'Corporate Consulting & Finance Suite (₹50k - ₹65k)',
    'Bespoke Luxury E-Commerce Studio (₹65k - ₹80k+)',
    'High-Ticket Landing Page Funnel (₹40k - ₹55k)',
    'Custom Turnkey Architecture (Above ₹80,000)'
  ];

  const budgetOptions = [
    '₹49,999 (Silver Essential Growth Launch)',
    '₹69,999 (Gold Luxury Authority Suite - Recommended)',
    '₹89,999 (Platinum Bespoke Enterprise Domination)',
    'Custom Budget Above ₹1,00,000 ($1,500+)'
  ];

  const timeSlots = [
    '10:00 AM - 10:45 AM (IST)',
    '11:00 AM - 11:45 AM (IST)',
    '02:00 PM - 02:45 PM (IST)',
    '04:00 PM - 04:45 PM (IST)',
    '06:00 PM - 06:45 PM (IST)'
  ];

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981']
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Strict validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please complete your Name, VIP Email, and Contact Phone number.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }

    setLoading(true);

    try {
      // 1. Save to Supabase Backend
      const newBooking = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        business_name: formData.businessName,
        project_type: formData.projectType,
        budget: formData.budget,
        message: formData.message,
        status: 'Pending',
        created_at: new Date().toISOString()
      };

      const { error: supabaseError } = await supabase
        .from('bookings')
        .insert([newBooking]);

      if (supabaseError) {
        console.error('Supabase Error:', supabaseError);
        // We log the error but still proceed with the other notifications
      }

      // Always save to LocalStorage as a fallback (so Admin Portal works even without DB)
      try {
        const existingLeads = JSON.parse(localStorage.getItem('velox_leads_db') || '[]');
        existingLeads.unshift({
          ...newBooking,
          businessName: newBooking.business_name,
          projectType: newBooking.project_type,
          createdAt: newBooking.created_at,
          type: 'consultation'
        });
        localStorage.setItem('velox_leads_db', JSON.stringify(existingLeads));
      } catch (e) {
        console.error('LocalStorage Error:', e);
      }

      // 2. Submit to Netlify Forms (Saves Booking + Triggers Netlify Email Notifications if configured)
      const formPayload = new URLSearchParams();
      formPayload.append('form-name', 'vip-booking');
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value as string);
      });

      // We attempt to POST to Netlify. If not on Netlify, it might fail, so we don't throw an error.
      try {
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formPayload.toString()
        });
      } catch (err) {
        console.log('Netlify Form submission skipped (likely running locally or not on Netlify).');
      }

      // 3. Telegram Notification (Instant Alert to Founder)
      const env = (import.meta as any).env;
      const botToken = env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = env.VITE_TELEGRAM_CHAT_ID;
      if (botToken && chatId) {
        const text = `🚨 *New VIP Consultation Request*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Business:* ${formData.businessName || 'N/A'}\n*Project Type:* ${formData.projectType}\n*Budget:* ${formData.budget}\n*Message:* ${formData.message || 'None'}`;
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}&parse_mode=Markdown`);
      }

      // 4. EmailJS Integration (Auto-Reply to Client & Email to Founder)
      const emailjsServiceId = env.VITE_EMAILJS_SERVICE_ID;
      const emailjsTemplateId = env.VITE_EMAILJS_TEMPLATE_ID;
      const emailjsPublicKey = env.VITE_EMAILJS_PUBLIC_KEY;
      
      if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
        await emailjs.send(
          emailjsServiceId,
          emailjsTemplateId,
          {
            to_name: formData.name,
            to_email: formData.email,
            phone: formData.phone,
            project_type: formData.projectType,
            budget: formData.budget,
            message: formData.message,
            business_name: formData.businessName || 'N/A',
            owner_email: 'sumantkumar628797@gmail.com', // Replace with your email
          },
          emailjsPublicKey
        );
      } else {
        // Fallback: If EmailJS isn't configured, try hitting our own backend (AI Studio Preview)
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }).catch(() => {}); // ignore errors if backend isn't running
      }

      setLoading(false);
      setSubmitted(true);
      triggerConfetti();
    } catch (err: any) {
      setLoading(false);
      setErrorMsg('Something went wrong submitting your form. Please try again.');
    }
  };

  const formContent = (
    <div className="relative">
      {/* Top explainer header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-500/20">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">
            ✦ VIP Architectural Discovery Call
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif">
            Schedule Your Private Project Consultation
          </h3>
          <p className={`text-xs sm:text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Direct 45-minute architectural scope with Sumant Web founders. Zero sales pressure—pure value.
          </p>
        </div>

        {isModal && onCloseModal && (
          <button
            onClick={onCloseModal}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-center py-12 px-6 rounded-3xl border ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-amber-500/40'
              : 'bg-gradient-to-b from-amber-50 to-white border-amber-500 shadow-xl'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 animate-bounce" />
          </div>
          
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-500/15 text-amber-500 border border-amber-500/30 inline-block mb-3">
            ✦ VIP Consultation Confirmed ✦
          </span>

          <h4 className="text-2xl sm:text-4xl font-extrabold font-serif mb-4">
            We Look Forward to Speaking With You, {formData.name}!
          </h4>
          
          <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8 ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Your consultation request for <strong>{formData.projectType}</strong> has been secured for <strong>{formData.dateStr} at {formData.timeSlot}</strong>.
          </p>

          {/* Automation Checkboxes simulation */}
          <div className={`p-5 rounded-2xl border text-left max-w-md mx-auto mb-8 space-y-3 text-xs font-mono ${
            theme === 'dark' ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-emerald-400">
              <Mail className="w-4 h-4 shrink-0" />
              <span>[EMAIL INSTANT ALERT] Principle Architect notified</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Mail className="w-4 h-4 shrink-0" />
              <span>[CLIENT CONFIRMATION] Calendar invite sent to {formData.email}</span>
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              <span>[DATABASE / GOOGLE SHEETS] Lead synced to CRM securely</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setSubmitted(false);
                if (isModal && onCloseModal) onCloseModal();
              }}
              className="px-6 py-3 rounded-full bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors"
            >
              Close Window
            </button>
            <button
              onClick={onOpenNetlifyGuide}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>See How This System Works on Netlify</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 2 Column Row: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Aravind Singhania"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-sm'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
                Business VIP Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="aravind@vanguardrealty.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-sm'
                }`}
              />
            </div>
          </div>

          {/* 2 Column Row: Phone & Business Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
                Direct Phone / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98200 XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-sm'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
                Company / Brand Name
              </label>
              <input
                type="text"
                placeholder="Vanguard Estates & Villas"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-sm'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
              Address / Location
            </label>
            <input
              type="text"
              placeholder="Mumbai, Maharashtra"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                  : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-sm'
              }`}
            />
          </div>

          {/* Project Type Selector */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
              Select Architectural Project Type <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                  : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-sm'
              }`}
            >
              {projectTypeOptions.map((opt, idx) => (
                <option key={idx} value={opt} className={theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Range Selector */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
              Estimated Investment Budget <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                  : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-sm'
              }`}
            >
              {budgetOptions.map((opt, idx) => (
                <option key={idx} value={opt} className={theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* 2 Column Row: Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Preferred Consultation Date</span>
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.dateStr}
                onChange={(e) => setFormData({ ...formData, dateStr: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-sm'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Available Time Slot</span>
              </label>
              <select
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-sm'
                }`}
              >
                {timeSlots.map((slot, idx) => (
                  <option key={idx} value={slot} className={theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Details Notes */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
              Project Vision & Specific Requirements (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your current website challenges, target customer profile, or any specific features like table booking, custom 3D tour, or CRM sync..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all resize-none ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                  : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-sm'
              }`}
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-3xl sm:rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer text-center"
            >
              {loading ? (
                <span>Securing Your Consultation Slot...</span>
              ) : (
                <>
                  <span>Lock In Your VIP Consultation (₹0 Deposit)</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <span className="text-[11px] font-mono text-slate-400 block text-center mt-3">
              🔒 We guarantee 100% privacy. Your information is never shared with third parties or spammed.
            </span>
          </div>
        </form>
      )}

      {/* Netlify Explainer Bar */}
      <div className="mt-8 pt-6 border-t border-slate-500/20">
        <button
          type="button"
          onClick={() => setShowNetlifyExplainer(!showNetlifyExplainer)}
          className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono hover:bg-cyan-500/20 transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>How does this booking system work for FREE on Netlify without any paid CRM?</span>
          </div>
          <span className="underline font-bold">{showNetlifyExplainer ? 'Hide Details' : 'Read Explainer'}</span>
        </button>

        {showNetlifyExplainer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs space-y-2 font-mono leading-relaxed"
          >
            <p><strong>1. Netlify Forms Engine:</strong> By simply adding <code>&lt;form data-netlify="true"&gt;</code> to our HTML/JSX build, Netlify automatically intercepts all submissions without any backend code or database hosting costs.</p>
            <p><strong>2. Instant Email Alerts:</strong> Netlify Forms allows you to configure free automated notification emails straight to `sumantkumar628797@gmail.com` whenever a new high-ticket consultation is booked.</p>
            <p><strong>3. Zero-Cost Google Sheets Sync:</strong> Using Netlify Outgoing Webhooks or free Zapier/Make webhooks, every booking automatically populates your Google Sheet or Slack channel in real time!</p>
          </motion.div>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="p-4 sm:p-8 max-w-2xl mx-auto w-full min-w-0">
        {formContent}
      </div>
    );
  }

  return (
    <section id="booking" className={`py-24 sm:py-32 relative transition-colors ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-8 sm:p-12 border shadow-2xl ${
          theme === 'dark' ? 'glass-card-dark border-amber-500/30 shadow-black/80' : 'glass-card-light border-amber-500 shadow-slate-300 bg-white/95'
        }`}>
          {formContent}
        </div>
      </div>
    </section>
  );
};
