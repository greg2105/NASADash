import axios from 'axios'; 
import { NASA_API_KEY } from '../constants';
const API_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

export const fetchAsteroidData = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching asteroid data:', error);
    throw error;
  }
};