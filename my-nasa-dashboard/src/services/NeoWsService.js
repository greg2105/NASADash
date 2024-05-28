import axios from 'axios'; 

const API_KEY = 'fqvAIjn9L1eu461GmoODoBYKkgvsfLsTNr4cBmBG'; // Replace with your actual API key
const API_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

export const fetchAsteroidData = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching asteroid data:', error);
    throw error;
  }
};