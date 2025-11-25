from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_super_segura_aqui'  # Mude isso em produção!

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
    app.run(debug=True, host='0.0.0.0', port=5000)