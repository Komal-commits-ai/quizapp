const express = require('express');
const router = express.Router();
const quizController = require('../controller/quiz');


router.get('/', quizController.getAllQuizzes);

router.post('/', quizController.createQuiz);

router.delete('/:key', quizController.deleteQuiz);

module.exports = router;