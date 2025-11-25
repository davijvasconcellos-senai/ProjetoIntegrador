// Cleaned cadastro.js: unified handlers and config-aware transitions
function togglePassword() {
    const senhaInput = document.getElementById('senha');
    const eyeIcon = document.getElementById('eye-icon-password');
    if (!senhaInput) return;
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        if (eyeIcon) { eyeIcon.style.opacity = '0.5'; eyeIcon.textContent = '🔒'; }
    } else {
        senhaInput.type = 'password';
        if (eyeIcon) { eyeIcon.style.opacity = '1'; eyeIcon.textContent = '👁️'; }
    }
}

function toggleConfirmPassword() {
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
    const eyeIcon = document.getElementById('eye-icon-confirm');
    if (!confirmarSenhaInput) return;
    if (confirmarSenhaInput.type === 'password') {
        confirmarSenhaInput.type = 'text';
        if (eyeIcon) { eyeIcon.style.opacity = '0.5'; eyeIcon.textContent = '🔒'; }
    } else {
        confirmarSenhaInput.type = 'password';
        if (eyeIcon) { eyeIcon.style.opacity = '1'; eyeIcon.textContent = '👁️'; }
    }
}

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

function showTransition(duration) {
    const cfg = window.PAGE_TRANSITION_CONFIG || { duration: 600 };
    const d = typeof duration === 'number' ? duration : cfg.duration;
    const el = ensurePageTransitionElement();
    const type = (window.PAGE_TRANSITION_CONFIG && window.PAGE_TRANSITION_CONFIG.type) || document.documentElement.getAttribute('data-transition-type') || 'panel';
    el.classList.toggle('fade', type === 'fade');
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), d + 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
    const entrarLink = document.querySelector('.login-link a');

    if (entrarLink) {
        entrarLink.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.href;
            const cfg = window.PAGE_TRANSITION_CONFIG || { duration: 600, type: 'panel' };
            if (cfg.type === 'slide') {
                sessionStorage.setItem('pp_transition', 'cadastro->login');
                const container = document.querySelector('.container');
                if (container) container.classList.add('slide-out-right');
                setTimeout(() => { window.location.href = href; }, cfg.duration);
            } else {
                showTransition(cfg.duration);
                setTimeout(() => { window.location.href = href; }, cfg.duration);
            }
        });
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha') ? document.getElementById('confirmarSenha').value : '';
            const tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked');

            if (!nome || !email || !senha || !confirmarSenha) {
    // Play slide-in if coming from other page
    const trans = sessionStorage.getItem('pp_transition');
    if (trans === 'login->cadastro') {
        const container = document.querySelector('.container');
        if (container) {
            container.classList.add('slide-in-right');
            sessionStorage.removeItem('pp_transition');
            setTimeout(() => container.classList.remove('slide-in-right'), (window.PAGE_TRANSITION_CONFIG && window.PAGE_TRANSITION_CONFIG.duration) || 600);
        }
    }
                alert('Por favor, preencha todos os campos.');
                e.preventDefault();
                return;
            }

            if (!tipoUsuario) {
                alert('Por favor, selecione um tipo de usuário.');
                e.preventDefault();
                return;
            }

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem.');
                e.preventDefault();
                return;
            }

            if (senha.length < 6) {
                alert('A senha deve ter no mínimo 6 caracteres.');
                e.preventDefault();
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                e.preventDefault();
                return;
            }

            const cfg = window.PAGE_TRANSITION_CONFIG || { duration: 800, type: 'panel' };
            if (cfg.type === 'slide') {
                const container = document.querySelector('.container');
                if (container) container.classList.add('slide-out-right');
            } else {
                showTransition(cfg.duration);
            }
            // submit proceeds
        });
    }
});
