/**
 * Technology Journey — interactive single-panel showcase (#technology)
 */
document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('[data-tech-journey]');
  if (!wrap) return;

  const steps = [
    {
      eyebrow: 'Step 01', title: 'Digital Scan', badge: '3D Scanner',
      desc: 'High-resolution digital scanning captures every detail of your smile with exceptional comfort and precision—eliminating the need for traditional impressions.',
      highlights: ['High Precision', 'Comfortable', 'Fast', 'No Traditional Molds'],
      image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern intraoral digital scanner used for a comfortable, mold-free dental scan',
      ctaLabel: 'Explore Scanning Technology', ctaService: 'Digital Scan'
    },
    {
      eyebrow: 'Step 02', title: 'Smile Analysis', badge: 'AI Simulation',
      desc: 'We map your facial proportions, lip line, and bite relationship, then simulate your new smile digitally—so you can preview realistic results before treatment begins.',
      highlights: ['Facial Analysis', 'Bite Mapping', 'Smile Preview', 'AI Simulation'],
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
      alt: 'Digital smile design and simulation session with a patient',
      ctaLabel: 'See Smile Simulation', ctaService: 'Smile Analysis'
    },
    {
      eyebrow: 'Step 03', title: 'Treatment Planning', badge: 'Digital Planning',
      desc: 'Dr. Prudhvi reviews your 3D scan and simulation to build a personalised, sequenced treatment plan with predictable timelines and transparent milestones.',
      highlights: ['AI Planning', 'Custom Treatment', 'Predictable Results', 'Precision Workflow'],
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Dentist reviewing a digital orthodontic treatment plan',
      ctaLabel: 'View Treatment Planning', ctaService: 'Treatment Planning'
    },
    {
      eyebrow: 'Step 04', title: 'Precision Treatment', badge: 'Precision Care',
      desc: 'Guided by your digital plan, treatment is delivered through gentle, low-friction mechanics and precise appliance fabrication for faster, more comfortable movement.',
      highlights: ['Comfortable', 'Less Pain', 'Faster Healing', 'Precise Movement'],
      image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
      alt: 'Clear aligners and precision orthodontic appliances',
      ctaLabel: 'Explore Treatment Options', ctaService: 'Precision Treatment'
    },
    {
      eyebrow: 'Step 05', title: 'Perfect Smile', badge: 'Confident Smile',
      desc: 'Every stage is monitored against your original simulation, so the final result matches what was planned—a healthy, confident, long-lasting smile.',
      highlights: ['Healthy Smile', 'Better Confidence', 'Long-term Results', 'Beautiful Finish'],
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      alt: 'Happy patient with a confident, healthy smile',
      ctaLabel: 'Book Consultation', ctaService: 'Perfect Smile'
    }
  ];

  const stepButtons = Array.from(wrap.querySelectorAll('[data-tj-step]'));
  const timelineEl = wrap.querySelector('.tj-timeline');
  const scroller = wrap.querySelector('.tj-timeline-scroller');
  const fill = wrap.querySelector('[data-tj-fill]');
  const panel = wrap.querySelector('[data-tj-panel]');
  const img = wrap.querySelector('[data-tj-image]');
  const badgeEl = wrap.querySelector('[data-tj-badge]');
  const eyebrowEl = wrap.querySelector('[data-tj-eyebrow]');
  const titleEl = wrap.querySelector('[data-tj-title]');
  const descEl = wrap.querySelector('[data-tj-desc]');
  const highlightsEl = wrap.querySelector('[data-tj-highlights]');
  const ctaBtn = wrap.querySelector('[data-tj-cta]');
  const ctaLabelEl = wrap.querySelector('[data-tj-cta-label]');

  const checkIconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktopMedia = window.matchMedia('(min-width: 768px)');

  let active = 0;
  let isSwapping = false;
  let autoplayTimer = null;
  let resumeTimer = null;

  function applyContent(index) {
    const data = steps[index];
    if (img) { img.src = data.image; img.alt = data.alt; }
    if (badgeEl) badgeEl.textContent = data.badge;
    if (eyebrowEl) eyebrowEl.textContent = data.eyebrow;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (highlightsEl) {
      highlightsEl.innerHTML = data.highlights.map((h) => `<li>${checkIconSvg}${h}</li>`).join('');
    }
    if (ctaLabelEl) ctaLabelEl.textContent = data.ctaLabel;
    if (panel) panel.setAttribute('aria-labelledby', `tj-tab-${index}`);
  }

  function render(index, animate) {
    stepButtons.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
      btn.tabIndex = isActive ? 0 : -1;
    });

    if (fill) fill.style.width = (index / (steps.length - 1)) * 100 + '%';

    const activeBtn = stepButtons[index];
    if (activeBtn && scroller) {
      // Scroll only the horizontal step scroller into position — never use
      // scrollIntoView here, as its block:'nearest' also drags the whole
      // page's vertical scroll back to this section whenever the active
      // step changes (e.g. via autoplay while the user has scrolled away).
      const targetLeft = activeBtn.offsetLeft - (scroller.clientWidth - activeBtn.clientWidth) / 2;
      scroller.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }

    if (!animate || prefersReducedMotion || !panel || isSwapping) {
      applyContent(index);
      return;
    }

    isSwapping = true;
    panel.setAttribute('data-anim', 'out');
    window.setTimeout(() => {
      applyContent(index);
      panel.removeAttribute('data-anim');
      window.setTimeout(() => { isSwapping = false; }, 400);
    }, 220);
  }

  function goTo(index, animate) {
    const next = ((index % steps.length) + steps.length) % steps.length;
    if (next === active) return;
    active = next;
    render(active, animate !== false);
  }

  function stopAutoplay() {
    if (autoplayTimer) { window.clearInterval(autoplayTimer); autoplayTimer = null; }
  }
  function startAutoplay() {
    stopAutoplay();
    if (prefersReducedMotion) return;
    autoplayTimer = window.setInterval(() => goTo(active + 1), 6000);
  }
  function scheduleResume() {
    if (resumeTimer) window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(() => {
      if (desktopMedia.matches) startAutoplay();
    }, 10000);
  }
  function pauseForInteraction() {
    stopAutoplay();
    scheduleResume();
  }

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      goTo(Number(btn.getAttribute('data-tj-step')));
      pauseForInteraction();
    });
  });

  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      if (typeof window.openBookingModal === 'function') {
        window.openBookingModal(steps[active].ctaService);
      }
    });
  }

  if (timelineEl) {
    timelineEl.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight') next = active + 1;
      else if (e.key === 'ArrowLeft') next = active - 1;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = steps.length - 1;
      if (next === null) return;
      e.preventDefault();
      goTo(next);
      stepButtons[active].focus();
      pauseForInteraction();
    });
  }

  wrap.addEventListener('mouseenter', stopAutoplay);
  wrap.addEventListener('mouseleave', () => { if (desktopMedia.matches) startAutoplay(); });
  wrap.addEventListener('focusin', stopAutoplay);
  wrap.addEventListener('focusout', scheduleResume);

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && desktopMedia.matches) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    });
  }, { threshold: 0.4 });
  io.observe(wrap);

  applyContent(0);
  render(0, false);

  // Mobile vertical journey — reveal each step as it enters view
  const mobileSteps = document.querySelectorAll('.tj-mobile-step');
  if (mobileSteps.length) {
    const mio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          mio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });
    mobileSteps.forEach((el) => mio.observe(el));
  }

  // Scroll-driven pinned progression — temporarily "locks" the section while
  // wheel/touch input steps through stages 1-5, releasing to normal page
  // scroll once either end of the sequence is reached. Skipped entirely for
  // prefers-reduced-motion, matching the rest of this component's motion gating.
  if (!prefersReducedMotion) {
    const pinSection = wrap.closest('section') || wrap;
    const WHEEL_THRESHOLD = 45;
    const TOUCH_THRESHOLD = 40;
    const TRANSITION_LOCK_MS = 650;
    const REENGAGE_LOCK_MS = 700;

    let pinned = false;
    let releasedUntil = 0;
    let isTransitioning = false;
    let lastRectTop = null;
    let wheelAccum = 0;
    let touchStartY = null;

    function lockTransition() {
      isTransitioning = true;
      window.setTimeout(() => { isTransitioning = false; }, TRANSITION_LOCK_MS);
    }

    function onWheel(e) {
      if (!pinned) return;
      e.preventDefault();
      if (isTransitioning) return;
      wheelAccum += e.deltaY;
      if (Math.abs(wheelAccum) < WHEEL_THRESHOLD) return;
      const direction = wheelAccum > 0 ? 1 : -1;
      wheelAccum = 0;
      advance(direction);
    }

    function onTouchStart(e) {
      if (!pinned) return;
      touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e) {
      if (!pinned || touchStartY === null) return;
      const currentY = e.touches[0].clientY;
      const delta = touchStartY - currentY;
      e.preventDefault();
      if (isTransitioning) return;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;
      const direction = delta > 0 ? 1 : -1;
      touchStartY = currentY;
      advance(direction);
    }

    function onTouchEnd() {
      touchStartY = null;
    }

    function advance(direction) {
      if (isTransitioning) return;
      if (direction > 0) {
        if (active < steps.length - 1) {
          goTo(active + 1);
          pauseForInteraction();
          lockTransition();
        } else {
          releasePin();
        }
      } else if (active > 0) {
        goTo(active - 1);
        pauseForInteraction();
        lockTransition();
      } else {
        releasePin();
      }
    }

    function engagePin(fromBelow) {
      if (pinned || !desktopMedia.matches) return;
      pinned = true;
      goTo(fromBelow ? steps.length - 1 : 0, false);
      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    function releasePin() {
      if (!pinned) return;
      pinned = false;
      releasedUntil = Date.now() + REENGAGE_LOCK_MS;
      window.removeEventListener('wheel', onWheel, { passive: false });
      window.removeEventListener('touchstart', onTouchStart, { passive: true });
      window.removeEventListener('touchmove', onTouchMove, { passive: false });
      window.removeEventListener('touchend', onTouchEnd, { passive: true });
    }

    const pinIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const top = entry.boundingClientRect.top;
        const scrollingDown = lastRectTop === null ? true : top < lastRectTop;
        lastRectTop = top;

        if (!desktopMedia.matches) {
          if (pinned) releasePin();
          return;
        }

        if (entry.isIntersecting && entry.intersectionRatio >= 0.6 && !pinned && Date.now() >= releasedUntil) {
          engagePin(!scrollingDown);
        } else if (!entry.isIntersecting && pinned) {
          releasePin();
        }
      });
    }, { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] });
    pinIo.observe(pinSection);

    desktopMedia.addEventListener('change', (e) => {
      if (!e.matches) releasePin();
    });
  }
});
