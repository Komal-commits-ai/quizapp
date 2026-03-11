import { useState, useEffect } from 'react';  
import { FetchQuizzes } from "./repositories/FetchQuizzes";
import { useNavigate } from "react-router-dom";
import { deleteQuiz } from './services/api.js';  

export default function ManageQuiz() {
  const [quizzes, setQuizzes] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();
   
  
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

  function handleQuizClick(quiz) {
   
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading quizzes...</div>;  
  }

  return ( 
    <div className="min-h-screen flex flex-col items-center p-5 bg-gradient-to-br from-purple-900 via-blue-800 to-blue-600">
      <div className="w-full max-w-4xl bg-white rounded-3xl p-8 shadow-2xl">
      
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Welcome to the Quiz Page</h1>
          <p className="text-green-600 text-lg">
            You can view and delete quizzes here, or create new quizzes.
          </p>
        </div>
      
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/createquizinfo")}
            className="flex items-center justify-center p-4 w-17 rounded-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-3xl font-bold shadow-lg transition-colors duration-300 hover:-translate-1.5 hover:text-4xl"
            aria-label="Create New Quiz"
            title="Create New Quiz" >
            +
          </button>
        </div>
      
        <div className="space-y-4">
          {quizzes.length === 0 ? (
            <p className="text-center text-green-300">No quizzes available.</p>
          ) : (
            quizzes.map((quiz, index) => (  
              <div
                key={index}
                onClick={() => handleQuizClick(quiz)}
                className="flex justify-between items-center bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-300 hover:bg-green-100"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") { handleQuizClick(quiz); }
                }}
              >
                <div>
                  <p className="text-lg font-semibold text-green-800">
                    Creator: <span className="font-normal">{quiz.madeBy}</span>
                  </p>
                  <p className="text-lg font-semibold text-green-800">
                    Topic: <span className="font-normal">{quiz.quizTopic}</span>
                  </p>
                  <p className="text-lg font-semibold text-green-800">
                    Questions: <span className="font-normal">{quiz.noOfQuestions}</span>
                  </p>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await deleteQuiz(quiz.key);  
                      setQuizzes(quizzes.filter(q => q.key !== quiz.key));  
                      navigate('/quizdeleted');
                    } catch (error) {
                      console.error('Error deleting quiz:', error);
                      alert('Failed to delete quiz.');
                    }
                  }}
                  className="text-green-600 hover:text-red-600 font-bold text-xl p-5 rounded-full transition-colors duration-300"
                  aria-label={`Delete quiz ${quiz.quizTopic}`}
                  title={`Delete quiz ${quiz.quizTopic}`}
                >
                  &#x2716;
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}