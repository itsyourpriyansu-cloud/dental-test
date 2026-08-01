import React, { useState } from 'react';
import { Plus, Minus, Sparkles, HelpCircle } from 'lucide-react';
import { faqs } from '../data/clinicData';

export default function FAQSection({ onOpenBooking }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden border-t border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-brand-dark tracking-tight">
            Questions patients{' '}
            <span className="bg-gradient-to-r from-brand-deep to-brand-sky bg-clip-text text-transparent">
              often ask.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            Find quick, transparent answers to common orthodontic & dental care queries.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-brand-surface/70 border-brand-sky/60 shadow-soft-sm' 
                    : 'bg-brand-ice border-brand-border hover:border-brand-sky/40'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-brand-dark hover:text-brand-deep transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-sky shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform shrink-0 ${
                    isOpen ? 'bg-brand-deep text-white rotate-180' : 'bg-white border border-brand-border text-brand-dark'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-border/60 animate-in fade-in duration-200">
                    <p className="pl-8">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 bg-brand-surface rounded-card border border-brand-border text-center space-y-3">
          <h4 className="text-base font-bold font-heading text-brand-dark">
            Have a specific question about your teeth alignment?
          </h4>
          <p className="text-xs text-brand-muted max-w-lg mx-auto">
            Book a complimentary initial consultation with Dr. Prudhvi to get custom answers tailored to your mouth structure.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenBooking('General FAQ Inquiry')}
              className="px-6 py-2.5 bg-brand-deep text-white font-semibold rounded-button text-xs hover:bg-opacity-95 shadow-soft-sm transition-all"
            >
              Ask Dr. Prudhvi Directly
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
