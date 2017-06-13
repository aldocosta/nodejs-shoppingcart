var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');//view envine
var mongoose = require('mongoose');//conector com o bd mongoose
var session = require('express-session');
var passport = require('passport');//prove validaçao de segurança
var flash = require('connect-flash');//middleware to help with messages
var validator = require('express-validator');//middlware to help with validations like valid email and some custom validation

mongoose.connect('mongodb://127.0.0.1:27017/shoppingcart');
require('./config/passport'); //esquema de validação de usuario e outras configuraçoes do passport
var index = require('./routes/index');

var app = express();

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout:'layout', extname:'.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//logando no console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({secret:'Mysupersecret',resave:false, saveUnitialized:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//aqui define a rota principal, nao achei muito bom pois se eu tiver outros arquivos de rotas como faço?
//no caso adicionei um require para outro arquivo no final do index
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;