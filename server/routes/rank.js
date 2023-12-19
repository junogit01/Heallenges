const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const rankDAO = require('./../models/rankDAO');

router.get('/rankList', async (req, res, next) => {
  // const data = req.body; 이건 post용
  const query = req.query; // 이건 get용
  // const user = await userDAO.checkEmail(data);
  rankDAO.rankList(query, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
