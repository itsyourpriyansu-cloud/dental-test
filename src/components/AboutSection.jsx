import React from 'react';
import { ArrowRight, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export default function AboutSection({ onOpenBooking }) {
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Overlapping Staggered Image Composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Large Image */}
              <div className="rounded-card-lg overflow-hidden border border-brand-border shadow-soft-lg bg-white relative">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
                  alt="Patient Consultation at THE BRACES & CROWNS"
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
              </div>

              {/* Overlapping Secondary Image Card (Bottom Right Stagger) */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-2/3 rounded-card border-4 border-white shadow-floating overflow-hidden bg-white hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=600&q=80"
                  alt="Modern Dental Clinic Operatory"
                  className="w-full h-44 object-cover"
                />
              </div>

              {/* Experience Badge Card (Top Left Offset) */}
              <div className="absolute top-6 -left-4 sm:-left-6 glass-card p-4 rounded-2xl shadow-floating border border-brand-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-deep text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-brand-sky" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-brand-dark">Ameerpet Clinic</h5>
                  <p className="text-[11px] text-brand-muted">Opp Metro Pillar 1042</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: About Content (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-deep text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
              <span>ABOUT US</span>
            </div>

            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold font-heading text-brand-dark tracking-tight leading-tight">
              Where clinical excellence meets a{' '}
              <span className="bg-gradient-to-r from-brand-deep to-brand-sky bg-clip-text text-transparent">
                patient-first experience.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              At <strong className="text-brand-dark">{clinicInfo.name}</strong>, every smile is approached with careful diagnosis, personalised planning, and long-term oral health in mind. We combine modern dentistry with a supportive treatment experience that helps patients feel informed and confident at every stage.
            </p>

            {/* Core Values Bullet List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-sm text-brand-dark">
                <CheckCircle2 className="w-5 h-5 text-brand-sky shrink-0 mt-0.5" />
                <span><strong>Evidence-based orthodontics:</strong> Guided by specialist Dr. S. Prudhvi Das Reddy, MDS.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-brand-dark">
                <CheckCircle2 className="w-5 h-5 text-brand-sky shrink-0 mt-0.5" />
                <span><strong>Comprehensive dental care:</strong> From clear aligners and braces to ceramic crowns and implants.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-brand-dark">
                <CheckCircle2 className="w-5 h-5 text-brand-sky shrink-0 mt-0.5" />
                <span><strong>Transparent treatment pathways:</strong> Clear explanations of procedures, schedules, and costs upfront.</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-7 py-3.5 bg-brand-deep text-white font-semibold rounded-button hover:bg-opacity-95 shadow-soft-sm hover:shadow-soft-md transition-all flex items-center gap-2 text-sm sm:text-base group"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 text-brand-sky group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#doctor"
                className="px-6 py-3.5 bg-white text-brand-dark font-semibold rounded-button border border-brand-border hover:bg-brand-surface transition-all text-sm sm:text-base"
              >
                Learn More About Our Clinic
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
