const Attempt = require('../Models/Attempt');

class AttemptRepository {
  async findAll() {
    try {
      return await Attempt.find();
    } catch (error) {
      throw new Error(`Failed to fetch attempts: ${error.message}`);
    }
  }

  async create(attemptData) {
    try {
      const { name, madeBy, topic, noOfQuestions, tscore, str_result, str_selectedAnswer, questions } = attemptData;
      const newAttempt = new Attempt({ 
        name, madeBy, topic, noOfQuestions, tscore, str_result, str_selectedAnswer, questions 
      });
      return await newAttempt.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new Error(`Validation failed: ${error.message}`);
      }
      throw new Error(`Failed to create attempt: ${error.message}`);
    }
  }
}

module.exports = new AttemptRepository();