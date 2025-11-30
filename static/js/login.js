/**
 * Arquivo: login.js
 * Objetivo: Gerenciar interações da página de login (mostrar/ocultar senha,
 *           transições visuais entre páginas e validação simples antes de envio).
 * Visão Geral:
 *  - togglePassword(): alterna exibição da senha para melhorar usabilidade.
 *  - ensurePageTransitionElement()/showTransition(): criam e exibem overlay animado conforme configuração global.
 *  - Lógica de transição entre login e cadastro: usa sessionStorage para animar entrada/saída consistente.
 *  - Validação cliente: verifica preenchimento e formato básico de email antes de permitir envio.
 * Acessibilidade:
 *  - Ícone da senha utiliza aria-pressed para indicar estado.
 *  - Evita animações excessivas em dispositivos com prefers-reduced-motion (tratado em outros módulos de transição).
 */
// Função para mostrar/ocultar senha (alternar tipo de input e estado visual do ícone)
function togglePassword() {
    const senhaInput = document.getElementById('senha');
    const eyeIcon = document.getElementById('eye-icon-password');

    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        eyeIcon.style.opacity = '0.5';
        eyeIcon.textContent = '🔒';
        eyeIcon.setAttribute('aria-pressed', 'true');
    } else {
        senhaInput.type = 'password';
        eyeIcon.style.opacity = '1';
        eyeIcon.textContent = '👁️';
        eyeIcon.setAttribute('aria-pressed', 'false');
    }
}

// Cria o overlay de transição de página dinamicamente
function ensurePageTransitionElement() {
    let el = document.getElementById('page-transition');
    if (!el) {
        el = document.createElement('div');
        el.id = 'page-transition';
        el.className = 'page-transition';
        el.innerHTML = `
            <div class="panel">
                <div class="loader"></div>
                <p>Carregando...</p>
            </div>
        `;
        document.body.appendChild(el);
    }
    return el;
}

// Exibe animação de transição usando configuração global PAGE_TRANSITION_CONFIG ou fallback.
function showTransition(duration) {
    const cfg = window.PAGE_TRANSITION_CONFIG || { duration: 600 };
    const d = typeof duration === 'number' ? duration : cfg.duration;
    const el = ensurePageTransitionElement();
    // adapt to type if provided
    const type = (window.PAGE_TRANSITION_CONFIG && window.PAGE_TRANSITION_CONFIG.type) || document.documentElement.getAttribute('data-transition-type') || 'panel';
    el.classList.toggle('fade', type === 'fade');
    el.classList.add('visible');
    // remove depois do tempo para evitar overlay persistente em caso de erro de navegação
    setTimeout(() => el.classList.remove('visible'), d + 3000);
}

// Inicialização principal: registra eventos e prepara transições condicionais.
document.addEventListener('DOMContentLoaded', function () {
    // Conecta botão de alternância de senha (se presente no DOM)
    const eyeBtn = document.getElementById('eye-icon-password');
    if (eyeBtn) {
        eyeBtn.addEventListener('click', function (e) {
            // chama a função global definida acima
            togglePassword();
        });
    }

    const loginForm = document.getElementById('loginForm');
    const criarContaLink = document.querySelector('.criar-conta a');

    // Intercepta clique no link "criar conta" para animar saída antes da navegação
    if (criarContaLink) {
        criarContaLink.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.href;
            const cfg = window.PAGE_TRANSITION_CONFIG || { duration: 600, type: 'panel' };

            if (cfg.type === 'slide') {
                // Marca transição para página alvo animar entrada (persistida em sessionStorage)
                sessionStorage.setItem('pp_transition', 'login->cadastro');
                const container = document.querySelector('.container');
                if (container) {
                    container.classList.add('slide-out-left');
                }
                setTimeout(() => { window.location.href = href; }, cfg.duration);
            } else {
                showTransition(cfg.duration);
                setTimeout(() => { window.location.href = href; }, cfg.duration);
            }
        });
    }

    // Registra submissão do formulário de login com validação e animação
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            // Validação básica cliente: campos obrigatórios
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            if (!email || !senha) {
                // Se veio de cadastro via marcação, anima entrada (slide-in)
                const trans = sessionStorage.getItem('pp_transition');
                if (trans === 'cadastro->login') {
                    const container = document.querySelector('.container');
                    if (container) {
                        container.classList.add('slide-in-left');
                        // remove marker so it doesn't play again
                        sessionStorage.removeItem('pp_transition');
                        setTimeout(() => container.classList.remove('slide-in-left'), (window.PAGE_TRANSITION_CONFIG && window.PAGE_TRANSITION_CONFIG.duration) || 600);
                    }
                }
                alert('Por favor, preencha todos os campos.');
                e.preventDefault();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                e.preventDefault();
                return;
            }

            // Mostra transição e deixa submissão seguir normalmente (sem bloqueio artificial)
            const cfg = window.PAGE_TRANSITION_CONFIG || { duration: 800, type: 'panel' };
            if (cfg.type === 'slide') {
                // on submit, slide the container up/left as feedback
                const container = document.querySelector('.container');
                if (container) container.classList.add('slide-out-left');
            } else {
                showTransition(cfg.duration);
            }
            // Observação: nenhuma espera forçada adicionada; animação ocorre enquanto o POST segue.
        });
    }
});