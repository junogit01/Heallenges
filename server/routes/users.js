const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userDAO = require('./../models/userDAO');

// 마이페이지
router.get('/:id', async (req, res, next) => {
  const params = req.params; // get
  userDAO.mypage(params, (resp) => {
    res.json(resp);
  });
});

// 회원정보 수정
router.put('/:id', async (req, res, next) => {
  const data = req.body;
  userDAO.update(data, (resp) => {
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
