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
# PredictivePulse - Sistema de Monitoramento Inteligente

Sistema web para monitoramento preditivo de máquinas industriais com análise de sensores e alertas em tempo real.

## 🚀 Características

- Sistema de autenticação (Login/Cadastro)
- Dashboard interativo com dados em tempo real
- Monitoramento de sensores (Temperatura, Vibração, Ruído)
- Histórico de falhas e avisos
- Calendário de relatórios
- 3 tipos de usuário (Técnico, Supervisor, Administrador)
- Menu lateral responsivo
- API REST para integração
- Banco de dados SQLite

## 📋 Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd ProjetoIntegrador
```

### 2. Crie um ambiente virtual (recomendado)

**Windows:**
```powershell
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
ProjetoIntegrador/
│
├── app.py                          # Aplicação Flask principal
├── requirements.txt                # Dependências do projeto
├── predictivepulse.db              # Banco de dados SQLite (criado automaticamente)
│
├── templates/                      # Templates HTML
│   ├── login.html                  # Página de login
│   ├── cadastro.html               # Página de cadastro
│   └── index.html                  # Dashboard principal
│
└── static/                         # Arquivos estáticos
    ├── css/
    ├── js/
    └── images/
        ├── logo-tcc-reduzida-branca.png
        ├── logo.png
        └── tcc-logo.png
```

## 👤 Criando sua primeira conta

1. Acesse **http://localhost:5000**
2. Clique em **"criar conta"**
3. Preencha os dados e crie sua conta

## 🔐 Segurança

- Senhas são criptografadas usando `werkzeug.security`
- Sistema de sessões para autenticação
- Validação de dados no frontend e backend

## 🌐 API Endpoints

### GET `/api/sensores`
Retorna os últimos 100 registros de sensores (requer autenticação)

### GET `/api/falhas`
Retorna o histórico de falhas (requer autenticação)

### POST `/api/adicionar_sensor`
Adiciona uma nova leitura de sensor (requer autenticação)

### POST `/api/adicionar_falha`
Registra uma nova falha (requer autenticação)

## 🧪 Modo Demonstração

Existe uma rota de demonstração que permite acessar o dashboard sem necessidade de login:

- URL: `/demo`
- Propósito: Permitir que visitantes visualizem dados (somente leitura). Não permite ações de edição.
- Observação: No modo demo, a interface mostra um banner informando que é apenas visualização.

## 🛠️ Desenvolvimento

### Modo Debug

O servidor é iniciado por `app.py` (modo debug por padrão):

```python
app.run(debug=True, host='0.0.0.0', port=5000)
```

Para produção, utilize um servidor WSGI (Gunicorn, uWSGI) e desative o debug.

### Alterando a chave secreta

Em `app.py`, altere a linha:

```python
app.secret_key = 'sua_chave_secreta_super_segura_aqui'
```

Use uma chave aleatória e segura em produção.

## 📊 Banco de Dados

O sistema usa SQLite com 3 tabelas principais: `usuarios`, `sensores`, `falhas`.

## 🚀 Deploy em Produção (exemplo com Gunicorn)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**PredictivePulse** © 2025 - Monitoramento Inteligente