create database predictivepulse;
use predictivepulse;

create table usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula CHAR(5) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    senha char(10) NOT NULL,
    tipo char(15) NOT NULL
);

insert into usuarios values (
    null, 
    'Davi de Jesus Vasconcellos de Oliveira', 
    'b-757', 
    'adm_davi@email.com', 
    'Senai*123', 
    'administrador'
);

-- Informações do mysql:
-- user: root
-- password: alunolab
-- host: localhost
-- port: 3306
-- database: predictivepulse

-- Instalando o flask
    -- pip install flask flask-mysql flask-cors

-- Instalando o conector para o mysql
    -- pip install mysql-connector-python

-- Instalar dependências:
    -- pip install -r requirements.txt