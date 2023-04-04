var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//导入account接口路由文件
const accountRouter = require('./routes/api/account')
const indexRouter = require('./routes/web/index');
const authRouter = require('./routes/web/auth');
const authApiRouter = require('./routes/api/auth')

//导入 express-session
const session = require('express-session')
const MongoStore = require('connect-mongo')

//导入配置项
const {DBHOST, DBPROT, DBNAME} = require('./config/config')

var app = express();

//设置 session 中间件
app.use(session({
  name: 'sid',
  secret: 'atguigu',
  saveUninitialized: false,//是否每次请求都设置一个cookie来储存session
  resave: true, //是否在每次请求后重新保存session
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPROT}/${DBNAME}`
  }),
  cookie: {
    httpOnly: true, //开启后前端无法通过js操作
    maxAge: 1000 * 60 * 60 //控制session id 时间 ms
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', accountRouter);
app.use('/', authRouter);
app.use('/api', authApiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404')
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
