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

  // Booking form
  const form = document.getElementById('appointment-booking-form');
  if (!form) return;

  const success = document.getElementById('appointment-booking-success');
  const submitBtn = form.querySelector('.ab-submit');
  const submitLabel = form.querySelector('.ab-submit-label');
  const successName = document.getElementById('ab-success-name');
  const whatsappLink = document.getElementById('ab-whatsapp-link');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const name = document.getElementById('ab-name').value.trim() || 'Patient';
    const email = document.getElementById('ab-email').value.trim();
    const phone = document.getElementById('ab-phone').value.trim();
    const date = document.getElementById('ab-date').value;
    const time = document.getElementById('ab-time').value;
    const notes = document.getElementById('ab-notes').value.trim();

    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');
    if (submitLabel) submitLabel.textContent = 'Sending...';

    const messageLines = [
      'Hi Clinic, I would like to book an appointment.',
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : null,
      email ? `Email: ${email}` : null,
      date ? `Preferred date: ${date}` : null,
      time ? `Preferred time: ${time}` : null,
      notes ? `Notes: ${notes}` : null
    ].filter(Boolean).join('\n');

    window.setTimeout(() => {
      if (successName) successName.textContent = name;
      if (whatsappLink) {
        whatsappLink.href = `https://wa.me/+919876543210?text=${encodeURIComponent(messageLines)}`;
      }

      form.classList.add('hidden');
      if (success) success.classList.remove('hidden');

      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
      if (submitLabel) submitLabel.textContent = 'Reserve Your Spot';
    }, 600);
  });
});
