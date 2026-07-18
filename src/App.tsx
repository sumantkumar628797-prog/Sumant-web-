/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeMode, PortfolioProject } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { LoadingScreen } from './components/LoadingScreen';
import { AiScopeAdvisorModal } from './components/AiScopeAdvisorModal';
import { LiveDemoModal } from './components/LiveDemoModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { NetlifyGuideModal } from './components/NetlifyGuideModal';
import { ScrollDirectionButton } from './components/ScrollDirectionButton';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [aiScopeModalOpen, setAiScopeModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [netlifyModalOpen, setNetlifyModalOpen] = useState(false);
  const [demoModalProject, setDemoModalProject] = useState<PortfolioProject | null>(null);

  const [prefillProject, setPrefillProject] = useState<string | undefined>(undefined);
  const [prefillBudget, setPrefillBudget] = useState<string | undefined>(undefined);
  const [aiPrefillIndustry, setAiPrefillIndustry] = useState<string | undefined>(undefined);

  // Sync theme with document class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#020617';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#f8fafc';
    }
  }, [theme]);

  const handleOpenBooking = (projectTitle?: string, priceStr?: string) => {
    if (projectTitle) setPrefillProject(projectTitle);
    if (priceStr) setPrefillBudget(priceStr);
    setBookingModalOpen(true);
  };

  const handleOpenAiScope = (prefillInd?: string) => {
    if (prefillInd) setAiPrefillIndustry(prefillInd);
    setAiScopeModalOpen(true);
  };

  const handleOpenDemoModal = (project: PortfolioProject) => {
    setDemoModalProject(project);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Animated Luxury Initial Loader */}
      <LoadingScreen />

      {/* Top Scroll Progress & Floating CTA widgets */}
      <ScrollProgress
        onOpenBooking={() => handleOpenBooking()}
        onOpenAiScope={() => handleOpenAiScope()}
      />
      <ScrollDirectionButton theme={theme} />

      {/* Sticky Glassmorphism Navbar */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenAiScope={() => handleOpenAiScope()}
        onOpenNetlifyGuide={() => setNetlifyModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          theme={theme}
          onOpenBooking={() => handleOpenBooking()}
          onOpenAiScope={() => handleOpenAiScope()}
        />

        {/* 2. About Me / Architectural Philosophy */}
        <AboutSection
          theme={theme}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 3. My Services (6 Luxury Ateliers) */}
        <ServicesSection
          theme={theme}
          onSelectService={(serviceTitle) => handleOpenBooking(serviceTitle, '₹65,000 - ₹80,000 (Gold Authority Suite)')}
          onOpenAiScope={(cat) => handleOpenAiScope(cat)}
        />

        {/* 4. Portfolio Section (3 Interactive Flagships) */}
        <PortfolioSection
          theme={theme}
          onOpenDemoModal={handleOpenDemoModal}
          onOpenBooking={(title) => handleOpenBooking(title, '₹69,999 (Gold Luxury Authority Suite)')}
        />

        {/* 5. Why Choose Us Bento Grid */}
        <WhyChooseUs theme={theme} />

        {/* 6. Client Testimonials & Revenue Stats */}
        <TestimonialsSection theme={theme} />

        {/* 7. Pricing Packages & Interactive Break-Even Calculator */}
        <PricingSection
          theme={theme}
          onOpenBooking={(title, price) => handleOpenBooking(title, price)}
          onOpenAiScope={() => handleOpenAiScope()}
        />

        {/* 8. FAQs & Objections */}
        <FaqSection
          theme={theme}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 9. Booking System Section (On-page consultation engine) */}
        <BookingSection
          theme={theme}
          onOpenNetlifyGuide={() => setNetlifyModalOpen(true)}
        />

        {/* 10. Contact Section (Complete 7-Field Inquiry) */}
        <ContactSection theme={theme} />
      </main>

      {/* Footer */}
      <Footer
        theme={theme}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenNetlifyGuide={() => setNetlifyModalOpen(true)}
        onOpenAiScope={() => handleOpenAiScope()}
      />

      {/* MODALS */}
      {/* A. Standalone Consultation Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className={`w-full max-w-2xl max-w-[calc(100vw-24px)] sm:max-w-2xl rounded-2xl sm:rounded-3xl border shadow-2xl my-8 overflow-hidden min-w-0 ${
              theme === 'dark' ? 'bg-slate-950 border-amber-500/40 text-white' : 'bg-white border-amber-500 text-slate-900'
            }`}>
              <BookingSection
                theme={theme}
                isModal={true}
                prefillProject={prefillProject}
                prefillBudget={prefillBudget}
                onCloseModal={() => setBookingModalOpen(false)}
                onOpenNetlifyGuide={() => {
                  setBookingModalOpen(false);
                  setNetlifyModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* B. Server-Side Gemini AI Scope Advisor Modal */}
      <AiScopeAdvisorModal
        theme={theme}
        isOpen={aiScopeModalOpen}
        onClose={() => setAiScopeModalOpen(false)}
        onOpenBooking={(title, price) => {
          setAiScopeModalOpen(false);
          handleOpenBooking(title, price);
        }}
        prefillIndustry={aiPrefillIndustry}
      />

      {/* C. Interactive Live Demo Preview Modal */}
      <LiveDemoModal
        theme={theme}
        project={demoModalProject}
        onClose={() => setDemoModalProject(null)}
        onOpenBooking={(title) => {
          setDemoModalProject(null);
          handleOpenBooking(title);
        }}
      />

      {/* D. Free Admin Dashboard / Lead Portal */}
      <AdminPortalModal
        theme={theme}
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onOpenNetlifyGuide={() => {
          setAdminModalOpen(false);
          setNetlifyModalOpen(true);
        }}
      />

      {/* E. Netlify Deployment Suite Guide */}
      <NetlifyGuideModal
        theme={theme}
        isOpen={netlifyModalOpen}
        onClose={() => setNetlifyModalOpen(false)}
      />
    </div>
  );
}

