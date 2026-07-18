export type ThemeMode = 'dark' | 'light';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  description: string;
  investmentRange: string;
  timeline: string;
  deliverables: string[];
  roiProjection: string;
  accentGradient: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  category: 'restaurant' | 'salon' | 'real_estate';
  tagline: string;
  image: string;
  liveUrl?: string;
  sourceCodeUrl?: string;
  technologies: string[];
  features: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  accentColor: string;
  demoContent: {
    heroTitle: string;
    heroSubtitle: string;
    ctaText: string;
    keyStat: string;
    previewFeatures: { icon: string; title: string; desc: string }[];
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  projectValue: string;
  image: string;
  rating: number;
  content: string;
  resultMetric: string;
  verified: boolean;
}

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  priceINR: string;
  priceUSD: string;
  recommendedFor: string;
  popular: boolean;
  features: {
    text: string;
    included: boolean;
    highlight?: boolean;
  }[];
  deliveryDays: string;
  postLaunchSupport: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Pricing & ROI' | 'Process' | 'Technical & SEO' | 'Support';
}

export interface BookingFormData {
  type: 'consultation' | 'contact_form';
  name: string;
  email: string;
  phone: string;
  address?: string;
  businessName: string;
  projectType: string;
  budget: string;
  message?: string;
  dateStr?: string;
  timeSlot?: string;
}

export interface LeadRecord {
  id: string;
  type: 'consultation' | 'contact_form' | 'ai_quote';
  name: string;
  email: string;
  phone?: string;
  address?: string;
  businessName?: string;
  projectType: string;
  budget: string;
  message?: string;
  dateStr?: string;
  timeSlot?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'New' | 'Contacted' | 'Proposal Sent' | 'Closed Won';
  createdAt: string;
  estimatedROI?: string;
  notes?: string;
}

export interface AdminSettings {
  phone: string;
  email: string;
  whatsapp: string;
  businessName: string;
  address: string;
  tagline: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  googleSheetsWebhook?: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  resendApiKey?: string;
  ownerEmail?: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    twitter: string;
    github: string;
  };
}

export interface AiScopeResult {
  recommendedPackage: string;
  title: string;
  executiveSummary: string;
  keyDeliverables: string[];
  estimatedTimeline: string;
  projectedROI: string;
  suggestedInvestment: string;
}
