import React from 'react';
import { ArrowRight, ShieldCheck, Stethoscope, Sparkles, Award } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { clinicInfo } from '../data/clinicData';

// TODO-ASSET: Replace with a licensed, locally-hosted image at
// /src/assets/images/dental-consultation-hero.webp (+ .avif variant) once
// available. Recommended crop: warm, premium consultation scene, subjects
// placed center/right, clear negative space lower-left for headline text.
// Until then this reuses the same approved Unsplash consultation photo
// already referenced elsewhere in this project (see clinicData.js).
const HERO_IMAGE_ID = 'photo-1629909613654-28e377c37b09';
const heroImage = {
  avif: `https://images.unsplash.com/${HERO_IMAGE_ID}?auto=format&fit=crop&w=1920&q=70&fm=avif`,
  webp: `https://images.unsplash.com/${HERO_IMAGE_ID}?auto=format&fit=crop&w=1920&q=75&fm=webp`,
  fallback: `https://images.unsplash.com/${HERO_IMAGE_ID}?auto=format&fit=crop&w=1920&q=80`,
};

const focusTags = [
  { label: 'Fixed Braces', active: false },
  { label: 'Clear Aligners', active: true },
  { label: 'Digital Planning', active: false },
  { label: 'Dentofacial Care', active: false },
];

export default function Hero({ onOpenBooking }) {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.01 : 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0.01 : 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="hero" className="relative px-4 sm:px-5 lg:px-6 pt-4 sm:pt-5 lg:pt-6">
      <div className="relative max-w-[1440px] mx-auto rounded-[26px] sm:rounded-[30px] lg:rounded-[34px] overflow-hidden min-h-[600px] sm:min-h-[680px] lg:min-h-[740px] xl:min-h-[780px] bg-brand-dark shadow-soft-lg">

        {/* Background Image */}
        <picture>
          <source srcSet={heroImage.avif} type="image/avif" />
          <source srcSet={heroImage.webp} type="image/webp" />
          <img
            src={heroImage.fallback}
            alt="Dr. S. Prudhvi Das Reddy consulting with a patient at THE BRACES & CROWNS, Ameerpet"
            width={1920}
            height={1080}
            fetchpriority="high"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-[center_38%]"
          />
        </picture>

        {/* Dark Readability Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/55 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent" />

        {/* Content Layer */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col justify-between min-h-[600px] sm:min-h-[680px] lg:min-h-[740px] xl:min-h-[780px] px-6 sm:px-8 lg:px-11 xl:px-13 pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 lg:pb-14 xl:pb-16"
        >

          {/* Top-Left Trust Indicator */}
          <motion.div
            variants={fadeUp}
            className="inline-flex w-fit items-center gap-2.5 pl-2 pr-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]"
          >
            <span className="w-7 h-7 rounded-full bg-brand-sky/90 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wide">
              Orthodontist-Led Clinic • {clinicInfo.doctor.experience}
            </span>
          </motion.div>

          {/* Bottom Content Row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-6">

            {/* Headline + Copy + CTAs */}
            <div className="max-w-xl">
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold font-heading text-white tracking-tight leading-[1.08]"
              >
                Confident smiles,{' '}
                <span className="bg-gradient-to-r from-brand-sky to-white bg-clip-text text-transparent">
                  precisely engineered.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 text-sm sm:text-base text-white/80 max-w-md leading-relaxed"
              >
                Orthodontic and complete dental care led by Dr. S. Prudhvi Das Reddy, MDS —
                blending digital treatment planning with a calm, patient-first experience in
                Ameerpet, Hyderabad.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 sm:px-7 py-3.5 sm:py-4 bg-white text-brand-dark font-semibold rounded-button hover:bg-white/90 shadow-soft-md hover:shadow-floating transition-all flex items-center gap-2.5 text-sm sm:text-base group"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 text-brand-deep group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#treatments"
                  className="px-6 sm:px-7 py-3.5 sm:py-4 bg-white/10 text-white font-semibold rounded-button border border-white/30 backdrop-blur-md hover:bg-white/20 transition-all text-sm sm:text-base"
                >
                  Explore Treatments
                </a>
              </motion.div>
            </div>

            {/* Floating Info Cards (desktop/tablet) */}
            <div className="hidden sm:flex flex-col gap-3.5 w-full sm:w-[280px] lg:w-[260px] xl:w-[280px] shrink-0 lg:mb-1">

              <motion.div
                variants={fadeIn}
                className="glass-card bg-white/95 p-4 rounded-2xl shadow-floating flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-sky/30 flex items-center justify-center text-brand-deep shrink-0">
                  <Stethoscope className="w-5 h-5 text-brand-sky" />
                </div>
                <div className="text-left">
                  <h5 className="text-xs font-bold font-heading text-brand-dark leading-tight">
                    Dr. S. Prudhvi Das Reddy, MDS
                  </h5>
                  <p className="text-[11px] text-brand-muted leading-snug mt-0.5">
                    Orthodontist & Dentofacial Specialist
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="glass-card bg-white/95 p-4 rounded-2xl shadow-floating"
              >
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                    Specialised In
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {focusTags.map((tag) => (
                    <span
                      key={tag.label}
                      className={
                        tag.active
                          ? 'px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-deep text-white'
                          : 'px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-surface text-brand-dark border border-brand-border'
                      }
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>

          </div>

          {/* Simplified Mobile Trust Row */}
          <motion.div variants={fadeUp} className="flex sm:hidden items-center gap-2 mt-6 -mb-1">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2">
              <Stethoscope className="w-3.5 h-3.5 text-brand-sky shrink-0" />
              <span className="text-[11px] font-semibold text-white leading-tight">
                Dr. Prudhvi, MDS · Orthodontist
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2">
              <Award className="w-3.5 h-3.5 text-brand-sky shrink-0" />
              <span className="text-[11px] font-semibold text-white leading-tight">
                Digital Planning
              </span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
