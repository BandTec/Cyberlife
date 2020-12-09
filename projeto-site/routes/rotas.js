var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Rota = require('../models').Rota;

router.post('/cadastro/rota', (req, res, next) => {
	console.log('Criando um usuário');
	Rota.create({
		inicio : req.body.inicio,
		fim : req.body.fim,
		fkCaixa : req.body.caixa,
		fkOrgao : req.body.orgao
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;