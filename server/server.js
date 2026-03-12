const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Render sets the PORT automatically; 10000 is the common default for local fallback
const PORT = process.env.PORT || 10000; 

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
// Simplified for Mongoose 6+ (no longer requires useNewUrlParser/useUnifiedTopology)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    // This helps you see the error in Render Logs
  });

// --- Routes ---
const quizRoutes = require('./routes/quiz');
const attemptRoutes = require('./routes/attempt');

app.use('/api/quizzes', quizRoutes);
app.use('/api/attempts', attemptRoutes);

// --- Status & Health Checks ---
app.get('/', (req, res) => {
  res.send('🚀 Backend is running!');
});

// A special route to test if the DB is actually responding
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({
    status: 'Server is up',
    database: dbStatus,
    env: process.env.NODE_ENV || 'production'
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
