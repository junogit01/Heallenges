const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const indexDAO = require('./../models/indexDAO');
const challengesCommunityDAO = require('./../models/challengesCommunityDAO');
const multer = require('multer');
const path = require('path');

const imageUploadPath = 'http://heallenges.cafe24app.com/images/users/';

const uploadName = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.join(__dirname, '..', 'public', 'images', 'users')),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 1024 * 1024 * 3 },
});

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { title: 'Heallenges' });
});

// 회원가입
router.post('/signup', uploadName.single('profile'), async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const profile_image = req.file
      ? `${imageUploadPath}${req.file.filename}`
      : `${imageUploadPath}no_image.jpg`;

    const insertData = {
      ...data,
      profile_image,
      zipcode: data.address.postcode,
      address: data.address.main,
    };
    indexDAO.signup(insertData, (resp) => {
      res.json(resp);
    });
  } catch (error) {
    next(error);
  }
});

// 로그인
router.post('/login', function (req, res, next) {
  const data = req.body;
  indexDAO.login(data, (resp) => {
    res.json(resp);
  });
});

// 로그아웃
router.get('/logout', function (req, res, next) {
  res.json('로그아웃');
});

// 메인 도전 목록 조회
router.get('/main', function (req, res, next) {
  challengesCommunityDAO.getChallenges((resp) => {
    res.json(resp);
  });
});

module.exports = router;
