import React from 'react';
import { Smile, Sparkles, ShieldCheck, Zap, HeartPulse, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '../data/clinicData';

export default function ServicesSection({ onSelectService, onOpenBooking }) {
  const iconMap = {
    Smile,
    Sparkles,
    ShieldCheck,
    Zap,
    HeartPulse,
    Star
  };

  return (
    <section id="treatments" className="py-20 bg-brand-ice relative overflow-hidden">
      {/* Subtle Background textures */}
      <div className="absolute inset-0 bg-dot-texture pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
            <span>OUR SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-brand-dark tracking-tight">
            Comprehensive dental care{' '}
            <span className="bg-gradient-to-r from-brand-deep to-brand-sky bg-clip-text text-transparent">
              under one roof.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            Explore the clinic's core treatment areas delivered with a modern, structured clinical approach in Ameerpet.
          </p>
        </div>

        {/* 6 Services Grid / Bento System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Smile;
            const isFeatured = index === 1; // Clear Aligners highlight card

            return (
              <div
                key={service.id}
                className={`rounded-card-lg border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 ${
                  isFeatured 
                    ? 'bg-gradient-to-br from-brand-deep via-brand-deep to-brand-dark text-white border-brand-deep shadow-soft-lg' 
                    : index % 2 === 0 
                      ? 'bg-white border-brand-border shadow-soft-sm hover:shadow-soft-md' 
                      : 'bg-brand-surface/70 border-brand-border shadow-soft-sm hover:shadow-soft-md'
                }`}
              >
                <div>
                  {/* Category Tag & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isFeatured 
                        ? 'bg-white/10 text-brand-sky border border-white/10' 
                        : 'bg-brand-surface text-brand-deep border border-brand-border'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${isFeatured ? 'text-brand-sky' : 'text-brand-deep'}`} />
                    </div>

                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      isFeatured 
                        ? 'bg-brand-sky text-brand-dark' 
                        : 'bg-brand-ice text-brand-muted border border-brand-border'
                    }`}>
                      {service.category}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className={`text-xl sm:text-2xl font-bold font-heading mb-3 ${
                    isFeatured ? 'text-white' : 'text-brand-dark'
                  }`}>
                    {service.title}
                  </h3>

                  {/* Benefit Sentence */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    isFeatured ? 'text-slate-200' : 'text-brand-muted'
                  }`}>
                    {service.shortDesc}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className={`pt-6 border-t flex items-center justify-between ${
                  isFeatured ? 'border-white/10' : 'border-brand-border'
                }`}>
                  <button
                    onClick={() => onSelectService(service)}
                    className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                      isFeatured 
                        ? 'text-brand-sky hover:text-white' 
                        : 'text-brand-deep hover:text-brand-sky'
                    }`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onOpenBooking(service.title)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      isFeatured
                        ? 'bg-white text-brand-dark hover:bg-brand-sky'
                        : 'bg-brand-surface text-brand-deep border border-brand-border hover:bg-brand-deep hover:text-white'
                    }`}
                  >
                    Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
