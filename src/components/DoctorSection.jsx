import React from 'react';
import { Award, ShieldCheck, Sparkles, Calendar, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export default function DoctorSection({ onOpenBooking }) {
  const doc = clinicInfo.doctor;

  return (
    <section id="doctor" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Doctor Portrait Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Colored Backing Shape */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-deep to-brand-sky rounded-card-lg opacity-20 blur-xl -z-10" />

              {/* Portrait Container */}
              <div className="rounded-card-lg overflow-hidden border border-brand-border shadow-soft-lg bg-brand-surface relative">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-[420px] sm:h-[480px] object-cover object-top"
                />
                
                {/* Overlay Doctor Name Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-brand-border shadow-soft-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold font-heading text-brand-dark">
                        {doc.name}
                      </h4>
                      <p className="text-xs font-semibold text-brand-deep">
                        {doc.degrees} • {doc.specialty}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-brand-surface border border-brand-sky/40 flex items-center justify-center text-brand-deep shrink-0">
                      <Award className="w-4 h-4 text-brand-sky" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Credential Tag */}
              <div className="absolute top-4 -right-4 glass-card px-3.5 py-2 rounded-xl shadow-floating text-xs font-bold text-brand-dark hidden sm:flex items-center gap-2 border border-brand-border">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>12+ Years Experience</span>
              </div>

            </div>
          </div>

          {/* Right Side: Doctor Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-deep text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
              <span>MEET THE DOCTOR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold font-heading text-brand-dark tracking-tight leading-tight">
              Expert orthodontic care, guided by{' '}
              <span className="bg-gradient-to-r from-brand-deep to-brand-sky bg-clip-text text-transparent">
                precision and clarity.
              </span>
            </h2>

            <div className="p-4 bg-brand-ice rounded-2xl border border-brand-border inline-block">
              <h3 className="text-xl font-bold font-heading text-brand-dark">
                {doc.name}, <span className="text-brand-deep">{doc.degrees}</span>
              </h3>
              <p className="text-xs font-semibold text-brand-muted mt-0.5">
                {doc.specialty}
              </p>
            </div>

            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              {doc.bio}
            </p>

            {/* Focus Chips Grid */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                Specialized Focus Areas:
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {doc.focusAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="px-3.5 py-2 bg-brand-surface border border-brand-border rounded-xl text-xs font-semibold text-brand-dark flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-sky" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking(`Consultation with ${doc.name}`)}
                className="px-7 py-3.5 bg-brand-deep text-white font-semibold rounded-button hover:bg-opacity-95 shadow-soft-sm hover:shadow-soft-md transition-all flex items-center gap-2.5 text-sm sm:text-base group"
              >
                <Calendar className="w-4 h-4 text-brand-sky group-hover:rotate-12 transition-transform" />
                <span>Book Consultation with Dr. Prudhvi</span>
              </button>

              <a
                href="#treatments"
                className="px-6 py-3.5 bg-white text-brand-dark font-semibold rounded-button border border-brand-border hover:bg-brand-surface transition-all text-sm sm:text-base"
              >
                Explore Specialized Services
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
