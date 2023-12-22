const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const communityDAO = require('./../models/communityDAO');

// 게시물 입력: POST /
router.post('/', (req, res) => {
  const data = req.body;
  communityDAO.insert(data, (resp) => {
    res.json(resp);
  });
});

// 게시물 수정: PUT /:id
router.put('/:id', async (req, res) => {
  const data = req.body;
  data.id = req.params.id; // 게시물 ID를 URL에서 가져와서 데이터에 추가
  communityDAO.update(data, (resp) => {
    res.json(resp);
  });
});

// 게시물 삭제: DELETE /:id
router.delete('/:id', async (req, res) => {
  const params = req.params;
  communityDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

// 게시물 리스트 이 밑에부터 주소작업 다시해야됨 >> 에러발생
// 게시물 리스트 조회
router.get('/list', async (req, res, next) => {
  const query = req.query; // get용
  communityDAO.boardList(query, (resp) => {
    res.json(resp);
  });
});

// 게시물 상세 조회
router.get('/board/:id', function (req, res, next) {
  const params = req.params;
  communityDAO.board(params, (resp) => {
    res.json(resp);
  });
});

// 댓글 입력: POST /:id/:id
router.post('/:id/:comment_id', (req, res) => {
  const data = req.body;
  data.post_id = req.params.id; // 게시물 ID를 URL에서 가져와서 데이터에 추가
  communityDAO.c_insert(data, (resp) => {
    res.json(resp);
  });
});

// 댓글 수정: PUT /:id/:id
router.put('/:id/:comment_id', async (req, res) => {
  const data = req.body;
  data.comment_id = req.params.id; // 댓글 ID를 URL에서 가져와서 데이터에 추가
  communityDAO.c_update(data, (resp) => {
    res.json(resp);
  });
});

// 댓글 삭제: DELETE /:id/:id
router.delete('/:id/:comment_id', async (req, res) => {
  const params = { ...req.params };
  params.post_id = req.params.id; // 게시물 ID를 URL에서 가져와서 데이터에 추가
  communityDAO.c_delete(params, (resp) => {
    res.json(resp);
  });
});

// 좋아요 등록
router.post('/:id/:like_id', (req, res) => {
  const data = req.body;
  communityDAO.like(data, (resp) => {
    res.json(resp);
  });
});

// 좋아요 취소
router.delete('/:id/:post_id/:user_id', (req, res) => {
  const params = req.params;
  communityDAO.notlike(params, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
