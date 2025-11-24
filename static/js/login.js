// Função para mostrar/ocultar senha
function togglePassword() {
    const senhaInput = document.getElementById('senha');
    const eyeIcon = document.getElementById('eye-icon');
    
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        eyeIcon.style.opacity = '0.5';
    } else {
        senhaInput.type = 'password';
        eyeIcon.style.opacity = '1';
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
            
            // Validação básica
            if (!email || !senha) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Aqui você adicionaria a lógica de autenticação com seu backend
            console.log('Login:', { email, senha });
            
            // Exemplo de redirecionamento após login bem-sucedido
            // window.location.href = 'index.html';
            
            alert('Login realizado com sucesso!');
        });
    }
});