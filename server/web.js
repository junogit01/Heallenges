const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const cors = require('cors');
const mysql = require('mysql2');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rankRouter = require('./routes/rank');
const missionRouter = require('./routes/mission');
const communitysRouter = require('./routes/communitys');
const challengesRouter = require('./routes/challenges');

const app = express();
const PORT = 8001;
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/users');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
});

const db = mysql.createConnection({
  host: 'heallenges.cafe24app.com',
  user: 'esens01',
  password: 'gpfflswl12!',
  database: 'esens01',
});

app.post('/upload', upload.single('image'), (req, res) => {
  const image = req.file.filename;
  const sql = 'UPDATE user SET profile_image = ? where id = 2';
  db.query(sql, [image], (err, result) => {
    if (err) return res.json({ Message: 'Error' });
    return res.json({ Message: 'Success' });
  });
});

// 여기다가 라우터 추가하기
app.use('/', indexRouter);
app.use('/mypage', usersRouter);
app.use('/mission', missionRouter);
app.use('/rank', rankRouter);
app.use('/community', communitysRouter);
app.use('/challenges', challengesRouter);

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
