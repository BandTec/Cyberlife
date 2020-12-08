'use strict';

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