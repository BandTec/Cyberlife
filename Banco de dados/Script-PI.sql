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
)auto_increment= 50;

insert into empresa values 
	(null,'Albert Einstein', '12.345.678/0002-88', '(11) 99999-1111', 'albert.eistein@contato.com.br','Av. Albert Einstein', 627, 'Jardim Leonor', '05652-900', 'SP', 'São Paulo');
    
select * from empresa;

-- Tabela empresa fim

-- tabela caixa inicio 
create table caixa (
	idCaixa int primary key auto_increment,
    nome varchar(5),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa (idEmpresa)
);

insert into caixa values 
	(null, 'Box1', 50),
	(null, 'Box2', 50),
	(null, 'Box3', 50);
    
select * from caixa;
-- Fim caixa

-- Inicio orgao
create table Orgao (
	idOrgao int primary key auto_increment,
    nomeOrgao varchar(45),
    tempMin decimal(3,1),
    tempMax decimal(3,1)
)auto_increment = 1000;

insert Orgao values 
	(null, 'Coração', 4.5, 6),
    (null, 'Rim', 3.5, 5);
    
select * from orgao;
-- Fim orgao

-- Inicio usuario 
create table Usuario (
	idUser int primary key auto_increment,
    nome varchar(60),
    login varchar(45),
    administrador tinyint check (administrador = 0 OR administrador =1),
    email varchar(50),
    senha varchar(50),
    fkEmpresa int,
    foreign key (fkEmpresa) references empresa (idEmpresa)
)auto_increment = 7000;

insert into usuario values
	(null, 'Bruno Ricardo Gomes', 1, 'Bruno.ricardo@gmail.com', '*******', 50);

select * from usuario;

-- Fim usuario


-- Inicio Rota
create table Rota (
	idRota int primary key auto_increment,
    inicio datetime,
    fim datetime,
    fkCaixa int,
    fkOrgao int,
    nomeTransportador varchar(45),
    foreign key (fkCaixa) references caixa (idCaixa),
    foreign key (fkOrgao) references Orgao (idOrgao)
)auto_increment = 3000;

insert into rota values 
	(null, '2020-10-27 12:15:00', '2020-10-27  14:07:23', 1, 1000);
    
select * from rota;
-- Fim rota

-- Inicio Sensor

create table sensor (
	idSensor int primary key auto_increment,
    temp decimal(3,1),
    dataHora datetime,
    fkCaixa int,
    foreign Key (fkCaixa) references caixa (idCaixa)
)auto_increment = 11000;

insert into sensor values 
	(null, '4.5', '2020-10-27 12:14:00',1);
    
select * from sensor;