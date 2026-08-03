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
  const patientNameSpan = document.getElementById('success-patient-name');
  const selectedServiceSpan = document.getElementById('success-service-name');
  const whatsappLink = document.getElementById('whatsapp-link');

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
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
    },
    aligners: {
      title: "Clear Aligners",
      category: "Invisible Braces",
      fullDetails: "Clear aligner therapy offers an invisible, removable alternative to conventional braces. Using 3D computer models, a sequential series of clear trays is generated to align your teeth gradually, allowing you to eat, brush, and speak with complete confidence.",
      highlights: ["Virtually invisible appearance", "Removable for meals & oral hygiene", "3D digital progress preview", "Fewer in-clinic adjustment visits"],
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80"
    },
    implants: {
      title: "Dental Implants",
      category: "Restorative",
      fullDetails: "Dental implants are the gold standard for replacing missing teeth. Implant posts integrate with your jawbone like natural roots, supporting individual ceramic crowns or bridges that feel and function just like your natural teeth.",
      highlights: ["Permanent replacement solution", "Preserves jawbone density", "Natural appearance & strength", "Single & multi-tooth restorations"],
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
    },
    cosmetic: {
      title: "Cosmetic Dentistry",
      category: "Smile Enhancement",
      fullDetails: "Transform stained, chipped, or gapped teeth into a radiant smile. Our cosmetic treatments blend artistic eye with biological conservation, creating natural-looking aesthetic upgrades tailored to your facial proportions.",
      highlights: ["Ultra-thin ceramic veneers", "In-office clinical teeth whitening", "Composite direct bonding", "Enamel smoothing & recontouring"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
    },
    general: {
      title: "General Dentistry",
      category: "Preventative & Core",
      fullDetails: "Comprehensive oral healthcare keeps your teeth healthy for a lifetime. From routine prophylactic cleans and early cavity detection to tooth-colored composite fillings and endodontic care, we ensure your foundation is secure.",
      highlights: ["Comprehensive oral examinations", "Ultrasonic scaling & polishing", "Tooth-colored composite fillings", "Painless root canal therapy"],
      image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80"
    },
    "smile-makeover": {
      title: "Smile Makeovers",
      category: "Complete Transformation",
      fullDetails: "For patients requiring comprehensive rejuvenation, a smile makeover harmonizes multiple disciplines. Dr. Prudhvi maps out a phased sequence combining alignment, restorative crowns, and whitening for a flawless result.",
      highlights: ["Full-mouth digital planning", "Phased treatment execution", "Custom shade & shape matching", "Long-term maintenance program"],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
    }
  };

  // 1. Header Scroll Behavior
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('hnav--scrolled');
    } else {
      header.classList.remove('hnav--scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

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
  };

  window.closeBookingModal = function() {
    closeOverlay(bookingModal);
    document.body.style.overflow = '';
  };

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('patient-name').value || 'Patient';
      const service = serviceSelect.value || 'Consultation';
      patientNameSpan.textContent = name;
      selectedServiceSpan.textContent = service;
      whatsappLink.href = `https://wa.me/+919676328450?text=Hi%20Clinic,%20I%20just%20requested%20an%20appointment%20for%20${encodeURIComponent(name)}`;
      bookingForm.classList.add('hidden');
      bookingSuccess.classList.remove('hidden');
    });
  }

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
  };

  window.closeServiceModal = function() {
    closeOverlay(serviceModal);
    document.body.style.overflow = '';
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
});
