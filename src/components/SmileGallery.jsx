import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { smileGalleryCases } from '../data/clinicData';

export default function SmileGallery({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Braces', 'Clear Aligners', 'Smile Makeovers'];

  const filteredCases = activeTab === 'All' 
    ? smileGalleryCases 
    : smileGalleryCases.filter(c => c.category === activeTab);

  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-deep text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
            <span>SMILE GALLERY PREVIEW</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-brand-dark tracking-tight">
            Real smile{' '}
            <span className="bg-gradient-to-r from-brand-deep to-brand-sky bg-clip-text text-transparent">
              journeys.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
            A preview of treatment outcomes shared with patient permission.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all ${
                activeTab === tab
                  ? 'bg-brand-deep text-white shadow-soft-sm'
                  : 'bg-brand-surface text-brand-muted hover:text-brand-dark border border-brand-border'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((item) => (
            <div
              key={item.id}
              className="bg-brand-ice rounded-card-lg border border-brand-border overflow-hidden shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Before / After Dual Image Container */}
                <div className="relative grid grid-cols-2 gap-0.5 bg-brand-border p-0.5">
                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img
                      src={item.imageBefore}
                      alt={`${item.title} Before`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-brand-dark/70 text-white text-[10px] font-bold rounded">
                      Initial
                    </span>
                  </div>

                  <div className="relative h-44 overflow-hidden bg-slate-200">
                    <img
                      src={item.imageAfter}
                      alt={`${item.title} After`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-brand-deep text-white text-[10px] font-bold rounded">
                      Outcome
                    </span>
                  </div>
                </div>

                {/* Case Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-deep bg-brand-surface px-2.5 py-0.5 rounded-full border border-brand-border">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-brand-muted">
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-brand-dark">
                    {item.title}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Card Action */}
              <div className="px-6 pb-6 pt-2 border-t border-brand-border/60 flex items-center justify-between">
                <span className="text-[11px] text-brand-muted font-medium">Digital Case Plan</span>
                <button
                  onClick={() => onOpenBooking(`Inquiry about ${item.title}`)}
                  className="text-xs font-bold text-brand-deep hover:text-brand-sky flex items-center gap-1"
                >
                  <span>Book Similar Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Disclaimer */}
        <div className="mt-12 text-center space-y-2">
          <p className="text-xs text-brand-muted italic">
            * Note: Treatment outcomes vary by individual oral anatomy and compliance.
          </p>
        </div>

      </div>
    </section>
  );
}
