import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, X, Copy, Check, FileCode, Server, Database, Mail, Globe, Sparkles, Terminal } from 'lucide-react';
import { ThemeMode } from '../types';

interface NetlifyGuideModalProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
}

export const NetlifyGuideModal: React.FC<NetlifyGuideModalProps> = ({ theme, isOpen, onClose }) => {
  const [copiedTab, setCopiedTab] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'forms' | 'redirects' | 'seo'>('overview');

  if (!isOpen) return null;

  const copyCode = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(label);
    setTimeout(() => setCopiedTab(''), 2500);
  };

  const netlifyFormSnippet = `<form 
  name="vip-consultation" 
  method="POST" 
  data-netlify="true" 
  data-netlify-honeypot="bot-field"
>
  {/* Required hidden input for Netlify static HTML form parsing */}
  <input type="hidden" name="form-name" value="vip-consultation" />
  
  {/* Honeypot spam prevention field */}
  <p className="hidden">
    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
  </p>

  {/* Standard form inputs */}
  <input type="text" name="name" required placeholder="Full Name" />
  <input type="email" name="email" required placeholder="VIP Email" />
  <button type="submit">Submit Consultation Request</button>
</form>`;

  const redirectsSnippet = `# /public/_redirects
# Ensures React Router SPA fallback works flawlessly on Netlify without 404 errors
/*    /index.html   200

# Optional API proxy forwarding if hosting a custom Express microservice
/api/*  https://your-custom-backend.com/api/:splat  200`;

  const robotsSnippet = `# /public/robots.txt
User-agent: *
Allow: /
Sitemap: https://sumantweb.com/sitemap.xml

# Protect internal admin portal paths from search engines
Disallow: /admin
Disallow: /api/`;

  const sitemapSnippet = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sumantweb.com/</loc>
    <lastmod>2026-07-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sumantweb.com/#services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://sumantweb.com/#portfolio</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md">
      <div className="flex min-h-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-4 sm:my-8 ${
          theme === 'dark' ? 'bg-slate-950 border-cyan-500/40 text-white' : 'bg-white border-cyan-500 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-950 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                ✦ Complete Production Deployment Suite
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-serif">
                How to Host this Agency Website for ₹0/Mo on Netlify
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-slate-950 border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>1. Free Hosting & Webhook Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab('forms')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'forms'
                ? 'bg-slate-950 border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>2. Netlify Forms & Email Sync Code</span>
          </button>
          <button
            onClick={() => setActiveTab('redirects')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'redirects'
                ? 'bg-slate-950 border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>3. _redirects & SPA Router Setup</span>
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'seo'
                ? 'bg-slate-950 border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>4. SEO, Sitemap & Robots.txt</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto font-sans">
          
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                💡 <strong>Why Netlify is the Perfect Home for Sumant Web:</strong> This application is built as a lightning-fast React 19 + Vite bundle. When deployed on Netlify's Global CDN, you pay <strong>₹0 in monthly hosting fees</strong> while maintaining 99.4+ PageSpeed scores and automated SSL encryption.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 w-fit">
                    <Database className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base">Free Database & Google Sheets</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    You don't need MySQL or MongoDB. In Netlify dashboard under <strong>Site Settings → Forms → Outgoing Webhooks</strong>, add a free Make.com or Zapier webhook URL to automatically push every new client consultation directly into your Google Sheet!
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base">Instant Email Alerts (Zero Cost)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Under <strong>Forms → Form Notifications</strong>, click "Add Notification" and enter your VIP founder email address (`sumantkumar628797@gmail.com`). Netlify sends instant email alerts the second a client requests a quote!
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                    <Server className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base">1-Click Github Continuous Deploy</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Connect your GitHub repository to Netlify. Set Build Command to `npm run build` and Publish Directory to `dist`. Whenever you push code edits, Netlify rebuilds in ~30 seconds automatically.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Netlify Forms syntax */}
          {activeTab === 'forms' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base">Netlify Static Forms Implementation</h4>
                  <p className="text-xs text-slate-400">Include this exact JSX syntax in your appointment booking form to enable serverless lead capture:</p>
                </div>
                <button
                  onClick={() => copyCode(netlifyFormSnippet, 'forms')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  {copiedTab === 'forms' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedTab === 'forms' ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs overflow-x-auto">
                <code>{netlifyFormSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tab 3: _redirects */}
          {activeTab === 'redirects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base">Required `_redirects` File for Vite React Apps</h4>
                  <p className="text-xs text-slate-400">Save this exact file inside your `/public/` folder so page refreshes never result in Netlify 404 Not Found errors:</p>
                </div>
                <button
                  onClick={() => copyCode(redirectsSnippet, 'redirects')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  {copiedTab === 'redirects' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedTab === 'redirects' ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto">
                <code>{redirectsSnippet}</code>
              </pre>
            </div>
          )}

          {/* Tab 4: SEO & Sitemap */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">A. `/public/robots.txt` Configuration</h4>
                  <button
                    onClick={() => copyCode(robotsSnippet, 'robots')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-cyan-400 flex items-center gap-1"
                  >
                    {copiedTab === 'robots' ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 font-mono text-xs overflow-x-auto">
                  <code>{robotsSnippet}</code>
                </pre>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm">B. `/public/sitemap.xml` Structure</h4>
                  <button
                    onClick={() => copyCode(sitemapSnippet, 'sitemap')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-cyan-400 flex items-center gap-1"
                  >
                    {copiedTab === 'sitemap' ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-purple-300 font-mono text-xs overflow-x-auto">
                  <code>{sitemapSnippet}</code>
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider"
          >
            Got It, Ready to Deploy to Netlify
          </button>
        </div>
      </motion.div>
      </div>
    </div>
  );
};
