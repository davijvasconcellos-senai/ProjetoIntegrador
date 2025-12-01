from flask import Flask, render_template, request, redirect, url_for, session, flash
import os
import sys
import webbrowser
import threading
import time

print('=== INICIANDO APP.PY (MODO SIMPLIFICADO) ===')

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_super_segura_aqui'  # Trocar em produção

# ==================== TERMINAL STYLING ====================

class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    RESET = '\033[0m'
    BOLD = '\033[1m'
    
def print_startup_banner(success=True, host='0.0.0.0', port=5000):
    """Exibe um banner estilizado de startup da aplicação"""
    print("\n")
    print(f"{Colors.CYAN}{'='*70}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.CYAN}  PREDICTIVE PULSE - SISTEMA DE MONITORAMENTO INTELIGENTE{Colors.RESET}")
    print(f"{Colors.CYAN}{'='*70}{Colors.RESET}")
    
    if success:
        print(f"{Colors.GREEN}{Colors.BOLD}✓ SERVIDOR INICIADO COM SUCESSO!{Colors.RESET}")
        print(f"{Colors.WHITE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{Colors.RESET}")
        print(f"{Colors.WHITE}  Status: {Colors.GREEN}● Conectado{Colors.RESET}")
        print(f"{Colors.WHITE}  Host:   {Colors.BLUE}{host}{Colors.RESET}")
        print(f"{Colors.WHITE}  Porta:  {Colors.BLUE}{port}{Colors.RESET}")
        print(f"{Colors.WHITE}  URL:    {Colors.BLUE}http://localhost:{port}{Colors.RESET}")
        print(f"{Colors.WHITE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{Colors.RESET}")
        print(f"{Colors.YELLOW}⚠️  Modo DEBUG: ATIVO | Nunca use isso em produção!{Colors.RESET}")
        print(f"{Colors.CYAN}{'='*70}{Colors.RESET}\n")
    else:
        print(f"{Colors.RED}{Colors.BOLD}✗ ERRO AO INICIAR O SERVIDOR!{Colors.RESET}")
        print(f"{Colors.WHITE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{Colors.RESET}")
        print(f"{Colors.WHITE}  Status: {Colors.RED}● Desconectado{Colors.RESET}")
        print(f"{Colors.WHITE}  Motivo: {Colors.RED}Falha ao conectar ao servidor{Colors.RESET}")
        print(f"{Colors.WHITE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{Colors.RESET}")
        print(f"{Colors.RED}❌ Verifique se a porta {port} está disponível.{Colors.RESET}")
        print(f"{Colors.CYAN}{'='*70}{Colors.RESET}\n")

def open_browser(url):
    """Abre o navegador padrão após pequeno delay."""
    time.sleep(1.5)
    try:
        webbrowser.open(url)
        print(f"{Colors.GREEN}✓ Navegador aberto automaticamente em {url}{Colors.RESET}\n")
    except Exception as e:
        print(f"{Colors.YELLOW}⚠️ Não foi possível abrir o navegador automaticamente: {e}{Colors.RESET}")

# ==================== ROTAS DE NAVEGAÇÃO ====================

