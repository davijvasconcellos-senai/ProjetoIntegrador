// Menu Lateral Interativo com Botão de Dupla Função
document.addEventListener('DOMContentLoaded', function () {
    console.log('JS index.js carregado');
    
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const menuToggle = document.getElementById('menuToggle');
    const mainContent = document.getElementById('mainContent');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const drawerOverlay = document.getElementById('drawerOverlay');

    // Estado do menu (salvo no localStorage)
    let isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';

    // Estado do tema (dark/light) - Começar sempre em modo claro se não houver preferência salva
    let darkModeValue = localStorage.getItem('darkMode');
    let isDarkMode = darkModeValue === 'true';
    
    console.log('Dark mode localStorage:', darkModeValue, 'isDarkMode:', isDarkMode);
    
    // Aplicar estado inicial (apenas desktop)
    if (window.innerWidth > 768) {
        updateSidebarState();
    }
    setupTooltips();

    // Estado visual do botão de tema
    if (isDarkMode) {
        themeToggleBtn.classList.add('active');
        updateTheme();
    } else {
        themeToggleBtn.classList.remove('active');
        // Garantir que body não tenha dark-mode se não estiver ativo
        document.body.classList.remove('dark-mode');
    }
    
    // Alternância de tema ao clicar no botão
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
    
    // Função para atualizar o tema
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

    // Salvar estado do tema no localStorage
    function saveThemeState() {
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Botão de dupla função (recolher/expandir) - APENAS DESKTOP
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth > 768) {
                toggleSidebar();
            }
        });
    }

    // ==================== TABLET DRAWER (769px–1024px) ====================
    // O botão `.menu-toggle` no header deve abrir/fechar a sidebar como drawer em tablets.
    // Reutiliza a overlay existente e evita conflito com mobile.js (que atua apenas <=768px).
    if (menuToggle && sidebar && drawerOverlay) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (window.innerWidth > 768 && window.innerWidth <= 1024) {
                toggleTabletDrawer();
            }
        });

        // Clique na overlay fecha o drawer em tablets
        drawerOverlay.addEventListener('click', function () {
            if (window.innerWidth > 768 && window.innerWidth <= 1024) {
                closeTabletDrawer();
            }
        });

        // ESC fecha o drawer em tablets
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

    // Limpeza ao redimensionar: garantir estados corretos para cada faixa
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

    // Função para alternar o menu (desktop)
    function toggleSidebar() {
        isCollapsed = !isCollapsed;
        updateSidebarState();
        saveSidebarState();
    }

    // Atualizar estado do menu lateral (desktop)
    function updateSidebarState() {
        if (window.innerWidth > 768) {
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.style.marginLeft = '70px';
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.style.marginLeft = '280px';
            }
        }
    }

    // Configurar tooltips para os ícones do menu
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

    // Salvar estado no localStorage
    function saveSidebarState() {
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }

    // ==================== FUNCIONALIDADE MOBILE (DESABILITADA - USAR MOBILE.JS) ====================
    // Todo código mobile foi movido para mobile.js para evitar conflitos
    // O mobile.js agora controla 100% das funcionalidades mobile

    // Navegação do menu (desktop only)
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

    // Navegação do calendário (funciona em desktop e mobile)
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

    // Atalho de teclado (desktop only): Ctrl + M para alternar menu
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'm' && window.innerWidth > 768) {
            e.preventDefault();
            toggleSidebar();
        }
    });

    // Valores fixos exibidos diretamente no HTML dos cards (ver index.html)
});