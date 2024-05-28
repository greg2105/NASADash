// APODService.js
import { NASA_API_KEY } from '../constants';

const API_URL = 'https://api.nasa.gov/planetary/apod';

export const fetchAPODData = async () => {
  try {
    const response = await fetch(`${API_URL}?api_key=${NASA_API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    throw error;
  }
};