import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 
import { setCreationInfo } from './slices/quizSlice.js'; 

export default function CreateQuizInfo() {
    const { madeBy, topic, noOfQuestions } = useSelector((state) => state.quiz);
      const dispatch = useDispatch()
    const navigate=useNavigate()

     function handleStart() {
    if (madeBy.trim() === "" || topic.trim() === "" || noOfQuestions === 0) {
      alert("Please fill all fields to continue!");
    } else {
      navigate('/createquizform');
    }
  }
    return (
        <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-purple-900 via-blue-800 to-blue-600">
            <div className="w-full max-w-4xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center py-4 md:py-6 px-2 md:px-4">
                    
                    <div className="text-6xl md:text-7xl mb-4 animate-pulse">✨</div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
                        Create Your Quiz
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl">
                        Let's get started! Please provide some basic information about your quiz.
                    </p>
                    
                
                    <div className="w-full max-w-2xl">
                        <div className="space-y-4 md:space-y-6">
                
                            <div className="form-group">
                                <label className="block text-left text-gray-700 font-medium mb-2 text-base md:text-lg">
                                    <i className="fas fa-heading text-green-500 mr-2"></i>Name of Creator
                                </label>
                                <input 
                                    type="text" 
                                    value={madeBy}
                                  onChange={(e) => {
                                  dispatch(setCreationInfo({ madeBy: e.target.value, topic, noOfQuestions }));
                                  }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" 
                                    placeholder="Enter your name"
                                />
                            </div>
                            
                        
                            <div className="form-group">
                                <label className="block text-left text-gray-700 font-medium mb-2 text-base md:text-lg">
                                    <i className="fas fa-book-open text-green-500 mr-2"></i>Quiz Topic
                                </label>
                                <input 
                                    type="text" 
                                    value={topic}
                                onChange={(e) => {
                                dispatch(setCreationInfo({ madeBy, topic: e.target.value, noOfQuestions }));
                                }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" 
                                    placeholder="What topic is your quiz about?"
                                />
                            </div>
                            
        
                            <div className="form-group">
                                <label className="block text-left text-gray-700 font-medium mb-2 text-base md:text-lg">
                                    <i className="fas fa-list-ol text-green-500 mr-2"></i>Number of Questions
                                </label>
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <input 
                                        type="number" 
                                        min="1" 
                                        value={noOfQuestions}
                                        onChange={(e) => {
                                    dispatch(setCreationInfo({ madeBy, topic, noOfQuestions: parseInt(e.target.value) || 0 }));
                    }}
                                        className="w-full md:w-32 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" 
                                        placeholder="How many questions?"
                                    />
                                    <p className="text-sm text-gray-500 mt-2 md:mt-0 md:ml-4">
                                        Enter any number of questions you want in your quiz
                                    </p>
                                </div>
                            </div>
                        </div>
                        
            
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 md:p-6 mt-8 text-left">
                            <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-2 flex items-center">
                                <i className="fas fa-info-circle text-green-600 mr-2"></i> How it works
                            </h3>
                            <p className="text-green-700 text-sm md:text-base">
                                Enter the number of questions you want in your quiz, and we'll build a custom form for you to create each question with options and correct answers.
                            </p>
                            <p className="text-green-700 text-sm md:text-base mt-2">
                                You can create as many questions as you want - there's no limit!
                            </p>
                        </div>
                    
                        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mt-8">
                            <button className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:bg-gray-300 hover:-translate-y-1 order-2 sm:order-1" onClick={()=>navigate('/interface')}>
                                <i className="fas fa-arrow-left mr-2"></i>Back
                            </button>
                            <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-green-600 hover:to-teal-700 hover:-translate-y-1 shadow-lg order-1 sm:order-2" onClick={handleStart}>
                                Continue <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}