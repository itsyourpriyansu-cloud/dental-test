/**
 * THE BRACES & CROWNS - Appointment Booking Section
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll-triggered reveal (same IntersectionObserver pattern used elsewhere on the site)
  const section = document.querySelector('.ab-section');
  if (section) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      section.classList.add('is-visible');
    } else {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealObserver.observe(section);
    }
  }

  // Form validation and AJAX submission for #appointment-booking-form are
  // handled centrally in js/form-validation.js (shared with the booking
  // modal popup) so both forms stay in sync.
});
