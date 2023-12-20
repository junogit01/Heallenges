const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const rankDAO = require('./../models/rankDAO');

router.get('/rankList', async (req, res, next) => {
  const query = req.query;
  rankDAO.rankList(query, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
