const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const marketDAO = require('./../models/marketDAO');

router.get('/', async (req, res, next) => {
  const query = req.query; // get용
  marketDAO.boardList(query, (resp) => {
    res.json(resp);
  });
});

router.get('/:id', function (req, res, next) {
  const params = req.params;
  marketDAO.board(params, (resp) => {
    res.json(resp);
  });
});

router.post('/', function (req, res, next) {
  const data = req.body;
  marketDAO.insert(data, (resp) => {
    res.json(resp);
  });
});

router.post('/purchase', function (req, res, next) {
  const data = req.body;
  console.log(data);
  marketDAO.purchase(data, (resp) => {
    res.json(resp);
  });
});

router.put('/', async (req, res, next) => {
  const data = req.body;
  marketDAO.update(data, (resp) => {
    res.json(resp);
  });
});

router.delete('/:id', async (req, res, next) => {
  const params = req.params;
  marketDAO.delete(params, (resp) => {
    res.json(resp);
  });
});

module.exports = router;
