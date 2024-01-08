const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const challengesDAO = require('./../models/challengesDAO');

// 챌린지 타이틀로 참가자 목록 조회
router.get('/participants', async (req, res, next) => {
  const { challengeTitle } = req.query;
  challengesDAO.getParticipantsByTitle(challengeTitle, (resp) => {
    res.json(resp);
  });
});

// 새로운 참가자 추가
router.post('/participants', async (req, res, next) => {
  const data = req.body;
  challengesDAO.addParticipant(data, (resp) => {
    res.json(resp);
  });
});

// 참가자 삭제
router.delete('/participants', async (req, res, next) => {
  const { challengeId, participantId } = req.body;
  challengesDAO.removeParticipant(challengeId, participantId, (resp) => {
    res.json(resp);
  });
});

// 챌린지 완료 처리
router.post('/complete', async (req, res, next) => {
  const { challengeId, userId } = req.body;
  challengesDAO.completeChallenge(challengeId, userId, (resp) => {
    res.json(resp);
  });
});

// 카테고리별 챌린지 목록 조회
router.get('/category', async (req, res, next) => {
  const { category } = req.query;
  challengesDAO.getChallengesByCategory(category, (resp) => {
    res.json(resp);
  });
});

// 도전 목록 조회
router.get('/', async (req, res, next) => {
  const query = req.query;
  challengesDAO.getAllChallenges(query, (resp) => {
    res.json(resp);
  });
});

// 도전 생성
router.post('/', async (req, res, next) => {
  // console.log('router=> ', req.body);
  const data = req.body;
  challengesDAO.createChallenge(data, (resp) => {
    res.json(resp);
  });
});

// 도전 상세
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  challengesDAO.getChallengeById(id, (resp) => {
    res.json(resp);
  });
});

// 도전 수정
router.put('/', async (req, res, next) => {
  const data = req.body;
  challengesDAO.updateChallenge(data, (resp) => {
    res.json(resp);
  });
});

// 도전 삭제
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  challengesDAO.deleteChallenge(id, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티
router.get('/:id/board', async (req, res, next) => {
  const { id } = req.params;
  challengesDAO.boardList(id, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 상세, 댓글
router.get('/board/:id/comment', async (req, res, next) => {
  const { id } = req.params;
  challengesDAO.board(id, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 생성
router.post('/board', async (req, res, next) => {
  const data = req.body;
  challengesDAO.insert(data, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 수정
router.put('/board', async (req, res, next) => {
  const data = req.body;
  challengesDAO.update(data, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 삭제
router.delete('/board/:id', async (req, res, next) => {
  const { id } = req.params;
  challengesDAO.delete(id, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 댓글 생성
router.post('/board/:id/comment', async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  challengesDAO.insertComment(id, data, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 댓글 삭제
router.delete('/board/comment/:id', async (req, res, next) => {
  const { id } = req.params;
  challengesDAO.deleteComment(id, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
