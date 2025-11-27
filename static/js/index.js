// Menu Lateral Interativo com Botão de Dupla Função
document.addEventListener('DOMContentLoaded', function () {
    console.log('JS index.js carregado');
    
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleBtn');
    const menuToggle = document.getElementById('menuToggle');
    const mainContent = document.getElementById('mainContent');
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    // Estado do menu (salvo no localStorage)
    let isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';

    // Estado do tema (dark/light)
    let isDarkMode = localStorage.getItem('darkMode') === 'true';
    updateTheme();

    // Aplicar estado inicial (apenas desktop)
    if (window.innerWidth > 768) {
        updateSidebarState();
    }
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

    // ==================== FUNCIONALIDADE MOBILE ====================
    
    let mobileMenuOpen = false;
    let mobileButton = null;
    let mobileOverlay = null;

    // Criar elementos mobile
    function createMobileElements() {
        // Criar botão hamburger
        if (!mobileButton) {
            mobileButton = document.createElement('button');
            mobileButton.className = 'mobile-menu-btn';
            mobileButton.innerHTML = `
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            `;
            mobileButton.setAttribute('aria-label', 'Menu');
            document.body.appendChild(mobileButton);
            
            mobileButton.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu();
            });
        }
        
        // Criar overlay
        if (!mobileOverlay) {
            mobileOverlay = document.createElement('div');
            mobileOverlay.className = 'mobile-overlay';
            document.body.appendChild(mobileOverlay);
            
            mobileOverlay.addEventListener('click', function() {
                closeMobileMenu();
            });
        }
    }

    // Remover elementos mobile
    function removeMobileElements() {
        if (mobileButton) {
            mobileButton.remove();
            mobileButton = null;
        }
        if (mobileOverlay) {
            mobileOverlay.remove();
            mobileOverlay = null;
        }
        closeMobileMenu();
    }

    // Abrir/fechar menu mobile
    function toggleMobileMenu() {
        if (mobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function openMobileMenu() {
        mobileMenuOpen = true;
        sidebar.classList.add('mobile-open');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        if (mobileButton) mobileButton.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Menu mobile aberto');
    }

    function closeMobileMenu() {
        mobileMenuOpen = false;
        sidebar.classList.remove('mobile-open');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (mobileButton) mobileButton.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Menu mobile fechado');
    }

    // Detectar mudança de tamanho
    function handleResize() {
        if (window.innerWidth <= 768) {
            // Modo mobile
            createMobileElements();
            mainContent.style.marginLeft = '0';
            sidebar.classList.remove('collapsed');
            if (toggleBtn) toggleBtn.style.display = 'none';
        } else {
            // Modo desktop
            removeMobileElements();
            if (toggleBtn) toggleBtn.style.display = '';
            updateSidebarState();
        }
    }

    // Inicializar
    handleResize();

    // Listener de resize
    window.addEventListener('resize', handleResize);

    // Suporte a swipe para fechar menu mobile
    let touchStartX = 0;
    let touchEndX = 0;

    sidebar.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sidebar.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        if (window.innerWidth <= 768 && mobileMenuOpen) {
            // Swipe da direita para esquerda (fechar menu)
            if (touchStartX - touchEndX > 50) {
                closeMobileMenu();
            }
        }
    }

    // ==================== FIM FUNCIONALIDADE MOBILE ====================

    // Navegação do menu
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
            
            // Fechar menu no mobile após clique
            if (window.innerWidth <= 768) {
                closeMobileMenu();
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

    // Atalho de teclado (opcional): Ctrl + M para alternar menu
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            if (window.innerWidth > 768) {
                toggleSidebar();
            } else {
                toggleMobileMenu();
            }
        }
    });

    // Valores fixos exibidos diretamente no HTML dos cards (ver index.html)
});