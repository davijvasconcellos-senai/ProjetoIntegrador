// Handles animated transitions between login and cadastro pages
(function () {
  const DURATION = 220; // ms, keep in sync with CSS

  function supportsReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function addOverlay() {
    let overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'page-transition-overlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function animateExit(nextUrl) {
    if (supportsReducedMotion()) {
      window.location.href = nextUrl;
      return;
    }
    const overlay = addOverlay();
    overlay.classList.add('active');

    const root = document.querySelector('main') || document.body;
    root.classList.remove('page-transition-enter', 'page-transition-enter-active');
    root.classList.add('page-transition-exit');

    // Force reflow then activate
    void root.offsetWidth;
    root.classList.add('page-transition-exit-active');

    setTimeout(() => {
      window.location.href = nextUrl;
    }, DURATION);
  }

  function animateEnter() {
    if (supportsReducedMotion()) return;
    const root = document.querySelector('main') || document.body;
    root.classList.add('page-transition-enter');
    // Force reflow
    void root.offsetWidth;
    root.classList.add('page-transition-enter-active');
    setTimeout(() => {
      root.classList.remove('page-transition-enter', 'page-transition-enter-active');
      const overlay = document.querySelector('.page-transition-overlay');
      if (overlay) overlay.classList.remove('active');
    }, DURATION);
  }

  function wireLinks() {
    document.querySelectorAll('[data-transition-link]')
      .forEach((el) => {
        el.addEventListener('click', (e) => {
          const href = el.getAttribute('href');
          if (!href) return;
          // Only animate same-origin navigations
          const url = new URL(href, window.location.origin);
          if (url.origin === window.location.origin) {
            e.preventDefault();
            animateExit(url.href);
          }
        });
      });
  }

  // Public init
  window.PageTransitions = {
    init() {
      wireLinks();
      animateEnter();
    }
  };
})();
