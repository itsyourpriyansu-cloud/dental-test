import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, Award, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { trustHighlights } from '../data/clinicData';

export default function TrustStrip() {
  const icons = [ShieldCheck, Sparkles, CheckCircle2, Award, Users];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white border-b border-brand-border py-7 sm:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-4 lg:hidden">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-muted">
            Clinical Standards & Patient Commitments
          </p>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center lg:justify-between gap-3 sm:gap-4"
        >
          {trustHighlights.map((item, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-brand-ice/80 border border-brand-lightBorder hover:border-brand-sky/40 hover:bg-brand-surface transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-surface flex items-center justify-center text-brand-deep group-hover:scale-110 transition-transform">
                  <IconComponent className="w-4 h-4 text-brand-sky" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-brand-dark group-hover:text-brand-deep transition-colors whitespace-nowrap">
                  {item}
                </span>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
