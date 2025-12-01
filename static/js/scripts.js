// Validação do formulário de cadastro
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastroForm');
    if (!form) return;

    // Campos
    const nome = document.getElementById('nome');
    const matricula = document.getElementById('matricula');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmarSenha');
    const tipoUsuario = form.querySelectorAll('input[name="tipoUsuario"]');

    // Erros
    const erroNome = document.getElementById('erro-nome');
    const erroMatricula = document.getElementById('erro-matricula');
    const erroEmail = document.getElementById('erro-email');
    const erroSenha = document.getElementById('erro-senha');
    const erroConfirmarSenha = document.getElementById('erro-confirmar-senha');

    function validarNome() {
        const val = nome.value.trim();
        if (!val) {
            erroNome.textContent = 'Preencha o nome completo.';
            return false;
        }
        if (val.length > 100) {
            erroNome.textContent = 'O nome deve ter no máximo 100 caracteres.';
            return false;
        }
        erroNome.textContent = '';
        return true;
    }

    function validarMatricula() {
        let val = matricula.value.trim().toUpperCase();
        matricula.value = val; // força caixa alta
        const regex = /^[A-HJ-NP-Z]-\d{3}$/;
        if (!val) {
            erroMatricula.textContent = 'Preencha a matrícula.';
            return false;
        }
        if (val.length !== 5) {
            erroMatricula.textContent = 'A matrícula deve ter exatamente 5 caracteres (ex: A-123).';
            return false;
        }
        if (!regex.test(val)) {
            erroMatricula.textContent = 'Formato inválido. Ex: A-123 (sem I ou O).';
            return false;
        }
        erroMatricula.textContent = '';
        return true;
    }

    function validarEmail() {
        const val = email.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) {
            erroEmail.textContent = 'Preencha o email.';
            return false;
        }
        if (val.length > 100) {
            erroEmail.textContent = 'O email deve ter no máximo 100 caracteres.';
            return false;
        }
        if (!regex.test(val)) {
            erroEmail.textContent = 'Email inválido.';
            return false;
        }
        erroEmail.textContent = '';
        return true;
    }

    function validarSenha() {
        const val = senha.value;
        let msg = '';
        if (val.length < 6) {
            msg = 'A senha deve ter no mínimo 6 caracteres.';
        } else if (!/[0-9]/.test(val)) {
            msg = 'A senha deve conter ao menos 1 número.';
        } else if (!/[A-Z]/.test(val)) {
            msg = 'A senha deve conter ao menos 1 letra maiúscula.';
        }
        erroSenha.textContent = msg;
        return msg === '';
    }

    function validarConfirmarSenha() {
        if (confirmarSenha.value !== senha.value) {
            erroConfirmarSenha.textContent = 'As senhas não coincidem.';
            return false;
        }
        erroConfirmarSenha.textContent = '';
        return true;
    }

    function validarTipoUsuario() {
        for (let i = 0; i < tipoUsuario.length; i++) {
            if (tipoUsuario[i].checked) {
                if (tipoUsuario[i].value.length > 15) {
                    alert('Tipo de usuário inválido.');
                    return false;
                }
                return true;
            }
        }
        // Pode-se exibir erro visual, mas não há div de erro para tipoUsuario
        return false;
    }

    // Eventos de validação ao sair do campo
    nome.addEventListener('blur', validarNome);
    matricula.addEventListener('blur', validarMatricula);
    email.addEventListener('blur', validarEmail);
    senha.addEventListener('blur', validarSenha);
    confirmarSenha.addEventListener('blur', validarConfirmarSenha);

    // Validação ao enviar
    form.addEventListener('submit', function (e) {
        let valido = true;
        if (!validarNome()) valido = false;
        if (!validarMatricula()) valido = false;
        if (!validarEmail()) valido = false;
        if (!validarSenha()) valido = false;
        if (!validarConfirmarSenha()) valido = false;
        if (!validarTipoUsuario()) {
            alert('Selecione o tipo de usuário.');
            valido = false;
        }
        if (!valido) {
            e.preventDefault();
        }
    });
});
