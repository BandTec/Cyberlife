var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;

/* Recuperar as últimas N leituras */
router.get('/ultimas/:idcaixa', function(req, res, next) {
	
	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;

	var idcaixa = req.params.idcaixa;

	console.log(`Recuperando as ultimas ${limite_linhas} leituras`);
	
	const instrucaoSql = `select top ${limite_linhas} 
						temperatura, 
						momento,
						FORMAT(momento,'HH:mm:ss') as momento_grafico
						from leitura
						where idcaixa = ${idcaixa}
						order by id desc`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	  })
	  .then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
	  }).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
	  });
});


// tempo real (último valor de cada leitura)
/*router.get('/tempo-real', function (req, res, next) {
	
	console.log(`Recuperando a ultima leitura`);

	const instrucaoSql = `select top 4 temperatura, umidade, FORMAT(momento,'HH:mm:ss') as momento_grafico, idcaminhao from leitura order by id desc`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});
*/

router.get('/tempo-real/:idcaixa', function(req, res, next) {
	console.log('Recuperando caminhões');

	//var idcaminhao = req.body.idcaixa; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idcaminhao = req.params.idcaixa;

	let instrucaoSql = `select top 1 temperatura, FORMAT(momento,'HH:mm:ss') as momento_grafico, idcaixa from leitura where idcaminhao = ${idcaminhao} order by id desc`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
});

// estatísticas (max, min, média, mediana, quartis etc)
router.get('/estatisticas', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select 
							max(temperatura) as temp_maxima, 
							min(temperatura) as temp_minima, 
							avg(temperatura) as temp_media,
						from leitura`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});


module.exports = router;
