import React from 'react';
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { testimonials } from '../data/clinicData';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-brand-ice relative overflow-hidden border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
            <span>PATIENT EXPERIENCES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-brand-dark tracking-tight">
            What patients appreciate{' '}
            <span className="bg-gradient-to-r from-brand-deep to-brand-sky bg-clip-text text-transparent">
              most.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            Real feedback from individuals treated at THE BRACES & CROWNS in Ameerpet.
          </p>
        </div>

        {/* Testimonials 3 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-card-lg border border-brand-border p-8 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <Quote className="w-8 h-8 text-brand-sky/40 mb-4 group-hover:text-brand-sky transition-colors" />

              <p className="text-xs sm:text-sm text-brand-dark leading-relaxed italic mb-8">
                "{item.text}"
              </p>

              <div className="pt-6 border-t border-brand-border flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-brand-sky/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold font-heading text-brand-dark">
                      {item.name}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-brand-deep font-medium">
                    {item.treatment}
                  </p>
                  <p className="text-[10px] text-brand-muted">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
