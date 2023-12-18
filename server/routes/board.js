const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const boardDAO = require('./../models/boardDAO');

router.get('/boardList', async (req, res, next) => {
  const query = req.query; // get용
  boardDAO.boardList(query, (resp) => {
    res.json(resp);
  });
});

router.get('/board/:id', function (req, res, next) {
  const params = req.params;
  boardDAO.board(params, (resp) => {
    res.json(resp);
  });
});

router.post('/insert', function (req, res, next) {
  const data = req.body;
  boardDAO.insert(data, (resp) => {
    res.json(resp);
  });
});

router.put('/update', async (req, res, next) => {
  const data = req.body;
  boardDAO.update(data, (resp) => {
    res.json(resp);
  });
});

router.delete('/delete/:id', async (req, res, next) => {
  const params = req.params;
  boardDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
