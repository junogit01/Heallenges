const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
// 라우터 정의해야 추가가 가능하다
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rankRouter = require('./routes/Rank');
const communitysRouter = require('./routes/communitys');

const app = express();
const PORT = 8000;
// view engine setup
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html')); // index.html 파일 경로
});

app.set('view engine', 'ejs');
// app.get('/', (req, res) => {
//   res.render('index');
// });
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// 여기다가 라우터 추가하기
app.use('/', indexRouter);
app.use('/mypage', usersRouter);
app.use('/rank', rankRouter);
app.use('/community', communitysRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
