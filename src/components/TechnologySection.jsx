import React from 'react';
import { Camera, Cpu, Layers, Compass, Sliders, Sparkles, CheckCircle2 } from 'lucide-react';
import { technologyCards } from '../data/clinicData';

export default function TechnologySection() {
  const iconMap = {
    Camera,
    Cpu,
    Layers,
    Compass,
    Sliders
  };

  return (
    <section id="technology" className="py-20 bg-white relative overflow-hidden">
      {/* Blueprint grid texture background */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
            <span>TECHNOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-brand-dark tracking-tight">
            Advanced tools for better{' '}
            <span className="bg-gradient-to-r from-brand-deep to-brand-sky bg-clip-text text-transparent">
              precision and planning.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            The clinic integrates modern digital technology to support accurate diagnosis, comfortable treatment experiences, and predictable care planning.
          </p>
        </div>

        {/* Modular Tech Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologyCards.map((tech, index) => {
            const IconComponent = iconMap[tech.icon] || Cpu;
            const isLarge = index === 0;

            return (
              <div
                key={index}
                className={`rounded-card-lg border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden ${
                  isLarge
                    ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-brand-surface via-white to-brand-ice border-brand-sky/40 shadow-soft-md'
                    : 'bg-white border-brand-border shadow-soft-sm hover:shadow-soft-md'
                }`}
              >
                {/* Blueprint Accent Line Decorative */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-deep to-brand-sky opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-deep group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 text-brand-sky" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-ice border border-brand-border text-brand-deep">
                      {tech.tag}
                    </span>
                  </div>

                  <h3 className={`font-bold font-heading text-brand-dark ${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                    {tech.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {tech.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-border flex items-center gap-2 text-xs font-semibold text-brand-deep">
                  <CheckCircle2 className="w-4 h-4 text-brand-sky" />
                  <span>Integrated Ameerpet Workflow</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
