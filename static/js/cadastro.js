/**
 * Arquivo: cadastro.js
 * Propósito: Controlar as interações da página de cadastro de usuários:
 *            alternância de exibição de senha, validações em tempo real,
 *            feedback visual e transições entre páginas.
 * Visão geral:
 *  - togglePassword / toggleConfirmPassword: mostram/ocultam senha e atualizam ícones/ARIA.
 *  - Validações: email, matrícula (A-HJ-NP-Z-999), força e confirmação de senha.
 *  - Feedback: mensagens de erro e estado de carregamento no botão de envio.
 *  - Transições: efeitos visuais baseados em PAGE_TRANSITION_CONFIG (slide/panel/fade).
 *  - Submissão: após validação, utiliza a action padrão do formulário.
 * Acessibilidade:
 *  - Ícones de olho com aria-pressed para indicar estado.
 *  - Erros dinâmicos; recomenda-se aria-live nas regiões de mensagem.
 *  - Transições curtas e configuráveis para evitar bloqueios.
 */
// Arquivo organizado com manipuladores unificados e transições guiadas por configuração.
// Alterna o campo de senha principal (texto/password) e atualiza ícone/ARIA.
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

// Alterna o campo de confirmação de senha (texto/password) e atualiza ícone/ARIA.
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

// Valida formato básico de email com expressão regular.
function validarEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Exibe mensagem de erro para um campo específico: texto + classe CSS.
function mostrarErro(campoId, mensagem) {
    const erroElement = document.getElementById(`erro-${campoId}`);
    if (erroElement) {
        erroElement.textContent = mensagem;
        erroElement.classList.add('mostrar');
    }
    // Adiciona classe de pulso suave ao input relacionado
    const inputMap = {
        'nome': 'nome',
        'matricula': 'matricula',
        'email': 'email',
        'senha': 'senha',
        'confirmar-senha': 'confirmarSenha',
        'tipo-usuario': null
    };
    const targetId = inputMap[campoId];
    if (targetId) {
        const inputEl = document.getElementById(targetId);
        if (inputEl) inputEl.classList.add('input-error-pulse');
    }
}

// Limpa mensagem de erro previamente exibida para o campo informado.
function limparErro(campoId) {
    const erroElement = document.getElementById(`erro-${campoId}`);
    if (erroElement) {
        erroElement.textContent = '';
        erroElement.classList.remove('mostrar');
    }
    const inputMap = {
        'nome': 'nome',
        'matricula': 'matricula',
        'email': 'email',
        'senha': 'senha',
        'confirmar-senha': 'confirmarSenha',
        'tipo-usuario': null
    };
    const targetId = inputMap[campoId];
    if (targetId) {
        const inputEl = document.getElementById(targetId);
        if (inputEl) inputEl.classList.remove('input-error-pulse');
    }
}

// Validação em tempo real (input/blur) para feedback imediato ao usuário.
function validarCampoEmTempoReal() {
    const nome = document.getElementById('nome').value;
    const matricula = document.getElementById('matricula') ? document.getElementById('matricula').value : '';
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

    // Validar matrícula (formato X-XXX, letra maiúscula sem I ou O)
    if (matricula.length > 0) {
        const matRegex = /^[A-HJ-NP-Z]-\d{3}$/;
        if (!matRegex.test(matricula)) {
            mostrarErro('matricula', 'Formato: letra maiúscula (sem I ou O) + hífen + 3 números (ex: A-123)');
        } else {
            limparErro('matricula');
        }
    } else {
        limparErro('matricula');
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

    updatePasswordStrength(senha);
}

// Ativa/Desativa estado de carregamento no botão para evitar cliques múltiplos.
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

// Garante que exista o overlay de transição; cria se necessário.
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

// Mostra animação de transição baseada na configuração global, com duração padrão.
function showTransition(duration) {
    const cfg = window.PAGE_TRANSITION_CONFIG || { duration: 600 };
    const d = typeof duration === 'number' ? duration : cfg.duration;
    const el = ensurePageTransitionElement();
    const type = (window.PAGE_TRANSITION_CONFIG && window.PAGE_TRANSITION_CONFIG.type) || document.documentElement.getAttribute('data-transition-type') || 'panel';
    el.classList.toggle('fade', type === 'fade');
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), d + 3000);
}

