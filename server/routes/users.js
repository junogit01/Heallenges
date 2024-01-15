const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const multer = require('multer');
const path = require('path');
const userDAO = require('./../models/userDAO');

const imageUploadPath = 'http://heallenges.cafe24app.com/images/users/';

const uploadName = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.join(__dirname, '..', 'public', 'images', 'users')),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 1024 * 1024 * 3 },
});

// 마이페이지
router.get('/:id', async (req, res, next) => {
  const params = req.params; // get
  userDAO.mypage(params, (resp) => {
    res.json(resp);
  });
});

// 회원정보 수정
router.put('/:id', uploadName.single('profile'), async (req, res, next) => {
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
    userDAO.update(insertData, (resp) => {
      res.json(resp);
    });
  } catch (error) {
    next(error);
  }
});

// 비밀번호 변경
router.post('/:id/password', async (req, res, next) => {
  const body = req.body;
  userDAO.updatePassword(body, (resp) => {
    res.json(resp);
  });
});

// 회원정보 삭제
router.delete('/:id', async (req, res, next) => {
  const params = req.params;
  userDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
