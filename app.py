from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
from datetime import datetime
import os
import sys
import tempfile
import webbrowser
import threading
import time

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_super_segura_aqui'  # Mude isso em produção!

# === INTEGRAÇÃO OAUTH GOOGLE E MICROSOFT ===
from flask_dance.contrib.google import make_google_blueprint, google
from flask_dance.contrib.azure import make_azure_blueprint, azure
import os

# Carregar credenciais do ambiente
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', 'COLOQUE_SUA_GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET', 'COLOQUE_SUA_GOOGLE_CLIENT_SECRET')
MICROSOFT_CLIENT_ID = os.environ.get('MICROSOFT_CLIENT_ID', 'COLOQUE_SUA_MICROSOFT_CLIENT_ID')
MICROSOFT_CLIENT_SECRET = os.environ.get('MICROSOFT_CLIENT_SECRET', 'COLOQUE_SUA_MICROSOFT_CLIENT_SECRET')

# Blueprint Google
google_bp = make_google_blueprint(
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    scope=["profile", "email"],
    redirect_url="/login/google/authorized"
)
app.register_blueprint(google_bp, url_prefix="/login")

# Blueprint Microsoft (Azure)
azure_bp = make_azure_blueprint(
    client_id=MICROSOFT_CLIENT_ID,
    client_secret=MICROSOFT_CLIENT_SECRET,
    redirect_url="/login/microsoft/authorized",
    scope=["User.Read"]
)
app.register_blueprint(azure_bp, url_prefix="/login")

# Rota para iniciar login Google
@app.route('/auth/google')
def auth_google():
    if not google.authorized:
        return redirect(url_for('google.login'))
    resp = google.get("/oauth2/v2/userinfo")
    if not resp.ok:
        flash('Erro ao autenticar com Google.', 'error')
        return redirect(url_for('cadastro'))
    info = resp.json()
    return social_login_or_register(info.get('email'), info.get('name'), 'google')

# Rota para iniciar login Microsoft
@app.route('/auth/microsoft')
def auth_microsoft():
    if not azure.authorized:
        return redirect(url_for('azure.login'))
    resp = azure.get("/v1.0/me")
    if not resp.ok:
        flash('Erro ao autenticar com Microsoft.', 'error')
        return redirect(url_for('cadastro'))
    info = resp.json()
    return social_login_or_register(info.get('mail') or info.get('userPrincipalName'), info.get('displayName'), 'microsoft')

# Função auxiliar para login/cadastro social
def social_login_or_register(email, nome, provider):
    if not email:
        flash('Não foi possível obter o email do provedor.', 'error')
        return redirect(url_for('cadastro'))
    conn = get_db_connection()
    usuario = conn.execute('SELECT * FROM usuarios WHERE email = ?', (email,)).fetchone()
    if usuario:
        # Login
        session['user_id'] = usuario['id']
        session['user_nome'] = usuario['nome']
        session['user_tipo'] = usuario['tipo_usuario']
        conn.close()
        flash('Login social realizado com sucesso!', 'success')
        return redirect(url_for('dashboard'))
    else:
        # Cadastro rápido: tipo_usuario = 'tecnico' por padrão
        conn.execute(
            'INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)',
            (nome or 'Usuário '+provider, email, '', 'tecnico')
        )
        conn.commit()
        usuario = conn.execute('SELECT * FROM usuarios WHERE email = ?', (email,)).fetchone()
        session['user_id'] = usuario['id']
        session['user_nome'] = usuario['nome']
        session['user_tipo'] = usuario['tipo_usuario']
        conn.close()
        flash('Conta criada com sucesso via '+provider.title()+'!', 'success')
        return redirect(url_for('dashboard'))

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
    """Abre o navegador padrão após um pequeno delay para garantir que o servidor esteja rodando"""
    time.sleep(2)  # Aguarda 2 segundos para o servidor iniciar
    webbrowser.open(url)
    print(f"{Colors.GREEN}✓ Navegador aberto automaticamente em {url}{Colors.RESET}\n")

# Configuração do banco de dados
DATABASE = 'predictivepulse.db'

