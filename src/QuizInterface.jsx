import { useNavigate } from "react-router-dom";
export default function QuizInterface() {
    const  navigate=useNavigate()
    return (
        <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-purple-900 via-blue-800 to-blue-600">
            <div className="w-full max-w-4xl bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center py-10 px-4">
            
                    <div className="text-7xl mb-6 animate-bounce">🎯</div>
                    
                    
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Welcome to QuizCraft
                    </h1>
                    
            
                    <p className="text-xl text-gray-700 mb-12 max-w-2xl leading-relaxed">
                        Test your knowledge, create custom quizzes, and challenge your friends!
                    </p>
                    
                
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-blue-50 p-6 rounded-2xl text-center transition-transform duration-300 hover:-translate-y-2 border border-blue-200">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">Create</h3>
                            <p className="text-gray-600">Design your own quizzes with custom questions</p>
                        </div>
                        
                        <div className="bg-blue-50 p-6 rounded-2xl text-center transition-transform duration-300 hover:-translate-y-2 border border-blue-200">
                            <div className="text-4xl mb-4">🎮</div>
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">Play</h3>
                            <p className="text-gray-600">Challenge yourself with various quiz categories</p>
                        </div>
                        
                        <div className="bg-blue-50 p-6 rounded-2xl text-center transition-transform duration-300 hover:-translate-y-2 border border-blue-200">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">Track</h3>
                            <p className="text-gray-600">Monitor your progress and scores over time</p>
                        </div>
                    </div>
                    
                    
                    <div className="flex flex-col sm:flex-row gap-6 mb-12">
                        <button className="flex flex-col items-center justify-center w-60 h-60 sm:w-52 sm:h-52 rounded-2xl border-none text-lg font-semibold cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 shadow-lg bg-gradient-to-br from-red-500 to-orange-500 text-white p-6" onClick={()=>navigate('/selectquiz')}>
                            <div className="text-5xl mb-4">🎯</div>
                            <div>Select Quiz</div>
                        </button>
                        
                        <button className="flex flex-col items-center justify-center w-60 h-60 sm:w-52 sm:h-52 rounded-2xl border-none text-lg font-semibold cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 shadow-lg bg-gradient-to-br from-green-500 to-teal-600 text-white p-6" onClick={()=>navigate("/managequiz")}>
                            <div className="text-5xl mb-4">✨</div>
                            <div>Manage Quiz</div>
                        </button>
                    </div>
                    
                    <footer className="text-gray-600 text-sm">
                        <p>Test your knowledge • Create engaging content • Share with friends</p>
                    </footer>
                </div>
            </div>
        </div>
    );
}