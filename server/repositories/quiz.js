const Quiz = require('../Models/Quiz');

class QuizRepository {
  async findAll() {
    try {
      return await Quiz.find();
    } catch (error) {
      throw new Error(`Failed to fetch quizzes: ${error.message}`);
    }
  }

  async create(quizData) {
    try {
      const { key, id, madeBy, quizTopic, noOfQuestions, questionDetails } = quizData;
      const newQuiz = new Quiz({ 
        key, id, madeBy, quizTopic, noOfQuestions, questionDetails 
      });
      return await newQuiz.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new Error(`Validation failed: ${error.message}`);
      }
      throw new Error(`Failed to create quiz: ${error.message}`);
    }
  }

  async deleteByKey(key) {
    try {
      const result = await Quiz.findOneAndDelete({ key });
      if (!result) {
        throw new Error('Quiz not found');
      }
      return result;
    } catch (error) {
      throw new Error(`Failed to delete quiz: ${error.message}`);
    }
  }


  async findByKey(key) {
    try {
      return await Quiz.findOne({ key });
    } catch (error) {
      throw new Error(`Failed to find quiz: ${error.message}`);
    }
  }
}

module.exports = new QuizRepository();