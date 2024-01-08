const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const rankDAO = require('./../models/rankDAO');

// 랭킹 전체 조회
// router.get('/', async (req, res, next) => {
//   const query = req.query;
//   rankDAO.rankList(query, (resp) => {
//     res.json(resp);
//   });
// });

router.get('/', async (req, res, next) => {
  const { no, size } = req.query;

  rankDAO.rankList({ no, size }, (resp) => {
    res.json(resp);
  });
});

// 랭킹 유저 검색
router.get('/search', (req, res, next) => {
  const searchKeyword = req.query.keyword; // 검색어는 쿼리 매개변수로 전달됨
  rankDAO.rankSearch(searchKeyword, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