// Inicialização: registra listeners e prepara animações conforme a origem da navegação.
document.addEventListener('DOMContentLoaded', function () {
    const cadastroForm = document.getElementById('cadastroForm');
    const entrarLink = document.querySelector('.login-link a');
    const matriculaInput = document.getElementById('matricula');
    if (matriculaInput) {
        matriculaInput.addEventListener('input', () => {
            let raw = matriculaInput.value.toUpperCase();
            // Remove tudo que não seja letra ou dígito
            raw = raw.replace(/[^A-Z0-9]/g, '');
            // Exclui I e O do primeiro caractere
            if (raw.length > 0 && !/[A-HJ-NP-Z]/.test(raw[0])) {
                raw = raw.slice(1); // descarta letra inválida
            }
            let first = raw.charAt(0) || '';
            let digits = raw.slice(1).replace(/[^0-9]/g, '').slice(0, 3);
            let masked = first ? first + '-' + digits : '';
            matriculaInput.value = masked;
        });
        // Bloqueia teclas inválidas diretamente
        matriculaInput.addEventListener('keydown', (e) => {
            const allowedControl = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
            if (allowedControl.includes(e.key)) return;
            const v = matriculaInput.value;
            // Posição 0: apenas letras A-HJ-NP-Z
            if (v.length === 0) {
                if (!/^[A-HJ-NP-Z]$/.test(e.key.toUpperCase())) e.preventDefault();
            } else if (v.length === 1) {
                // Hífen é inserido pela máscara automaticamente; bloquear entrada manual.
                // Permitir números para a próxima fase; não precisa digitar '-'.
            } else {
                // Após o hífen: aceitar apenas dígitos até 3.
                const digitCount = v.replace(/^[A-HJ-NP-Z]-?/, '').length;
                if (!/^[0-9]$/.test(e.key) || digitCount >= 3) e.preventDefault();
            }
        });
    }

    // Recupera indicador de transição da sessão para animar entrada (slide-in).
    const trans = sessionStorage.getItem('pp_transition');
    if (trans === 'login->cadastro') {
        const container = document.querySelector('.container');
        if (container) {
            container.classList.add('slide-in-right');
            sessionStorage.removeItem('pp_transition');
            setTimeout(() => container.classList.remove('slide-in-right'), (window.PAGE_TRANSITION_CONFIG && window.PAGE_TRANSITION_CONFIG.duration) || 600);
        }
    }

    // Conecta botões de alternância de senha (acessibilidade e usabilidade).
    const eyeBtn = document.getElementById('eye-icon-password');
    if (eyeBtn) eyeBtn.addEventListener('click', function (e) { togglePassword(); });

    const eyeConfirmBtn = document.getElementById('eye-icon-confirm');
    if (eyeConfirmBtn) eyeConfirmBtn.addEventListener('click', function (e) { toggleConfirmPassword(); });

    // Associa eventos de validação em tempo real aos principais campos do formulário.
    const campos = ['nome', 'matricula', 'email', 'senha', 'confirmarSenha'];
    campos.forEach(campoId => {
        const campo = document.getElementById(campoId);
        if (campo) {
            campo.addEventListener('input', validarCampoEmTempoReal);
            campo.addEventListener('blur', validarCampoEmTempoReal);
        }
    });

    if (entrarLink) {
        entrarLink.addEventListener('click', function (e) {
            e.preventDefault(); // Evita navegação imediata para permitir a animação.
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
        // Intercepta submissão para validar antes de enviar pelo método padrão.
        cadastroForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value;
            const matricula = document.getElementById('matricula') ? document.getElementById('matricula').value : '';
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmarSenha') ? document.getElementById('confirmarSenha').value : '';
            const tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked');

            // Limpa todos os erros visuais anteriores antes de validar novamente.
            campos.forEach(campoId => limparErro(campoId.replace('confirmarSenha', 'confirmar-senha')));
            limparErro('tipo-usuario');

            let valido = true;

            if (!nome) {
                mostrarErro('nome', 'Por favor, preencha o nome completo');
                valido = false;
            }

            if (!matricula) {
                mostrarErro('matricula', 'Por favor, preencha a matrícula');
                valido = false;
            } else {
                const matRegex = /^[A-HJ-NP-Z]-\d{3}$/;
                if (!matRegex.test(matricula)) {
                    mostrarErro('matricula', 'Formato: letra maiúscula (sem I ou O) + hífen + 3 números (ex: A-123)');
                    valido = false;
                } else {
                    limparErro('matricula');
                }
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
                // Foca no primeiro campo com erro.
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
                matricula: matricula,
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

// Atualiza checklist de força da senha
function updatePasswordStrength(senha) {
    const elTamanho = document.getElementById('req-tamanho');
    const elNumero = document.getElementById('req-numero');
    const elMaiuscula = document.getElementById('req-maiuscula');
    if (!elTamanho) return;
    const hasLength = senha.length >= 6;
    const hasNumber = /\d/.test(senha);
    const hasUpper = /[A-Z]/.test(senha);
    toggleReq(elTamanho, hasLength);
    toggleReq(elNumero, hasNumber);
    toggleReq(elMaiuscula, hasUpper);
}

function toggleReq(li, ok) {
    if (!li) return;
    if (ok) {
        li.classList.add('ok');
        const indicador = li.querySelector('.indicador');
        if (indicador) indicador.textContent = '✓';
    } else {
        li.classList.remove('ok');
        const indicador = li.querySelector('.indicador');
        if (indicador) indicador.textContent = '•';
    }
}