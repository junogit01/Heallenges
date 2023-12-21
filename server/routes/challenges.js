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
router.get('/:challenge', async (req, res, next) => {
  const query = req.query;
  challengesDAO.getChallengeById(query, (resp) => {
    res.json(resp);
  });
});

// 도전 수정
router.put('/:challenge', async (req, res, next) => {
  const data = req.body;
  challengesDAO.updateChallenge(data, (resp) => {
    res.json(resp);
  });
});

// 도전 삭제
router.delete('/:challenge', async (req, res, next) => {
  const params = req.params;
  challengesDAO.deleteChallenge(params, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티
router.get('/:challenge-id/board', async (req, res, next) => {
  const params = req.params;
  challengesDAO.boardList(params, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 상세, 댓글
router.get('/:challenge/board/:postid', async (req, res, next) => {
  const params = req.params;
  challengesDAO.board(params, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 생성
router.post('/:challenge/board/:postid', async (req, res, next) => {
  const data = req.body;
  challengesDAO.insert(data, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 수정
router.put('/:challenge/board/:postid', async (req, res, next) => {
  const data = req.body;
  console.log(data);
  challengesDAO.update(data, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 삭제
router.delete('/:challenge/board/:postid', async (req, res, next) => {
  const params = req.params;
  challengesDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 댓글 생성
router.post('/:challenge/board/:postid', async (req, res, next) => {
  const data = req.body;
  challengesDAO.insertComment(data, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 댓글 삭제
router.delete('/:challenge/board/:postid/:id', async (req, res, next) => {
  const params = req.params;
  challengesDAO.deleteComment(params, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
