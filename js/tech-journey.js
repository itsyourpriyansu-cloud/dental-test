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
      image: 'images/digital-scan.png',
      alt: 'Doctor examining 3D dental scan and X-rays on lightboard for digital treatment planning',
      ctaLabel: 'Explore Scanning Technology', ctaService: 'Digital Scan'
    },
    {
      eyebrow: 'Step 02', title: 'Smile Analysis', badge: 'AI Simulation',
      desc: 'We map your facial proportions, lip line, and bite relationship, then simulate your new smile digitally—so you can preview realistic results before treatment begins.',
      highlights: ['Facial Analysis', 'Bite Mapping', 'Smile Preview', 'AI Simulation'],
      image: 'images/smile-analysis.jpg',
      alt: 'Digital smile analysis grid mapping smile proportions and tooth alignment',
      ctaLabel: 'See Smile Simulation', ctaService: 'Smile Analysis'
    },
    {
      eyebrow: 'Step 03', title: 'Treatment Planning', badge: 'Digital Planning',
      desc: 'Dr. Prudhvi reviews your 3D scan and simulation to build a personalised, sequenced treatment plan with predictable timelines and transparent milestones.',
      highlights: ['AI Planning', 'Custom Treatment', 'Predictable Results', 'Precision Workflow'],
      image: 'images/treatment-planning.png',
      alt: 'Dentist reviewing digital dental X-ray on overhead screen with patient',
      ctaLabel: 'View Treatment Planning', ctaService: 'Treatment Planning'
    },
    {
      eyebrow: 'Step 04', title: 'Precision Treatment', badge: 'Precision Care',
      desc: 'Guided by your digital plan, treatment is delivered through gentle, low-friction mechanics and precise appliance fabrication for faster, more comfortable movement.',
      highlights: ['Comfortable', 'Less Pain', 'Faster Healing', 'Precise Movement'],
      image: 'images/precision-treatment.png',
      alt: 'Dentist using precision microscope for dental procedure',
      ctaLabel: 'Explore Treatment Options', ctaService: 'Precision Treatment'
    },
    {
      eyebrow: 'Step 05', title: 'Perfect Smile', badge: 'Confident Smile',
      desc: 'Every stage is monitored against your original simulation, so the final result matches what was planned—a healthy, confident, long-lasting smile.',
      highlights: ['Healthy Smile', 'Better Confidence', 'Long-term Results', 'Beautiful Finish'],
      image: 'images/perfect-smile.png',
      alt: 'Patient showcasing a beautiful, healthy, perfect smile after treatment',
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
    // Autoplay only drives 1 -> 5, never wraps back to 1 — once the last
    // stage is reached it freezes there until the user scrolls back up
    // (which re-engages the pin and explicitly resets it, see engagePin).
    if (active >= steps.length - 1) return;
    autoplayTimer = window.setInterval(() => {
      if (active >= steps.length - 1) { stopAutoplay(); return; }
      goTo(active + 1);
    }, 6000);
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

  // Scroll-pinned progression — freezes page scroll (via Lenis, the site's
  // smooth-scroll engine, plus a wheel/touch capture fallback) once the top
  // of .tj-timeline-outer (NOT the section) reaches the top of the viewport,
  // and lets wheel/touch input step through stages 1-5 one at a time.
  // Released back to normal scroll only once Stage 5 (scrolling down) or
  // Stage 1 (scrolling up, re-entering from below) is reached. Desktop/
  // tablet only — mobile keeps plain scrolling — and skipped entirely for
  // prefers-reduced-motion.
  if (!prefersReducedMotion) {
    // Used only as a coarse "are we anywhere near this component" gate for
    // the IntersectionObserver below — the actual pin trigger is always
    // timelineOuter's own position, never this element's.
    const pinSection = wrap.closest('section') || wrap;
    // Only the section intro (badge + heading + description) and the
    // timeline/progress bar are pinned — the content card (image + text)
    // stays in normal flow and simply keeps swapping content per stage.
    const introEl = wrap.previousElementSibling;
    const timelineOuter = wrap.querySelector('.tj-timeline-outer');
    const WHEEL_THRESHOLD = 45;
    const TOUCH_THRESHOLD = 40;
    const TRANSITION_LOCK_MS = 650;
    const REENGAGE_LOCK_MS = 650;

    let pinned = false;
    let nearSection = false;
    let releasedUntil = 0;
    let isTransitioning = false;
    let wheelAccum = 0;
    let touchStartY = null;
    // Last observed timelineOuter.top, used to detect the exact frame it
    // crosses the viewport top — NOT just whether it's currently <= 0.
    // Without this, top stays <= 0 for the entire rest of the scroll
    // through (and past) the component, so a naive "top <= 0" check would
    // re-fire engagePin() on every scroll tick after release, snapping the
    // timeline back to Stage 1 forever. Crossing-detection makes engage a
    // one-shot event per approach, from either direction.
    let lastTimelineTop = null;

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

    function pinHeader() {
      if (introEl) {
        introEl.classList.add('is-pinned');
        introEl.style.top = '0px';
      }
      if (timelineOuter) {
        timelineOuter.classList.add('is-pinned');
        // Stack directly beneath the sticky intro instead of overlapping it.
        timelineOuter.style.top = (introEl ? introEl.getBoundingClientRect().height : 0) + 'px';
      }
    }

    function unpinHeader() {
      if (introEl) { introEl.classList.remove('is-pinned'); introEl.style.top = ''; }
      if (timelineOuter) { timelineOuter.classList.remove('is-pinned'); timelineOuter.style.top = ''; }
    }

    function engagePin(fromBelow) {
      if (pinned || !desktopMedia.matches) return;
      pinned = true;
      pinHeader();
      goTo(fromBelow ? steps.length - 1 : 0, false);
      if (typeof lenis !== 'undefined' && lenis) lenis.stop();
      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    function releasePin() {
      if (!pinned) return;
      pinned = false;
      unpinHeader();
      releasedUntil = Date.now() + REENGAGE_LOCK_MS;
      if (typeof lenis !== 'undefined' && lenis) lenis.start();
      window.removeEventListener('wheel', onWheel, { passive: false });
      window.removeEventListener('touchstart', onTouchStart, { passive: true });
      window.removeEventListener('touchmove', onTouchMove, { passive: false });
      window.removeEventListener('touchend', onTouchEnd, { passive: true });
    }

    // Escape hatch for controls outside this section (e.g. the Back-to-Top
    // button) that need to guarantee normal page scrolling before running a
    // programmatic scroll: fully releases the pin/lock/lenis.stop() state,
    // clears the in-progress transition/gesture flags, stops autoplay, and
    // — since releasePin()'s default re-engage lock (650ms) is shorter than
    // a scroll-to-top animation — holds re-engagement off for `suppressMs`
    // so the pin doesn't re-trigger while the programmatic scroll passes
    // back through this section.
    function forceRelease(suppressMs) {
      isTransitioning = false;
      wheelAccum = 0;
      touchStartY = null;
      stopAutoplay();
      if (resumeTimer) { window.clearTimeout(resumeTimer); resumeTimer = null; }
      releasePin();
      releasedUntil = Date.now() + (suppressMs || REENGAGE_LOCK_MS);
      if (typeof lenis !== 'undefined' && lenis) lenis.start();
    }
    window.techJourneyReleasePin = forceRelease;

    // Fires once per scroll frame with a direction, so we can catch the exact
    // moment .tj-timeline-outer's top edge crosses the viewport top — same
    // trigger point native `position: sticky` uses, just computed ourselves
    // since the multi-stage hold can't be expressed as a fixed sticky scroll
    // distance. Engage is edge-triggered (crossing detection against
    // lastTimelineTop), not level-triggered, so it fires exactly once per
    // approach instead of on every tick that top happens to be <= 0 — see
    // lastTimelineTop comment above for why that distinction matters.
    function checkEngage(direction) {
      if (!nearSection || !desktopMedia.matches) return;
      const top = timelineOuter.getBoundingClientRect().top;
      if (pinned || !direction || Date.now() < releasedUntil) {
        lastTimelineTop = top;
        return;
      }
      const wasAbove = lastTimelineTop === null || lastTimelineTop > 0;
      const wasBelow = lastTimelineTop === null || lastTimelineTop < 0;
      if (direction > 0 && wasAbove && top <= 0) {
        engagePin(false);
      } else if (direction < 0 && wasBelow && top >= 0) {
        engagePin(true);
      }
      lastTimelineTop = top;
    }

    const nearIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { nearSection = entry.isIntersecting; });
    }, { rootMargin: '50% 0px 50% 0px', threshold: 0 });
    nearIo.observe(pinSection);

    if (typeof lenis !== 'undefined' && lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', (e) => checkEngage(e && e.direction ? e.direction : 0));
    } else {
      let lastY = window.scrollY;
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          checkEngage(y > lastY ? 1 : y < lastY ? -1 : 0);
          lastY = y;
          ticking = false;
        });
      }, { passive: true });
    }

    desktopMedia.addEventListener('change', (e) => {
      if (!e.matches) releasePin();
    });
  }
});
