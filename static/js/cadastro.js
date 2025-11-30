/**
 * Arquivo: cadastro.js
 * Objetivo: Controlar interações da página de cadastro de usuários (exibição/ocultação de senha,
 *           validação em tempo real, transições de página e estado visual de envio).
 * Visão Geral:
 *  - Funções togglePassword / toggleConfirmPassword: alternam tipo de campo para mostrar/ocultar senha.
 *  - Funções de validação: verificam formato de email, tamanho mínimo de senha e confirmação.
 *  - Funções de feedback: exibem/limpam mensagens de erro e estado de carregamento no botão de enviar.
 *  - Transições: adicionam efeito visual entre páginas usando configuração global PAGE_TRANSITION_CONFIG.
 *  - A submissão final do formulário utiliza a própria action HTML após validação.
 * Notas de Acessibilidade:
 *  - Ícones de olho utilizam atributo aria-pressed para indicar estado.
 *  - Mensagens de erro aparecem dinamicamente, podendo ser associadas a regiões com aria-live (se desejado no HTML).
 *  - Transições evitam bloqueio prolongado e respeitam configuração centralizada.
 */
// Comentário original (EN): "Cleaned cadastro.js: unified handlers and config-aware transitions"
// Tradução + explicação: Arquivo limpo/unificado com manipuladores de eventos e transições dependentes de configuração.
// Alterna o campo de senha principal entre texto e password, ajustando ícone e atributos ARIA.
function togglePassword() {
    const senhaInput = document.getElementById('senha');
    const eyeIcon = document.getElementById('eye-icon-password');
    if (!senhaInput) return;
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        if (eyeIcon) {
            eyeIcon.style.opacity = '0.5';
            eyeIcon.textContent = '🔒';
            eyeIcon.setAttribute('aria-pressed', 'true');
        }
    } else {
        senhaInput.type = 'password';
        if (eyeIcon) {
            eyeIcon.style.opacity = '1';
            eyeIcon.textContent = '👁️';
            eyeIcon.setAttribute('aria-pressed', 'false');
        }
    }
}

// Alterna o campo de confirmação de senha entre texto e password, ajustando ícone e atributos ARIA.
function toggleConfirmPassword() {
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
    const eyeIcon = document.getElementById('eye-icon-confirm');
    if (!confirmarSenhaInput) return;
    if (confirmarSenhaInput.type === 'password') {
        confirmarSenhaInput.type = 'text';
        if (eyeIcon) {
            eyeIcon.style.opacity = '0.5';
            eyeIcon.textContent = '🔒';
            eyeIcon.setAttribute('aria-pressed', 'true');
        }
    } else {
        confirmarSenhaInput.type = 'password';
        if (eyeIcon) {
            eyeIcon.style.opacity = '1';
            eyeIcon.textContent = '👁️';
            eyeIcon.setAttribute('aria-pressed', 'false');
        }
    }
}

// Valida formato básico de email usando expressão regular comum.
function validarEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Exibe mensagem de erro para um campo específico adicionando classe CSS e texto.
function mostrarErro(campoId, mensagem) {
    const erroElement = document.getElementById(`erro-${campoId}`);
    if (erroElement) {
        erroElement.textContent = mensagem;
        erroElement.classList.add('mostrar');
    }
}

// Limpa/remover mensagem de erro previamente exibida para o campo informado.
function limparErro(campoId) {
    const erroElement = document.getElementById(`erro-${campoId}`);
    if (erroElement) {
        erroElement.textContent = '';
        erroElement.classList.remove('mostrar');
    }
}

// Validação acionada em tempo real (input/blur) para fornecer feedback imediato ao usuário.
function validarCampoEmTempoReal() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    // Validar nome
    if (nome.length > 0 && nome.length < 2) {
        mostrarErro('nome', 'Nome deve ter pelo menos 2 caracteres');
    } else {
        limparErro('nome');
    }

    // Validar email
    if (email.length > 0 && !validarEmail(email)) {
        mostrarErro('email', 'Por favor, insira um email válido');
    } else {
        limparErro('email');
    }

    // Validar senha
    if (senha.length > 0 && senha.length < 6) {
        mostrarErro('senha', 'A senha deve ter no mínimo 6 caracteres');
    } else {
        limparErro('senha');
    }

    // Validar confirmação de senha
    if (confirmarSenha.length > 0 && senha !== confirmarSenha) {
        mostrarErro('confirmar-senha', 'As senhas não coincidem');
    } else {
        limparErro('confirmar-senha');
    }
}

// Ativa/Desativa estado de loading do botão de submissão para evitar cliques múltiplos.
function mostrarLoading(mostrar = true) {
    const btnSubmit = document.getElementById('btn-submit');
    const btnText = btnSubmit.querySelector('.btn-text');
    const loadingSpinner = btnSubmit.querySelector('.loading-spinner');

    if (mostrar) {
        btnSubmit.disabled = true;
        btnText.style.opacity = '0';
        loadingSpinner.style.display = 'block';
    } else {
        btnSubmit.disabled = false;
        btnText.style.opacity = '1';
        loadingSpinner.style.display = 'none';
    }
}

