const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const userDAO = require('./../models/userDAO');

/**
 브라우저로 온 요청을 받아 처리하는 파일 => 라우터
 DB관련 처리는 받은 데이터를 userDAO에 넘겨서 처리 결과를 리턴받아 JSON으로 브라우저에 출력한다.
 브라우저 요청(데이터가 있을 수 있고 없을 수 있고) => 라우터가 => DAO에서 처리 => 다시 라우터가 받아 => 브라우저에 결과 출력
 */
/* GET users listing. */

// 회원가입
router.post('/signup', function (req, res, next) {
  const data = req.body;
  userDAO.signup(data, (resp) => {
    res.json(resp);
  });
});

// 이메일 중복체크
router.post('/checkEmail', async (req, res, next) => {
  const data = req.body;
  // const user = await userDAO.checkEmail(data);
  userDAO.checkEmail(data, (resp) => {
    res.json(resp);
  });
});

// 로그인
router.post('/login', function (req, res, next) {
  const data = req.body;
  // console.log(data);
  userDAO.login(data, (resp) => {
    res.json(resp);
  });
});

// 로그아웃
router.get('/logout', function (req, res, next) {
  res.json('로그아웃');
});

router.get('/userList', async (req, res, next) => {
  // const data = req.body; 이건 post용
  const query = req.query; // 이건 get용
  // const user = await userDAO.checkEmail(data);
  userDAO.userList(query, (resp) => {
    res.json(resp);
  });
});

// 마이페이지
router.get('/mypage/:id', async (req, res, next) => {
  const params = req.params; // 이건 get용
  userDAO.mypage(params, (resp) => {
    console.log(resp);
    res.json(resp);
  });
});

// 회원정보 수정
router.put('/mypage/:id', async (req, res, next) => {
  const data = req.body;
  userDAO.update(data, (resp) => {
    res.json(resp);
  });
});

// 회원정보 삭제
router.delete('/mypage/:id', async (req, res, next) => {
  const params = req.params;
  console.log(params);

  userDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

// 참여하는 도전
router.get('/mypage/challenges/:id', async (req, res, next) => {
  const params = req.params; // 이건 get용
  userDAO.myChallenge(params, (resp) => {
    console.log(resp);
    res.json(resp);
  });
});

// ejs를 쓸게 아니면 update엔 put을 쓴다.

module.exports = router;
