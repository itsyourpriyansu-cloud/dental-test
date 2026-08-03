/**
 * THE BRACES & CROWNS — Motion System
 * Generic scroll-reveal engine + hero/navbar entrance trigger + count-up
 * numbers + patient-journey scroll activation + testimonial carousel.
 *
 * Pattern: every animated section is driven by one of two mechanisms —
 * 1) an IntersectionObserver that adds `.is-visible` once (below the fold), or
 * 2) an `.is-loaded` class added right after paint (above the fold, hero/nav).
 * All actual motion lives in CSS; this file only ever toggles classes.
 */
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initScrollReveal();
  initHeroEntrance();
  initCountUp();
  initTestimonialCarousel();

  /* ------------------------------ 1. Scroll reveal ------------------------------ */
  function initScrollReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        if (el.classList.contains('pj__item')) activatePatientJourneyStep(el);
        observer.unobserve(el);
      });
    }, { threshold: 0.15 });

    targets.forEach((el) => observer.observe(el));
  }

  // Patient Journey: once a step's card scrolls into view, fill its progress
  // ring and glow the connector leading into it — the same visual language
  // the card already uses on hover/focus, just triggered by scroll instead.
  function activatePatientJourneyStep(itemEl) {
    const card = itemEl.querySelector('.pj__card');
    if (card) card.classList.add('is-scrolled');

    const connector = itemEl.previousElementSibling;
    if (connector && connector.classList.contains('pj__connector')) {
      connector.classList.add('is-glow');
    }
  }

  /* ------------------------------ 2. Hero + navbar ------------------------------ */
  function initHeroEntrance() {
    const header = document.getElementById('main-header');
    const hero = document.querySelector('.hero2');
    const heroCards = document.querySelector('[data-hero-cards]');

    // Double rAF guarantees the initial (hidden) state has actually painted
    // before we flip the class, so the transition always plays.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (header) header.classList.add('is-loaded');
        if (hero) hero.classList.add('is-loaded');
        if (!heroCards) return;

        // On mobile the cards now sit below the fold (desktop/tablet still
        // overlap the hero and are visible on load), so they reveal on
        // scroll-in instead of firing immediately with the rest of the hero.
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (isMobile && !prefersReducedMotion && 'IntersectionObserver' in window) {
          const cardsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              heroCards.classList.add('is-loaded');
              cardsObserver.unobserve(entry.target);
            });
          }, { threshold: 0.2 });
          cardsObserver.observe(heroCards);
        } else {
          heroCards.classList.add('is-loaded');
        }
      });
    });
  }

  /* ------------------------------ 3. Count-up numbers ---------------------------- */
  function initCountUp() {
    const counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach((el) => { el.textContent = el.getAttribute('data-count-to'); });
      return;
    }

    const duration = 1500;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function animate(el) {
      const target = parseFloat(el.getAttribute('data-count-to'));
      if (!isFinite(target)) return;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * easeOutCubic(progress));
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    counters.forEach((el) => observer.observe(el));
  }

  /* ------------------------------ 4. Testimonial carousel ------------------------ */
  function initTestimonialCarousel() {
    const root = document.querySelector('[data-testimonials]');
    const track = root && root.querySelector('[data-testi-track]');
    const dotsWrap = root && root.querySelector('[data-testi-dots]');
    if (!root || !track || !dotsWrap) return;

    const slides = Array.from(track.children);
    if (slides.length < 2) return;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testi-dot';
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i, true));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    let active = 0;
    let autoplayTimer = null;

    function setActiveDot(index) {
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    }

    function goTo(index, userInitiated) {
      active = ((index % slides.length) + slides.length) % slides.length;
      track.scrollTo({
        left: slides[active].offsetLeft,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
      setActiveDot(active);
      if (userInitiated) restartAutoplay();
    }

    function stopAutoplay() {
      if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
    }
    function startAutoplay() {
      stopAutoplay();
      if (prefersReducedMotion) return;
      autoplayTimer = setInterval(() => goTo(active + 1), 6000);
    }
    function restartAutoplay() { stopAutoplay(); startAutoplay(); }

    // Sync active dot when the user scrolls/drags the track directly.
    let scrollSyncTimer = null;
    track.addEventListener('scroll', () => {
      if (scrollSyncTimer) clearTimeout(scrollSyncTimer);
      scrollSyncTimer = setTimeout(() => {
        let closest = 0;
        let closestDist = Infinity;
        slides.forEach((slide, i) => {
          const dist = Math.abs(slide.offsetLeft - track.scrollLeft);
          if (dist < closestDist) { closestDist = dist; closest = i; }
        });
        active = closest;
        setActiveDot(active);
      }, 100);
    });

    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', startAutoplay);
    track.addEventListener('touchstart', stopAutoplay, { passive: true });
    track.addEventListener('touchend', () => { if (desktopCanAutoplay()) startAutoplay(); }, { passive: true });

    function desktopCanAutoplay() { return true; }

    // Pointer drag support (mouse). Touch already scrolls natively.
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;

    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      isDragging = true;
      track.classList.add('is-dragging');
      dragStartX = e.clientX;
      dragStartScroll = track.scrollLeft;
      stopAutoplay();
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      track.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
    });
    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      let closest = 0;
      let closestDist = Infinity;
      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - track.scrollLeft);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      goTo(closest, false);
      startAutoplay();
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', () => { if (isDragging) endDrag(); });

    setActiveDot(0);

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      startAutoplay();
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAutoplay();
          else stopAutoplay();
        });
      }, { threshold: 0.4 });
      io.observe(root);
    }
  }
});
