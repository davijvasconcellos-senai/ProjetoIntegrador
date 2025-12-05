# PREDICTIVEPULSE

Sistema Integrado de Simulação de Manutenção Preditiva para Indústria 4.0

---

## Dados do Projeto

**Curso:** Técnico em Informática  
**Turma:** TEC00692024 T057-1  
**Modalidade:** Técnico  
**Unidade:** Firjan SENAI Maracanã  
**Data:** 23 de novembro de 2025

**Instrutores-Orientadores:**  
Luciano Alonso da Fonseca Júnior  
Vicente Aparecido Orsino da Silva

**Alunos:**  
Davi de Jesus Vasconcellos de Oliveira  
Guilherme de Goys Carvalho dos Santos  
Larissa de Souza Dantas  
Vinícius Damas Lins Moraes Silva

---

## Resumo

O projeto PREDICTIVEPULSE propõe o desenvolvimento de uma plataforma integrada para simular um ambiente de manutenção preditiva aplicado ao contexto da Indústria 4.0. A solução utiliza dados artificiais para monitorar o comportamento simulado de máquinas industriais, identificando padrões anormais que possam indicar falhas futuras. O sistema é composto por três módulos principais: um gerador de dados representando sensores IoT, uma API responsável pela coleta, processamento e análise dessas informações e um dashboard que exibe, em tempo real, indicadores operacionais, alertas de anomalias e ordens de manutenção geradas automaticamente.

A metodologia aplicada contempla desde o mapeamento da arquitetura, a implementação dos componentes e os testes de validação, garantindo coerência técnica e fidelidade ao processo real de manutenção preditiva. O projeto foi concebido como uma ferramenta educacional, possibilitando que alunos vivenciem de forma prática o funcionamento de sistemas inteligentes que analisam dados e suportam a tomada de decisão nas indústrias modernas.

Como resultado, o PREDICTIVEPULSE demonstra a viabilidade de simular, de maneira eficaz, fluxos industriais complexos, proporcionando uma visão clara das etapas que envolvem a detecção precoce de falhas. Além de reforçar competências técnicas do curso Técnico em Informática, o projeto evidencia como soluções digitais podem contribuir para a redução de custos, aumento da disponibilidade de máquinas e otimização da manutenção. Assim, a plataforma se destaca não apenas como um recurso de aprendizagem, mas como uma representação prática e contextualizada das tecnologias que moldam o futuro da automação industrial.

**Palavras-chave:** manutenção preditiva; IoT; simulação industrial; análise de dados; Indústria 4.0.

---

## 1. Introdução

A transformação digital vivenciada pela Indústria 4.0 trouxe consigo a necessidade de integração entre sistemas, automação e análise contínua de dados. Nesse cenário, a manutenção preditiva passou a ocupar um papel fundamental, permitindo que empresas monitorem condições de máquinas, antecipem falhas e planejem intervenções com maior precisão. A utilização de métodos baseados em dados e sensores inteligentes reduz custos, aumenta a segurança e eleva a produtividade industrial.

Diante da relevância desses processos para o setor produtivo, o projeto PREDICTIVEPULSE surge como uma solução didática que simula um ambiente real de monitoramento industrial. A proposta permite que estudantes compreendam e apliquem conceitos relacionados à Internet das Coisas (IoT), APIs, bancos de dados e análise de informações, utilizando uma abordagem prática que replica os desafios encontrados na área de manutenção inteligente.

---

## 2. Tema/Desafio/Problema

O desafio central do projeto consiste em simular um ambiente de manutenção preditiva capaz de monitorar, analisar e detectar comportamentos anormais em máquinas industriais, utilizando dados artificialmente gerados para representar diferentes condições operacionais. O problema envolve a construção de uma solução que permita identificar possíveis falhas futuras antes que elas ocorram, fornecendo alertas e registrando ordens de manutenção simuladas.

Embora o projeto não tenha sido proposto diretamente por uma empresa específica, ele se inspira nas necessidades reais do setor industrial, onde sistemas de manutenção preditiva são amplamente utilizados. O desafio visa aproximar o aluno de um cenário prático, replicando o comportamento de sensores, fluxos de comunicação, algoritmos de análise e ferramentas de visualização usados em ambientes corporativos.

---

## 3. Objetivo

O objetivo geral do projeto PREDICTIVEPULSE é desenvolver uma plataforma integrada que simule o monitoramento contínuo de máquinas industriais, analisando dados em tempo real para identificar padrões anormais e registrar automaticamente ordens de manutenção com base na criticidade detectada.

**Objetivos específicos:**
- Projetar a arquitetura lógica e física do sistema, definindo os componentes responsáveis pela simulação e análise;
- Criar um gerador de dados capaz de simular sensores IoT industriais;
- Implementar uma API para coleta, processamento e armazenamento dos dados de monitoramento;
- Desenvolver algoritmos de detecção de anomalias e classificação de criticidade;
- Construir um dashboard interativo que permita acompanhar indicadores e ordens de manutenção;
- Validar todo o fluxo por meio de testes funcionais e simulações realistas.

---

## 4. Justificativa

A implementação de sistemas de manutenção preditiva é uma demanda crescente no setor industrial, especialmente diante das exigências de produtividade, disponibilidade de máquinas e segurança operacional. A Indústria 4.0 destaca a necessidade de monitoramento contínuo e análise inteligente de dados, proporcionando intervenções mais precisas e eficientes. Entretanto, muitos ambientes educacionais não dispõem de condições reais para simular esses processos.

