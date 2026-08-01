import React from 'react';
import { UserCheck, Award, MessageCircle, Grid, Smile, Activity, Sparkles } from 'lucide-react';
import { whyUsPoints } from '../data/clinicData';

export default function WhyChooseUs() {
  const iconMap = {
    UserCheck,
    Award,
    MessageCircle,
    Grid,
    Smile,
    Activity
  };

  return (
    <section className="py-20 bg-brand-ice relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
            <span>PATIENT COMMITMENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-brand-dark tracking-tight">
            Why patients choose{' '}
            <span className="bg-gradient-to-r from-brand-deep to-brand-sky bg-clip-text text-transparent">
              THE BRACES & CROWNS
            </span>
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            Built on clinical transparency, modern diagnostics, and long-term smile wellness.
          </p>
        </div>

        {/* 6 Compact Value Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUsPoints.map((item, index) => {
            const IconComponent = iconMap[item.icon] || UserCheck;

            return (
              <div
                key={index}
                className="bg-white rounded-card border border-brand-border p-6 sm:p-7 shadow-soft-sm hover:shadow-soft-md hover:-translate-y-1 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-deep mb-5 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-5 h-5 text-brand-sky" />
                </div>

                <h3 className="text-lg font-bold font-heading text-brand-dark mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
