import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { setCreationQuestions } from './slices/quizSlice.js';
import { createQuiz } from './services/api.js';

export default function CreateQuizForm() {
  const navigate = useNavigate();
  
  
  const selectCreationFormData = createSelector(
    (state) => state.quiz, 
    (quiz) => ({
      madeBy: quiz.madeBy,
      topic: quiz.topic,
      noOfQuestions: quiz.noOfQuestions,
      creationQuestions: quiz.creationQuestions,
    }) 
  );
  

  const { madeBy, topic, noOfQuestions, creationQuestions } = useSelector(selectCreationFormData);
  
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    if (noOfQuestions > 0 && creationQuestions.length === 0) {
      const initialQuestions = Array.from({ length: Number(noOfQuestions) }, () => ({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: ""
      }));
      dispatch(setCreationQuestions(initialQuestions));
    }
  }, [noOfQuestions, creationQuestions.length, dispatch]);

  
  const updateQuestionText = (index, value) => {
    const newQuestions = creationQuestions.map((q, i) =>
      i === index ? { ...q, question: value } : q  
    );
    dispatch(setCreationQuestions(newQuestions));
  };

  
  const updateOption = (index, optNum, value) => {
    const newQuestions = creationQuestions.map((q, i) =>
      i === index
        ? {
            ...q,
            options: q.options.map((opt, optIndex) =>
              optIndex === optNum - 1 ? value : opt  
            )
          }
        : q
    );
    dispatch(setCreationQuestions(newQuestions));
  };

  
  const updateCorrectAnswer = (index, selectedOption) => {
    const newQuestions = creationQuestions.map((q, i) =>
      i === index ? { ...q, correctAnswer: selectedOption } : q  
    );
    dispatch(setCreationQuestions(newQuestions));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-purple-900 via-blue-800 to-blue-600">
      <div className="w-full max-w-4xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center py-4 md:py-6 px-2 md:px-4">
          
          <div className="text-6xl md:text-7xl mb-4 animate-pulse">❓</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
            Create Your Questions
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl">
            Fill in the fields below to create your custom quiz form for <span className="font-semibold text-green-600">{topic}</span>
          </p>
          
          <div className="w-full max-w-2xl bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center">
                <i className="fas fa-user text-green-600 mr-2"></i>
                <span className="font-medium">Creator:</span>
                <span className="ml-1 text-blue-800">{madeBy}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-book-open text-green-600 mr-2"></i>
                <span className="font-medium">Topic:</span>
                <span className="ml-1 text-blue-800">{topic}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-list-ol text-green-600 mr-2"></i>
                <span className="font-medium">Questions:</span>
                <span className="ml-1 text-blue-800">{noOfQuestions}</span>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-2xl">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 md:p-6 mb-8 text-left">
              <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-2 flex items-center">
                <i className="fas fa-info-circle text-green-600 mr-2"></i> Instructions
              </h3>
              <p className="text-green-700 text-sm md:text-base">
                For each question, provide the question text, four possible options, and select the correct answer.
              </p>
              <p className="text-green-700 text-sm md:text-base mt-2">
                All fields must be filled out to create a valid quiz.
              </p>
            </div>
            
            <div className="space-y-8">
              {creationQuestions.map((q, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      {index + 1}
                    </span>
                    Question {index + 1}
                  </h3>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2 text-base md:text-lg">
                      <i className="fas fa-question-circle text-green-500 mr-2"></i>Question Text
                    </label>
                    <input 
                      type="text" 
                      onChange={(e) => updateQuestionText(index, e.target.value)}
                      value={q.question}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" 
                      placeholder="Enter your question here"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2 text-base md:text-lg">
                      <i className="fas fa-list-ol text-green-500 mr-2"></i>Options
                    </label>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map(optNum => (
                        <div key={optNum} className="flex items-center">
                          <span className="bg-blue-500 text-white rounded-lg w-8 h-8 flex items-center justify-center mr-3 font-medium">
                            {optNum}
                          </span>
                          <input 
                            type="text" 
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300" 
                            placeholder={`Option ${optNum}`}
                            onChange={(e) => updateOption(index, optNum, e.target.value)}
                            value={q.options[optNum - 1]}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 text-base md:text-lg">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>Correct Answer
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[1, 2, 3, 4].map(optNum => (
                        <div key={optNum} className="flex items-center">
                          <input 
                            type="radio" 
                            name={`correctAnswer-${index}`} 
                            id={`correctAnswer-${index}-${optNum}`}
                            className="hidden"
                            onChange={() => updateCorrectAnswer(index, q.options[optNum - 1])}
                            checked={q.correctAnswer === q.options[optNum - 1]}
                          />
                          <label 
                            htmlFor={`correctAnswer-${index}-${optNum}`}
                            className="flex-1 text-center py-2 border border-gray-300 rounded-xl cursor-pointer transition-all duration-300 hover:bg-green-50 hover:border-green-300 active:bg-gray-500"
                          >
                            Option {optNum}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-5 text-green-700 font-medium text-base md:text-lg">
                    <span className="text-xl underline text-blue-600 font-bold">Correct Answer:</span> {q.correctAnswer}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mt-8">
              <button 
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:bg-gray-300 hover:-translate-y-1 order-2 sm:order-1"
                onClick={() => navigate('/createquizinfo')}
              >
                <i className="fas fa-arrow-left mr-2"></i>Back
              </button>
              <button 
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-green-600 hover:to-teal-700 hover:-translate-y-1 shadow-lg order-1 sm:order-2"
                onClick={async () => {
                  let key = Date.now();
                  const quiz = {
                    key: key,
                    id: "quiz",
                    madeBy: madeBy,
                    quizTopic: topic,
                    noOfQuestions: noOfQuestions,
                    questionDetails: creationQuestions
                  };
                  let displayed = 0;
                  let ques = 0;
                  let ans = 0;
                  let op = 0;

                  creationQuestions.forEach((q) => {
                    let filled = 0;
                    q.options.forEach((opt) => {
                      if (opt !== "") {
                        filled++;
                      }
                    });

                    if (q.question === "") {
                      ques = 1;
                    } else if (filled < 2) { 
                      op = 1;
                    } else if (q.correctAnswer === "") {
                      ans = 1;
                    }
                  });
                  if (ques === 1) {
                    alert("kindly fill all the question boxes!!!");
                    displayed = 1;
                  } else if (op === 1) {
                    alert("kindly fill atleast two options for all questions!!!");
                    displayed = 1;
                  } else if (ans === 1) {
                    alert("kindly choose the correct option for all the question!!!");
                    displayed = 1;
                  }

                  if (displayed === 0) {
       try {
         await createQuiz(quiz);  
         navigate('/quizcreated');
       } catch (error) {
         console.error('Error creating quiz:', error);
         alert('Failed to create quiz. Try again.');
       }
     }
     
                }}
              >
                Create Quiz <i className="fas fa-check ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}