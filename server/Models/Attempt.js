const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  name: { type: String, required: true },
  madeBy: { type: String, default: 'Unknown' },
  topic: { type: String, default: 'Untitled Quiz' },
  noOfQuestions: { type: Number, default: 0 },
  tscore: { type: Number, default: 0 },
  str_result: { type: Array, default: [] },
  str_selectedAnswer: { type: Array, default: [] },
  questions: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Attempt', attemptSchema);
