// Default configuration for page transitions. You can override by setting
// window.PAGE_TRANSITION_CONFIG = { type: 'panel'|'fade', duration: 600, overlay: 'rgba(...)', panelGradient: 'linear-gradient(...)' }
(function(){
    const defaults = {
        type: 'slide', // 'panel' | 'fade' | 'slide' (default now 'slide')
        // Slightly longer duration and a softer easing for more fluid motion
        duration: 650,
        // easing used by page transition animations. You can set a different cubic-bezier or use 'ease-in-out'
        easing: 'cubic-bezier(0.215,0.61,0.355,1)',
        overlay: 'rgba(10,10,10,0.45)',
        panelGradient: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,245,255,0.96))'
    };

    // Ensure there's a global config object
    if (!window.PAGE_TRANSITION_CONFIG) {
        window.PAGE_TRANSITION_CONFIG = defaults;
    } else {
        // fill missing keys
        window.PAGE_TRANSITION_CONFIG = Object.assign({}, defaults, window.PAGE_TRANSITION_CONFIG);
    }

    // Apply CSS variables so styles react to config
    function applyCssVars(cfg){
        const root = document.documentElement;
        root.style.setProperty('--transition-duration', cfg.duration + 'ms');
        root.style.setProperty('--transition-easing', cfg.easing || 'ease');
        root.style.setProperty('--overlay-bg', cfg.overlay);
        root.style.setProperty('--panel-bg', cfg.panelGradient);
        root.setAttribute('data-transition-type', cfg.type);
    }

    // If DOM is ready, apply immediately; otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){ applyCssVars(window.PAGE_TRANSITION_CONFIG); });
    } else {
        applyCssVars(window.PAGE_TRANSITION_CONFIG);
    }

    // expose small helper
    window.applyPageTransitionConfig = applyCssVars;
})();
