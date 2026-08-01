import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import clsx from 'clsx';
import { clinicInfo } from '../data/clinicData';

export default function Header({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Threshold kept deliberately tall so the nav stays "floating on the hero
  // image" for as long as the hero is meaningfully in view, then snaps to a
  // solid bar once the user has scrolled past it.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 420);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'Doctor', href: '#doctor' },
    { name: 'Technology', href: '#technology' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        'fixed z-50 transition-all duration-500 ease-out',
        isScrolled
          ? 'top-0 inset-x-0 rounded-none border-b bg-white/90 backdrop-blur-md border-brand-border py-3'
          : 'top-4 sm:top-5 lg:top-6 inset-x-4 sm:inset-x-5 lg:inset-x-6 max-w-[1392px] mx-auto rounded-full border bg-white/10 backdrop-blur-md border-white/25 py-2.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)]'
      )}
    >
      <div className={clsx('mx-auto px-4 sm:px-6', isScrolled ? 'max-w-7xl lg:px-8' : 'max-w-full lg:px-5')}>
        <div className="flex items-center justify-between">

          {/* Clinic Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-deep to-brand-sky p-0.5 shadow-soft-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <span className="font-heading font-extrabold text-brand-deep text-base sm:text-lg tracking-tighter">B&C</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={clsx(
                'font-heading font-extrabold text-sm sm:text-base lg:text-lg tracking-tight leading-tight transition-colors',
                isScrolled ? 'text-brand-dark group-hover:text-brand-deep' : 'text-white group-hover:text-white/90'
              )}>
                THE BRACES & CROWNS
              </span>
              <span className={clsx(
                'text-[10px] font-semibold uppercase tracking-widest leading-none transition-colors',
                isScrolled ? 'text-brand-sky' : 'text-white/70'
              )}>
                Dental Clinic • Ameerpet
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className={clsx(
            'hidden lg:flex items-center space-x-1 xl:space-x-2 px-4 py-1.5 rounded-full border transition-colors',
            isScrolled ? 'bg-brand-surface/60 border-brand-border/60' : 'bg-white/10 border-white/20'
          )}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={clsx(
                  'px-3.5 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all',
                  isScrolled
                    ? 'text-brand-muted hover:text-brand-deep hover:bg-white/80'
                    : 'text-white/85 hover:text-white hover:bg-white/15'
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
              className={clsx(
                'px-3.5 py-2 text-xs font-semibold rounded-button border transition-all flex items-center gap-1.5',
                isScrolled
                  ? 'text-brand-deep border-brand-border hover:bg-brand-surface'
                  : 'text-white border-white/30 hover:bg-white/10'
              )}
            >
              <Phone className={clsx('w-3.5 h-3.5', isScrolled ? 'text-brand-sky' : 'text-white')} />
              <span>Call Us</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 bg-brand-deep text-white text-xs font-semibold rounded-button hover:bg-opacity-95 shadow-soft-sm hover:shadow-soft-md transition-all flex items-center gap-2 group"
            >
              <Calendar className="w-3.5 h-3.5 text-brand-sky group-hover:rotate-12 transition-transform" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 bg-brand-deep text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-soft-sm"
            >
              <span>Book</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={clsx(
                'p-2 rounded-lg border transition-colors',
                isScrolled
                  ? 'text-brand-dark bg-brand-surface border-brand-border'
                  : 'text-white bg-white/10 border-white/25'
              )}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-4 pt-3 pb-6 space-y-3 mt-3 rounded-2xl mx-2 shadow-soft-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-brand-dark hover:bg-brand-surface rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-brand-border flex flex-col gap-2">
            <a
              href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 text-center text-xs font-semibold text-brand-deep bg-brand-surface border border-brand-border rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-brand-sky" />
              Call {clinicInfo.phone}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-brand-deep text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-soft-sm"
            >
              <Sparkles className="w-4 h-4 text-brand-sky" />
              Book Consultation Now
            </button>
          </div>
        </div>
      )}
    </motion.header>
  );
}
