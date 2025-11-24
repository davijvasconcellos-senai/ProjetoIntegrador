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