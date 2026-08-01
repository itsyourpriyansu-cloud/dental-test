import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp, Shield } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-brand-dark text-white pt-16 pb-24 lg:pb-12 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Clinic Brand & Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-deep to-brand-sky p-0.5">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <span className="font-heading font-extrabold text-brand-deep text-base">B&C</span>
                </div>
              </div>
              <div>
                <span className="font-heading font-bold text-base text-white block leading-tight">
                  THE BRACES & CROWNS
                </span>
                <span className="text-[10px] font-semibold text-brand-sky uppercase tracking-wider">
                  Dental Clinic • Ameerpet
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Modern dental and orthodontic care planned with clinical precision, advanced digital technology, and a patient-first approach.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
                <span>{clinicInfo.fullAddress}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-sky shrink-0" />
                <a href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`} className="hover:text-brand-sky transition-colors">
                  {clinicInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-sky shrink-0" />
                <a href={`mailto:${clinicInfo.email}`} className="hover:text-brand-sky transition-colors">
                  {clinicInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Core Treatments */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-heading uppercase tracking-wider text-brand-sky">
              Treatments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#treatments" className="hover:text-white transition-colors">Fixed Orthodontics (Braces)</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Clear Aligners (Invisible Braces)</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Dental Implants & Restorations</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Cosmetic Dental Veneers</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Tooth Whitening & Bonding</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">General Dental Examinations</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors">Comprehensive Smile Makeovers</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-heading uppercase tracking-wider text-brand-sky">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Our Clinic</a></li>
              <li><a href="#doctor" className="hover:text-white transition-colors">Dr. S. Prudhvi Das Reddy, MDS</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Digital Technology</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Patient Experiences</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Column 4: Working Hours & Booking Action */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-heading uppercase tracking-wider text-brand-sky">
              Clinic Hours
            </h4>
            
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-brand-sky font-semibold">
                <Clock className="w-4 h-4" />
                <span>Operating Timings</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {clinicInfo.hours}
              </p>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="w-full py-3 bg-brand-deep text-white text-xs font-bold rounded-xl hover:bg-brand-sky hover:text-brand-dark transition-all shadow-soft-sm"
            >
              Book Consultation Now
            </button>
          </div>

        </div>

        {/* Sub-Footer Copyright & Medical Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} {clinicInfo.name}. All rights reserved. Ameerpet, Hyderabad.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Medical Disclaimer Line */}
        <div className="mt-4 pt-4 border-t border-slate-850 text-center text-[10px] text-slate-600">
          Medical Disclaimer: Information provided on this website is for educational purposes and initial treatment guidance. Final clinical diagnosis is conducted in person at our Ameerpet clinic.
        </div>

      </div>
    </footer>
  );
}
