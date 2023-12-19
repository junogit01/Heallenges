const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const communityDAO = require('./../models/communityDAO');

// 게시물 입력
router.post('/insert', function (req, res, next) {
  const data = req.body;
  communityDAO.insert(data, (resp) => {
    res.json(resp);
  });
});

// 게시물 수정
router.put('/update', async (req, res, next) => {
  const data = req.body;
  communityDAO.update(data, (resp) => {
    res.json(resp);
  });
});

// 게시물 삭제
router.delete('/delete/:postID', async (req, res, next) => {
  const params = req.params;
  communityDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

router.get('/list', async (req, res, next) => {
  const query = req.query; // get용
  communityDAO.boardList(query, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
