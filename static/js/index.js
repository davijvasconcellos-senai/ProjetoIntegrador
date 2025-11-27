// Menu Lateral Interativo com Botão de Dupla Função
document.addEventListener('DOMContentLoaded', function () {
    console.log('JS index.js carregado');
    console.log('JS carregado!');
    // Alerta para garantir carregamento do JS (remova depois de testar)
    // alert('JS carregado!');
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

    // Código de toggle mobile foi movido para handleMobileLayout()

    // Função para alternar o menu
    function toggleSidebar() {
        isCollapsed = !isCollapsed;
        updateSidebarState();
        saveSidebarState();
    }

    // Atualizar estado do menu lateral
    function updateSidebarState() {
        // Só aplicar no desktop
        if (window.innerWidth > 768) {
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.style.marginLeft = '70px';
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.style.marginLeft = '280px';
            }
        } else {
            // No mobile, sempre margin 0
            mainContent.style.marginLeft = '0';
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

    // ==================== FUNCIONALIDADE MOBILE ====================
    
    // Detectar se é mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Abrir sidebar mobile
    function openMobileSidebar() {
        console.log('openMobileSidebar chamado');
        if (isMobile()) {
            sidebar.classList.add('mobile-open');
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                overlay.classList.add('active');
            }
            document.body.style.overflow = 'hidden';
            console.log('Sidebar aberta');
        }
    }

    // Fechar sidebar mobile
    function closeMobileSidebar() {
        console.log('closeMobileSidebar chamado');
        if (isMobile()) {
            sidebar.classList.remove('mobile-open');
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            console.log('Sidebar fechada');
        }
    }

    // Layout mobile
    function handleMobileLayout() {
        console.log('handleMobileLayout chamado, isMobile:', isMobile());
        if (isMobile()) {
            // Criar overlay se não existir
            let overlay = document.querySelector('.sidebar-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
                console.log('Overlay criado');
            }
            
            // Adicionar listener ao overlay (sempre)
            overlay.onclick = closeMobileSidebar;

            // Criar botão toggle mobile se não existir
            let mobileToggle = document.querySelector('.toggle-btn-mobile');
            if (!mobileToggle) {
                mobileToggle = document.createElement('button');
                mobileToggle.className = 'toggle-btn toggle-btn-mobile';
                mobileToggle.innerHTML = '☰';
                mobileToggle.setAttribute('aria-label', 'Abrir menu');
                document.body.appendChild(mobileToggle);
                console.log('Botão mobile criado');
            }
            
            // Adicionar listener ao botão mobile (sempre)
            mobileToggle.onclick = function(e) {
                console.log('Botão mobile clicado');
                e.stopPropagation();
                openMobileSidebar();
            };
            
            console.log('Listener adicionado ao botão mobile');
            
            // Esconder botão desktop toggle no mobile
            if (toggleBtn) {
                toggleBtn.style.display = 'none';
            }
        } else {
            // Remover elementos mobile no desktop
            const mobileToggle = document.querySelector('.toggle-btn-mobile');
            if (mobileToggle) {
                mobileToggle.remove();
            }
            
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                overlay.remove();
            }
            
            // Restaurar botão desktop toggle
            if (toggleBtn) {
                toggleBtn.style.display = '';
            }
            
            // Limpar classes mobile
            sidebar.classList.remove('mobile-open');
            document.body.style.overflow = '';
        }
    }

    // Inicializar layout mobile
    handleMobileLayout();

    // ==================== FIM FUNCIONALIDADE MOBILE ====================

    // Navegação do menu - CONSOLIDADO
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remover active de todos
            menuItems.forEach(i => i.classList.remove('active'));
            // Adicionar active no clicado
            this.classList.add('active');

            const menuText = this.querySelector('.menu-text').textContent;
            console.log('Menu clicado:', menuText);
            
            // Fechar menu no mobile após clique
            if (window.innerWidth <= 768) {
                closeMobileSidebar();
            }
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
        handleMobileLayout();
    });

    // Atalho de teclado (opcional): Ctrl + M para alternar menu
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            toggleSidebar();
        }
    });

    // Fechar sidebar mobile ao mudar orientação
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            handleMobileLayout();
            if (isMobile()) {
                closeMobileSidebar();
            }
        }, 100);
    });

    // Valores fixos exibidos diretamente no HTML dos cards (ver index.html)
});