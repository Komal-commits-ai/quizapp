import { getQuizzes } from '../services/api.js';  

export let FetchQuizzes = {
  getData: async () => {  
    try {
      const response = await getQuizzes();  
      return response.data;  
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      return [];  
    }
  }
};