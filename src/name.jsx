
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 
import { setName } from './slices/quizSlice.js'; 

export default function NamePage() {
  const name = useSelector(state => state.quiz.name);
  const dispatch =useDispatch();
  const navigate = useNavigate();
  
  function handleStart() {
    dispatch(setName(name));
    if (name.trim() === "") {
      alert("Please enter your name to begin the quiz!");
    } else {
      
      navigate('/quiz');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-purple-900 via-blue-800 to-blue-600">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center py-10 px-4">
          
          
          <div className="text-7xl mb-6 animate-bounce">🧠</div>
          
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to QuizCraft!
          </h1>
          
        
          <p className="text-xl text-gray-700 mb-8 max-w-xl leading-relaxed">
            Test your knowledge with our challenging quiz. Let's see how well you know!
          </p>
          
          
          <div className="w-full max-w-md mb-10">
            <label className="block text-gray-700 text-lg font-medium mb-4 text-left">
              Enter Your Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              required
              placeholder="Your name here..."
              className="w-full px-6 py-4 bg-gray-100 border-2 border-gray-300 rounded-2xl text-gray-800 text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          
            />
          </div>
          
          
          <button
            onClick={handleStart}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl text-white text-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            Start Quiz
          </button>
        
      
          <p className="text-gray-600 text-sm mt-8">
            Get ready for challenging questions!
          </p>
        </div>
      </div>
    </div>
  );
}