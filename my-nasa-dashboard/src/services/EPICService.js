// EPICService.js
import { NASA_API_KEY } from '../constants';

const API_URL = 'https://api.nasa.gov/EPIC/api';

export const fetchEPICData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}?api_key=${NASA_API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching EPIC data:', error);
    throw error;
  }
};