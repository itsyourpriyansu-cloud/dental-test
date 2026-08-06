/**
 * THE BRACES & CROWNS - Main Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('main-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Booking Modal
  const bookingModal = document.getElementById('booking-modal');
  const bookingForm = document.getElementById('booking-form');
  const bookingSuccess = document.getElementById('booking-success');
  const serviceSelect = document.getElementById('booking-service-select');

  // Service Modal
  const serviceModal = document.getElementById('service-modal');
  const serviceModalTitle = document.getElementById('service-modal-title');
  const serviceModalCategory = document.getElementById('service-modal-category');
  const serviceModalDesc = document.getElementById('service-modal-desc');
  const serviceModalImg = document.getElementById('service-modal-img');
  const serviceModalHighlights = document.getElementById('service-modal-highlights');

  // Services Data Object
  const servicesData = {
    orthodontics: {
      title: "Orthodontics",
      category: "Specialized Care",
      fullDetails: "Orthodontics goes beyond straightening teeth—it balances your bite, protects tooth enamel from uneven wear, and improves facial aesthetics. We provide custom metal braces, tooth-colored ceramic brackets, and self-ligating orthodontic systems engineered for shorter treatment durations.",
      highlights: ["Custom ceramic & metal brackets", "Bite correction & alignment", "Teens & adult braces options", "Post-treatment retainer systems"],
      image: "images/orthodontics.png"
    },
    aligners: {
      title: "Clear Aligners",
      category: "Invisible Braces",
      fullDetails: "Clear aligner therapy offers an invisible, removable alternative to conventional braces. Using 3D computer models, a sequential series of clear trays is generated to align your teeth gradually, allowing you to eat, brush, and speak with complete confidence.",
      highlights: ["Virtually invisible appearance", "Removable for meals & oral hygiene", "3D digital progress preview", "Fewer in-clinic adjustment visits"],
      image: "images/clear-aligners.png"
    },
    implants: {
      title: "Dental Implants",
      category: "Restorative",
      fullDetails: "Dental implants are the gold standard for replacing missing teeth. Implant posts integrate with your jawbone like natural roots, supporting individual ceramic crowns or bridges that feel and function just like your natural teeth.",
      highlights: ["Permanent replacement solution", "Preserves jawbone density", "Natural appearance & strength", "Single & multi-tooth restorations"],
      image: "images/dental-implants.png"
    },
    cosmetic: {
      title: "Cosmetic Dentistry",
      category: "Smile Enhancement",
      fullDetails: "Transform stained, chipped, or gapped teeth into a radiant smile. Our cosmetic treatments blend artistic eye with biological conservation, creating natural-looking aesthetic upgrades tailored to your facial proportions.",
      highlights: ["Ultra-thin ceramic veneers", "In-office clinical teeth whitening", "Composite direct bonding", "Enamel smoothing & recontouring"],
      image: "images/cosmetic-dentistry.png"
    },
    general: {
      title: "General Dentistry",
      category: "Preventative & Core",
      fullDetails: "Comprehensive oral healthcare keeps your teeth healthy for a lifetime. From routine prophylactic cleans and early cavity detection to tooth-colored composite fillings and endodontic care, we ensure your foundation is secure.",
      highlights: ["Comprehensive oral examinations", "Ultrasonic scaling & polishing", "Tooth-colored composite fillings", "Painless root canal therapy"],
      image: "images/general-dentistry.png"
    },
    "smile-makeover": {
      title: "Smile Makeovers",
      category: "Complete Transformation",
      fullDetails: "For patients requiring comprehensive rejuvenation, a smile makeover harmonizes multiple disciplines. Dr. Prudhvi maps out a phased sequence combining alignment, restorative crowns, and whitening for a flawless result.",
      highlights: ["Full-mouth digital planning", "Phased treatment execution", "Custom shade & shape matching", "Long-term maintenance program"],
      image: "images/smile-makeover.png"
    }
  };

  // 1. Header Scroll Behavior (shadow-on-scroll + smart auto-hide)
  const SCROLL_HIDE_THRESHOLD = 20;
  let lastScrollY = window.scrollY;
  let navHidden = false;
  let scrollScheduled = false;

  // The one-time entrance transition (400ms premium ease, set on .hnav) must
  // finish before we switch to the 300ms ease transition used for hide/show —
  // swapping transition rules mid-flight would retime the entrance animation.
  window.setTimeout(() => header.classList.add('hnav--interactive'), 500);

  const updateHeaderOnScroll = () => {
    // Clamp against iOS rubber-band overscroll producing negative values.
    const currentScrollY = Math.max(window.scrollY, 0);

    header.classList.toggle('hnav--scrolled', currentScrollY > 20);

    const mobileMenuOpen = mobileMenu.classList.contains('is-open');
    if (mobileMenuOpen || currentScrollY <= SCROLL_HIDE_THRESHOLD) {
      if (navHidden) {
        header.classList.remove('hnav--hidden');
        navHidden = false;
      }
      lastScrollY = currentScrollY;
      scrollScheduled = false;
      return;
    }

    const delta = currentScrollY - lastScrollY;
    if (Math.abs(delta) >= SCROLL_HIDE_THRESHOLD) {
      if (delta > 0 && !navHidden) {
        header.classList.add('hnav--hidden');
        navHidden = true;
      } else if (delta < 0 && navHidden) {
        header.classList.remove('hnav--hidden');
        navHidden = false;
      }
      lastScrollY = currentScrollY;
    }

    scrollScheduled = false;
  };

  window.addEventListener('scroll', () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      window.requestAnimationFrame(updateHeaderOnScroll);
    }
  }, { passive: true });

  updateHeaderOnScroll();

  // 2. Mobile Menu Toggle
  window.closeMobileMenu = function() {
    mobileMenu.classList.remove('is-open');
    mobileMenuBtn.classList.remove('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  };
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      if (!isOpen) {
        mobileMenu.classList.add('is-open');
        mobileMenuBtn.classList.add('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        window.closeMobileMenu();
      }
    });
  }

  // Shared overlay open/close transition (fade backdrop + scale panel).
  const MODAL_TRANSITION_MS = 220;
  function openOverlay(el) {
    el.classList.remove('hidden');
    el.classList.add('flex');
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-open')));
  }
  function closeOverlay(el) {
    el.classList.remove('is-open');
    window.setTimeout(() => {
      el.classList.add('hidden');
      el.classList.remove('flex');
    }, MODAL_TRANSITION_MS);
  }

  // 3. Booking Modal Functionality
  window.openBookingModal = function(serviceName = '') {
    if (serviceName && serviceSelect) {
      let matchedOption = Array.from(serviceSelect.options).find(opt => opt.value.toLowerCase().includes(serviceName.toLowerCase()));
      if (matchedOption) {
        serviceSelect.value = matchedOption.value;
      }
    }
    bookingForm.classList.remove('hidden');
    bookingSuccess.classList.add('hidden');
    openOverlay(bookingModal);
    document.body.style.overflow = 'hidden';
    // Lenis intercepts wheel/touch scroll globally, so it must be paused
    // while a modal is open or scroll gestures over the modal move the
    // page behind it instead of the modal's own scrollable content.
    if (typeof lenis !== 'undefined' && lenis) lenis.stop();
  };

  window.closeBookingModal = function() {
    closeOverlay(bookingModal);
    document.body.style.overflow = '';
    if (typeof lenis !== 'undefined' && lenis) lenis.start();
  };

  // Form validation and AJAX submission for #booking-form are handled
  // centrally in js/form-validation.js (shared with the contact form).

  // 4. Service Modal Functionality
  window.openServiceModal = function(serviceId) {
    const service = servicesData[serviceId];
    if (!service) return;

    serviceModalTitle.textContent = service.title;
    serviceModalCategory.textContent = service.category;
    serviceModalDesc.textContent = service.fullDetails;
    serviceModalImg.src = service.image;

    serviceModalHighlights.innerHTML = service.highlights
      .map(h => `<li class="flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-dark"><span class="w-2 h-2 rounded-full bg-brand-sky shrink-0"></span>${h}</li>`)
      .join('');

    serviceModal.setAttribute('data-current-service', service.title);
    openOverlay(serviceModal);
    document.body.style.overflow = 'hidden';
    if (typeof lenis !== 'undefined' && lenis) lenis.stop();
  };

  window.closeServiceModal = function() {
    closeOverlay(serviceModal);
    document.body.style.overflow = '';
    if (typeof lenis !== 'undefined' && lenis) lenis.start();
  };

  window.bookCurrentModalService = function() {
    const serviceTitle = serviceModal.getAttribute('data-current-service') || '';
    closeServiceModal();
    openBookingModal(serviceTitle);
  };

  // 5. FAQ Accordion Toggle
  window.toggleFaq = function(button) {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('is-open');

    document.querySelectorAll('.faq-item.is-open').forEach((i) => i.classList.remove('is-open'));

    if (!isOpen) {
      item.classList.add('is-open');
    }
  };

  // 6. Floating Action Stack & Scroll Progress Ring
  const floatingActions = document.getElementById('floating-actions');
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.getElementById('progress-circle');

  if (floatingActions && backToTopBtn && progressCircle) {
    const RADIUS = 23;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~144.513

    progressCircle.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;
    progressCircle.style.strokeDashoffset = `${CIRCUMFERENCE}`;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Show after scrolling past 120px
      if (scrollTop > 120) {
        floatingActions.classList.add('is-visible');
      } else {
        floatingActions.classList.remove('is-visible');
      }

      if (scrollHeight <= 0) return;

      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      const offset = CIRCUMFERENCE - (progress * CIRCUMFERENCE);
      progressCircle.style.strokeDashoffset = offset;
    };

    // Listen on window scroll
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // Hook into Lenis scroll listener if initialized
    if (typeof lenis !== 'undefined' && lenis) {
      lenis.on('scroll', updateScrollProgress);
    }

    updateScrollProgress();

    backToTopBtn.addEventListener('click', () => {
      // Release the Advanced Dental Technology section's scroll pin/lock
      // (if engaged) before scrolling, so its wheel/touch interception and
      // lenis.stop() state never intercept or truncate this scroll-to-top.
      if (typeof window.techJourneyReleasePin === 'function') {
        window.techJourneyReleasePin(2000);
      }

      if (typeof lenis !== 'undefined' && lenis) {
        lenis.start();
        lenis.scrollTo(0, { immediate: false, duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});

