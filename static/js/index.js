/**
 * Arquivo: index.js
 * Objetivo: Controlar comportamento do dashboard (sidebar colapsável, tema claro/escuro,
 *           drawer para tablets, tooltips, atalhos e navegação básica).
 * Componentes Principais:
 *  - Sidebar desktop: alterna entre expandida e colapsada (armazenando estado em localStorage).
 *  - Drawer tablet: faixa entre 769px–1024px usa overlay e classe 'drawer-open' para exibir lateral temporária.
 *  - Tema (dark-mode): estado persistente em localStorage; adiciona/remover classe no body e atualiza UI.
 *  - Tooltips: mapeia ícones para textos via atributo data-tooltip facilitando acessibilidade.
 *  - Atalho teclado: Ctrl+M alterna sidebar em ambiente desktop.
 * Decisões de Implementação:
 *  - Não mistura lógica mobile (<=768px) aqui; está isolada em mobile.js para evitar conflitos.
 *  - Usa margem dinâmica no mainContent ao colapsar/expandir para preservar layout sem recalcular grid complexo.
 *  - Persistência simples (localStorage) suficiente dado escopo, sem necessidade de backend.
 * Acessibilidade:
 *  - Usa aria-expanded nas interações de drawer.
 *  - Usa aria-hidden na overlay para controle de leitura por leitores de tela.
 */
