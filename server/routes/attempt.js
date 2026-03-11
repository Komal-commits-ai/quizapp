const express = require('express');
const router = express.Router();
const attemptController = require('../controller/attempt');


router.get('/', attemptController.getAllAttempts);


router.post('/', attemptController.createAttempt);

module.exports = router;