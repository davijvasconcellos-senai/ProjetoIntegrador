// Função para mostrar/ocultar senha
function togglePassword() {
    const senhaInput = document.getElementById('senha');
    const eyeIcon = document.getElementById('eye-icon-password');
    
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        eyeIcon.style.opacity = '0.5';
        eyeIcon.textContent = '🔒';
    } else {
        senhaInput.type = 'password';
        eyeIcon.style.opacity = '1';
        eyeIcon.textContent = '👁️';
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

function showTransition(duration = 600) {
    const el = ensurePageTransitionElement();
    el.classList.add('visible');
    // remove depois do tempo para evitar overlay persistente em caso de erro de navegação
    setTimeout(() => el.classList.remove('visible'), duration + 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const criarContaLink = document.querySelector('.criar-conta a');

    // Intercepta clique no link "criar conta" para mostrar animação antes de navegar
    if (criarContaLink) {
        criarContaLink.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.href;
            showTransition(600);
            setTimeout(() => { window.location.href = href; }, 600);
        });
    }

    // Validação simples e submissão com animação
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            // Validações básicas do lado cliente
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            if (!email || !senha) {
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

            // Mostrar a transição e deixar o formulário submeter normalmente
            showTransition(800);
            // pequena espera para que a animação apareça antes do POST
            // não impedir o submit — permitir que o envio ocorra
            // usamos setTimeout apenas se quisermos atrasar o envio; aqui deixamos seguir imediato
        });
    }
});