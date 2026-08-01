import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export default function ServiceModal({ service, onClose, onBookNow }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-md transition-opacity">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-card-lg shadow-floating border border-brand-border overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-brand-deep">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-brand-dark flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block px-3 py-1 bg-brand-sky text-brand-dark text-xs font-bold rounded-full mb-2">
              {service.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <p className="text-brand-dark text-sm sm:text-base leading-relaxed">
            {service.fullDetails}
          </p>

          <div className="bg-brand-surface p-5 rounded-2xl border border-brand-border space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-deep flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-brand-sky" /> Key Clinical Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-brand-dark">
                  <CheckCircle2 className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-brand-ice rounded-xl border border-brand-border flex items-center justify-between text-xs text-brand-muted">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-deep" />
              <span>Personalised consultation & 3D scan planning</span>
            </div>
            <span className="font-semibold text-brand-dark">{clinicInfo.location}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-brand-ice border-t border-brand-border p-4 sm:p-6 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-brand-muted hover:text-brand-dark transition-colors"
          >
            Close Details
          </button>
          <button
            onClick={() => {
              onClose();
              onBookNow(service.title);
            }}
            className="px-6 py-3 bg-brand-deep text-white text-xs sm:text-sm font-semibold rounded-button hover:bg-opacity-95 transition-all shadow-soft-sm flex items-center gap-2 group"
          >
            <span>Book Consultation for {service.title}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
