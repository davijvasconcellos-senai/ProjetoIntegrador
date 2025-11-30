/**
 * Arquivo: transition-config.js
 * Objetivo: Definir e aplicar configuração padrão para transições de página.
 * Como usar:
 *   window.PAGE_TRANSITION_CONFIG = {
 *      type: 'panel' | 'fade' | 'slide',
 *      duration: <ms>,
 *      overlay: 'rgba(...)',
 *      panelGradient: 'linear-gradient(...)',
 *      easing: 'cubic-bezier(...)' ou 'ease-in-out'
 *   };
 * Se alguma chave estiver ausente, é preenchida com o valor padrão definido em 'defaults'.
 * Integração:
 *  - Aplica variáveis CSS (--transition-duration, --transition-easing, --overlay-bg, --panel-bg) para uso em estilos.
 *  - Adiciona atributo data-transition-type ao <html> para controle condicional em CSS/JS.
 * Decisões:
 *  - Usa Object.assign para merge simples evitando mutação direta indesejada.
 *  - Aplica imediatamente se DOM já carregado; caso contrário aguarda DOMContentLoaded.
 * Extensões futuras:
 *  - Poderia validar formato das propriedades (ex: regex para gradient).
 */
(function () {
    const defaults = {
        type: 'slide', // Tipo padrão de transição: deslizamento lateral
        // Duração levemente maior e easing suave para fluidez
        duration: 650,
        // Easing utilizado para animações; pode ser alterado para outro cubic-bezier ou 'ease-in-out'
        easing: 'cubic-bezier(0.215,0.61,0.355,1)',
        overlay: 'rgba(10,10,10,0.45)',
        panelGradient: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,245,255,0.96))'
    };

    // Garante existência do objeto global de configuração (cria se não houver)
    if (!window.PAGE_TRANSITION_CONFIG) {
        window.PAGE_TRANSITION_CONFIG = defaults;
    } else {
        // Preenche chaves ausentes misturando defaults e config existente
        window.PAGE_TRANSITION_CONFIG = Object.assign({}, defaults, window.PAGE_TRANSITION_CONFIG);
    }

    // Aplica variáveis CSS para que estilos reajam dinamicamente à configuração
    function applyCssVars(cfg) {
        const root = document.documentElement;
        root.style.setProperty('--transition-duration', cfg.duration + 'ms');
        root.style.setProperty('--transition-easing', cfg.easing || 'ease');
        root.style.setProperty('--overlay-bg', cfg.overlay);
        root.style.setProperty('--panel-bg', cfg.panelGradient);
        root.setAttribute('data-transition-type', cfg.type);
    }

    // Aplica imediatamente se DOM já estiver pronto; do contrário espera evento de carregamento
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { applyCssVars(window.PAGE_TRANSITION_CONFIG); });
    } else {
        applyCssVars(window.PAGE_TRANSITION_CONFIG);
    }

    // Expõe helper global para re-aplicar configuração dinamicamente se alterar em runtime
    window.applyPageTransitionConfig = applyCssVars;
})();
