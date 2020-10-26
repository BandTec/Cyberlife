create database CyberLife;

use CyberLife;

-- ARMAZENADOS 
create table Armazenamento (
idArmazenamento int primary key auto_increment,
Orgão varchar (20),
temperatura char (4)
);

insert into Armazenamento values 
( null, 'coração', '-178'),
( null, 'pulmão', '-190'),
( null, 'fígado', '-180');

select*from Armazenamento;

 -- USUARIOS QUE TEM LOGIN NO SITE 
create table Usuario (
id_usuario int primary key auto_increment,
nome varchar(40),
Email varchar(40),
cep varchar(12),
numero varchar(10),
Senha char(10) ) ;

insert into Usuario values
 
(null,'Cleber','cleberoliveira199@gmail.com','04849630','5550B','426798' ),
(null,'Leonardo','leonardovieira2008@gmail.com','8880','04849890','507894' ),
(null,'Bruno','brunosilva200@gmail.com','04986750','1990B','9078605' );

select * from usuario;
