/**
 * Redesigned Footer Interactive Scripts
 * Handles viewport reveal for the redesigned footer shell.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFooterReveal();
});

/**
 * Reveal entire footer smoothly when entering viewport
 */
function initFooterReveal() {
  const footerEl = document.querySelector('.footer-shell') || document.querySelector('.app-footer');
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
      { threshold: 0.1 }
    );
    observer.observe(footerEl);
  } else {
    footerEl.classList.add('is-visible');
  }
}
