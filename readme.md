Código do DB:

CREATE SCHEMA banco_dados_projeto;

USE banco_dados_projeto;

CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  telefone VARCHAR(15),
  rua VARCHAR(100),
  bairro VARCHAR(100),
  estado VARCHAR(2),
  numero INT,
  complemento VARCHAR(50),
  foto VARCHAR(255)
);


SELECT * FROM clientes;