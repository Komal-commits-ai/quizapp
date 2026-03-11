import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import { resetQuiz } from './slices/quizSlice.js'; 


export default function Marks() {
    const navigate = useNavigate();
    const { questions, score, scr_array, selectedAnswers, s_quiz } = useSelector((state) => ({
    questions: state.quiz.s_quiz.questionDetails,
    score: state.quiz.score,
    scr_array: state.quiz.scr_array,
    selectedAnswers: state.quiz.selectedAnswers,
    s_quiz: state.quiz.s_quiz,
  }));
   const dispatch = useDispatch();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-5">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl p-8">
            
                    <div className="bg-blue-800 text-white rounded-2xl p-6 mb-8">
                         <h1 className="text-xl font-bold text-center text-white ">QUIZ TOPIC:{s_quiz.quizTopic}<br></br>MADE BY:{s_quiz.madeBy}<br></br>TOTAL QUESTIONS:{s_quiz.noOfQuestions}</h1>
                         
                            <p className="text-xl  text-center font-bold text-white" >YOUR SCORE: {score}/{s_quiz.noOfQuestions}</p>
                        <h1 className="text-4xl font-bold text-center text-white">QUIZ RESULTS</h1>
                        
                           
                        
                    </div>

                    
                    <div className="overflow-x-auto rounded-2xl shadow-lg mb-8">
                        <table className="min-w-full">
                            <thead className="bg-blue-700 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold text-lg uppercase tracking-wider">Question</th>
                                    <th className="px-6 py-4 text-left font-bold text-lg uppercase tracking-wider">Result</th>
                                    <th className="px-6 py-4 text-left font-bold text-lg uppercase tracking-wider">Your Answer</th>
                                    <th className="px-6 py-4 text-left font-bold text-lg uppercase tracking-wider">Correct Answer</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {questions.map((q, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100' : 'bg-white hover:bg-gray-50'}>
                                        <td className="px-6 py-4 text-gray-800 font-medium">
                                            <span className="font-bold text-blue-700">Q{index + 1}:</span> {q.question}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${scr_array[index] === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {scr_array[index] === true ? '✅ Correct' : '❌ Incorrect'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 font-medium">
                                            {q.options[selectedAnswers[index]]}
                                        </td>
                                        <td className="px-6 py-4 text-green-700 font-semibold">
                                            {q.correctAnswer}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

            
                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8">
                        <button 
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl font-semibold shadow-md hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105"
                            onClick={() => {
                                          navigate('attempts')}}
                        >
                            VIEW ALL ATTEMPTS
                        </button>
                        
                        <button 
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-2xl font-semibold shadow-md hover:from-purple-700 hover:to-purple-900 transition-all transform hover:scale-105"
                            onClick={() => {
                                  dispatch(resetQuiz());
                                navigate("/interface");
                            }}
                        >
                            GO TO DASHBOARD
                        </button>
                    </div>
                </div>
                
                <Outlet />
            </div>
        </div>
    );
}