@app.route('/')
def home():
    """Redireciona para login ou dashboard."""
    if session.get('user_id'):
        return redirect(url_for('dashboard'))
    # Exibe página inicial limpa (welcome_clean)
    return render_template('welcome_clean.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Página de login com autenticação real no banco MySQL."""
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        senha = request.form.get('senha', '').strip()
        if not email or not senha:
            flash('Preencha todos os campos.', 'error')
            return render_template('login.html')
        import mysql.connector
        try:
            conn = mysql.connector.connect(
                host='localhost',
                user='root',
                password='alunolab',
                database='predictivepulse',
                port=3306
            )
            cursor = conn.cursor(dictionary=True)
            cursor.execute('SELECT * FROM usuarios WHERE email=%s AND senha=%s', (email, senha))
            user = cursor.fetchone()
            cursor.close()
            conn.close()
            if user:
                session['user_id'] = user['id_usuario']
                session['user_nome'] = user['nome']
                session['user_tipo'] = user['tipo']
                flash('Login efetuado com sucesso!', 'success')
                return redirect(url_for('dashboard'))
            else:
                flash('Email ou senha inválidos.', 'error')
                return render_template('login.html')
        except Exception as e:
            flash(f'Erro ao conectar ao banco: {e}', 'error')
            return render_template('login.html')
    return render_template('login.html')

@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    """Cadastro de novos usuários. Apenas administradores podem cadastrar outro administrador."""
    if request.method == 'POST':
        nome = request.form.get('nome', '').strip()
        matricula = request.form.get('matricula', '').strip().upper()
        email = request.form.get('email', '').strip()
        senha = request.form.get('senha', '').strip()
        confirmar_senha = request.form.get('confirmarSenha', '').strip()
        tipo = request.form.get('tipoUsuario', '').strip().lower()

        # Validações básicas (frontend já faz, mas reforçar no backend)
        if not nome or len(nome) > 100:
            flash('Nome inválido.', 'error')
            return redirect(url_for('cadastro'))
        if not matricula or len(matricula) != 5:
            flash('Matrícula inválida.', 'error')
            return redirect(url_for('cadastro'))
        if not email or len(email) > 100 or '@' not in email:
            flash('Email inválido.', 'error')
            return redirect(url_for('cadastro'))
        if not senha or len(senha) < 6 or senha != confirmar_senha:
            flash('Senha inválida ou não confere.', 'error')
            return redirect(url_for('cadastro'))
        if tipo not in ['tecnico', 'supervisor', 'administrador']:
            flash('Tipo de usuário inválido.', 'error')
            return redirect(url_for('cadastro'))

        # Regra: só um administrador pode cadastrar outro administrador
        if tipo == 'administrador':
            if session.get('user_tipo', '').lower() != 'administrador':
                flash('Apenas um administrador pode cadastrar outro administrador.', 'error')
                return redirect(url_for('cadastro'))

        # Conectar ao banco e inserir usuário
        import mysql.connector
        try:
            conn = mysql.connector.connect(
                host='localhost',
                user='root',
                password='alunolab',
                database='predictivepulse',
                port=3306
            )
            cursor = conn.cursor()
            # Verifica se matrícula ou email já existem
            cursor.execute('SELECT id_usuario FROM usuarios WHERE matricula=%s OR email=%s', (matricula, email))
            if cursor.fetchone():
                flash('Matrícula ou email já cadastrados.', 'error')
                cursor.close()
                conn.close()
                return redirect(url_for('cadastro'))
            # Insere novo usuário
            cursor.execute('INSERT INTO usuarios (nome, matricula, email, senha, tipo) VALUES (%s, %s, %s, %s, %s)',
                           (nome, matricula, email, senha, tipo))
            conn.commit()
            cursor.close()
            conn.close()
            flash('Usuário cadastrado com sucesso!', 'success')
            return redirect(url_for('login'))
        except Exception as e:
            flash(f'Erro ao cadastrar usuário: {e}', 'error')
            return redirect(url_for('cadastro'))
    return render_template('cadastro.html')

@app.route('/dashboard')
def dashboard():
    """Dashboard simplificado sem dados dinâmicos."""
    if not session.get('user_id'):
        flash('Faça login para acessar o dashboard.', 'error')
        return redirect(url_for('login'))
    return render_template('index.html',
                           usuario=session.get('user_nome', 'Usuário'),
                           tipo_usuario=session.get('user_tipo', 'visualizador'),
                           falhas=[],
                           sensores=[])

@app.route('/logout')
def logout():
    """Logout do usuário"""
    session.clear()
    flash('Você saiu da sua conta.', 'info')
    return redirect(url_for('login'))

@app.route('/demo')
def demo():
    """Página de demonstração (sem autenticação, sem dados reais)."""
    return render_template('index.html',
                           usuario='Visitante (Demo)',
                           tipo_usuario='visualizador',
                           falhas=[],
                           sensores=[],
                           demo_mode=True)

@app.route('/mensagens')
def mensagens():
    """Página de caixa de mensagens (acesso liberado)."""
    return render_template('mensagens.html', usuario=session.get('user_nome', 'Usuário'))


@app.route('/notificacoes')
def notificacoes():
    """Página de notificações (acesso liberado)."""
    return render_template('notificacoes.html',
                           usuario=session.get('user_nome', 'Usuário'))

@app.route('/monitoramento')
def monitoramento():
    """Página de monitoramento (acesso liberado)."""
    return render_template('monitoramento.html',
                           usuario=session.get('user_nome', 'Usuário'))

@app.route('/welcome')
def welcome():
    """Página de boas-vindas explícita, só para usuários autenticados."""
    if not session.get('user_id'):
        flash('Faça login para acessar a página inicial.', 'error')
        return redirect(url_for('login'))
    return render_template('welcome_clean.html')


# (APIs removidas na versão simplificada)

# Perfil do usuário logado
@app.route('/perfil')
def perfil():
    if not session.get('user_id'):
        flash('Faça login para acessar o perfil.', 'error')
        return redirect(url_for('login'))
    import mysql.connector
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='alunolab',
            database='predictivepulse',
            port=3306
        )
        cursor = conn.cursor(dictionary=True)
        cursor.execute('SELECT nome, matricula, email, tipo FROM usuarios WHERE id_usuario=%s', (session['user_id'],))
        usuario = cursor.fetchone()
        cursor.close()
        conn.close()
        if not usuario:
            flash('Usuário não encontrado.', 'error')
            return redirect(url_for('login'))
        return render_template('perfil.html', usuario=usuario)
    except Exception as e:
        flash(f'Erro ao buscar dados do usuário: {e}', 'error')
        return redirect(url_for('dashboard'))

# ==================== TRATAMENTO DE ERROS ====================

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(e):
    return render_template('500.html'), 500

# ==================== EXECUÇÃO ====================

if __name__ == '__main__':
    try:
        print_startup_banner(success=True, host='0.0.0.0', port=5000)
        if os.environ.get('PREDICTIVEPULSE_BROWSER_OPENED') != '1':
            os.environ['PREDICTIVEPULSE_BROWSER_OPENED'] = '1'
            threading.Thread(target=open_browser, args=('http://localhost:5000',), daemon=True).start()
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        print_startup_banner(success=False)
        print(f"{Colors.RED}Erro ao iniciar: {e}{Colors.RESET}")
        sys.exit(1)