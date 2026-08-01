import React from 'react';
import { Calendar, MessageSquare, Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export default function FinalCTASection({ onOpenBooking }) {
  return (
    <section className="py-20 bg-brand-deep text-white relative overflow-hidden">
      {/* Background Soft Glow Radial Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-sky/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-sky text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TAKE THE FIRST STEP</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-tight max-w-4xl mx-auto">
          Your next step can begin with a{' '}
          <span className="text-brand-sky">simple consultation.</span>
        </h2>

        {/* Copy */}
        <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
          Whether you are considering braces, aligners, implants, or a complete smile improvement, the clinic team in Ameerpet is here to guide you toward the right treatment path.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-4 bg-white text-brand-dark font-extrabold rounded-button hover:bg-brand-sky transition-all shadow-floating text-sm sm:text-base flex items-center gap-2.5 group"
          >
            <Calendar className="w-4 h-4 text-brand-deep group-hover:rotate-12 transition-transform" />
            <span>Request an Appointment</span>
            <ArrowRight className="w-4 h-4 text-brand-deep group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={`https://wa.me/${clinicInfo.whatsapp}?text=Hi%20Clinic,%20I%20would%20like%20to%20book%20a%20consultation.`}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 bg-emerald-600 text-white font-extrabold rounded-button hover:bg-emerald-700 transition-all shadow-soft-md text-sm sm:text-base flex items-center gap-2.5"
          >
            <MessageSquare className="w-4 h-4 text-white" />
            <span>WhatsApp the Clinic</span>
          </a>
        </div>

        {/* Location & Reassurance Footer Line */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-sky" />
            <span>Appointment requests are confirmed by the clinic team</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-brand-sky" />
            <span>Ameerpet, Hyderabad (Opp. Metro Pillar 1042)</span>
          </div>
        </div>

      </div>
    </section>
  );
}
