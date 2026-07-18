import { ServiceItem, PortfolioProject, TestimonialItem, PricingPackage, FaqItem } from './types';

export const AGENCY_BRAND = {
  name: "Sumant Web",
  tagline: "High-End Digital Craftsmanship for Ambitious Brands",
  founder: "Sumant Web & Senior Architectural Team",
  phone: "+91 9263914732",
  email: "sumantkumar628797@gmail.com",
  whatsapp: "919263914732",
  location: "Mumbai & San Francisco • Global Remote",
  stats: [
    { label: "Client Revenue Generated", value: "₹4.8 Cr+" },
    { label: "Average Project ROI", value: "340%" },
    { label: "Google PageSpeed Score", value: "99.4/100" },
    { label: "High-Ticket Websites Delivered", value: "48+" }
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "service-restaurant",
    title: "Luxury Restaurant & Hospitality Websites",
    category: "Hospitality & Dining",
    iconName: "UtensilsCrossed",
    description: "Michelin-grade digital dining rooms. We build immersive table reservation engines, interactive tasting menus, and visual storytelling that turns casual website visitors into VIP diners.",
    investmentRange: "₹50,000 – ₹70,000",
    timeline: "14 – 20 Business Days",
    deliverables: [
      "Custom UI/UX with dark luxury aesthetic",
      "Direct Table Reservation System (Zero third-party commissions)",
      "Interactive Digital Menu with allergen & pairing filters",
      "Instagram & TripAdvisor dynamic review feeds",
      "Sub-second page loading speed & SEO optimization"
    ],
    roiProjection: "Save ₹40,000+/month in third-party reservation commissions while increasing high-margin wine pairing pre-orders.",
    accentGradient: "from-amber-500/20 via-orange-500/10 to-transparent"
  },
  {
    id: "service-salon",
    title: "Premium Salon, Spa & Aesthetics Atelier",
    category: "Beauty & Wellness",
    iconName: "Sparkles",
    description: "Elegant booking portals for high-end styling studios, medical spas, and luxury dermatologists. Automated appointment scheduling paired with stunning before-and-after interactive galleries.",
    investmentRange: "₹55,000 – ₹75,000",
    timeline: "16 – 22 Business Days",
    deliverables: [
      "24/7 Automated Booking & Deposit Engine",
      "Interactive Treatment & Styling Pricing Lookups",
      "Stylist / Practitioner Video Profiles",
      "Before & After interactive image comparison sliders",
      "Automated WhatsApp & SMS appointment reminder integration"
    ],
    roiProjection: "Eliminate 90% of no-shows with instant deposit collection and book high-value bridal packages on autopilot.",
    accentGradient: "from-rose-500/20 via-pink-500/10 to-transparent"
  },
  {
    id: "service-realestate",
    title: "High-End Real Estate & Villa Portfolios",
    category: "Real Estate & Architecture",
    iconName: "Building2",
    description: "Architectural showcases for luxury property developers, penthouse brokers, and architectural firms. Featuring immersive virtual 3D tours, neighborhood ROI maps, and HNWI investor verification portals.",
    investmentRange: "₹65,000 – ₹85,000",
    timeline: "20 – 28 Business Days",
    deliverables: [
      "Interactive Property Search & Filter Engine",
      "3D Virtual Walkthrough & Drone Footage Integration",
      "Mortgage & NRI Investment ROI Calculator",
      "Private VIP Brochure Download with automatic CRM sync",
      "Multi-currency & Multilingual support for international investors"
    ],
    roiProjection: "One single property sale generated from your website covers the ₹70,000 development cost more than 25 times over.",
    accentGradient: "from-blue-500/20 via-cyan-500/10 to-transparent"
  },
  {
    id: "service-business",
    title: "Corporate Authority & Consulting Brands",
    category: "Professional Services",
    iconName: "Briefcase",
    description: "Command respect from Fortune 500 decision-makers. Bespoke corporate identity websites for financial advisors, legal ateliers, boutique investment banks, and management consultants.",
    investmentRange: "₹50,000 – ₹65,000",
    timeline: "14 – 18 Business Days",
    deliverables: [
      "Executive Authority Brand Storytelling Layouts",
      "Case Study & Whitepaper Download Gateways",
      "Calendar / Discovery Call Auto-scheduler",
      "Enterprise Grade Security & SSL Hardening",
      "LinkedIn & PR mentions social proof synchronization"
    ],
    roiProjection: "Position your consulting fees at ₹2L+ per retainer by eliminating amateur template aesthetics.",
    accentGradient: "from-emerald-500/20 via-teal-500/10 to-transparent"
  },
  {
    id: "service-ecommerce",
    title: "Bespoke Luxury E-Commerce Studios",
    category: "Retail & Fashion",
    iconName: "ShoppingBag",
    description: "High-converting storefronts for luxury jewelry, artisan perfumes, designer fashion, and exclusive collectibles. Designed for maximum average order value (AOV) and frictionless 1-click checkout.",
    investmentRange: "₹65,000 – ₹80,000+",
    timeline: "21 – 30 Business Days",
    deliverables: [
      "Custom Product Configurator & 360° Zoom Viewer",
      "Frictionless 1-Click Checkout with UPI, Cards & Apple Pay",
      "AI-powered upsell & luxury bundle recommendations",
      "Automated abandoned cart VIP recovery emails",
      "Real-time inventory & ERP warehouse synchronization"
    ],
    roiProjection: "Increase online conversion rates by up to 45% compared to generic Shopify or WooCommerce themes.",
    accentGradient: "from-purple-500/20 via-violet-500/10 to-transparent"
  },
  {
    id: "service-landing",
    title: "High-Ticket Conversion Landing Pages",
    category: "Direct Response & Funnels",
    iconName: "Target",
    description: "Surgical, psychological conversion engines designed for product launches, real estate project announcements, and high-ticket course enrollments. Engineered for 10%–18% conversion rates.",
    investmentRange: "₹40,000 – ₹55,000",
    timeline: "7 – 12 Business Days",
    deliverables: [
      "Deep copywriting & user psychology layout structure",
      "Interactive qualification quiz & cost estimator",
      "Sticky mobile conversion bar & scarcity timers",
      "A/B Split testing ready code architecture",
      "Instant webhook integration to Slack, Make, and Google Sheets"
    ],
    roiProjection: "Turn paid Google & Meta ad traffic into booked discovery calls at half your current cost per acquisition.",
    accentGradient: "from-yellow-500/20 via-amber-500/10 to-transparent"
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "project-lamour",
    title: "L'Amour Fine Dining & Private Table Atelier",
    clientName: "L'Amour Hospitality Group",
    industry: "Luxury Restaurant & Bar",
    category: "restaurant",
    tagline: "Michelin-starred digital dining experience featuring zero-commission real-time table reservations.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
    liveUrl: "#demo-lamour",
    sourceCodeUrl: "https://github.com/sumant-web/lamour-fine-dining-preview",
    technologies: ["React 19", "Tailwind CSS", "Framer Motion", "Table-Book Engine", "Vite"],
    features: [
      "Interactive Floor Plan & Private Table Selector",
      "Sommelier Wine Pairing Filter with sommelier notes",
      "Direct Zero-Commission Online Booking Engine",
      "Dark-mode ambient evening aesthetics with subtle gold glow",
      "Automated SMS VIP reservation confirmations"
    ],
    metrics: [
      { label: "Online Table Bookings", value: "+310%" },
      { label: "Third-Party Commission Saved", value: "₹65,000/mo" },
      { label: "Page Load Time", value: "0.4s" }
    ],
    challenge: "L'Amour was losing ₹70,000 monthly to third-party booking apps while their old WordPress website loaded in 6.2 seconds, discouraging mobile diners from making weekend reservations.",
    solution: "We engineered a bespoke React application featuring a dark obsidian canvas, custom typography, and a direct reservation system that syncs directly with the maître d' tablet in real time.",
    testimonialQuote: "Sumant Web transformed our digital presence into a true extension of our dining room. We recouped our ₹65,000 investment in just 18 days through direct commission savings alone.",
    testimonialAuthor: "Chef Alistair D'Souza, Executive Patron at L'Amour",
    accentColor: "#d97706",
    demoContent: {
      heroTitle: "L'AMOUR ATELIER",
      heroSubtitle: "Where French Culinary Heritage Meets Modern Gastronomy in Mumbai",
      ctaText: "Reserve Private Table",
      keyStat: "4.9★ Michelin Guide Nominee 2026",
      previewFeatures: [
        { icon: "Wine", title: "Sommelier Pairing", desc: "Interactive cellar matching over 400 vintages" },
        { icon: "Calendar", title: "Instant Table Lock", desc: "Real-time reservation without platform fees" },
        { icon: "Sparkles", title: "Tasting Menu", desc: "7-course seasonal sensory exploration" }
      ]
    }
  },
  {
    id: "project-lumiere",
    title: "Lumière Hair & Spa Atelier",
    clientName: "Lumière Aesthetics Sanctuary",
    industry: "Premium Salon & Medical Spa",
    category: "salon",
    tagline: "An ethereal booking sanctuary for high-profile bridal styling and luxury dermatological treatments.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200",
    liveUrl: "#demo-lumiere",
    sourceCodeUrl: "https://github.com/sumant-web/lumiere-salon-atelier",
    technologies: ["React 19", "Tailwind CSS", "Framer Motion", "Twilio SMS Sync", "Lucide Icons"],
    features: [
      "Interactive Treatment & Bridal Package Customizer",
      "Real-Time Stylist Availability Calendar",
      "Before & After high-definition comparison slider",
      "Automated deposit payment collection (Stripe / Razorpay)",
      "Instagram Live Story Feed integration"
    ],
    metrics: [
      { label: "High-Ticket Bridal Bookings", value: "+185%" },
      { label: "No-Show Rate Reduction", value: "92%" },
      { label: "Mobile Conversion Rate", value: "14.2%" }
    ],
    challenge: "Lumière's reception desk was overwhelmed with repetitive phone inquiries for treatment pricing and stylist timings, leading to lost bridal clients during peak wedding seasons.",
    solution: "We built an ultra-clean, rose-gold tinted digital sanctuary with automated pricing selectors, instant deposit checkout, and interactive stylist portfolios that build immediate trust.",
    testimonialQuote: "Selling our ₹75,000 bridal makeover packages used to require 5 phone calls. Now brides browse our Atelier site, select their stylist, and pay their deposit online while we sleep.",
    testimonialAuthor: "Sanya Kapoor, Founder & Lead Aesthetician",
    accentColor: "#f43f5e",
    demoContent: {
      heroTitle: "LUMIÈRE ATELIER",
      heroSubtitle: "Redefining Luxury Hair Artistry & Cellular Skin Rejuvenation",
      ctaText: "Book Styling Sanctuary",
      keyStat: "Over 1,200 Bridal Transformations",
      previewFeatures: [
        { icon: "Scissors", title: "Master Stylists", desc: "International award-winning hair sculptors" },
        { icon: "Sparkles", title: "Organic Elixirs", desc: "100% botanical French spa formulations" },
        { icon: "Clock", title: "Zero Wait Time", desc: "Private VIP suite reservations guaranteed" }
      ]
    }
  },
  {
    id: "project-vanguard",
    title: "Vanguard Luxury Estates & Villas",
    clientName: "Vanguard Global Realty",
    industry: "High-End Real Estate & Architecture",
    category: "real_estate",
    tagline: "Architectural showcase portal for ₹15 Cr+ beachfront villas and bespoke penthouse developments.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    liveUrl: "#demo-vanguard",
    sourceCodeUrl: "https://github.com/sumant-web/vanguard-estates-portal",
    technologies: ["React 19", "Tailwind CSS", "Three.js 3D View", "Framer Motion", "Mapbox API"],
    features: [
      "Interactive 3D Villa Walkthrough & Drone Horizon View",
      "NRI / International Investor ROI & Currency Calculator",
      "Private VIP Floor Plan Download with WhatsApp verification",
      "Live Neighborhood School, Golf Course & Heliport Locator",
      "Instant Schedule Private Helicopter or Limousine Tour"
    ],
    metrics: [
      { label: "HNWI Investor Inquiries", value: "+420%" },
      { label: "Average Session Duration", value: "6m 45s" },
      { label: "Brochure Downloads / Month", value: "380+" }
    ],
    challenge: "High-net-worth international buyers found Vanguard's old real estate portal cluttered and slow, often abandoning the site before seeing their flagship ₹25 Cr beachfront villas.",
    solution: "We engineered an architectural masterpiece with cinematic full-screen photography, interactive ROI calculators, and a frictionless VIP inspection booking engine.",
    testimonialQuote: "Our first villa sale generated from the new Sumant Web website was worth ₹18 Crores. Paying ₹80,000 for this website was the single best marketing ROI in our company's 15-year history.",
    testimonialAuthor: "Aravind Singhania, Managing Director at Vanguard Realty",
    accentColor: "#3b82f6",
    demoContent: {
      heroTitle: "VANGUARD ESTATES",
      heroSubtitle: "Architectural Trophies for the Global Ultra-High-Net-Worth Elite",
      ctaText: "Request Private Walkthrough",
      keyStat: "₹450 Cr+ Active Portfolio under Exclusive Mandate",
      previewFeatures: [
        { icon: "Home", title: "Beachfront Villas", desc: "Private infinity pools overlooking the Arabian Sea" },
        { icon: "ShieldCheck", title: "Title Verification", desc: "100% clean legal diligence and escrow protection" },
        { icon: "Compass", title: "Helipad Access", desc: "Direct sky connectivity for private aircraft owners" }
      ]
    }
  }
];

