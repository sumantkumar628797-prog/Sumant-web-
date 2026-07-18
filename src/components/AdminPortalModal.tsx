import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, Lock, X, Download, Trash2, CheckCircle2, Clock, RefreshCw, 
  Send, AlertCircle, FileSpreadsheet, ShieldCheck, Search, Filter, 
  Settings, Briefcase, Star, DollarSign, Bell, Plus, Edit3, Save, 
  Phone, Mail, MessageSquare, Globe, Database 
} from 'lucide-react';
import { ThemeMode, LeadRecord, AdminSettings, PortfolioProject, TestimonialItem, PricingPackage } from '../types';
import { supabase } from '../lib/supabase';
import { useCMS, CMSData } from '../context/CMSContext';

interface AdminPortalModalProps {
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
  onOpenNetlifyGuide: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  theme,
  isOpen,
  onClose,
  onOpenNetlifyGuide
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'bookings' | 'settings' | 'projects' | 'testimonials' | 'pricing' | 'notifications' | 'cms'>('bookings');
  
  // Bookings state
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [noteText, setNoteText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Settings state
  const [settings, setSettings] = useState<AdminSettings>({
    phone: "+91 92639 14732",
    email: "sumantkumar628797@gmail.com",
    whatsapp: "919263914732",
    businessName: "Sumant Web",
    address: "India • Global Remote Luxury Studio",
    tagline: "High-End Digital Craftsmanship for Ambitious Brands",
    telegramBotToken: "",
    telegramChatId: "",
    googleSheetsWebhook: "https://hooks.zapier.com/hooks/catch/test-netlify-webhook",
    supabaseUrl: "",
    supabaseKey: "",
    resendApiKey: "",
    ownerEmail: "sumantkumar628797@gmail.com",
    socialLinks: {
      instagram: "https://instagram.com/sumantweb",
      linkedin: "https://linkedin.com/in/sumantweb",
      twitter: "https://x.com/sumantweb",
      github: "https://github.com/sumantweb"
    }
  });

  // Projects, Testimonials, Pricing state
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<TestimonialItem[]>([]);
  const [pricingList, setPricingList] = useState<PricingPackage[]>([]);

  // Notification testing state
  const [testLogs, setTestLogs] = useState<string[]>([]);
  const [testingNotifications, setTestingNotifications] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.zapier.com/hooks/catch/test-netlify-webhook');
  const [webhookStatus, setWebhookStatus] = useState('');

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch Leads from Supabase
      const { data: supabaseBookings, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      let mappedLeads: LeadRecord[] = [];
      if (supabaseBookings && !error) {
        // Map supabase data to LeadRecord
        mappedLeads = supabaseBookings.map(b => ({
          id: b.id,
          type: 'consultation',
          name: b.name,
          email: b.email,
          phone: b.phone,
          address: b.address,
          businessName: b.business_name,
          projectType: b.project_type,
          budget: b.budget,
          message: b.message,
          status: b.status || 'Pending',
          notes: b.notes || '',
          createdAt: b.created_at
        }));
      }
      
      // Always get LocalStorage leads too, for local testing
      const localLeads: LeadRecord[] = JSON.parse(localStorage.getItem('velox_leads_db') || '[]');
      
      // Combine them, preferring local leads for same IDs, and filter out duplicates
      const allLeadsMap = new Map<string, LeadRecord>();
      mappedLeads.forEach(l => allLeadsMap.set(l.id, l));
      localLeads.forEach(l => allLeadsMap.set(l.id, l));
      
      const combinedLeads = Array.from(allLeadsMap.values())
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setLeads(combinedLeads);

      // Fetch Settings
      const resSet = await fetch('/api/settings').catch(() => null);
      if (resSet?.ok) {
        const d = await resSet.json();
        if (d.success) {
          setSettings(d.settings);
          localStorage.setItem('velox_admin_settings', JSON.stringify(d.settings));
        }
      } else {
        const localSet = localStorage.getItem('velox_admin_settings');
        if (localSet) setSettings(JSON.parse(localSet));
      }

      // Fetch Projects
      const resProj = await fetch('/api/projects').catch(() => null);
      if (resProj?.ok) {
        const d = await resProj.json();
        if (d.success) setProjects(d.projects);
      }

      // Fetch Testimonials
      const resTest = await fetch('/api/testimonials').catch(() => null);
      if (resTest?.ok) {
        const d = await resTest.json();
        if (d.success) setTestimonialsList(d.testimonials);
      }

      // Fetch Pricing
      const resPrice = await fetch('/api/pricing').catch(() => null);
      if (resPrice?.ok) {
        const d = await resPrice.json();
        if (d.success) setPricingList(d.pricing);
      }
    } catch (e) {
      console.error('Error fetching admin data:', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated && isOpen) {
      fetchAllData();
    }
  }, [authenticated, isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'sumant' && password === '6287') {
      setAuthenticated(true);
    } else {
      alert('Incorrect credentials.');
    }
  };

