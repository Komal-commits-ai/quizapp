const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const quizRoutes = require('./routes/quiz');
const attemptRoutes = require('./routes/attempt');
app.use('/api/quizzes', quizRoutes);
app.use('/api/attempts', attemptRoutes);


app.get('/', (req, res) => {
  res.send('Backend is running!');
});

