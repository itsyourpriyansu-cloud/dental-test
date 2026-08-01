import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { clinicInfo } from '../data/clinicData';

export default function MobileStickyBar({ onOpenBooking }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-brand-border p-3 shadow-floating">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Quick Call */}
        <a
          href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
          className="py-2.5 bg-brand-surface text-brand-deep text-xs font-bold rounded-xl border border-brand-border flex items-center justify-center gap-1.5 shadow-soft-sm hover:bg-brand-ice"
        >
          <Phone className="w-3.5 h-3.5 text-brand-sky" />
          <span>Call</span>
        </a>

        {/* Quick WhatsApp */}
        <a
          href={`https://wa.me/${clinicInfo.whatsapp}?text=Hi%20Clinic,%20I%20want%20to%20inquire%20about%20dental%20treatments.`}
          target="_blank"
          rel="noreferrer"
          className="py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-soft-sm hover:bg-emerald-700"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        {/* Quick Booking */}
        <button
          onClick={() => onOpenBooking()}
          className="py-2.5 bg-brand-deep text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-soft-sm hover:bg-opacity-95"
        >
          <Calendar className="w-3.5 h-3.5 text-brand-sky" />
          <span>Book</span>
        </button>

      </div>
    </div>
  );
}
