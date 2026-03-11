     const mongoose = require('mongoose');

     const quizSchema = new mongoose.Schema({
       key: { type: String, required: true, unique: true },  
       id: { type: String, required: true }, 
       madeBy: { type: String, required: true },
       quizTopic: { type: String, required: true },
       noOfQuestions: { type: Number, required: true },
       questionDetails: { type: Array, required: true },  
       createdAt: { type: Date, default: Date.now },
     });

     module.exports = mongoose.model('Quiz', quizSchema);
     