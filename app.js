var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-sessions');
var routes = require('./routes/index');
//var mongoose = require('mongoose');
//var MongoDBStore = require('connect-mongodb-session')(session);
//var users = require('./routes/users');
//var mob = require('./routes/mob');


function getApp(db){

var app = express();
var api = require('./routes/api')(db);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//Manejador de sesiones
/*var store = newMongoDBStore(
  {
    uri: 'mongodb://localhost:27017/prueba',
    collection: 'sessions'
  });

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

app.use(require('express-sessions')({
  secret: 'the only truth about life is death',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge:1000*60*60*3 // 3 horas
    //maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    //maxAge: 1000 * 60 * 60 * 24 * 30 // 1 month
    //maxAge: 1000 * 60 * 60 * 24 * 265 // 1 year
  },
  store: store
}));
server = app.listen(3000);
*/
/*app.use(session({
   secret: 'justanotherpbtool',
   resave:true,saveUninitialized:true,
   cookie: { maxAge: 1000*60*60*3}
 }
));*/


app.use('/', routes);
app.use('/api', api);
//app.use('/users', users);
//app.use('/mobile', mob);

app.get('/contactanos',function(req, res, next){
  var renderobject={};
  renderObject.Nombres=[];
  renderObject.Nombres.push({nombre:"Karla"});
  renderObject.Nombres.push({nombre:"Soraya"});
  renderObject.Nombres.push({nombre:"Juan"});
  res.render('contactanos', renderObject);
  });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

return app;

}

module.exports = getApp;
