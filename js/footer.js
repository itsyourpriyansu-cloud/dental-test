/**
 * Premium Luxury Footer Interactive Scripts
 * Handles viewport reveal, newsletter form submission & micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFooterReveal();
  initNewsletterForm();
});

/**
 * Reveal entire footer smoothly when entering viewport
 */
function initFooterReveal() {
  const footerEl = document.querySelector('.app-footer');
  if (!footerEl) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footerEl.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(footerEl);
  } else {
    footerEl.classList.add('is-visible');
  }
}

/**
 * Handle Newsletter Subscription Form
 */
function initNewsletterForm() {
  const form = document.getElementById('footer-newsletter-form');
  const emailInput = document.getElementById('footer-newsletter-email');
  const statusMsg = document.getElementById('footer-newsletter-status');

  if (!form || !emailInput) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailVal = emailInput.value.trim();

    if (!emailVal || !validateEmail(emailVal)) {
      showStatus('Please enter a valid email address.', 'is-error');
      return;
    }

    // Simulate successful API call
    const submitBtn = form.querySelector('.app-footer__submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.8';
    }

    setTimeout(() => {
      showStatus('Thank you! You have successfully subscribed to our newsletter.', 'is-success');
      emailInput.value = '';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    }, 600);
  });

  function showStatus(message, typeClass) {
    if (!statusMsg) return;
    statusMsg.textContent = message;
    statusMsg.className = `app-footer__newsletter-status ${typeClass}`;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
