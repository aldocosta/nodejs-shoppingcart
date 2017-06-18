var express = require('express');
var router = express.Router();
//var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

//signup
router.get('/signup',function(req,res,next){
  var messages = req.flash('error');
	res.render('user/signup',{csrfToken: req.csrfToken(), messages :messages, hasError: messages.length>0});
});

//estrategia de autenticacao onde apenas grava o user
router.post('/signup',passport.authenticate('local.signup',{
  successRedirect :'/profile',
  failureRedirect :'/user/signup',
  failureFlash:true
}));


router.get('/signin',function(req,res,next){
  var messages = req.flash('error');
  res.render('user/signin',{csrfToken: req.csrfToken(), messages :messages, hasError: messages.length>0});
});

router.post('/signin',passport.authenticate('local.signin',{
  successRedirect :'/user/profile',
  failureRedirect :'/user/signin',
  failureFlash:true
}));

router.get('/logout',function(req,res,next){
  req.logout();
  res.redirect('/');
});

router.get('/profile',isLoggedIn,function(req,res,next){
  res.render('user/profile');
});
 
module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}