/* ==================== MOBILE JS (Drawer Refactor) ==================== */
(function(){
  'use strict';
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);} else {init();}

  function init(){
    const sidebar=document.getElementById('sidebar');
    const drawerBtn=document.getElementById('drawerToggle');
    const headerBtn=document.getElementById('menuToggle');
    const overlay=document.getElementById('drawerOverlay');
    const mainContent=document.getElementById('mainContent');
    const themeToggleBtn=document.getElementById('themeToggleBtn');
    if(!sidebar||!overlay){return;}

    // Aplicar estado inicial de tema (já tratado em index.js, aqui só sincroniza em mobile)
    syncDarkMode();

    if(drawerBtn){ drawerBtn.addEventListener('click',toggleDrawer); }
    if(headerBtn){ headerBtn.addEventListener('click',toggleDrawer); }
    overlay.addEventListener('click',closeDrawer);
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape' && isOpen()) { closeDrawer(); }
    });

    // Focus trap simples quando aberto
    document.addEventListener('keydown',function(e){
      if(!isOpen()) return;
      if(e.key!=='Tab') return;
      const focusables = sidebar.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
      if(!focusables.length) return;
      const first=focusables[0];
      const last=focusables[focusables.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    });

    // Marcar itens de menu ativos
    sidebar.querySelectorAll('.menu-item').forEach(item=>{
      item.addEventListener('click',()=>{
        if(item.id==='themeToggleBtn') return; // tema tratado por index.js
        sidebar.querySelectorAll('.menu-item').forEach(i=>i.classList.remove('active'));
        item.classList.add('active');
        if(window.innerWidth<=768) closeDrawer();
      });
    });

    // Accessibility: fechar ao clicar fora via overlay já configurado
    function isOpen(){ return document.body.classList.contains('drawer-open'); }
    function openDrawer(){
      if(window.innerWidth>768) return; // restringe drawer ao mobile
      document.body.classList.add('drawer-opening');
      requestAnimationFrame(()=>{
        document.body.classList.add('drawer-open');
        if(drawerBtn){ drawerBtn.setAttribute('aria-expanded','true'); }
        if(headerBtn){ headerBtn.setAttribute('aria-expanded','true'); }
        overlay.setAttribute('aria-hidden','false');
        setTimeout(()=>{ document.body.classList.remove('drawer-opening'); }, 300);
        if(headerBtn){ headerBtn.focus(); } else if(drawerBtn){ drawerBtn.focus(); }
      });
    }
    function closeDrawer(){
      if(window.innerWidth>768){ // limpeza defensiva em desktop
        document.body.classList.remove('drawer-open','drawer-opening','drawer-closing');
        return;
      }
      document.body.classList.add('drawer-closing');
      document.body.classList.remove('drawer-open');
      if(drawerBtn){ drawerBtn.setAttribute('aria-expanded','false'); }
      if(headerBtn){ headerBtn.setAttribute('aria-expanded','false'); }
      overlay.setAttribute('aria-hidden','true');
      setTimeout(()=>{ document.body.classList.remove('drawer-closing'); if(mainContent) mainContent.focus(); }, 220);
    }
    function toggleDrawer(){ isOpen()?closeDrawer():openDrawer(); }

    // Fechar drawer em resize para desktop
    window.addEventListener('resize',()=>{ 
      if(window.innerWidth>768){
        // Garantir estado limpo ao entrar em desktop
        document.body.classList.remove('drawer-open','drawer-opening','drawer-closing');
        drawerBtn.setAttribute('aria-expanded','false');
        overlay.setAttribute('aria-hidden','true');
      } else if(window.innerWidth<=768 && isOpen()){ /* permanece comportamento normal */ }
    });

    function syncDarkMode(){
      const isDark=localStorage.getItem('darkMode')==='true';
      if(isDark) document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
      if(themeToggleBtn){ const slider=themeToggleBtn.querySelector('.theme-toggle-slider'); themeToggleBtn.classList.toggle('active',isDark); if(slider) slider.classList.toggle('active',isDark); }
    }
  }
})();
