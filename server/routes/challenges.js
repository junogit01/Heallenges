const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const multer = require('multer');
const path = require('path');

const imageUploadPath = 'http://heallenges.cafe24app.com/images/challenges/community/';
const detailUploadPath = 'http://heallenges.cafe24app.com/images/challenges/detail/';
const challengesDAO = require('./../models/challengesDAO');
const challengesCommunityDAO = require('../models/challengesCommunityDAO');

const uploadName = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'public', 'images', 'challenges', 'community'));
    },

    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 1024 * 1024 * 3 },
});

const detailUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'public', 'images', 'challenges', 'detail'));
    },
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 1024 * 1024 * 30 },
});

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
router.post('/', detailUpload.single('profile'), async (req, res, next) => {
  const data = JSON.parse(req.body.data); // JSON.parse(req.body);
  console.log('file upload=> ', data);

  const profileImageName = req.file
    ? `${detailUploadPath}${req.file.filename}`
    : `${detailUploadPath}noimage.jpg`;
  res.send('OK');
  const sendData = { ...data, main_image: profileImageName };

  challengesDAO.createChallenge(sendData, (resp) => {
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
router.put('/:id', detailUpload.single('profile'), async (req, res, next) => {
  const data = JSON.parse(req.body.data);

  const profileImageName = req.file
    ? `${detailUploadPath}${req.file.filename}`
    : `${detailUploadPath}noimage.jpg`;
  const sendData = { ...data, main_image: profileImageName };
  console.log(sendData);
  try {
    challengesDAO.updateChallenge(sendData, (resp) => {
      res.json(resp);
    });
  } catch (err) {
    console.log(err);
  }
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
  const params = req.params;
  challengesCommunityDAO.challengeBoardList(params, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 상세, 댓글
router.get('/:challengeId/board/:id', async (req, res, next) => {
  const params = req.params;
  console.log(params);
  challengesCommunityDAO.challengeBoardDetail(params, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 생성
router.post('/:challengeId/board', uploadName.single('image'), async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const image = req.file ? `${imageUploadPath}${req.file.filename}` : '';

    const insertData = {
      ...data,
      image,
    };
    challengesCommunityDAO.challengeBoardInsert(insertData, (resp) => {
      res.json(resp);
    });
  } catch (error) {
    next(error);
  }
});

// 도전별 커뮤니티 게시글 수정
router.put('/:challengeId/board/:id', uploadName.single('image'), async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const image = req.file ? `${imageUploadPath}${req.file.filename}` : '';

    const insertData = {
      ...data,
      image,
    };
    challengesCommunityDAO.challengeBoardUpdate(insertData, (resp) => {
      res.json(resp);
    });
  } catch (error) {
    next(error);
  }
});

// 도전별 커뮤니티 게시글 삭제
router.delete('/:challengeId/board/:id', async (req, res, next) => {
  const params = req.params;
  challengesCommunityDAO.challengeBoardDelete(params, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 댓글 생성
router.post('/:challengeId/board/:id', async (req, res, next) => {
  const data = req.body;
  challengesCommunityDAO.challengeInsertComment(data, (resp) => {
    res.json(resp);
  });
});

// 도전별 커뮤니티 게시글 댓글 삭제
router.delete('/:challengeId/board/:postId/:id', async (req, res, next) => {
  const params = req.params;
  challengesCommunityDAO.challengeDeleteComment(params, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
