const attemptRepository = require('../repositories/attempt');

class AttemptController {
  async getAllAttempts(req, res) {
    try {
      console.log('Fetching all attempts...');
      const attempts = await attemptRepository.findAll();
      res.json(attempts);
    } catch (error) {
      console.error('Error fetching attempts:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }

  async createAttempt(req, res) {
    try {
      console.log('Received attempt data:', JSON.stringify(req.body, null, 2));
      
      const newAttempt = await attemptRepository.create(req.body);
      
      console.log('Attempt saved successfully');
      res.status(201).json(newAttempt);
    } catch (error) {
      console.error('Error creating attempt:', error.message);
      
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
}

module.exports = new AttemptController();