def get_db_connection():
    """Cria uma conexão com o banco de dados"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Inicializa o banco de dados"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Criar tabela de usuários
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            tipo_usuario TEXT NOT NULL,
            data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Criar tabela de sensores (exemplo)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sensores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo TEXT NOT NULL,
            valor REAL NOT NULL,
            unidade TEXT,
            data_leitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Criar tabela de falhas (exemplo)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS falhas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            maquina TEXT NOT NULL,
            descricao TEXT,
            status TEXT DEFAULT 'ativa',
            tempo_parada TEXT,
            data_falha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# Inicializar o banco de dados ao iniciar a aplicação
with app.app_context():
    init_db()

# ==================== ROTAS ====================

@app.route('/')
def home():
    """Redireciona para login ou dashboard dependendo da sessão"""
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Página de login"""
    if request.method == 'POST':
        email = request.form.get('email')
        senha = request.form.get('senha')
        
        if not email or not senha:
            flash('Por favor, preencha todos os campos.', 'error')
            return render_template('login.html')
        
        conn = get_db_connection()
        usuario = conn.execute('SELECT * FROM usuarios WHERE email = ?', (email,)).fetchone()
        conn.close()
        
        if usuario and check_password_hash(usuario['senha'], senha):
            session['user_id'] = usuario['id']
            session['user_nome'] = usuario['nome']
            session['user_tipo'] = usuario['tipo_usuario']
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Email ou senha incorretos.', 'error')
    
    return render_template('login.html')

@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    """Página de cadastro"""
    if request.method == 'POST':
        nome = request.form.get('nome')
        email = request.form.get('email')
        senha = request.form.get('senha')
        confirmar_senha = request.form.get('confirmarSenha')
        tipo_usuario = request.form.get('tipoUsuario')
        
        # Validações
        if not all([nome, email, senha, confirmar_senha, tipo_usuario]):
            flash('Por favor, preencha todos os campos.', 'error')
            return render_template('cadastro.html')
        
        if senha != confirmar_senha:
            flash('As senhas não coincidem.', 'error')
            return render_template('cadastro.html')
        
        if len(senha) < 6:
            flash('A senha deve ter no mínimo 6 caracteres.', 'error')
            return render_template('cadastro.html')
        
        # Verificar se o email já existe
        conn = get_db_connection()
        usuario_existe = conn.execute('SELECT id FROM usuarios WHERE email = ?', (email,)).fetchone()
        
        if usuario_existe:
            conn.close()
            flash('Este email já está cadastrado.', 'error')
            return render_template('cadastro.html')
        
        # Criar novo usuário
        senha_hash = generate_password_hash(senha)
        try:
            conn.execute(
                'INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)',
                (nome, email, senha_hash, tipo_usuario)
            )
            conn.commit()
            conn.close()
            flash('Cadastro realizado com sucesso! Faça login.', 'success')
            return redirect(url_for('login'))
        except Exception as e:
            conn.close()
            flash('Erro ao criar conta. Tente novamente.', 'error')
            return render_template('cadastro.html')
    
    return render_template('cadastro.html')

@app.route('/dashboard')
def dashboard():
    """Página principal do dashboard"""
    if 'user_id' not in session:
        flash('Por favor, faça login para acessar o dashboard.', 'error')
        return redirect(url_for('login'))
    
    # Buscar dados para o dashboard
    conn = get_db_connection()
    
    # Buscar últimas falhas
    falhas = conn.execute(
        'SELECT * FROM falhas ORDER BY data_falha DESC LIMIT 10'
    ).fetchall()
    
    # Buscar dados de sensores
    sensores = conn.execute(
        'SELECT * FROM sensores ORDER BY data_leitura DESC LIMIT 100'
    ).fetchall()
    
    conn.close()
    
    return render_template('index.html', 
                         usuario=session['user_nome'],
                         tipo_usuario=session['user_tipo'],
                         falhas=falhas,
                         sensores=sensores)

@app.route('/logout')
def logout():
    """Logout do usuário"""
    session.clear()
    flash('Você saiu da sua conta.', 'info')
    return redirect(url_for('login'))

@app.route('/demo')
def demo():
    """Página de demonstração (acesso sem autenticação)"""
    conn = get_db_connection()
    
    # Buscar dados para o dashboard
    falhas = conn.execute(
        'SELECT * FROM falhas ORDER BY data_falha DESC LIMIT 10'
    ).fetchall()
    
    sensores = conn.execute(
        'SELECT * FROM sensores ORDER BY data_leitura DESC LIMIT 100'
    ).fetchall()
    
    conn.close()
    
    return render_template('index.html', 
                         usuario='Visitante (Demo)',
                         tipo_usuario='visualizador',
                         falhas=falhas,
                         sensores=sensores,
                         demo_mode=True)

