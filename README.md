# PREDICTIVEPULSE

Sistema Integrado de Monitoramento (versão simplificada) para Indústria 4.0

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

Esta versão do PREDICTIVEPULSE entrega um sistema web em Flask com autenticação, painel (dashboard) simplificado e área administrativa para gestão de usuários. A aplicação está integrada ao MySQL via `mysql.connector` e utiliza `itsdangerous` para geração de tokens de redefinição de senha.

Em relação a versões anteriores, foram removidos os módulos de API REST e de simulação/monitoramento de sensores em tempo real, mantendo as rotas principais de navegação, autenticação e administração de usuários. O projeto permanece como base educacional clara e funcional para demonstrar fluxo de login/cadastro, painel, modo demonstração e CRUD de usuários.

**Palavras-chave:** Flask; MySQL; autenticação; administração; tokens; Indústria 4.0.

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
## Instalação e Execução

### Pré-requisitos

- Python 3.8 ou superior
- MySQL Server (8.x recomendado)

### Passos

1. Crie e ative o ambiente virtual
   
    Windows (PowerShell):
    ```powershell
    python -m venv venv
    venv\Scripts\activate
    ```

    Linux/Mac:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

2. Instale as dependências principais
    ```bash
    pip install -r requirements.txt
    ```

3. Conector do MySQL
    Já incluído em `requirements.txt` (não é necessário instalar separadamente).

4. Prepare o banco de dados (arquivo `squema.sql`)
    - Execute o script no seu cliente MySQL:
      ```sql
      source /caminho/para/squema.sql;
      ```

5. Ajuste a chave secreta em `app.py` (produção)
    ```python
    app.secret_key = 'sua_chave_secreta_super_segura_aqui'
    ```

6. Execute
    ```bash
    python app.py
    ```
    A aplicação estará disponível em: **http://localhost:5000**

---
## Usuário Administrador Inicial

Ao importar o `squema.sql`, é criado um usuário administrador de exemplo:

- Nome: Davi de Jesus Vasconcellos de Oliveira
- Matrícula: b-757
- Email: adm_davi@email.com
- Senha: Senai*123
- Tipo: administrador

Altere ou remova esse usuário conforme sua necessidade através do painel `/controle`.

---

## Configuração de Banco de Dados

- Host: `localhost`
- Porta: `3306`
- Usuário: `root`
- Senha: `alunolab`
- Banco: `predictivepulse`



---

## Rotas Principais

- `/` – Página inicial
- `/login` – Login
- `/cadastro` – Cadastro
- `/forgot` – Esqueci minha senha (gera link com token)
- `/reset/<token>` – Redefinição de senha (expira em 1 hora)
- `/dashboard` – Dashboard (requer login)
- `/logout` – Logout
- `/demo` – Modo demonstração
- `/controle` – Painel administrativo
- `/mensagens`, `/notificacoes`, `/monitoramento`, `/perfil`

---

## Estrutura do Projeto

```
ProjetoIntegrador/
│
├── app.py
├── requirements.txt
├── squema.sql
├── templates/
└── static/
```

---

## Dicas e Solução de Problemas

- Erro `ModuleNotFoundError: No module named 'mysql'` → `pip install mysql-connector-python`.
- Falha de conexão MySQL → verifique serviço, porta, usuário/senha e existência do banco.
- Links de redefinição expiram em 1 hora → gere novo em `/forgot`.

---

## Referências

- Flask – https://flask.palletsprojects.com/
- MySQL – https://dev.mysql.com/doc/
- itsdangerous – https://itsdangerous.palletsprojects.com/

---

## Licença

Projeto educacional.

---

## Agradecimentos

Gostaria de agradecer aos instrutores e amigos que me ajudaram no desenvolvimento deste projeto. Agradeço, em primeiro lugar, aos instrutores Natália dos Santos Grillo e Vicente Aparecido Orsino da Silva, assim como Nivaldo Batista Araújo, Gabriel dos Santos Raimundo, que cederam o ambiente adequado para o desenvolvimento deste projeto (FabLab) e auxiliaram no desenvolvimento e resolução de problemas do projeto. Agradeço também aos meus amigos Raphael Martins e Gabriel da Silva Andrade (Panelinha) e Isaque Gomes, que me forneceram ideias de funcionalidades e estilizações visuais para adicionar a plataforma. Por fim, agradeço à minha equipe designada para o projeto - Guilerme de Goys (Design Gráfico), Vinícius Damas Lins (Multimídia) e Larissa Dantas (Jogos) - pela ajuda no desenvolvimento de todo o projeto. Agradeço ao Senai Maracanã por me proporcionar grandes momentos durante a minha trajetória como aluno Sesi/Senai.