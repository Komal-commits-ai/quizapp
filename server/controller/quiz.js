const quizRepository = require('../repositories/quiz');

class QuizController {
  async getAllQuizzes(req, res) {
    try {
      const quizzes = await quizRepository.findAll();
      res.json(quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }

  async createQuiz(req, res) {
    try {
      const { key, id, madeBy, quizTopic, noOfQuestions, questionDetails } = req.body;
      const newQuiz = await quizRepository.create({
        key, id, madeBy, quizTopic, noOfQuestions, questionDetails
      });
      res.status(201).json(newQuiz);
    } catch (error) {
      console.error('Error creating quiz:', error);
      
      if (error.message.includes('Validation failed')) {
        res.status(400).json({ 
          error: 'Bad Request',
          message: error.message 
        });
      } else {
        res.status(500).json({ 
          error: 'Internal server error',
          message: error.message 
        });
      }
    }
  }

  async deleteQuiz(req, res) {
    try {
      const { key } = req.params;
      await quizRepository.deleteByKey(key);
      res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      console.error('Error deleting quiz:', error);
      
      if (error.message.includes('not found')) {
        res.status(404).json({ 
          error: 'Not Found',
          message: error.message 
        });
      } else {
        res.status(500).json({ 
          error: 'Internal server error',
          message: error.message 
        });
      }
    }
  }
}

module.exports = new QuizController();