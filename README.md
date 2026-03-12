Quiz App (MERN Stack)
🚀 Overview

This is a full-stack Quiz Application built using MERN (MongoDB, Express, React, Node.js).
It allows users to create, attempt, and track quizzes with a responsive, modern interface.

Ideal for educational platforms, online assessments, or practice apps.

🛠 Features
User Features

Create Quizzes – Add your own questions and answers.

Attempt Quizzes – Solve quizzes in real-time.

Track Performance – See your past attempts and scores.

Quiz History – Monitor your progress over time.

Responsive Design – Works on desktop, tablet, and mobile devices.

Admin / Advanced Features

Manage quizzes and questions.

Edit or delete quizzes.

View all user attempts and statistics.

💻 Technology Stack

Frontend: React.js (src/)

Backend: Node.js + Express (server/)

Database: MongoDB Atlas

Deployment: Frontend → Vercel, Backend → Render

CORS Handling: Configured for frontend-backend communication

📂 Folder Structure
quizapp/
 ├── server/        # Node/Express backend
 │   ├── server.js
 │   ├── package.json
 │   └── .env       # MongoDB URI and PORT
 └── src/           # React frontend source code
     ├── App.js
     ├── components/
     └── index.js
⚡ Local Installation

Clone the repository:

git clone https://github.com/Komal-commits-ai/quizapp.git

Backend Setup

cd server
npm install
npm start

Server runs on:

http://localhost:5000

Frontend Setup

cd src
npm install
npm start

Frontend runs on:

http://localhost:3000

Make sure frontend API calls point to the backend URL (http://localhost:5000) during development.

🌐 Deployment
Backend → Render

server/ folder deployed as Node.js Web Service

Environment variable: MONGO_URI for MongoDB Atlas

Live URL example:

https://quizapp-backend-kwq5.onrender.com
Frontend → Render

src/ folder deployed with Create React App build

API calls updated to use Render backend URL

Live URL example:

https://quizapp-frontend-ii6m.onrender.com


📈 Benefits

Full MERN stack implementation

Interactive and responsive frontend

Supports quiz creation, solving, and history tracking

Easily deployable using Vercel + Render + MongoDB Atlas

✨ Future Enhancements

JWT-based user authentication

Leaderboards and rankings

Real-time multiplayer quiz mode

Analytics dashboard for performance tracking

📞 Contact / Fiverr Profile

For customization or freelance requests, reach out to me on Fiverr:
https://www.fiverr.com/users/komal_zahid/seller_dashboard
