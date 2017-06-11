var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err,docs){
    var productsChunks = [];
    var chunkSize = 3;
    for(var i=0; i< docs.length; i+= chunkSize){
       productsChunks.push(docs.slice(i,i+chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products:productsChunks });
  });  
});

//signup
router.get('/user/signup',function(req,res,next){
  var messages = req.flash('error');
	res.render('user/signup',{csrfToken: req.csrfToken(), messages :messages, hasError: messages.length>0});
});

//estrategia de autenticacao onde apenas grava o user
router.post('/user/signup',passport.authenticate('local.signup',{
  successRedirect :'/profile',
  failureRedirect :'/user/signup',
  failureFlash:true
}));

router.get('/profile',function(req,res,next){
  res.render('user/profile');
});

/*rota dos produtos*/
require('./product')(router);


module.exports = router;