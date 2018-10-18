var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// api接口
const basicInfoRouter = require('./routes/api/basicInfo')
const userInfoRouter = require('./routes/api/userInfo')
const teacherInfoRouter = require('./routes/api/teacherInfo')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 自己写到接口
app.use('/api/basicInfo',basicInfoRouter);
app.use('/api/userInfo',userInfoRouter);
app.use('/api/teacherInfo',teacherInfoRouter);




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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;