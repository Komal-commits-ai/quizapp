import { useState, useEffect } from 'react';  
import { FetchQuizzes } from "./repositories/FetchQuizzes";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import { setQuiz } from './slices/quizSlice.js';

export default function SelectQuiz() {
  const [quizzes, setQuizzes] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchQuizzes.getData(); 
        setQuizzes(data);  
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setQuizzes([]);  
      } finally {
        setLoading(false);  
      }
    };
    fetchData();
  }, []);  
  const handleQuizClick = (quiz) => {
    dispatch(setQuiz(quiz)); 
    navigate('/name');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading quizzes...</div>;  
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-5 bg-gradient-to-r from-red-300 to-orange-300">
      <div className="w-full max-w-6xl bg-white rounded-3xl p-8 shadow-2xl">
       
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">Welcome to the Quiz Page</h1>
          <p className="text-2xl bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Select a quiz below to open and attempt it.
          </p>
        </div>

        {quizzes.length === 0 ? (
          <p className="text-center bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-xl">No quizzes available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-13">
            {quizzes.map((quiz, index) => (
              <button
                key={index}
                onClick={() => handleQuizClick(quiz)}
                className="flex flex-col items-center justify-center w-full h-60 rounded-2xl border-none text-lg font-semibold cursor-pointer transition-all duration-300 transform bg-gradient-to-br from-red-500 to-orange-500 text-white p-6 shadow-lg hover:-translate-y-2 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
                title={`Select quiz: ${quiz.quizTopic}`}
              >
                <div className="text-5xl mb-4">❓</div>
                <div className="text-center space-y-1">
                  <p>Topic: <span className="font-normal">{quiz.quizTopic}</span></p>
                  <p>Made By: <span className="font-normal">{quiz.madeBy}</span></p>
                  <p>No. of Questions: <span className="font-normal">{quiz.noOfQuestions}</span></p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}