import { useNavigate } from "react-router-dom";
export default function QuizCreated() {
    const navigate=useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-purple-900 via-blue-800 to-blue-600">
            <div className="w-full max-w-4xl bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="flex flex-col items-center text-center py-6 md:py-10 px-4">
                
                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-full flex items-center justify-center mb-8 shadow-lg">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    
        
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-500 to-teal-600  bg-clip-text text-transparent mb-6">
                        CONGRATULATIONS!
                    </h1>
                    
            
                    <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
                        You have successfully created the quiz!
                    </p>
                    
    
                    <div className="bg-gray-50 rounded-xl p-6 w-full max-w-md mb-8">
                        <p className="text-gray-600 mb-2">Your quiz is now ready to be shared with participants.</p>
                        <p className="text-gray-600">You can manage it from your dashboard.</p>
                    </div>
                    <button className="p-7 rounded-3xl bg-gradient-to-br from-green-500 to-teal-600 text-white hover:text-2xl hover:-translate-2" onClick={()=>navigate("/interface")}>CONTINUE</button>
                </div>
            </div>
        </div>
    );
}