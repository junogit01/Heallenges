const express = require('express');
const router = express.Router();
const missionDAO = require('./../models/missionDAO');

// 미션 생성
router.post('/', (req, res, next) => {
  const data = req.body;
  missionDAO.createMission(data, (resp) => {
    res.json(resp);
  });
});

// 미션 삭제
router.delete('/:id', async (req, res, next) => {
  const params = req.params;
  missionDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

// 미션 목록 타입별(day, week, month) 조회
router.get('/:type', (req, res, next) => {
  const params = req.params.type;
  missionDAO.missionList({ mission_type: params }, (resp) => {
    res.json(resp);
  });
});

// 미션 상세 조회
router.get('/missionlist/:id', function (req, res, next) {
  const params = req.params; // { id: 5 }
  missionDAO.missionDetail(params, (resp) => {
    res.json(resp);
  });
});

// 미션 참여
// router.post('/:id/participate', (req, res, next) => {
//   const missionId = req.params.id;
//   const userId = req.user.id;

//   missionDAO.participateMission({ user_id: userId, mission_id: missionId }, (resp) => {
//     res.json(resp);
//   });
// });
// 댓글 작성

// 댓글 수정

// 댓글 삭제

module.exports = router;
