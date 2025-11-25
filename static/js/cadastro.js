// Função para mostrar/ocultar senha (reaproveitada)
function togglePassword() {
    const senhaInput = document.getElementById('senha');
    const eyeIcon = document.getElementById('eye-icon-password');
    
    if (senhaInput && senhaInput.type === 'password') {
        senhaInput.type = 'text';
        if (eyeIcon) { eyeIcon.style.opacity = '0.5'; eyeIcon.textContent = '🔒'; }
    } else if (senhaInput) {
        senhaInput.type = 'password';
        if (eyeIcon) { eyeIcon.style.opacity = '1'; eyeIcon.textContent = '👁️'; }
    }
}

// Cria o overlay de transição se necessário
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
    setTimeout(() => el.classList.remove('visible'), duration + 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
    const entrarLink = document.querySelector('.login-link a');

    if (entrarLink) {
        entrarLink.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.href;
            showTransition(600);
            setTimeout(() => { window.location.href = href; }, 600);
        });
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            // Basic client-side checks
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmar = document.getElementById('confirmarSenha') ? document.getElementById('confirmarSenha').value : '';

            if (!nome || !email || !senha) {
                alert('Por favor, preencha todos os campos.');
                e.preventDefault();
                return;
            }

            if (senha !== confirmar) {
                alert('As senhas não coincidem.');
                e.preventDefault();
                return;
            }

            showTransition(800);
            // allow submit to proceed
        });
    }
});
// Função para mostrar/ocultar senha
function togglePassword() {
    const senhaInput = document.getElementById('senha');
    const eyeIcon = document.getElementById('eye-icon-password');
    
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        eyeIcon.style.opacity = '0.5';
        eyeIcon.textContent = '🔒'; // Ícone alterado para indicar senha visível
    } else {
        senhaInput.type = 'password';
        eyeIcon.style.opacity = '1';
        eyeIcon.textContent = '👁️'; // Ícone alterado para indicar senha oculta
    }
}

// Função para mostrar/ocultar senha de confirmação
function toggleConfirmPassword() {
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
    const eyeIcon = document.getElementById('eye-icon-confirm');
    
    if (confirmarSenhaInput.type === 'password') {
        confirmarSenhaInput.type = 'text';
        eyeIcon.style.opacity = '0.5';
        eyeIcon.textContent = '🔒'; // Ícone alterado para indicar senha visível
    } else {
        confirmarSenhaInput.type = 'password';
        eyeIcon.style.opacity = '1';
        eyeIcon.textContent = '👁️'; // Ícone alterado para indicar senha oculta
    }
}

// Manipulação do formulário de cadastro
document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastroForm');
    
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha').value;
            const tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked');
            
            // Validações
            if (!nome || !email || !senha || !confirmarSenha) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            if (!tipoUsuario) {
                alert('Por favor, selecione um tipo de usuário.');
                return;
            }
            
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem.');
                return;
            }
            
            if (senha.length < 6) {
                alert('A senha deve ter no mínimo 6 caracteres.');
                return;
            }
            
            // Validação de email simples
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Aqui você adicionaria a lógica de cadastro com seu backend
            const dadosCadastro = {
                nome: nome,
                email: email,
                senha: senha,
                tipoUsuario: tipoUsuario.value
            };
            
            console.log('Cadastro:', dadosCadastro);
            
            // Exemplo de redirecionamento após cadastro bem-sucedido
            alert('Cadastro realizado com sucesso!');
            // window.location.href = 'login.html';
        });
    }
});