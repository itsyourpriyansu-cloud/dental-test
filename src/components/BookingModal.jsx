import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { clinicInfo, services } from '../data/clinicData';

export default function BookingModal({ isOpen, onClose, selectedServiceInit = "" }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: selectedServiceInit || 'Orthodontics & Aligners',
    date: '',
    timeSlot: 'Morning (10:30 AM - 1:00 PM)',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-md transition-opacity">
      <div 
        className="relative w-full max-w-xl bg-white rounded-card-lg shadow-floating border border-brand-border overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-surface border-b border-brand-border p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-brand-deep text-white flex items-center justify-center font-bold">
              B&C
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-brand-dark">
                {isSubmitted ? "Appointment Requested!" : "Book a Consultation"}
              </h3>
              <p className="text-xs text-brand-muted">
                {clinicInfo.name} • {clinicInfo.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-brand-border text-brand-muted hover:text-brand-dark flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold font-heading text-brand-dark">
                Thank You, {formData.name || 'Patient'}!
              </h4>
              <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                Your consultation request for <strong className="text-brand-dark">{formData.service}</strong> has been sent to the clinic team at Ameerpet. We will call you back shortly to confirm your exact time slot.
              </p>
              <div className="bg-brand-ice p-4 rounded-xl text-left border border-brand-border text-xs text-brand-muted space-y-1">
                <p><strong>Clinic:</strong> {clinicInfo.name}</p>
                <p><strong>Address:</strong> {clinicInfo.fullAddress}</p>
                <p><strong>Phone Support:</strong> {clinicInfo.phone}</p>
              </div>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-brand-deep text-white font-medium rounded-button hover:bg-opacity-90 transition-colors shadow-soft-sm text-sm"
                >
                  Done
                </button>
                <a
                  href={`https://wa.me/${clinicInfo.whatsapp}?text=Hi%20Clinic,%20I%20just%20requested%20an%20appointment%20for%20${encodeURIComponent(formData.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-button hover:bg-emerald-700 transition-colors shadow-soft-sm text-sm flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Direct
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-brand-ice border border-brand-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-brand-ice border border-brand-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
                    Treatment Area
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-brand-ice border border-brand-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky focus:bg-white transition-all"
                  >
                    <option value="Orthodontics & Braces">Orthodontics & Braces</option>
                    <option value="Clear Aligners">Clear Aligners</option>
                    <option value="Dental Implants">Dental Implants</option>
                    <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                    <option value="General & Prophylaxis">General Dentistry</option>
                    <option value="Smile Makeover">Smile Makeover</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-brand-ice border border-brand-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky focus:bg-white transition-all"
                  >
                    <option value="Morning (10:30 AM - 1:00 PM)">Morning (10:30 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-brand-ice border border-brand-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky focus:bg-white transition-all text-brand-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="Describe any specific tooth sensitivity, gap concerns, or questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 bg-brand-ice border border-brand-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-sky focus:bg-white transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-deep text-white font-semibold rounded-button hover:bg-opacity-95 transition-all shadow-soft-md text-sm flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-brand-sky group-hover:rotate-12 transition-transform" />
                  Confirm Request
                </button>
              </div>

              <p className="text-[11px] text-center text-brand-muted pt-1">
                🔒 Your privacy is respected. No spam. Appointment requests are confirmed directly by clinic staff.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
