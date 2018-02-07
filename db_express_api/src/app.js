var express = require('express');
var path = require('path');
var fs = require('fs');
// var favicon = require('serve-favicon');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require("jsonwebtoken");

var requestLogger = require('morgan');
var detailsLogger = require('./logger/detailsLogger');
var errorLogger = require('./logger/errorLogger');

var maintenance = require('./routes/maintenance');
var login = require('./routes/login');
var register = require('./routes/register');
var password = require('./routes/passwd');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Who can request from browser from this API
  if (req.method === 'OPTIONS') { // OPTIONS asks if API will accept different things
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT"); // What methods are accepted with this api
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token"); // what headers are accepted with this api
    res.header("Access-Control-Request-Headers", "Token"); // what headers will be used by this api
    res.header("Access-Control-Max-Age", "600"); // how long until OPTIONS needs to be sent again Firefox caps this at 24 hours (86400 seconds) and Chromium at 10 minutes (600 seconds).
  }
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', "thisIsTheSecret");

// Loggers
// Keeps track of basics
app.use(requestLogger('dev'));
app.use(requestLogger('common', {
  stream: fs.createWriteStream(path.join(__dirname, '..', 'logs', 'Requests.log'), {flags: 'a'})
}));
// keeps track of details
app.use(detailsLogger);
// error logger is below

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (req.url !== "/login" && req.method !== 'OPTIONS') {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function (err, decoded) {
        if (err) {
          return res.status(403).json({ success: false, message: 'Failed to authenticate token.', error: err });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

    }
  } else {
    next();
  }
});

app.use('/register', register);
app.use('/login', login)
app.use('/maintenance', maintenance);
app.use('/password/reset', password);

// loggs errors
app.use(errorLogger);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
