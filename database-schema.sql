-- ==========================================
-- PORTAIL CLIENTS MSP
-- Schéma MariaDB V1
-- ==========================================
 
CREATE TABLE roles (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL UNIQUE,
description VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
INSERT INTO roles (name, description)
VALUES
('SUPER_ADMIN', 'Super administrateur du logiciel'),
('ADMIN', 'Administrateur'),
('TECHNICIEN', 'Technicien'),
('CLIENT', 'Utilisateur client');
 
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
 
email VARCHAR(255) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
 
firstname VARCHAR(100) NOT NULL,
lastname VARCHAR(100) NOT NULL,
 
role_id INT NOT NULL,
 
active BOOLEAN DEFAULT TRUE,
 
force_password_change BOOLEAN DEFAULT TRUE,
 
last_login DATETIME NULL,
 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 
CONSTRAINT fk_users_role
FOREIGN KEY (role_id)
REFERENCES roles(id)
);