var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Rota = require('../models').Rota;

router.post('/cadastro/rota', (req, res, next) => {
	console.log('Criando um usuário');
    
    var data = req.body.inicio;
    var dataFormatada1 = new Date(data);

    var data2 = req.body.fim;
    var dataFormatada2 = new Date(data2);

    sequelize.fn(GETDATE);

	Rota.create({
		inicio : dataFormatada1,
		fim : dataFormatada2,
		fkCaixa : req.body.caixa,
		fkOrgao : req.body.orgao,
		nomeTransportador : 'José'
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;