// Menu Lateral Interativo com Botão de Dupla Função (inicialização principal após DOM pronto)
document.addEventListener('DOMContentLoaded', function () {
    console.log('JS index.js carregado');

    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const menuToggle = document.getElementById('menuToggle');
    const mainContent = document.getElementById('mainContent');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const drawerOverlay = document.getElementById('drawerOverlay');

    // Estado do menu lateral (persistido em localStorage para experiência consistente)
    let isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';

    // Estado do tema (dark/light) - inicia claro se não houver preferência salva
    let darkModeValue = localStorage.getItem('darkMode');
    let isDarkMode = darkModeValue === 'true';

    console.log('Dark mode localStorage:', darkModeValue, 'isDarkMode:', isDarkMode);

    // Aplica estado inicial da sidebar somente em desktop (>768px)
    if (window.innerWidth > 768) {
        updateSidebarState();
    }
    setupTooltips();

    // Ajusta estado visual inicial do botão de tema conforme preferência armazenada
    if (isDarkMode) {
        themeToggleBtn.classList.add('active');
        updateTheme();
    } else {
        themeToggleBtn.classList.remove('active');
        // Garantir que body não tenha dark-mode se não estiver ativo
        document.body.classList.remove('dark-mode');
    }

    // Alternância de tema ao clicar no botão (atualiza classe e persistência)
    themeToggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        isDarkMode = !isDarkMode;
        updateTheme();
        saveThemeState();
        const slider = themeToggleBtn.querySelector('.theme-toggle-slider');
        if (slider) {
            slider.classList.toggle('active', isDarkMode);
        }
        themeToggleBtn.classList.toggle('active', isDarkMode);
    });

    // Atualiza DOM para refletir estado atual de tema (classe dark-mode e slider)
    function updateTheme() {
        const slider = themeToggleBtn.querySelector('.theme-toggle-slider');
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            themeToggleBtn.classList.add('active');
            if (slider) slider.classList.add('active');
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleBtn.classList.remove('active');
            if (slider) slider.classList.remove('active');
        }
    }

    // Persiste estado do tema (boolean) no localStorage
    function saveThemeState() {
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Botão de dupla função (recolher/expandir) - somente em desktop; ignora em tablet/mobile
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth > 768) {
                toggleSidebar();
            }
        });
    }

    // ==================== TABLET DRAWER (769px–1024px) ====================
    // Lógica exclusiva para tablets: o header .menu-toggle abre/fecha a sidebar como drawer.
    // Reutiliza overlay existente e evita conflito com mobile.js (este cuida apenas de <=768px).
    if (menuToggle && sidebar && drawerOverlay) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.innerWidth > 768 && window.innerWidth <= 1024) {
                toggleTabletDrawer();
            }
        });

        // Clique na overlay fecha o drawer (encerrando foco e ocultando lateral)
        drawerOverlay.addEventListener('click', function () {
            if (window.innerWidth > 768 && window.innerWidth <= 1024) {
                closeTabletDrawer();
            }
        });

        // Pressionar ESC fecha o drawer para acessibilidade/rapidez
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && window.innerWidth > 768 && window.innerWidth <= 1024) {
                closeTabletDrawer();
            }
        });
    }

    function isTabletDrawerOpen() {
        return document.body.classList.contains('drawer-open') && sidebar.classList.contains('active');
    }

    function openTabletDrawer() {
        document.body.classList.add('drawer-open');
        sidebar.classList.add('active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
        if (drawerOverlay) drawerOverlay.setAttribute('aria-hidden', 'false');
    }

    function closeTabletDrawer() {
        sidebar.classList.remove('active');
        document.body.classList.remove('drawer-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        if (drawerOverlay) drawerOverlay.setAttribute('aria-hidden', 'true');
    }

    function toggleTabletDrawer() {
        if (isTabletDrawerOpen()) closeTabletDrawer(); else openTabletDrawer();
    }

    // Limpeza ao redimensionar: garante que estados tablet não vazem para desktop ou mobile
    window.addEventListener('resize', function () {
        // Saindo de tablet -> fechar drawer tablet
        if (window.innerWidth <= 768 || window.innerWidth > 1024) {
            closeTabletDrawer();
        }
        // Em desktop, manter lógica de colapso/expand padrão
        if (window.innerWidth > 768) {
            updateSidebarState();
        }
    });

    // Alterna entre colapsado/expandido no contexto desktop
    function toggleSidebar() {
        isCollapsed = !isCollapsed;
        updateSidebarState();
        saveSidebarState();
    }

    // Aplica classes/styles conforme estado colapsado (apenas desktop)
    function updateSidebarState() {
        if (window.innerWidth > 768) {
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
            } else {
                sidebar.classList.remove('collapsed');
            }
            // Evitar espaços em branco: não usar margin-left manual em layout flex
            if (mainContent && mainContent.style) {
                mainContent.style.marginLeft = '';
            }
        }
    }

    // Adiciona tooltips baseados em ícones para melhorar entendimento rápido
    function setupTooltips() {
        const menuItems = document.querySelectorAll('.menu-item');
        const tooltips = {
            '📊': 'Pressa do cliente',
            '🏠': 'Página inicial',
            '💬': 'Caixa de mensagens',
            '🔔': 'Notificações',
            '📈': 'Monitoração',
            '⚙️': 'Ajuda',
            '🚪': 'Sair da conta',
            '🌡️': 'Temperatura',
            '📳': 'Vibração',
            '🔊': 'Ruído'
        };

        menuItems.forEach(item => {
            const icon = item.querySelector('.menu-icon');
            if (icon) {
                const iconText = icon.textContent;
                if (tooltips[iconText]) {
                    item.setAttribute('data-tooltip', tooltips[iconText]);
                }
            }
        });
    }

    // Persiste estado de colapso da sidebar
    function saveSidebarState() {
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }

    // ==================== FUNCIONALIDADE MOBILE (DESABILITADA AQUI) ====================
    // Código específico de mobile deslocado para mobile.js para isolamento e evitar interações duplicadas.

    // Navegação do menu (desktop): marca item ativo e loga clique
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // Ignorar o botão de tema
            if (this.id === 'themeToggleBtn') return;

            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            const menuText = this.querySelector('.menu-text');
            if (menuText) {
                console.log('Menu clicado:', menuText.textContent);
            }
        });
    });

    // Navegação do calendário (simples placeholders; lógica de troca de mês pode ser expandida futuramente)
    const prevButton = document.querySelector('.nav-button:first-child');
    const nextButton = document.querySelector('.nav-button:last-child');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function () {
            console.log('Mês anterior');
        });

        nextButton.addEventListener('click', function () {
            console.log('Próximo mês');
        });
    }

    // Atalho de teclado (desktop): Ctrl+M alterna sidebar para acesso rápido sem mouse
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'm' && window.innerWidth > 768) {
            e.preventDefault();
            toggleSidebar();
        }
    });

    // Observação: métricas mostradas são estáticas no HTML nesta versão simplificada (ver index.html)
});