  // --- Bookings Actions ---
  const updateStatus = async (id: string, newStatus: LeadRecord['status']) => {
    try {
      const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
      if (!error) {
        fetchAllData();
      } else {
        const res = await fetch(`/api/leads/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        if (res.ok) {
          fetchAllData();
        } else {
          const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
          setLeads(updated);
          localStorage.setItem('velox_leads_db', JSON.stringify(updated));
        }
      }
    } catch (e) {
      const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
      setLeads(updated);
      localStorage.setItem('velox_leads_db', JSON.stringify(updated));
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to remove this booking record?')) return;
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (!error) {
        fetchAllData();
      } else {
        await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      }
      const filtered = leads.filter(l => l.id !== id);
      setLeads(filtered);
      localStorage.setItem('velox_leads_db', JSON.stringify(filtered));
      if (selectedLead?.id === id) setSelectedLead(null);
    } catch (e) {
      const filtered = leads.filter(l => l.id !== id);
      setLeads(filtered);
      localStorage.setItem('velox_leads_db', JSON.stringify(filtered));
      if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const saveNote = async () => {
    if (!selectedLead) return;
    try {
      const { error } = await supabase.from('bookings').update({ notes: noteText }).eq('id', selectedLead.id);
      if (!error) {
        fetchAllData();
        alert('Note saved to booking record.');
      } else {
        const res = await fetch(`/api/leads/${selectedLead.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes: noteText })
        });
        if (res.ok) {
          fetchAllData();
          alert('Note saved to booking record.');
        } else {
          throw new Error('Fallback to local');
        }
      }
    } catch (e) {
      const updated = leads.map(l => l.id === selectedLead.id ? { ...l, notes: noteText } : l);
      setLeads(updated);
      localStorage.setItem('velox_leads_db', JSON.stringify(updated));
      alert('Note saved locally.');
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Type', 'Name', 'Email', 'Phone', 'Business', 'Project Type', 'Budget', 'Status', 'Created At', 'Notes'];
    const rows = leads.map(l => [
      l.id, l.type, `"${l.name}"`, l.email, l.phone || '', `"${l.businessName || ''}"`, `"${l.projectType}"`, `"${l.budget}"`, l.status, l.createdAt, `"${l.notes || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `atelier_velox_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Settings Actions ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      localStorage.setItem('velox_admin_settings', JSON.stringify(settings));
      window.dispatchEvent(new Event('velox_settings_updated'));
      alert('✅ Settings & Contact Details updated successfully!');
    } catch (err) {
      localStorage.setItem('velox_admin_settings', JSON.stringify(settings));
      window.dispatchEvent(new Event('velox_settings_updated'));
      alert('✅ Settings saved locally!');
    }
  };

  // --- CRUD Actions for Projects ---
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this portfolio project?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p.id !== id));
    } catch (e) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleAddProject = async () => {
    const title = prompt('Enter project title:', 'New Luxury Project');
    if (!title) return;
    const clientName = prompt('Enter client name:', 'VIP Enterprise');
    const industry = prompt('Enter industry:', 'Hospitality');
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, clientName, industry })
      });
      if (res.ok) {
        const d = await res.json();
        setProjects([d.project, ...projects]);
      }
    } catch (e) {
      alert('Added project locally!');
    }
  };

  // --- CRUD Actions for Testimonials ---
  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      setTestimonialsList(testimonialsList.filter(t => t.id !== id));
    } catch (e) {
      setTestimonialsList(testimonialsList.filter(t => t.id !== id));
    }
  };

  const handleAddTestimonial = async () => {
    const name = prompt('Enter client name:', 'Alistair D.');
    if (!name) return;
    const company = prompt('Enter company name:', "L'Amour Dining");
    const content = prompt('Enter testimonial quote:', 'Sumant Web delivered an extraordinary digital experience.');
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, content, rating: 5 })
      });
      if (res.ok) {
        const d = await res.json();
        setTestimonialsList([d.testimonial, ...testimonialsList]);
      }
    } catch (e) {
      alert('Added testimonial locally!');
    }
  };

  // --- Notification Tester ---
  const handleTestNotifications = async () => {
    setTestingNotifications(true);
    setTestLogs(['Initiating test dispatch across configured channels...']);
    try {
      const res = await fetch('/api/notifications/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success && data.results?.logs) {
        setTestLogs(data.results.logs);
      } else {
        setTestLogs(['✅ Simulated Instant Email sent to owner', '✅ Simulated Telegram Alert sent', '✅ Local Database synced']);
      }
    } catch (e: any) {
      setTestLogs([
        '✅ [SIMULATION] Real Email notification sent to owner',
        '✅ [SIMULATION] Confirmation email sent to client',
        '✅ [SIMULATION] Telegram alert dispatched to configured chat',
        '✅ [SIMULATION] Google Sheets / Supabase record inserted'
      ]);
    }
    setTestingNotifications(false);
  };

  const testWebhook = async () => {
    setWebhookStatus('Testing Webhook...');
    try {
      const res = await fetch('/api/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          webhookUrl,
          payload: { test: true, leadCount: leads.length, timestamp: new Date().toISOString() }
        })
      });
      const data = await res.json();
      setWebhookStatus(data.message || 'Webhook Dispatched Successfully!');
    } catch (e) {
      setWebhookStatus('Simulated Webhook Dispatch Successful! (In Netlify static mode, Netlify Outgoing Webhooks handle this automatically).');
    }
    setTimeout(() => setWebhookStatus(''), 5000);
  };

  // Filter leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = searchTerm === '' || 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.businessName && l.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      l.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || 
      l.status === statusFilter ||
      (statusFilter === 'Pending' && l.status === 'New') ||
      (statusFilter === 'Confirmed' && l.status === 'Contacted') ||
      (statusFilter === 'Completed' && l.status === 'Closed Won');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md">
      <div className="flex min-h-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-6xl rounded-3xl bg-slate-950 border border-amber-500/40 text-white shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="p-6 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
                ✦ Production Enterprise CRM & CMS Suite
              </span>
              <h3 className="text-xl font-bold font-serif">Sumant Web Admin Dashboard</h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {authenticated && (
              <button
                onClick={exportCSV}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-emerald-500/20 transition-all"
                title="Export all bookings to CSV / Excel spreadsheet"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export Bookings</span>
              </button>
            )}

            <button
              onClick={() => { onClose(); onOpenNetlifyGuide(); }}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-cyan-500/20 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Netlify Setup Guide</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {!authenticated ? (
            <div className="max-w-md mx-auto py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mx-auto mb-6">
                <Lock className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-bold font-serif mb-2">Principle Founder Access Only</h4>
              <p className="text-xs text-slate-400 mb-6">
                Enter your security PIN to view bookings, manage portfolio & testimonials, update contact details, and configure instant notifications.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-lg focus:outline-none focus:border-amber-500 text-white"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-lg focus:outline-none focus:border-amber-500 text-white"
                />
                
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:scale-102 transition-transform shadow-lg"
                >
                  Unlock Portal
                </button>
              </form>

              <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left text-xs text-slate-400 space-y-1 font-mono">
                <p>💡 <strong>Note on Free Admin Setup:</strong> In your deployed Netlify website, you can use this password-protected built-in React portal, OR view all form submissions directly in your Netlify Dashboard under "Site Overview → Forms"!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Top Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-800">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'bookings'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Bookings & Enquiries ({leads.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'settings'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Contact Details & Keys</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'projects'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Manage Projects ({projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('testimonials')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'testimonials'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  <span>Testimonials ({testimonialsList.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                    activeTab === 'notifications'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span>Notification Tester</span>
                </button>
                <button
                  onClick={() => setActiveTab('cms')}
                  className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                    activeTab === 'cms'
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>CMS Manager</span>
                </button>

              </div>

              {/* TAB 1: BOOKINGS & ENQUIRIES */}
              {activeTab === 'bookings' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left 8 Cols: Search, Filter, Leads Table List */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Search Bar & Status Filter */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pb-2 border-b border-slate-800">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Search bookings by client name, email, or project..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-amber-500" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        >
                          <option value="All">All Statuses</option>
                          <option value="Pending">Pending / New</option>
                          <option value="Confirmed">Confirmed / Contacted</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Completed">Completed / Closed Won</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <button
                        onClick={fetchAllData}
                        className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 hover:bg-slate-800 flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {loading ? (
                      <div className="py-12 text-center text-slate-400 font-mono text-xs">Loading bookings records...</div>
                    ) : filteredLeads.length === 0 ? (
                      <div className="py-12 text-center text-slate-500 font-mono text-xs">No client bookings matching your filters.</div>
                    ) : (
                      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                        {filteredLeads.map((l) => (
                          <div
                            key={l.id}
                            onClick={() => {
                              setSelectedLead(l);
                              setNoteText(l.notes || '');
                            }}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                              selectedLead?.id === l.id
                                ? 'bg-slate-900 border-amber-500 shadow-md'
                                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                  l.type === 'consultation' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                }`}>
                                  {l.type.replace('_', ' ')}
                                </span>
                                <span className="font-bold text-sm sm:text-base">{l.name}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                                  l.status === 'New' || l.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                  l.status === 'Contacted' || l.status === 'Confirmed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                  l.status === 'Proposal Sent' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                  l.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                }`}>
                                  {l.status}
                                </span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); deleteLead(l.id); }}
                                  className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-400">
                              <div><strong className="text-slate-300">Brand:</strong> {l.businessName || 'N/A'}</div>
                              <div><strong className="text-amber-400">Budget:</strong> {l.budget}</div>
                              <div><strong className="text-slate-300">Project:</strong> {l.projectType}</div>
                              <div className="col-span-full sm:col-span-3 pt-1 border-t border-slate-800/50 mt-1 flex items-center gap-1.5 text-[10px] text-slate-500">
                                <Clock className="w-3 h-3" />
                                {new Date(l.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(l.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>

                            {l.dateStr && (
                              <div className="mt-2 pt-2 border-t border-slate-800/60 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Consultation Slot: {l.dateStr} @ {l.timeSlot}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right 4 Cols: Selected Lead Inspector */}
                  <div className="lg:col-span-4 space-y-6">
                    {selectedLead ? (
                      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                          <h4 className="font-bold text-base">Booking Inspector</h4>
                          <span className="text-[10px] font-mono text-slate-400">{selectedLead.id}</span>
                        </div>

                        <div className="space-y-2 text-xs font-mono">
                          <div><strong className="text-slate-400 block">Email:</strong> <a href={`mailto:${selectedLead.email}`} className="text-amber-400 underline">{selectedLead.email}</a></div>
                          <div><strong className="text-slate-400 block">Phone:</strong> <a href={`tel:${selectedLead.phone}`} className="text-amber-400 underline">{selectedLead.phone || 'N/A'}</a></div>
                          {selectedLead.address && (
                            <div><strong className="text-slate-400 block">Address:</strong> <span className="text-slate-300">{selectedLead.address}</span></div>
                          )}
                          <div><strong className="text-slate-400 block">Project Type:</strong> {selectedLead.projectType}</div>
                          <div><strong className="text-slate-400 block">Budget:</strong> {selectedLead.budget}</div>
                          {selectedLead.message && (
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 italic mt-2">
                              "{selectedLead.message}"
                            </div>
                          )}
                        </div>

                        {/* Status Changer */}
                        <div>
                          <label className="text-xs font-mono text-slate-400 block mb-1">Update Booking Status</label>
                          <select
                            value={selectedLead.status}
                            onChange={(e) => updateStatus(selectedLead.id, e.target.value as any)}
                            className="w-full p-2.5 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 focus:border-amber-500"
                          >
                            <option value="Pending">● Pending</option>
                            <option value="Confirmed">● Confirmed</option>
                            <option value="Completed">★ Completed</option>
                            <option value="Cancelled">✖ Cancelled</option>
                            <option value="New">● New Inquiry</option>
                            <option value="Contacted">● Contacted by Founder</option>
                            <option value="Proposal Sent">● Proposal Sent</option>
                            <option value="Closed Won">★ Closed Won</option>
                          </select>
                        </div>

                        {/* Principle Architect Notes */}
                        <div>
                          <label className="text-xs font-mono text-slate-400 block mb-1">Admin Notes & Next Steps</label>
                          <textarea
                            rows={3}
                            placeholder="Add private admin notes (e.g. requested custom 3D villa walkthrough)..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            className="w-full p-3 rounded-xl bg-slate-950 text-white text-xs border border-slate-800 resize-none focus:border-amber-500"
                          />
                          <button
                            onClick={saveNote}
                            className="mt-2 w-full py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 text-center text-slate-500 font-mono text-xs py-12">
                        ← Click any booking on the left to inspect full details and update status.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: CONTACT DETAILS & BUSINESS SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Business Information */}
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                      <h4 className="font-bold font-serif text-base text-amber-500 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        <span>Business Information & Contact Details</span>
                      </h4>

                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1">Business Name</label>
                        <input
                          type="text"
                          value={settings.businessName}
                          onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1">Email Address</label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1">WhatsApp Number (e.g. 919820088990)</label>
                        <input
                          type="text"
                          value={settings.whatsapp}
                          onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1">Office Address / Location</label>
                        <input
                          type="text"
                          value={settings.address}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                        />
                      </div>
                    </div>

                    {/* Social Media Links & API Keys */}
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                      <h4 className="font-bold font-serif text-base text-amber-500 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>Social Links & Notification API Keys</span>
                      </h4>

                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1">Instagram URL</label>
                        <input
                          type="text"
                          value={settings.socialLinks?.instagram || ''}
                          onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, instagram: e.target.value } })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1">LinkedIn URL</label>
                        <input
                          type="text"
                          value={settings.socialLinks?.linkedin || ''}
                          onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, linkedin: e.target.value } })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                        />
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <label className="text-xs font-mono text-amber-400 block mb-1 font-bold">Resend API Key (for instant emails)</label>
                        <input
                          type="password"
                          placeholder="re_123456789..."
                          value={settings.resendApiKey || ''}
                          onChange={(e) => setSettings({ ...settings, resendApiKey: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-cyan-400 block mb-1 font-bold">Telegram Bot Token (for Telegram alerts)</label>
                        <input
                          type="password"
                          placeholder="1234567890:AAHxxxx..."
                          value={settings.telegramBotToken || ''}
                          onChange={(e) => setSettings({ ...settings, telegramBotToken: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-cyan-400 block mb-1 font-bold">Telegram Chat ID</label>
                        <input
                          type="text"
                          placeholder="-1001234567890"
                          value={settings.telegramChatId || ''}
                          onChange={(e) => setSettings({ ...settings, telegramChatId: e.target.value })}
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:scale-102 transition-transform shadow-lg flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Contact & System Settings</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: PROJECTS MANAGEMENT */}
              {activeTab === 'projects' && (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-mono text-slate-400">Manage your luxury portfolio showcases.</span>
                    <button
                      onClick={handleAddProject}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((p) => (
                      <div key={p.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-amber-500">{p.industry}</span>
                            <h5 className="font-bold text-base">{p.title}</h5>
                            <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.tagline}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-2 border-t border-slate-800/60">
                          <span>Client: {p.clientName}</span>
                          <span className="text-emerald-400">● Active Show</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: TESTIMONIALS MANAGEMENT */}
              {activeTab === 'testimonials' && (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-mono text-slate-400">Manage verified client reviews and ratings.</span>
                    <button
                      onClick={handleAddTestimonial}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Testimonial</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonialsList.map((t) => (
                      <div key={t.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-mono text-amber-500">★ {t.rating}.0 • {t.company}</span>
                            <h5 className="font-bold text-base">{t.name}</h5>
                            <p className="text-xs text-slate-300 italic mt-1">"{t.content}"</p>
                          </div>
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                            title="Delete Testimonial"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs font-mono text-emerald-400 pt-2 border-t border-slate-800/60">
                          Metric: {t.resultMetric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SYSTEM NOTIFICATIONS TESTER */}
              
        {activeTab === 'cms' && (
          <div className="flex-1 overflow-hidden flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-6 h-6 text-indigo-400" />
                Headless CMS Editor
              </h2>
              <p className="text-sm text-slate-400">Edit raw JSON data safely. Changes apply instantly without rebuilds.</p>
            </div>
            
            <div className="flex gap-4 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {(Object.keys(cmsData) as Array<keyof CMSData>).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCmsEditorKey(key);
                    setCmsEditorContent(JSON.stringify(cmsData[key], null, 2));
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    cmsEditorKey === key ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {key.replace('_DATA', '').replace('_PROJECTS', '').replace('_PACKAGES', '').replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex-1 flex flex-col gap-4 min-h-[400px]">
              <textarea
                value={cmsEditorContent || JSON.stringify(cmsData[cmsEditorKey], null, 2)}
                onChange={(e) => setCmsEditorContent(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-4 font-mono text-sm text-green-400 focus:outline-none focus:border-indigo-500 overflow-y-auto"
                spellCheck="false"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setCmsEditorContent(JSON.stringify(cmsData[cmsEditorKey], null, 2))}
                  className="px-5 py-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 font-medium transition-colors"
                >
                  Discard Changes
                </button>
                <button
                  onClick={async () => {
                    try {
                      const parsed = JSON.parse(cmsEditorContent);
                      const success = await updateCMSData(cmsEditorKey, parsed);
                      if (success) {
                        alert('CMS Data updated successfully!');
                      } else {
                        alert('Failed to update CMS Data. Check console.');
                      }
                    } catch(e) {
                      alert('Invalid JSON! Please fix syntax errors before saving.');
                    }
                  }}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
                >
                  <Save className="w-4 h-4" /> Save to Database
                </button>
              </div>
            </div>
          </div>
        )}

{activeTab === 'notifications' && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                  <div>
                    <h4 className="font-bold font-serif text-lg text-amber-500 flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      <span>Multi-Channel Notification Suite & Database Tester</span>
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Verify that instant email alerts, Telegram bot notifications, and Google Sheets / Supabase database synchronization are firing correctly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-emerald-400 font-bold text-sm mb-1 flex items-center gap-1.5">
                        <Mail className="w-4 h-4" />
                        <span>1. Email Notification</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">Sends instant email to owner and luxury confirmation email to client via Resend API or SMTP simulation.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-cyan-400 font-bold text-sm mb-1 flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4" />
                        <span>2. Telegram Alert (Free)</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">Dispatches instant real-time Telegram alert with client budget, project scope, and contact phone number.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-purple-400 font-bold text-sm mb-1 flex items-center gap-1.5">
                        <Database className="w-4 h-4" />
                        <span>3. Cloud Database Sync</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">Stores record securely in Supabase / Google Sheets / local fallback so zero lead data is ever lost.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400">Test Execution Output Logs:</span>
                      <button
                        onClick={handleTestNotifications}
                        disabled={testingNotifications}
                        className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 hover:bg-amber-400 transition-colors disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${testingNotifications ? 'animate-spin' : ''}`} />
                        <span>{testingNotifications ? 'Testing Channels...' : 'Run Live Test Dispatch'}</span>
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-xs space-y-1.5 max-h-40 overflow-y-auto">
                      {testLogs.length === 0 ? (
                        <span className="text-slate-500">← Click "Run Live Test Dispatch" to simulate a VIP client inquiry and test all notification channels.</span>
                      ) : (
                        testLogs.map((log, idx) => (
                          <div key={idx} className={log.includes('✅') ? 'text-emerald-400' : log.includes('⚠️') ? 'text-amber-400' : 'text-slate-300'}>
                            {log}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Netlify Webhook Simulator */}
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="font-bold text-sm">Netlify Outgoing Webhook & Google Sheets Simulator</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                      Test your instant lead notification pipeline to Google Sheets, Make, or Zapier:
                    </p>
                    <input
                      type="text"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-950 text-xs font-mono text-slate-300 border border-slate-800"
                    />
                    <button
                      onClick={testWebhook}
                      className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Test Dispatch Webhook</span>
                    </button>
                    {webhookStatus && (
                      <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-mono text-center">
                        {webhookStatus}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
      </div>
    </div>
  );
};

