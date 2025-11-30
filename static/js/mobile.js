/**
 * Arquivo: mobile.js
 * Propósito: Gerencia o comportamento da interface em dispositivos móveis (<=768px),
 *            fornecendo drawer lateral acessível para navegação.
 * Visão geral:
 *  - Exibe/oculta sidebar como drawer com overlay e classes de estado.
 *  - Sincroniza tema escuro/claro com localStorage.
 *  - Implementa focus trap simples para navegação por teclado quando drawer está aberto.
 *  - Ajusta comportamento ao redimensionar para garantir limpeza ao entrar em desktop.
 * Decisões técnicas:
 *  - IIFE encapsula escopo e evita poluição global.
 *  - 'use strict' reforça boas práticas e evita erros silenciosos.
 *  - Focus trap básico suficiente para menu simples; pode ser expandido para acessibilidade avançada.
 * Acessibilidade:
 *  - Usa aria-expanded nos botões de disparo.
 *  - Usa aria-hidden na overlay para indicar visibilidade sem remover do DOM.
 *  - ESC fecha o drawer, padrão familiar para usuários.
 */
(function () {
  'use strict';
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }

  function init() {
    const sidebar = document.getElementById('sidebar');
    const drawerBtn = document.getElementById('drawerToggle');
    const headerBtn = document.getElementById('menuToggle');
    const overlay = document.getElementById('drawerOverlay');
    const mainContent = document.getElementById('mainContent');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (!sidebar || !overlay) { return; }

    // Sincroniza estado de tema (index.js já aplica; aqui apenas reflete no mobile)
    syncDarkMode();

    if (drawerBtn) { drawerBtn.addEventListener('click', toggleDrawer); }
    if (headerBtn) { headerBtn.addEventListener('click', toggleDrawer); }
    overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { closeDrawer(); }
    });

    // Focus trap simples: cicla foco dentro do drawer quando aberto (acessibilidade)
    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key !== 'Tab') return;
      const focusables = sidebar.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // Marca item ativo ao clicar; fecha drawer em mobile para feedback rápido
    sidebar.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => {
        if (item.id === 'themeToggleBtn') return; // tema tratado por index.js
        sidebar.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        if (window.innerWidth <= 768) closeDrawer();
      });
    });

    // Acessibilidade: overlay clicável fecha o drawer
    function isOpen() { return document.body.classList.contains('drawer-open'); }
    function openDrawer() {
      if (window.innerWidth > 768) return; // Restrição: somente mobile
      document.body.classList.add('drawer-opening');
      requestAnimationFrame(() => {
        document.body.classList.add('drawer-open');
        if (drawerBtn) { drawerBtn.setAttribute('aria-expanded', 'true'); }
        if (headerBtn) { headerBtn.setAttribute('aria-expanded', 'true'); }
        overlay.setAttribute('aria-hidden', 'false');
        setTimeout(() => { document.body.classList.remove('drawer-opening'); }, 300);
        if (headerBtn) { headerBtn.focus(); } else if (drawerBtn) { drawerBtn.focus(); }
      });
    }
    function closeDrawer() {
      if (window.innerWidth > 768) { // Limpeza defensiva ao sair de mobile
        document.body.classList.remove('drawer-open', 'drawer-opening', 'drawer-closing');
        return;
      }
      document.body.classList.add('drawer-closing');
      document.body.classList.remove('drawer-open');
      if (drawerBtn) { drawerBtn.setAttribute('aria-expanded', 'false'); }
      if (headerBtn) { headerBtn.setAttribute('aria-expanded', 'false'); }
      overlay.setAttribute('aria-hidden', 'true');
      setTimeout(() => { document.body.classList.remove('drawer-closing'); if (mainContent) mainContent.focus(); }, 220);
    }
    function toggleDrawer() { isOpen() ? closeDrawer() : openDrawer(); }

    // Ao redimensionar, garante que estados móveis não afetem desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        // Garante estado limpo ao entrar em desktop
        document.body.classList.remove('drawer-open', 'drawer-opening', 'drawer-closing');
        drawerBtn.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('aria-hidden', 'true');
      } else if (window.innerWidth <= 768 && isOpen()) { /* permanece comportamento normal */ }
    });

    // Sincroniza visual do tema escuro/claro com localStorage
    function syncDarkMode() {
      const isDark = localStorage.getItem('darkMode') === 'true';
      if (isDark) document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
      if (themeToggleBtn) { const slider = themeToggleBtn.querySelector('.theme-toggle-slider'); themeToggleBtn.classList.toggle('active', isDark); if (slider) slider.classList.toggle('active', isDark); }
    }
  }
})();
