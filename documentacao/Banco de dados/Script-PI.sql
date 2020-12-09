create database cyberlife;
use cyberlife;

-- tabela empresa incio 
create table empresa (
	idEmpresa int primary key auto_increment,
	nomeEmpresa varchar(45),
	CNPJ CHAR(18),
	telefone CHAR(15),
	email VARCHAR(50),
	rua VARCHAR(45),
	numero INT,
	bairro VARCHAR(45),
	CEP CHAR(9),
	Uf CHAR(2),
	cidade VARCHAR(45) 
)auto_increment= 1000;

insert into empresa values 
	(null,'Hospital Israelita Albert Einstein', '12.345.678/0002-88', '(11) 99999-1111', 'albert.eistein@contato.com.br','Av. Albert Einstein', 627, 'Jardim Leonor', '05652-900', 'SP', 'São Paulo');
    
select * from empresa;

-- Tabela empresa fim

-- tabela caixa inicio 
create table caixa (
	idCaixa int primary key auto_increment,
    nome varchar(12),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa (idEmpresa)
);

insert into caixa values 
	(null, 'Caixa1', 1000);
    
select * from caixa;
-- Fim caixa

-- Inicio orgao
create table Orgao (
	idOrgao int primary key auto_increment,
    nomeOrgao varchar(45),
    tempMin decimal(3,1),
    tempMax decimal(3,1)
)auto_increment = 5000;

insert Orgao values 
	(null, 'Coração', 4, 5),
    (null, 'Rim', 3.5, 5),
    (null, 'Pulmão', 4, 5);
    
select * from orgao;
-- Fim orgao

-- Inicio usuario 
create table Usuario (
	id int primary key auto_increment,
    nome varchar(60),
    login varchar(45),
    senha varchar(50),
    email varchar(50),
    administrador tinyint,
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa (idEmpresa)
);

insert into usuario values
	(null, 'Bruno Ricardo Gomes', 'Bruno', '12345678', 'bruno.ricardo@gmail.com', 1, 1000),
    (null, 'Jorge Uliam de Lima', 'Jorge', '12345678', 'jorgeuliam@gmail.com', 0, 1000),
    (null, 'Guilherme', 'Miranda', '12345678', 'julia@gmail.com', 0, 1000),
    (null, 'Matheus Pinheiro', 'pinheiro', '12345678', 'pinha@gmail.com', 0, 1000);

select * from usuario;

-- Fim usuario


-- Inicio Rota
create table Rota (
	idRota int primary key auto_increment,
    inicio char(19),
    fim char(19),
    fkCaixa int,
    fkOrgao int,
    foreign key (fkCaixa) references caixa (idCaixa),
    foreign key (fkOrgao) references Orgao (idOrgao)
)auto_increment = 3000;

insert into rota values 
	(null, '2020-10-27 12:15:00', '2020-10-27  14:07:23', 1, 1000);
    
select * from rota;
-- Fim rota

-- Inicio leitura

create table leitura (
	idLeitura int primary key auto_increment,
    temperatura float,
    momento datetime,
    fkCaixa int,
    foreign Key (fkCaixa) references caixa (idCaixa)
)auto_increment = 10;

insert into leitura values 
	(null, '13.7603130152381', '2020-12-08T16:18:47.0000000',1);
    
select * from leitura;