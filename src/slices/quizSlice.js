import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  s_quiz: {
    id: '',
    madeBy: '',
    noOfQuestions: 0,
    questionDetails: [],
    quizTopic: '',
    
  },
  score: 0,
  currentindex: 0,
  name: '',
  selectedAnswers: [],
  scr_array: [],
  madeBy: '', 
  topic: '',
  noOfQuestions: 0, 
  creationQuestions: [], 
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.s_quiz = action.payload;
      const numQ = action.payload.noOfQuestions;
      state.selectedAnswers = Array(numQ).fill(null);
      state.scr_array = Array(numQ).fill(false);
      state.currentindex = 0;
      state.score = 0;
    },
    updateScore: (state, action) => {
      state.score = action.payload;
    },
    setIndex: (state, action) => {
      state.currentindex = action.payload;
    },
    setSelectedAnswers: (state, action) => {
      state.selectedAnswers = action.payload;
    },
    updateScrArray: (state, action) => {
      state.scr_array = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setCreationInfo: (state, action) => {
      const { madeBy, topic, noOfQuestions } = action.payload;
      state.madeBy = madeBy;
      state.topic = topic;
      state.noOfQuestions = noOfQuestions;
    },
   
    setCreationQuestions: (state, action) => {
      state.creationQuestions = action.payload;
    },
    resetQuiz: () => {
      return initialState; 
    },
    
  },
});

export const {
  setQuiz,
  updateScore,
  setIndex,
  setSelectedAnswers,
  updateScrArray,
  setName,
  setCreationInfo,
  setCreationQuestions, 
  resetQuiz,
} = quizSlice.actions;     

export default quizSlice.reducer;