// Garante que exista elemento overlay para transição; cria se não existir.
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

// Mostra animação de transição baseada na configuração global, com fallback de duração.
function showTransition(duration) {
    const cfg = window.PAGE_TRANSITION_CONFIG || { duration: 600 };
    const d = typeof duration === 'number' ? duration : cfg.duration;
    const el = ensurePageTransitionElement();
    const type = (window.PAGE_TRANSITION_CONFIG && window.PAGE_TRANSITION_CONFIG.type) || document.documentElement.getAttribute('data-transition-type') || 'panel';
    el.classList.toggle('fade', type === 'fade');
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), d + 3000);
}

// Bloco principal de inicialização: registra listeners e prepara animações conforme origem da navegação.
document.addEventListener('DOMContentLoaded', function () {
    const cadastroForm = document.getElementById('cadastroForm');
    const entrarLink = document.querySelector('.login-link a');

    // Play slide-in if coming from other page
    // Recupera indicador de transição armazenado na sessão para animar entrada.
    const trans = sessionStorage.getItem('pp_transition');
    if (trans === 'login->cadastro') {
        const container = document.querySelector('.container');
        if (container) {
            container.classList.add('slide-in-right');
            sessionStorage.removeItem('pp_transition');
            setTimeout(() => container.classList.remove('slide-in-right'), (window.PAGE_TRANSITION_CONFIG && window.PAGE_TRANSITION_CONFIG.duration) || 600);
        }
    }

    // Conecta botões de alternância de senha (melhora acessibilidade e usabilidade).
    const eyeBtn = document.getElementById('eye-icon-password');
    if (eyeBtn) eyeBtn.addEventListener('click', function (e) { togglePassword(); });

    const eyeConfirmBtn = document.getElementById('eye-icon-confirm');
    if (eyeConfirmBtn) eyeConfirmBtn.addEventListener('click', function (e) { toggleConfirmPassword(); });

    // Associa eventos para validação em tempo real em campos principais do formulário.
    const campos = ['nome', 'email', 'senha', 'confirmarSenha'];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.addEventListener('input', validarCampoEmTempoReal);
            campo.addEventListener('blur', validarCampoEmTempoReal);
        }
    });

    if (entrarLink) {
        entrarLink.addEventListener('click', function (e) {
            e.preventDefault(); // Evita navegação imediata para permitir animação.
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
        // Intercepta submissão para validar antes de seguir com envio padrão.
        cadastroForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha') ? document.getElementById('confirmarSenha').value : '';
            const tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked');

            // Limpa todos os erros visuais anteriores antes de nova validação.
            campos.forEach(campoId => limparErro(campoId.replace('confirmarSenha', 'confirmar-senha')));
            limparErro('tipo-usuario');

            let valido = true;

            if (!nome) {
                mostrarErro('nome', 'Por favor, preencha o nome completo');
                valido = false;
            }

            if (!email) {
                mostrarErro('email', 'Por favor, preencha o email');
                valido = false;
            } else if (!validarEmail(email)) {
                mostrarErro('email', 'Por favor, insira um email válido');
                valido = false;
            }

            if (!senha) {
                mostrarErro('senha', 'Por favor, preencha a senha');
                valido = false;
            } else if (senha.length < 6) {
                mostrarErro('senha', 'A senha deve ter no mínimo 6 caracteres');
                valido = false;
            }

            if (!confirmarSenha) {
                mostrarErro('confirmar-senha', 'Por favor, confirme a senha');
                valido = false;
            } else if (senha !== confirmarSenha) {
                mostrarErro('confirmar-senha', 'As senhas não coincidem');
                valido = false;
            }

            if (!tipoUsuario) {
                mostrarErro('tipo-usuario', 'Por favor, selecione um tipo de usuário');
                valido = false;
            }

            if (!valido) {
                // Focar no primeiro campo com erro
                const primeiroErro = document.querySelector('.erro-validacao.mostrar');
                if (primeiroErro) {
                    const campoId = primeiroErro.id.replace('erro-', '');
                    const campo = document.getElementById(campoId === 'confirmar-senha' ? 'confirmarSenha' : campoId);
                    if (campo) campo.focus();
                }
                return;
            }

            // Ativa estado de carregamento para feedback de processamento.
            mostrarLoading(true);

            const dadosCadastro = {
                nome: nome,
                email: email,
                senha: senha,
                tipoUsuario: tipoUsuario.value
            };

            console.log('Cadastro (dados prontos para envio):', dadosCadastro); // Log auxiliar de depuração.

            const cfg = window.PAGE_TRANSITION_CONFIG || { duration: 800, type: 'panel' };
            if (cfg.type === 'slide') {
                const container = document.querySelector('.container');
                if (container) container.classList.add('slide-out-right');
                setTimeout(() => {
                    cadastroForm.submit();
                }, cfg.duration);
            } else {
                showTransition(cfg.duration);
                setTimeout(() => {
                    cadastroForm.submit();
                }, cfg.duration);
            }
        });
    }
});