# ==================== API ENDPOINTS ====================

@app.route('/api/sensores', methods=['GET'])
def api_sensores():
    """API para retornar dados dos sensores"""
    if 'user_id' not in session:
        return jsonify({'error': 'Não autorizado'}), 401
    
    conn = get_db_connection()
    sensores = conn.execute(
        'SELECT * FROM sensores ORDER BY data_leitura DESC LIMIT 100'
    ).fetchall()
    conn.close()
    
    dados = [dict(sensor) for sensor in sensores]
    return jsonify(dados)

@app.route('/api/falhas', methods=['GET'])
def api_falhas():
    """API para retornar histórico de falhas"""
    if 'user_id' not in session:
        return jsonify({'error': 'Não autorizado'}), 401
    
    conn = get_db_connection()
    falhas = conn.execute(
        'SELECT * FROM falhas ORDER BY data_falha DESC'
    ).fetchall()
    conn.close()
    
    dados = [dict(falha) for falha in falhas]
    return jsonify(dados)

@app.route('/api/adicionar_sensor', methods=['POST'])
def api_adicionar_sensor():
    """API para adicionar leitura de sensor"""
    if 'user_id' not in session:
        return jsonify({'error': 'Não autorizado'}), 401
    
    dados = request.get_json()
    tipo = dados.get('tipo')
    valor = dados.get('valor')
    unidade = dados.get('unidade')
    
    if not all([tipo, valor]):
        return jsonify({'error': 'Dados incompletos'}), 400
    
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO sensores (tipo, valor, unidade) VALUES (?, ?, ?)',
        (tipo, valor, unidade)
    )
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'message': 'Sensor adicionado'})

@app.route('/api/adicionar_falha', methods=['POST'])
def api_adicionar_falha():
    """API para registrar uma falha"""
    if 'user_id' not in session:
        return jsonify({'error': 'Não autorizado'}), 401
    
    dados = request.get_json()
    maquina = dados.get('maquina')
    descricao = dados.get('descricao')
    tempo_parada = dados.get('tempo_parada')
    
    if not all([maquina, descricao]):
        return jsonify({'error': 'Dados incompletos'}), 400
    
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO falhas (maquina, descricao, tempo_parada) VALUES (?, ?, ?)',
        (maquina, descricao, tempo_parada)
    )
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'message': 'Falha registrada'})

# ==================== TRATAMENTO DE ERROS ====================

@app.errorhandler(404)
def page_not_found(e):
    """Página não encontrada"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(e):
    """Erro interno do servidor"""
    return render_template('500.html'), 500

# ==================== EXECUÇÃO ====================

if __name__ == '__main__':
    try:
        # Evita abrir o navegador duas vezes quando o reloader do Flask está ativo.
        # O reloader executa o script duas vezes: um processo "pai" (WERKZEUG_RUN_MAIN unset)
        # e um processo "filho" (WERKZEUG_RUN_MAIN == 'true'). Queremos abrir o navegador
        # apenas no processo filho, ou quando o modo debug está desativado.
        should_open = (not app.debug) or (os.environ.get('WERKZEUG_RUN_MAIN') == 'true')

        # Mostrar o banner apenas quando realmente iremos abrir o navegador (processo filho).
        if should_open:
            print_startup_banner(success=True, host='0.0.0.0', port=5000)
            url = 'http://localhost:5000'
            # In-process guard to avoid opening the browser multiple times
            if os.environ.get('PREDICTIVEPULSE_BROWSER_OPENED') != '1':
                os.environ['PREDICTIVEPULSE_BROWSER_OPENED'] = '1'
                thread = threading.Thread(target=open_browser, args=(url,), daemon=True)
                thread.start()
        else:
            # Processo pai: suprimir banner para evitar duplicação.
            print('Starting Flask (parent) - banner suppressed to avoid duplicates')

        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        # Mostra banner de erro apenas no processo que abriria o navegador
        if os.environ.get('WERKZEUG_RUN_MAIN') == 'true' or not app.debug:
            print_startup_banner(success=False)
        else:
            print(f"Erro ao iniciar o servidor: {str(e)}")
        print(f"{Colors.RED}Erro: {str(e)}{Colors.RESET}")
        sys.exit(1)