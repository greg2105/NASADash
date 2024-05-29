// RoverPhotosService.js
import { NASA_API_KEY } from '../constants';

const API_URL = 'https://api.nasa.gov/mars-photos/api/v1';

export const fetchRoverPhotos = async (rover, params) => {
  try {
    const response = await fetch(`${API_URL}/rovers/${rover}/photos?api_key=${NASA_API_KEY}&${new URLSearchParams(params)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rover photos:', error);
    throw error;
  }
};