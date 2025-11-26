// Menu Lateral Interativo com Botão de Dupla Função
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const menuToggle = document.getElementById('menuToggle');
    const mainContent = document.getElementById('mainContent');
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    // Remover o evento de click duplicado do menu de configurações, se existir
    // (garante que só há um botão de tema)

    // Estado do menu (salvo no localStorage)
    let isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';

    // Estado do tema (dark/light)
    let isDarkMode = localStorage.getItem('darkMode') === 'true';
    updateTheme();

    // Aplicar estado inicial
    updateSidebarState();
    setupTooltips();

    // Estado visual do botão de tema
    if (isDarkMode) {
        themeToggleBtn.classList.add('active');
    } else {
        themeToggleBtn.classList.remove('active');
    }
    // Alternância de tema ao clicar no botão
    themeToggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        isDarkMode = !isDarkMode;
        updateTheme();
        saveThemeState();
        // Animação do slider: adicionar/remover classe 'active' no .theme-toggle-slider
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

    // Botão de dupla função (recolher/expandir)
    toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleSidebar();
    });

    // Botão de toggle no header (para mobile)
    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    });

    // Fechar menu ao clicar fora (mobile)
    document.addEventListener('click', function (event) {
        if (window.innerWidth <= 1024) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnMenuToggle = menuToggle.contains(event.target);

            if (!isClickInsideSidebar && !isClickOnMenuToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Função para alternar o menu
    function toggleSidebar() {
        isCollapsed = !isCollapsed;
        updateSidebarState();
        saveSidebarState();
    }

    // Atualizar estado do menu lateral
    function updateSidebarState() {
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.style.marginLeft = '70px';
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.style.marginLeft = '280px';
        }

        // Ajustar para mobile
        if (window.innerWidth <= 1024) {
            mainContent.style.marginLeft = '0';
            if (!isCollapsed) {
                sidebar.classList.add('active');
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
            const icon = item.querySelector('.menu-icon').textContent;
            if (tooltips[icon]) {
                item.setAttribute('data-tooltip', tooltips[icon]);
            }
        });
    }

    // Salvar estado no localStorage
    function saveSidebarState() {
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }

    // Navegação do menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Fechar menu no mobile após clique
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }

            const menuText = this.querySelector('.menu-text').textContent;
            console.log('Menu clicado:', menuText);
        });
    });

    // Navegação do calendário
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

    // Ajustar layout na redimensionamento da janela
    window.addEventListener('resize', function () {
        updateSidebarState();
    });

    // Atalho de teclado (opcional): Ctrl + M para alternar menu
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            toggleSidebar();
        }
    });
});