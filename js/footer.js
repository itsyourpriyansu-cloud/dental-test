/**
 * Premium Luxury Footer Interactive Scripts
 * Handles viewport reveal for the footer.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFooterReveal();
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
