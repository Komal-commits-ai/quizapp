import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Question } from './question.jsx';
import { useSelector, useDispatch } from 'react-redux'; 
import { createSelector } from '@reduxjs/toolkit';
import { updateScore, setIndex, setSelectedAnswers, updateScrArray } from './slices/quizSlice.js';
import { createAttempt } from './services/api.js';  

export default function QuizPage() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  
  const selectQuizData = createSelector(
    (state) => state.quiz,
    (quiz) => ({
      questions: quiz.s_quiz?.questionDetails || [], 
      currentindex: quiz.currentindex ?? 0, 
      score: quiz.score ?? 0,
      selectedAnswers: quiz.selectedAnswers || [], 
      scr_array: quiz.scr_array || [], 
      name: quiz.name || '',
      s_quiz: quiz.s_quiz || { noOfQuestions: 0, madeBy: '', quizTopic: '' }, 
    })
  );
  
  const { questions, currentindex, score, selectedAnswers, scr_array, name, s_quiz } = useSelector(selectQuizData);
  
  const [timer, setTimer] = useState(30);
  const [showMessage, setShowMessage] = useState(false);
  
  useEffect(() => {
    if (!s_quiz.id || s_quiz.noOfQuestions === 0 || questions.length === 0) {
      navigate('/selectquiz', { replace: true });
      return;
    }
  }, [s_quiz, questions.length, navigate]);
  
  
  useEffect(() => {
    if (currentindex >= (s_quiz.noOfQuestions || 0)) {
      if (name && questions.length > 0) {
        const attempts = {
          name: name || "Anonymous",
          madeBy: s_quiz.madeBy || '',
          topic: s_quiz.quizTopic || '',
          noOfQuestions: s_quiz.noOfQuestions || 0,
          tscore: score,
          str_result: scr_array,
          str_selectedAnswer: selectedAnswers.map(ans => ans ?? -1),  
          questions: questions
        };
        const saveAttempt = async () => {
          try {
            
            await createAttempt(attempts);
          
          } catch (error) {
          

          }
        };
        saveAttempt();
      }
      navigate('/result');
      return;
    }
  }, [currentindex, navigate, score, scr_array, selectedAnswers, s_quiz.noOfQuestions, name, questions]);
  
  useEffect(() => {
    if (currentindex >= (s_quiz.noOfQuestions || 0)) return;
    
    setTimer(30);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(interval);
          dispatch(setIndex(currentindex + 1));
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentindex, dispatch, s_quiz.noOfQuestions]);
  
  function CheckAns(currentindex, bindex) {
    if (
      typeof currentindex !== 'number' ||
      currentindex < 0 ||
      currentindex >= questions.length ||
      typeof bindex !== 'number' ||
      bindex < 0 ||
      bindex >= 4 ||
      !questions[currentindex] ||
      !questions[currentindex].options ||
      !questions[currentindex].correctAnswer
    ) {
      console.error('Invalid CheckAns params:', { currentindex, bindex, questionsLength: questions.length });
      return;
    }
    
    const currentQ = questions[currentindex];
    const userAnswer = currentQ.options[bindex];
    const correctAnswer = currentQ.correctAnswer;
    
    const newSelectedAnswers = [...Array(questions.length).fill(null)];
    newSelectedAnswers.forEach((_, i) => {
      newSelectedAnswers[i] = selectedAnswers[i] ?? null;
    });
    newSelectedAnswers[currentindex] = bindex;
    dispatch(setSelectedAnswers(newSelectedAnswers));
    
    if (userAnswer === correctAnswer) {
      dispatch(updateScore(score + 1));
      const newScrArray = [...Array(questions.length).fill(false)];
      newScrArray.forEach((_, i) => {
        newScrArray[i] = scr_array[i] ?? false;
      });
      newScrArray[currentindex] = true;
      dispatch(updateScrArray(newScrArray));
    } else {
      const newScrArray = [...Array(questions.length).fill(false)];
      newScrArray.forEach((_, i) => {
        newScrArray[i] = scr_array[i] ?? false;
      });
      newScrArray[currentindex] = false;
      dispatch(updateScrArray(newScrArray));
    }
    
    dispatch(setIndex(currentindex + 1));
    setTimer(30);
  }
  
  function handleNextClick() {
    const hasAnswered = selectedAnswers[currentindex] !== null && selectedAnswers[currentindex] !== undefined;
    
    if (!hasAnswered) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 5000);
    } else {
      dispatch(setIndex(currentindex + 1)); 
    }
  }

  if (
    currentindex >= (s_quiz.noOfQuestions || 0) ||
    questions.length === 0 ||
    !questions[currentindex] ||
    !s_quiz.id
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Loading...</h2>
          <p className="text-gray-600 mb-6">Please select a quiz first.</p>
          <button
            onClick={() => navigate('/selectquiz')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
          >
            Select Quiz
          </button>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentindex];
  const currentOptions = currentQuestion.options || ['', '', '', ''];
  
  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-8 shadow-2xl relative">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">
            Quiz: {s_quiz.quizTopic || 'Unknown'} by {s_quiz.madeBy || 'Unknown'}
          </h1>
          <div className="bg-red-500 text-white font-bold rounded-xl px-4 py-2 text-center shadow-lg">
            ⏱️ {timer}s
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-200">
          <Question index={currentindex + 1} noOfQuestions={s_quiz.noOfQuestions}>
            {currentQuestion.question || 'Question loading...'}
          </Question>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {currentOptions.map((option, bindex) => (
            <button
              key={bindex}
              onClick={() => CheckAns(currentindex, bindex)}
              disabled={selectedAnswers[currentindex] !== null && selectedAnswers[currentindex] !== undefined}
              className={`p-5 rounded-2xl text-lg font-medium transition-all duration-300 ${
                selectedAnswers[currentindex] === bindex 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg border-2 border-blue-700' 
                  : 'bg-white text-blue-900 hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400'
              } ${selectedAnswers[currentindex] !== null && selectedAnswers[currentindex] !== undefined ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + bindex)}.</span> 
              {option || 'Option loading...'}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between">
          
          {currentindex > 0 && (
            <button
              className="px-6 py-3 bg-gray-600 text-white rounded-2xl font-semibold shadow-md hover:bg-gray-700 transition-colors"
              onClick={() => {
                const prevCorrect = scr_array[currentindex - 1] === true;
                if (prevCorrect) {
                  dispatch(updateScore(score - 1));
                  const newScrArray = [...Array(questions.length).fill(false)];
                  newScrArray.forEach((_, i) => {
                    newScrArray[i] = scr_array[i] ?? false;
                  });
                  newScrArray[currentindex - 1] = false;
                  dispatch(updateScrArray(newScrArray));
                }
                dispatch(setIndex(currentindex - 1)); 
                setTimer(30);
              }}
            >
              ← Back
            </button>
          )}
          
          <div className="relative">
            {showMessage && (
              <div className="absolute -top-12 right-0 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg">
                Please select an answer first!
              </div>
            )}
            <button 
              className="px-10 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl font-semibold shadow-md hover:from-blue-700 hover:to-purple-800 transition-all"
              onClick={handleNextClick}
            >
              {currentindex === questions.length - 1 ? 'Finish Quiz' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}