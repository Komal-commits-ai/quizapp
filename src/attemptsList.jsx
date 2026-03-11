import { AttemptsRepo } from './repositories/attemptsRepo.js';
import { useState, useEffect } from 'react';  

export default function Attempts() {
  const [dicts, setDicts] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const data = await AttemptsRepo.getData();  
        const filtered = data.filter(dict =>
          dict &&
          Array.isArray(dict.questions) &&
          dict.questions.length > 0 &&
          Array.isArray(dict.str_result) &&
          Array.isArray(dict.str_selectedAnswer) &&
          dict.noOfQuestions > 0
        );
        setDicts(filtered);
      } catch (error) {
        console.error('Error fetching attempts:', error);
        setDicts([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchAttempts();
  }, []);  

  if (loading) {
    return <div>Loading attempts...</div>;  
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-10 pt-5">
          QUIZ ATTEMPTS HISTORY
        </h1>
        
        {dicts.length > 0 ? (
          dicts.map((dict, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-2xl mb-10 p-8">
              <div className="bg-blue-800 text-white rounded-2xl p-6 mb-8">
                <div>
                  <h2 className="text-xl font-bold text-center">ATTEMPT #{index + 1}</h2>
                </div>
                <div className="mt-4 md:mt-0 text-center md:text-left">
                  <p className="text-xl font-bold">QUIZ TOPIC: {dict.topic || 'Unknown'}</p>
                  <p className="text-xl font-bold">TOTAL QUESTIONS: {dict.noOfQuestions || 0}</p>
                  <p className="text-xl font-bold">MADE BY: {dict.madeBy || 'Unknown'}</p>
                  <p className="text-xl font-bold">ATTEMPTED BY: {dict.name || 'Unknown'}</p>
                  <p className="text-xl font-bold">SCORE: {dict.tscore || 0}/{dict.noOfQuestions || 0}</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl shadow-lg">
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
                    {(dict.questions || []).map((q, qIndex) => {
                      if (!q || typeof q !== 'object' || !q.question || !Array.isArray(q.options) || !q.correctAnswer) {
                        return null;
                      }

                      const strResult = dict.str_result || [];
                      const strSelectedAnswer = dict.str_selectedAnswer || [];
                      const isCorrect = strResult[qIndex] === true;
                      const selectedIndex = strSelectedAnswer[qIndex];
                      
                      const yourAnswer = Array.isArray(q.options) && selectedIndex >= 0 && selectedIndex < q.options.length 
                        ? q.options[selectedIndex] 
                        : selectedIndex === -1 ? 'Not Answered' : 'N/A';

                      return (
                        <tr key={qIndex} className={qIndex % 2 === 0 ? 'bg-blue-50 hover:bg-blue-100' : 'bg-white hover:bg-gray-50'}>
                          <td className="px-6 py-4 text-gray-800 font-medium">
                            <span className="font-bold text-blue-700">Q{qIndex + 1}:</span> {q.question || 'Question unavailable'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-700 font-medium">
                            {yourAnswer}
                          </td>
                          <td className="px-6 py-4 text-green-700 font-semibold">
                            {q.correctAnswer}
                          </td>
                        </tr>
                      );
                    })}
                    
                    {(!dict.questions || dict.questions.length === 0) && (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                          No question details available for this attempt.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Quiz Attempts Yet</h2>
            <p className="text-gray-600">Complete a quiz to see your results here!</p>
          </div>
        )}
      </div>
    </div>
  );
}