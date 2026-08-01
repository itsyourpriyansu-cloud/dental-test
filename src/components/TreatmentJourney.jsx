import React from 'react';
import { MessageSquare, Scan, FileText, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { treatmentSteps } from '../data/clinicData';

export default function TreatmentJourney({ onOpenBooking }) {
  const iconMap = {
    MessageSquare,
    Scan,
    FileText,
    CheckCircle2
  };

  return (
    <section className="py-20 bg-brand-ice relative overflow-hidden border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-brand-dark tracking-tight">
            A clear path to a healthier,{' '}
            <span className="bg-gradient-to-r from-brand-deep to-brand-sky bg-clip-text text-transparent">
              more confident smile.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            Our structured 4-step treatment journey ensures total clarity, comfortable care, and predictable outcomes.
          </p>
        </div>

        {/* 4 Step Connected Card Row (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-brand-border -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {treatmentSteps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || MessageSquare;

              return (
                <div
                  key={index}
                  className="bg-white rounded-card-lg border border-brand-border p-6 sm:p-8 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    {/* Header with Step Number & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-extrabold font-heading text-brand-sky/60 group-hover:text-brand-sky transition-colors">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-deep group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 text-brand-deep" />
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl font-bold font-heading text-brand-dark">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Footer Badge */}
                  <div className="pt-6 mt-6 border-t border-brand-border flex items-center justify-between text-xs font-semibold text-brand-deep">
                    <span>Step {index + 1} of 4</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-surface text-brand-muted text-[10px]">
                      {step.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom CTA Action */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-deep text-white font-semibold rounded-button hover:bg-opacity-95 shadow-soft-sm hover:shadow-soft-md transition-all text-sm group"
          >
            <span>Start Step 1: Book Your Consultation</span>
            <ArrowRight className="w-4 h-4 text-brand-sky group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
