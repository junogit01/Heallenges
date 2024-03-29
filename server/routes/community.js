/* eslint-disable camelcase */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const multer = require('multer');
const path = require('path');

const communityDAO = require('../models/communityDAO');

// const imageUploadPath = 'http://localhost:8001/images/community/';
const imageUploadPath = 'http://heallenges.cafe24app.com/images/community/';

const uploadName = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.join(__dirname, '..', 'public', 'images', 'community')),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 1024 * 1024 * 3 },
});

// 게시물 입력: POST /
router.post('/', uploadName.single('image'), async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    console.log(data);

    const Image = req.file ? `${imageUploadPath}${req.file.filename}` : ``;
    const insertData = {
      ...data,
      Image,
    };

    // console.log(Image);
    console.log('Inserting data:', insertData);

    communityDAO.insert(insertData, (resp) => {
      res.json(resp);
    });
  } catch (error) {
    next(error);
  }
});

// 게시물 수정: PUT /:id
router.put('/:id', uploadName.single('image'), async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    console.log(data);

    const Image = req.file ? `${imageUploadPath}${req.file.filename}` : ``;
    const updateData = {
      ...data,
      Image,
    };

    // console.log(Image);
    console.log('updating data:', updateData);

    communityDAO.update(updateData, (resp) => {
      res.json(resp);
    });
  } catch (error) {
    next(error);
  }
});

// 게시물 삭제: DELETE /:id
router.delete('/:id', async (req, res) => {
  const params = req.params;
  communityDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

// 전체 또는 카테고리 게시물 리스트 조회
router.get('/', (req, res) => {
  communityDAO.boardList((resp) => {
    res.json(resp);
  });
});

// 게시물 상세 조회
router.get('/community/:id/', async (req, res, next) => {
  const id = req.params.id;
  communityDAO.board(id, (resp) => {
    res.json(resp);
  });
});

// 댓글 입력
router.post('/comment', (req, res) => {
  const data = req.body;
  communityDAO.commentInsert(data, (resp) => {
    res.json(resp);
  });
});

// 댓글 삭제
router.delete('/comment/:comment_id', async (req, res) => {
  const comment_id = req.params.comment_id;

  communityDAO.commentDelete(comment_id, (resp) => {
    res.json(resp);
  });
});

// 좋아요 등록
router.post('/like/:user_id/:post_id', (req, res) => {
  const { user_id, post_id } = req.params;
  const data = { user_id, post_id };

  communityDAO.like(data, (resp) => {
    res.json(resp);
  });
});

// 좋아요 취소
router.delete('/like/:user_id/:post_id', (req, res) => {
  const { user_id, post_id } = req.params;
  const data = { user_id, post_id };

  communityDAO.notlike(data, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
