import { getAttempts } from '../services/api.js';  

export let AttemptsRepo = {
  getData: async () => {  
    try {
      const response = await getAttempts(); 
      return response.data;  
    } catch (error) {
      console.error('Error fetching attempts:', error);
      return [];       
    }
  }
};