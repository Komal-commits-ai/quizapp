import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; 

export const getQuizzes = () => axios.get(`${API_BASE_URL}/quizzes`);
export const createQuiz = (data) => axios.post(`${API_BASE_URL}/quizzes`, data);
export const deleteQuiz = (key) => axios.delete(`${API_BASE_URL}/quizzes/${key}`);
export const getAttempts = () => axios.get(`${API_BASE_URL}/attempts`);
export const createAttempt = async (data) => {
  console.log('Sending attempt to backend:', data);  
  try {
    const response = await axios.post(`${API_BASE_URL}/attempts`, data);
    return response.data;
  } catch (error) {
    console.error('Error in createAttempt:', error);  
    throw error;  
  }
};