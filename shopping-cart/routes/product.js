/*exportando uma função para adicionar no final do arquivo index.js que é onde as primeiras rotas são criadas*/
var product = function(router){

	var Product = require('../models/product');

	/*details on a product*/
	router.get('/product/:id', function(req, res, next) {
		let id = req.params['id'];		
		Product.findById(id,function(err,data){
			if(!err)
				res.render('detalhes/detalhe',{lutador:data});				
		});		
	});	

	router.get('/product/edit/:id', function(req, res, next) {
		let id = req.params['id'];		
		Product.findById(id,function(err,data){
			if(!err)
				res.render('detalhes/editar',{lutador:data, csrfToken: req.csrfToken()});				
		});		
	});	

	router.post('/product/edit', function(req, res, next) {
		var ret = req.body;
		Product.findById(ret.id,function(err,data){
			if(!err){
				data.title = ret.inputName;
				data.imagePath  = ret.inputUrl;
				data.description  = ret.inputDesc;
				data.price  = ret.inputPreco;
				data.save(function(err,datasave){
					res.redirect('/product/'+ret.id);
				});				
			}
		});				
	});	
}

module.exports = product;