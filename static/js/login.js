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

// Manipulação do formulário de login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            
            // Validações básicas
            if (!email || !senha) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Aqui você adicionaria a lógica de login com seu backend
            const dadosLogin = {
                email: email,
                senha: senha
            };
            
            console.log('Login:', dadosLogin);
            
            // Exemplo de redirecionamento após login bem-sucedido
            alert('Login realizado com sucesso!');
            // window.location.href = 'dashboard.html';
        });
    }
});