const express = require('express');
const router = express.Router();
const StatisticsController = require('../controllers/StatisticsController');


router.get('/', StatisticsController.getClientStatistics)

module.exports = router;
