/*exportando uma função para adicionar no final do arquivo index.js que é onde as primeiras rotas são criadas*/
var product = function(router){

	//var express = require('express');
	//var router = express.Router();
	var Product = require('../models/product');
	var csrf = require('csurf');

	var csrfProtection = csrf();
	router.use(csrfProtection);

	/*details on a product*/
	router.get('/product/:id', function(req, res, next) {
		let id = req.params['id'];
		//findOne({'_id':ObjectId('59399210491ee42c84a61e5b')})
		Product.findById(id,function(err,data){
			if(!err)
				res.render('detalhes/detalhe',{lutador:data});
				//res.send('something u mfcker:'+data); 
		});
		
	});	
}

module.exports = product;