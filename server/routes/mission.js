const express = require('express');
const router = express.Router();
const missionDAO = require('./../models/missionDAO');

router.post('/create', async (req, res) => {
  const missionData = req.body;
  missionDAO.createMission(missionData, (response) => {
    res.status(response.status).json(response);
  });
});

module.exports = router;
