import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

import Header from './components/Header';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import BentoBenefits from './components/BentoBenefits';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import DoctorSection from './components/DoctorSection';
import TreatmentJourney from './components/TreatmentJourney';
import TechnologySection from './components/TechnologySection';
import WhyChooseUs from './components/WhyChooseUs';
import SmileGallery from './components/SmileGallery';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ServiceModal from './components/ServiceModal';
import MobileStickyBar from './components/MobileStickyBar';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenBooking = (serviceName = '') => {
    setSelectedServiceForBooking(serviceName);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceForBooking('');
  };

  const handleSelectServiceDetail = (service) => {
    setSelectedServiceDetail(service);
  };

  const handleCloseServiceDetail = () => {
    setSelectedServiceDetail(null);
  };

  return (
    <div className="min-h-screen bg-brand-ice text-brand-dark flex flex-col font-body selection:bg-brand-sky selection:text-brand-dark">
      {/* Sticky Header */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 2. Trust Strip */}
        <TrustStrip />

        {/* 3. Bento Benefits */}
        <BentoBenefits onOpenBooking={handleOpenBooking} />

        {/* 4. About Section */}
        <AboutSection onOpenBooking={handleOpenBooking} />

        {/* 5. Services Section */}
        <ServicesSection 
          onSelectService={handleSelectServiceDetail} 
          onOpenBooking={handleOpenBooking} 
        />

        {/* 6. Doctor Spotlight */}
        <DoctorSection onOpenBooking={handleOpenBooking} />

        {/* 7. Treatment Journey */}
        <TreatmentJourney onOpenBooking={handleOpenBooking} />

        {/* 8. Technology Showcase */}
        <TechnologySection />

        {/* 9. Why Choose Us */}
        <WhyChooseUs />

        {/* 10. Smile Gallery */}
        <SmileGallery onOpenBooking={handleOpenBooking} />

        {/* 11. Testimonials */}
        <TestimonialsSection />

        {/* 12. FAQ Section */}
        <FAQSection onOpenBooking={handleOpenBooking} />

        {/* 13. Final CTA Banner */}
        <FinalCTASection onOpenBooking={handleOpenBooking} />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Mobile Bottom Sticky Bar */}
      <MobileStickyBar onOpenBooking={handleOpenBooking} />

      {/* Interactive Modals */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
        selectedServiceInit={selectedServiceForBooking} 
      />

      <ServiceModal 
        service={selectedServiceDetail} 
        onClose={handleCloseServiceDetail} 
        onBookNow={handleOpenBooking} 
      />
    </div>
  );
}
