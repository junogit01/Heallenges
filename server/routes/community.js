const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const communityDAO = require('../models/communityDAO');

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

// 게시물 삭제: DELETE /:id(프론트단 와서 아이디 받아서 테스트용)
// router.delete('/:id', async (req, res) => {
//   const postId = req.params.id;
//   const currentUserId = req.user.id; // 현재 사용자의 ID를 세션 또는 토큰 등에서 가져옴

//   communityDAO.delete({ id: postId, user_id: currentUserId }, (result) => {
//     res.status(result.status).json(result);
//   });
// });

// 전체 또는 카테고리 게시물 리스트 조회
router.get('/:id?', (req, res) => {
  const categoryId = req.params.id || null; // 동적 라우팅 매개변수를 사용하여 카테고리 ID를 가져옵니다. 없으면 null로 설정합니다.

  communityDAO.boardList(categoryId, (resp) => {
    res.json(resp);
  });
});

// 게시물 상세 조회
router.get('/board/:id', async (req, res, next) => {
  const id = req.params.id;
  communityDAO.board(id, (resp) => {
    res.json(resp);
  });
});

// 댓글 입력
router.post('/board/:id', (req, res) => {
  const boardId = req.params.id;
  const { contents } = req.body;

  // 게시물 ID와 댓글 내용을 사용하여 댓글을 등록
  communityDAO.commentInsert({ post_id: boardId, user_id: '사용자 아이디', contents }, (result) => {
    res.status(result.status).json(result);
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
