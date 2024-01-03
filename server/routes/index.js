const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const indexDAO = require('./../models/indexDAO');
const multer = require('multer');
const path = require('path');

const imageUploadPath = 'http://localhost:8001/images/users/';

const uploadName = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.join(__dirname, '..', 'public', 'images', 'users')),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 1024 * 1024 * 3 },
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Heallenges' });
});

// 이메일 검증
router.get('/signup', async (req, res, next) => {
  const params = req.params; // get
  userDAO.mypage(params, (resp) => {
    res.json(resp);
  });
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

// 이미지 업로드
// router.post('/signup/upload', upload.single('image'), function (req, res, next) {
//   const data = req.body;
//   indexDAO.insertImage(data, (resp) => {
//     res.json(resp);
//   });
// });

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

module.exports = router;
