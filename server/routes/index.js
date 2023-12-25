const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const indexDAO = require('./../models/indexDAO');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Heallenges' });
});

// 회원가입
router.post('/signup', function (req, res, next) {
  const data = req.body;
  console.log(data);
  indexDAO.signup(data, (resp) => {
    res.json(resp);
  });
});

// 로그인
router.post('/login', function (req, res, next) {
  const data = req.body;
  // console.log(data);
  indexDAO.login(data, (resp) => {
    res.json(resp);
  });
});

// 로그아웃
router.get('/logout', function (req, res, next) {
  res.json('로그아웃');
});
module.exports = router;