O projeto PREDICTIVEPULSE se justifica como uma ferramenta educacional que visa suprir essa lacuna, oferecendo aos alunos a oportunidade de vivenciar, de maneira prática, situações típicas de manutenção inteligente. A plataforma possibilita o entendimento de conceitos técnicos, o manuseio de tecnologias amplamente utilizadas pelo setor produtivo e o fortalecimento de competências profissionais essenciais para o Técnico em Informática.

---

## 5. Metodologia

A metodologia aplicada ao desenvolvimento do PREDICTIVEPULSE foi estruturada em etapas sequenciais que garantem organização e coerência técnica do projeto:
1. Modelagem da Arquitetura – Definição da arquitetura lógica e física, contemplando fluxos de comunicação, escolha de tecnologias, padrões de API e estrutura de armazenamento dos dados.
2. Simulador de Sensores IoT – Implementação de um gerador de dados artificiais capaz de simular variáveis como temperatura, vibração e corrente elétrica, com inserção controlada de anomalias.
3. Desenvolvimento da API – Criação de endpoints responsáveis pela coleta, processamento preliminar e persistência dos dados no banco de dados.
4. Módulo de Análise – Estruturação de regras e algoritmos que identificam comportamentos atípicos, comparando dados atuais com históricos simulados.
5. Geração de Ordens de Manutenção – Criação de lógica que classifica a criticidade e registra automaticamente ordens no banco de dados.
6. Dashboard de Visualização – Construção de interface gráfica com gráficos, indicadores, histórico e alertas.
7. Testes e Validação – Execução de testes funcionais, testes de carga e simulações variadas para garantir o correto funcionamento de todos os módulos.
8. Referências Técnicas – Consulta de documentação oficial, boas práticas de IoT, artigos sobre manutenção preditiva e padrões industriais.

---

## 6. Conclusão

O projeto PREDICTIVEPULSE permitiu a construção de uma solução educacional robusta, capaz de simular com fidelidade os processos envolvidos na manutenção preditiva. Ao reunir módulos de simulação, análise e visualização, a plataforma demonstrou como tecnologias da Indústria 4.0 podem ser aplicadas para prevenir falhas, elevar a eficiência operacional e apoiar a tomada de decisão.

O desenvolvimento possibilitou aos alunos o contato direto com ferramentas, conceitos e práticas amplamente utilizados no setor industrial, fortalecendo competências essenciais do Técnico em Informática e contribuindo para sua formação profissional. Além disso, a solução abre espaço para melhorias futuras, como aplicação de algoritmos de inteligência artificial, integração com sensores reais e ampliação do escopo analítico.

---

## Referências

- SENAI. Manutenção Preditiva e Indústria 4.0. Rio de Janeiro: SENAI, 2023.
- GOLDSCHMIDT, R.; PASSOS, E.; BEZERRA, E. Ciência de Dados: conceitos, técnicas e aplicações. Rio de Janeiro: Elsevier, 2019.
- FERRARI, P.; BELLINI, A.; RINALDI, S. Industrial IoT: foundational concepts and applications. IEEE, 2020.
- POSTGRESQL. Documentação Oficial PostgreSQL. Disponível em: https://www.postgresql.org/docs/.
- FASTAPI. FastAPI Documentation. Disponível em: https://fastapi.tiangolo.com/.
- NR-12. Segurança no Trabalho em Máquinas e Equipamentos. Ministério do Trabalho, 2021.

---

## Instruções de Instalação e Uso

### Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

### Instalação

1. Clone o repositório ou extraia os arquivos
    ```bash
    cd predictivepulse
    ```
2. Crie um ambiente virtual (recomendado)
    ```bash
    python -m venv venv
    venv\Scripts\activate  # Windows
    # ou
    source venv/bin/activate  # Linux/Mac
    ```
3. Instale as dependências
    ```bash
    pip install -r requirements.txt
    ```
4. Configure as variáveis de ambiente (Google/Microsoft OAuth, se desejar login social)
5. Execute o sistema
    ```bash
    python app.py
    ```

### Funcionalidades

- Sistema de autenticação (Login/Cadastro, Google, Microsoft)
- Dashboard interativo com dados em tempo real
- Monitoramento de sensores simulados (Temperatura, Vibração, Corrente)
- Histórico de falhas e avisos
- Geração automática de ordens de manutenção
- Visualização de indicadores e gráficos
- API REST para integração
- Banco de dados SQLite

---

## Pitch

[Inserir aqui o texto do pitch do projeto, conforme relatório.]

---

## BM Canvas

[Inserir aqui o print ou resumo do Business Model Canvas do projeto.]
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
- 2 tipos de usuário (Técnico e Supervisor)
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

## Agradecimentos:
Gostaria de agradecer aos instrutores e amigos que me ajudaram no desenvolvimento deste projeto. Agradeço, em primeiro lugar, aos instrutores Natália dos Santos Grillo
e Vicente Aparecido Orsino da Silva, assim como Nivaldo Batista Araújo, Gabriel dos Santos Raimundo, que cederam o ambiente adequado para o desenvolvimento deste projeto 
(FabLab) e auxiliaram no desenvolvimento e resolução de problemas do projeto. Agradeço também aos meus amigos  Raphael Martins e Gabriel da Silva Andrade (Panelinha) e
Isaque Gomes, que me forneceram ideias de funcionalidades e estilizações visuais para adicionar a plataforma. Por fim, agradeço à minha equipe designada para o projeto - 
Guilerme de Goys (Design Gráfico), Vinícius Damas Lins (Multimídia) e Larissa Dantas (Jogos) - pela ajuda no desenvolvimento de todo o projeto. Agradeço ao Senai Maracanã
por me proporcionar grandes momentos durante a minha trajetória como aluno Sesi/Senai.