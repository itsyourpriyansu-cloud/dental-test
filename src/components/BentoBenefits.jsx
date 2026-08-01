import React from 'react';
import { Sparkles, Shield, Cpu, HeartPulse, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { bentoFeatures } from '../data/clinicData';

export default function BentoBenefits({ onOpenBooking }) {
  return (
    <section className="py-20 bg-brand-ice relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
            <span>MODULAR CLINICAL APPROACH</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-brand-dark tracking-tight">
            Smarter dental care,{' '}
            <span className="bg-gradient-to-r from-brand-deep to-brand-sky bg-clip-text text-transparent">
              designed around your smile.
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            From diagnosis to treatment planning, every step is guided with precision, clarity, and patient comfort.
          </p>
        </div>

        {/* Bento Grid Composition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Large Feature Card (7 cols on desktop) */}
          <div className="md:col-span-7 bg-white rounded-card-lg border border-brand-border p-8 shadow-soft-md hover:shadow-soft-lg transition-all flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-surface rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-brand-surface text-brand-deep text-xs font-bold rounded-full border border-brand-border">
                  {bentoFeatures[0].tag}
                </span>
                <Cpu className="w-6 h-6 text-brand-sky" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-brand-dark">
                {bentoFeatures[0].title}
              </h3>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-xl">
                {bentoFeatures[0].description}
              </p>
            </div>

            <div className="relative z-10 pt-8 mt-6 border-t border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-surface text-brand-deep flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span className="text-xs font-semibold text-brand-dark">Zero-Gag Impression-Free Scanning</span>
              </div>
              
              <button
                onClick={() => onOpenBooking()}
                className="w-10 h-10 rounded-full bg-brand-surface border border-brand-border text-brand-deep hover:bg-brand-deep hover:text-white flex items-center justify-center transition-all"
              >
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Card 2: Stat Card (5 cols on desktop) */}
          <div className="md:col-span-5 bg-gradient-to-br from-brand-deep to-brand-dark rounded-card-lg p-8 text-white shadow-soft-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-sky/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-3">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-brand-sky text-xs font-bold rounded-full border border-white/10 inline-block">
                Orthodontic Precision
              </span>
              <h3 className="text-2xl font-bold font-heading">
                Digitally Planned Alignment
              </h3>
              <p className="text-xs sm:text-sm text-brand-border leading-relaxed">
                3D computer simulations predict tooth alignment trajectories before brackets or aligners are placed.
              </p>
            </div>

            <div className="pt-8">
              <div className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-sky tracking-tight">
                100%
              </div>
              <p className="text-xs font-medium text-slate-300 mt-1">
                Customized Case Evaluation & Clear Guidance
              </p>
            </div>
          </div>

          {/* Card 3: Image Card (5 cols) */}
          <div className="md:col-span-5 bg-white rounded-card-lg border border-brand-border overflow-hidden shadow-soft-md group flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img
                src={bentoFeatures[2].image}
                alt="Clear Aligner Options"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-brand-deep text-xs font-bold rounded-full shadow-soft-sm">
                  Invisible Braces
                </span>
              </div>
            </div>
            <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold font-heading text-brand-dark">
                  {bentoFeatures[2].title}
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
                  {bentoFeatures[2].description}
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Comfort Experience Card (7 cols) */}
          <div className="md:col-span-7 bg-brand-surface rounded-card-lg border border-brand-border p-8 shadow-soft-md flex flex-col justify-between relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-white text-brand-deep text-xs font-bold rounded-full border border-brand-border">
                  Patient Comfort
                </span>
                <HeartPulse className="w-6 h-6 text-brand-deep" />
              </div>
              <h4 className="text-2xl font-bold font-heading text-brand-dark">
                {bentoFeatures[3].title}
              </h4>
              <p className="text-sm text-brand-muted leading-relaxed max-w-xl">
                {bentoFeatures[3].description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-brand-border/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-dark">
                <CheckCircle2 className="w-4 h-4 text-brand-sky" />
                <span>Calm Clinic Vibe</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-dark">
                <CheckCircle2 className="w-4 h-4 text-brand-sky" />
                <span>Gentle Mechanics</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-dark">
                <CheckCircle2 className="w-4 h-4 text-brand-sky" />
                <span>Transparent Fees</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