export const WHY_CHOOSE_US_DATA = [
  {
    iconName: "Zap",
    title: "Sub-Second Page Load Speed (99+ PageSpeed)",
    description: "Cheap WordPress themes load in 5–8 seconds, killing 60% of your traffic. We hand-code lightweight React architectures that load instantly, boosting Google SEO and client conversions.",
    stat: "0.4s",
    statLabel: "Avg. Load Time"
  },
  {
    iconName: "TrendingUp",
    title: "Conversion-Engineered Sales Architecture",
    description: "We don't just make pretty pages. We embed psychological triggers, social proof hierarchy, and seamless booking funnels that compel visitors to click 'Book Now'.",
    stat: "3.4x",
    statLabel: "Higher Conversion"
  },
  {
    iconName: "ShieldCheck",
    title: "Zero Security Vulnerabilities & No Plugin Bloat",
    description: "Say goodbye to hacked WordPress plugins, monthly update headaches, and broken contact forms. Our custom code is enterprise-secure and hosted on ultra-reliable global CDNs.",
    stat: "100%",
    statLabel: "Uptime Guaranteed"
  },
  {
    iconName: "Award",
    title: "Apple & Awwwards Level Visual Prestige",
    description: "Your website is your digital flagship store. When high-ticket clients visit, our bespoke glassmorphism and custom typography immediately command trust and justify premium pricing.",
    stat: "Top 1%",
    statLabel: "Design Standard"
  },
  {
    iconName: "Smartphone",
    title: "Flawless Mobile-First Touch Ergonomics",
    description: "Over 78% of your luxury clients will first experience your brand on an iPhone. We design tactile micro-interactions, thumb-friendly navigation, and retina-sharp imagery.",
    stat: "78%+",
    statLabel: "Mobile Optimization"
  },
  {
    iconName: "Clock",
    title: "On-Time Delivery & Lifetime Code Warranty",
    description: "No disappearing freelancers or endless delays. We deliver your complete production-ready website in 14–24 days with strict milestones and a 1-year bug-free guarantee.",
    stat: "100%",
    statLabel: "On-Time Track Record"
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Aravind Singhania",
    role: "Managing Director",
    company: "Vanguard Luxury Realty",
    projectValue: "₹80,000 Project",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    content: "When you are selling villas worth ₹15+ Crores, your website cannot look like a ₹10,000 WordPress template. Sumant Web delivered a digital masterpiece that our HNWI investors constantly compliment. We closed our first major sale through the website within 30 days.",
    resultMetric: "₹18 Cr Villa Sold via Website",
    verified: true
  },
  {
    id: "test-2",
    name: "Chef Alistair D'Souza",
    role: "Executive Chef & Founder",
    company: "L'Amour Fine Dining Group",
    projectValue: "₹65,000 Project",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    content: "The zero-commission reservation engine they built saved us over ₹65,000 in third-party platform fees in our very first month. Basically, the website completely paid for itself in less than 3 weeks. The dark luxury design is absolutely world-class.",
    resultMetric: "₹65,000/mo Commission Saved",
    verified: true
  },
  {
    id: "test-3",
    name: "Sanya Kapoor",
    role: "Founder & Creative Director",
    company: "Lumière Aesthetics & Spa",
    projectValue: "₹70,000 Project",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    content: "Our old website was losing us bridal clients every day. After Sumant Web launched our new interactive salon portal, our bridal package inquiries surged by 185%. The instant deposit booking feature is a game-changer for our cash flow.",
    resultMetric: "+185% Bridal Package Inquiries",
    verified: true
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "pkg-silver",
    name: "Essential Growth Launch",
    tagline: "Perfect for emerging luxury brands, boutique cafes, and independent consultants looking for instant credibility.",
    priceINR: "₹49,999",
    priceUSD: "$650",
    recommendedFor: "Restaurants, Cafes & Boutique Stores",
    popular: false,
    deliveryDays: "12 - 16 Business Days",
    postLaunchSupport: "30 Days VIP Priority Support & Training",
    features: [
      { text: "Bespoke UI/UX Design (Up to 5 Luxury Pages)", included: true, highlight: true },
      { text: "Mobile-First & Tablet Responsive Architecture", included: true },
      { text: "Sub-Second Speed Optimization (95+ Google Score)", included: true },
      { text: "Lead Generation & Contact Form with Auto-Responders", included: true },
      { text: "WhatsApp & Call Floating Conversion Widgets", included: true },
      { text: "Basic SEO Setup & Google Search Console Sync", included: true },
      { text: "Netlify Zero-Cost Hosting & Domain Configuration", included: true },
      { text: "Interactive Booking / Reservation Engine", included: false },
      { text: "Custom ROI Calculators & 3D Interactive Walkthroughs", included: false }
    ]
  },
  {
    id: "pkg-gold",
    name: "Luxury Authority Suite",
    tagline: "Our most popular turnkey powerhouse engineered to dominate competitors and close ₹1L+ client deals on autopilot.",
    priceINR: "₹69,999",
    priceUSD: "$900",
    recommendedFor: "Premium Salons, Established Dining & Corporate",
    popular: true,
    deliveryDays: "16 - 22 Business Days",
    postLaunchSupport: "90 Days VIP Priority Support + Free Updates",
    features: [
      { text: "Complete Custom Architecture (Up to 10 Luxury Pages)", included: true, highlight: true },
      { text: "Direct Zero-Commission Booking / Reservation Engine", included: true, highlight: true },
      { text: "Sub-Second Ultra-Fast Speed (99+ Google PageSpeed)", included: true },
      { text: "Dark Mode & Light Mode Interactive Toggle", included: true },
      { text: "Before/After Sliders & Interactive Portfolio Galleries", included: true },
      { text: "Automated Lead Sync to Google Sheets & Email Alerts", included: true, highlight: true },
      { text: "Advanced On-Page SEO & Schema Markup for High Rank", included: true },
      { text: "Full Source Code Ownership & No Monthly Agency Fees", included: true },
      { text: "Bespoke 3D Walkthroughs or Custom AI Integration", included: false }
    ]
  },
  {
    id: "pkg-platinum",
    name: "Bespoke Enterprise Domination",
    tagline: "The absolute pinnacle of web craftsmanship for real estate developers, luxury e-commerce, and industry titans.",
    priceINR: "₹89,999",
    priceUSD: "$1,200",
    recommendedFor: "Real Estate Developers, Luxury Retail & HNWI Brands",
    popular: false,
    deliveryDays: "22 - 30 Business Days",
    postLaunchSupport: "1 Full Year Code Warranty & VIP Concierge",
    features: [
      { text: "Unlimited Custom Page Architecture & Bespoke Modules", included: true, highlight: true },
      { text: "Interactive ROI Calculators & Mortgage Estimators", included: true, highlight: true },
      { text: "3D Virtual Walkthrough & Drone View Embeds", included: true, highlight: true },
      { text: "Custom AI Concierge / Scope Advisor Chatbot Integration", included: true },
      { text: "Payment Gateway Integration (Razorpay, Stripe, UPI)", included: true },
      { text: "Multilingual & Multi-Currency Switcher", included: true },
      { text: "Enterprise Security Hardening & Automated Backups", included: true },
      { text: "Dedicated Project Manager & 24/7 Slack VIP Channel", included: true },
      { text: "1-Year Full Code Warranty & Priority Feature Edits", included: true, highlight: true }
    ]
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    question: "Why should I invest ₹65,000–₹80,000 with Sumant Web instead of hiring a ₹10,000 WordPress freelancer?",
    answer: "A ₹10,000 template website is a liability that hurts your brand credibility, loads slowly (losing 60% of mobile visitors), and gets hacked easily. We build custom-engineered React applications from scratch. When a high-ticket client visits your site, our Apple-level visual polish and sub-second loading speed convince them that you are worth top dollar. Most of our clients earn back their entire investment within 14 to 30 days through increased direct bookings and higher pricing authority.",
    category: "Pricing & ROI"
  },
  {
    question: "Are there any hidden monthly hosting or maintenance fees after the website is built?",
    answer: "Zero! We specialize in modern serverless deployment on Netlify and Cloud CDNs. For 95% of our clients, hosting, SSL certificates, form submissions, and CDN distribution cost ₹0 per month. You only pay the one-time development investment and retain 100% full ownership of your source code and domain forever.",
    category: "Pricing & ROI"
  },
  {
    question: "How does the consultation booking and lead notification system work without expensive paid CRM tools?",
    answer: "We configure intelligent serverless forms using Netlify Forms, EmailJS, or free Google Sheets webhooks. When a prospective client fills out your contact form or books an appointment on your site, you get instant email alerts and real-time database syncing without spending a single rupee on monthly CRM subscriptions.",
    category: "Technical & SEO"
  },
  {
    question: "How fast can you launch my new luxury website?",
    answer: "Our standard turnkey timeline is 14 to 22 business days depending on the scope. We follow a strict 4-phase milestone structure: (1) Architecture & Brand Strategy, (2) UI/UX Design Prototyping, (3) High-Performance Code Engineering, and (4) Testing & VIP Launch.",
    category: "Process"
  },
  {
    question: "Will my website rank on page 1 of Google (SEO Optimization)?",
    answer: "Yes! While WordPress sites struggle with Google's Core Web Vitals due to heavy plugin bloat, our React & Tailwind architecture consistently achieves 98 to 100 PageSpeed scores. We embed clean semantic HTML5, structured JSON-LD schema markup, Open Graph tags, and sitemap generation directly into the build.",
    category: "Technical & SEO"
  },
  {
    question: "What is the payment structure to get started?",
    answer: "We work on a standard agency milestone model: 50% deposit upon signing your project proposal to lock in your dedicated development dates, and 50% upon final completion and live domain deployment. We accept bank wire, UPI, major credit cards, and international transfers.",
    category: "Process"
  }
];
