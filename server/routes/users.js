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

router.post('/checkEmail', async (req, res, next) => {
  const data = req.body;
  // const user = await userDAO.checkEmail(data);
  userDAO.checkEmail(data, (resp) => {
    res.send(resp);
  });
});

router.get('/userList', async (req, res, next) => {
  // const data = req.body; 이건 post용
  const query = req.query; // 이건 get용
  // const user = await userDAO.checkEmail(data);
  userDAO.userList(query, (resp) => {
    res.json(resp);
  });
});

// ejs를 쓸게 아니면 update엔 put을 쓴다.
router.put('/', async (req, res, next) => {
  const data = req.body;
  userDAO.update(data, (resp) => {
    res.send(resp);
  });
});

router.delete('/delete/:email', async (req, res, next) => {
  const params = req.params;
  console.log(params);

  userDAO.delete(params, (resp) => {
    res.send(resp);
  });
});

router.post('/signup', function (req, res, next) {
  const data = req.body;
  // console.log(data);

  userDAO.signup(data, (resp) => {
    res.send(resp);
    // key:value값으로 보낼떈 json
    // express는 send로 보내도 json으로 묶어서 보낸다. 그냥 json으로 작성해서 보내라
  });

  /* 
  이건 리턴으로 할 때 이렇게 작성한다.
  router.post('/signup', async (Req,res, next) => {
    const data = req.body;
    try {
      const user =  await userDAO.signup(data);
      res.json(user)
    } catch (error) {
      console.error(error)
    }
  })
  
  */
  // console.log(user);
});
router.post('/login', function (req, res, next) {
  const data = req.body;
  // console.log(data);

  userDAO.login(data, (resp) => {
    res.send(resp);
  });
});
router.get('/logout', function (req, res, next) {
  res.send('로그아웃');
});

module.exports = router;
