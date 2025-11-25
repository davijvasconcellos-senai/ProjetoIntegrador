# PredictivePulse - Sistema de Monitoramento Inteligente

Sistema web para monitoramento preditivo de máquinas industriais com análise de sensores e alertas em tempo real.

## 🚀 Características

- ✅ Sistema de autenticação (Login/Cadastro)
- ✅ Dashboard interativo com dados em tempo real
- ✅ Monitoramento de sensores (Temperatura, Vibração, Ruído)
- ✅ Histórico de falhas e avisos
- ✅ Calendário de relatórios
- ✅ 3 tipos de usuário (Técnico, Supervisor, Administrador)
- ✅ Menu lateral responsivo
- ✅ API REST para integração
- ✅ Banco de dados SQLite

## 📋 Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

## 🔧 Instalação

### 1. Clone o repositório ou extraia os arquivos

```bash
cd predictivepulse
```

### 2. Crie um ambiente virtual (recomendado)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Execute a aplicação

```bash
python app.py
```

A aplicação estará disponível em: **http://localhost:5000**

## 📁 Estrutura do Projeto

```
predictivepulse/
│
├── app.py                          # Aplicação Flask principal
├── requirements.txt                # Dependências do projeto
├── predictivepulse.db             # Banco de dados SQLite (criado automaticamente)
│
├── templates/                      # Templates HTML
│   ├── login.html                 # Página de login
│   ├── cadastro.html              # Página de cadastro
│   └── index.html                 # Dashboard principal
│
└── static/                        # Arquivos estáticos
    ├── css/
    │   ├── login.css              # Estilos da página de login
    │   ├── cadastro.css           # Estilos da página de cadastro
    │   └── index.css              # Estilos do dashboard
    │
    ├── js/
    │   ├── login.js               # JavaScript do login
    │   ├── cadastro.js            # JavaScript do cadastro
    │   └── index.js               # JavaScript do dashboard
    │
    └── images/
        ├── logo.svg               # Logo principal
        ├── logo.png               # Logo em PNG
        └── TCC-Logo.svg           # Logo alternativo
```

## 👤 Criando sua primeira conta

1. Acesse **http://localhost:5000**
2. Clique em **"criar conta"**
3. Preencha os dados:
   - Nome Completo
   - Email
   - Senha (mínimo 6 caracteres)
   - Confirmar Senha
   - Tipo de Usuário (Técnico, Supervisor ou Administrador)
4. Clique em **"Criar conta"**
5. Faça login com suas credenciais

## 🔐 Segurança

- Senhas são criptografadas com hash SHA-256
- Sistema de sessões para autenticação
- Proteção contra SQL Injection
- Validação de dados no frontend e backend

## 🌐 API Endpoints

### Autenticação necessária para todos os endpoints

#### GET `/api/sensores`
Retorna os últimos 100 registros de sensores

#### GET `/api/falhas`
Retorna o histórico completo de falhas

#### POST `/api/adicionar_sensor`
Adiciona uma nova leitura de sensor

**Body:**
```json
{
  "tipo": "temperatura",
  "valor": 75.5,
  "unidade": "°C"
}
```

#### POST `/api/adicionar_falha`
Registra uma nova falha

**Body:**
```json
{
  "maquina": "Laser 1",
  "descricao": "Temperatura acima de 80°C",
  "tempo_parada": "2h 45min"
}
```

## 🎨 Customização

### Alterando cores do tema

Edite os arquivos CSS em `static/css/` para personalizar:
- Gradientes de fundo
- Cores dos botões
- Esquema de cores do dashboard

### Modificando o logo

Substitua os arquivos em `static/images/`:
- `logo.svg` - Logo principal
- `logo.png` - Logo alternativo

## 🛠️ Desenvolvimento

### Modo Debug

O modo debug está ativado por padrão em `app.py`:

```python
app.run(debug=True, host='0.0.0.0', port=5000)
```

Para produção, altere para:

```python
app.run(debug=False, host='0.0.0.0', port=5000)
```

### Alterando a chave secreta

Em `app.py`, altere a linha:

```python
app.secret_key = 'sua_chave_secreta_super_segura_aqui'
```

**Importante:** Use uma chave aleatória e segura em produção!

## 📊 Banco de Dados

O sistema usa SQLite com 3 tabelas principais:

1. **usuarios** - Armazena dados dos usuários
2. **sensores** - Registros de leituras dos sensores
3. **falhas** - Histórico de falhas das máquinas

Para visualizar o banco de dados, use ferramentas como:
- DB Browser for SQLite
- DBeaver
- SQLiteStudio

## 🚀 Deploy em Produção

### Recomendações:

1. Use um servidor WSGI (Gunicorn, uWSGI)
2. Configure um proxy reverso (Nginx, Apache)
3. Use variáveis de ambiente para configurações sensíveis
4. Configure HTTPS com certificado SSL
5. Use PostgreSQL ou MySQL em vez de SQLite
6. Implemente backup automático do banco de dados

### Exemplo com Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

## 👥 Suporte

Para dúvidas ou problemas:
- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento

---

**PredictivePulse** © 2025 - Monitoramento Inteligente