-- ============================================================
-- Schema: predictivepulse
-- Ajustes de segurança:
--   - senha VARCHAR(255) para suportar hashes bcrypt/pbkdf2
--   - email com constraint UNIQUE
--   - tipo como ENUM para restringir valores aceitos
-- ============================================================

CREATE DATABASE IF NOT EXISTS predictivepulse
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE predictivepulse;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    matricula  CHAR(5)      NOT NULL UNIQUE,
    email      VARCHAR(100) NOT NULL UNIQUE,
    senha      VARCHAR(255) NOT NULL,
    tipo       ENUM('tecnico', 'supervisor', 'administrador') NOT NULL
);

-- ============================================================
-- Seed: usuário administrador padrão
--
-- A senha precisa ser gerada com generate_password_hash do Werkzeug.
-- Execute o comando abaixo no terminal para gerar o hash e
-- substitua <HASH> pelo valor retornado:
--
--   python -c "from werkzeug.security import generate_password_hash; print(generate_password_hash('Senai*123'))"
--
-- Após gerar, execute o INSERT abaixo com o hash correto:

INSERT INTO usuarios (nome, matricula, email, senha, tipo) VALUES (
    'Davi de Jesus Vasconcellos de Oliveira',
    'B-757',
    'adm_davi@email.com',
    'scrypt:32768:8:1$e41FtLV0PChBb0Eb$3fcb0c7af24470645dbffba5a6f3f52fadb29e99960cbd6b9529f1091a68f84b06a0373c34c1476bb87a58877681520230587d242518ad6bef6ca1baeedd284b',
    'administrador'
);
-- ============================================================

-- ============================================================
-- Migração de banco existente (execute se o banco já existir):
--
--   ALTER TABLE usuarios MODIFY COLUMN senha VARCHAR(255) NOT NULL;
--   ALTER TABLE usuarios MODIFY COLUMN tipo ENUM('tecnico','supervisor','administrador') NOT NULL;
--   ALTER TABLE usuarios ADD CONSTRAINT email_unique UNIQUE (email);
--
-- ATENÇÃO: após alterar o schema, todas as senhas em texto puro
-- precisam ser redefinidas. Use a rota /forgot para cada usuário.
-- ============================================================

-- Informações de conexão (configure no arquivo .env):
-- DB_HOST=localhost
-- DB_USER=root
-- DB_PASSWORD=alunolab
-- DB_NAME=predictivepulse
-- DB_PORT=3306

-- Instalando dependências:
--   pip install -r requirements.txt
