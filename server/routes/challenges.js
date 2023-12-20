const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const challengesDAO = require('./../models/challengesDAO');
const communityDAO = require('./../models/communityDAO');

// 도전 목록 조회
router.get('/', async (req, res, next) => {
  const query = req.query;
  challengesDAO.rankList(query, (resp) => {
    res.json(resp);
  });
});

// 도전 생성
router.post('/', async (req, res, next) => {
  const data = req.body;
  challengesDAO.createChallenge(data, (resp) => {
    res.json(resp);
  });
});

// 도전 상세
router.get('/:id', async (req, res, next) => {
  const query = req.query;
  challengesDAO.getChallengeById(query, (resp) => {
    res.json(resp);
  });
});

// 도전 수정
router.put('/:id', async (req, res, next) => {
  const data = req.body;
  challengesDAO.updateChallenge(data, (resp) => {
    res.json(resp);
  });
});

// 도전 삭제
router.delete('/:id', async (req, res, next) => {
  const params = req.params;
  challengesDAO.deleteChallenge(params, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티
router.get('/:id/board', async (req, res, next) => {
  const query = req.query;
  challengesDAO.rankList(query, (resp) => {
    res.json(resp);
  });
});

// 커뮤니티 게시글 생성
router.post('/:id/board', async (req, res, next) => {
  const data = req.body;
  communityDAO.insert(data, (resp) => {
    res.json(resp);
  });
});

// 커뮤니티 게시글 수정
router.put('/:id/board', async (req, res, next) => {
  const data = req.body;
  communityDAO.update(data, (resp) => {
    res.json(resp);
  });
});

router.delete('/:id/board/:id', async (req, res, next) => {
  const params = req.params;
  communityDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
