var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose')
var config = require('./lib/config')
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var movieRouter = require('./routes/movie');
var userRouter = require('./routes/user');
var auth_middleware = require('./lib/middleware/auth')
var app = express();

mongoose.createConnection(config.database);
// mongoose.connect(config.database);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// rutas inseguras
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
// con auth -> rutas seguras
// app.use(auth_middleware)
app.use('/movie', movieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
