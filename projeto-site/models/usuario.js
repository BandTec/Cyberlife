	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/
// tabela usuario
module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		id: {
			field: 'id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		login: {
			field: 'login',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: { 
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		administrador: {
			field: 'administrador',
			type: DataTypes.TINYINT,
			allowNull: false
		},
		fkEmpresa: {
			field: 'fkEmpresa',
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'empresa',
				key: 'idEmpresa'
			}
		},
	}, 
	{
		tableName: 'Usuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};

// tabela rota
module.exports = (sequelize, DataTypes) => {
    let Rota = sequelize.define('Rota',{
		idRota: {
			field: 'idRota',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		inicio: {
			field: 'inicio',
			type: DataTypes.DATE,
			allowNull: false
		},
		fim: {
			field: 'fim',
			type: DataTypes.DATE,
			allowNull: false
		},
		fkCaixa: {
			field: 'fkCaixa',
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'caixa',
				key: 'idCaixa'
			}
		},
		fkOrgao: {
			field: 'fkOrgao',
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Orgao',
				key: 'idOrgao'
			}
		},
		nomeTransportador: {
			field: 'nomeTransportador',
			type: DataTypes.STRING,
			allowNull: false
		},
	}, 
	{
		tableName: 'Rota', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Rota;
};