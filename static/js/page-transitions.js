/**
 * Arquivo: page-transitions.js
 * Objetivo: Gerenciar transições animadas entre páginas (login, cadastro, etc.).
 * Funções:
 *  - supportsReducedMotion(): respeita preferência de redução de movimento do usuário.
 *  - addOverlay(): garante criação de overlay visual para camada de transição.
 *  - animateExit(nextUrl): anima saída antes de navegação para URL interna.
 *  - animateEnter(): anima entrada ao carregar página.
 *  - wireLinks(): intercepta cliques em links marcados com data-transition-link.
 * Integração:
 *  - Expõe objeto global PageTransitions com método init() para inicialização explícita.
 *  - Duração (DURATION) deve estar sincronizada com valores do CSS para suavidade consistente.
 * Acessibilidade:
 *  - Se prefers-reduced-motion estiver ativo, evita animação e navega imediatamente.
 */
(function () {
  const DURATION = 220; // Duração em ms (manter sincronizado com CSS das transições)

  // Verifica se usuário prefere menos movimento (redução de animações)
  function supportsReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Cria ou obtém overlay de transição no DOM
  function addOverlay() {
    let overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'page-transition-overlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  // Anima saída (fade/slide configurado via CSS) antes de navegar para próxima URL
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

    // Força reflow para garantir aplicação de classes e início da transição
    void root.offsetWidth;
    root.classList.add('page-transition-exit-active');

    setTimeout(() => {
      window.location.href = nextUrl;
    }, DURATION);
  }

  // Anima entrada quando página é carregada
  function animateEnter() {
    if (supportsReducedMotion()) return;
    const root = document.querySelector('main') || document.body;
    root.classList.add('page-transition-enter');
    // Força reflow para garantir transição inicial
    void root.offsetWidth;
    root.classList.add('page-transition-enter-active');
    setTimeout(() => {
      root.classList.remove('page-transition-enter', 'page-transition-enter-active');
      const overlay = document.querySelector('.page-transition-overlay');
      if (overlay) overlay.classList.remove('active');
    }, DURATION);
  }

  // Intercepta cliques em links com atributo data-transition-link para aplicar animação
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

  // Inicialização pública exposta no escopo global
  window.PageTransitions = {
    init() {
      wireLinks();
      animateEnter();
    }
  };
})();
