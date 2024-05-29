// EarthService.js
import { NASA_API_KEY } from '../constants';

const API_URL = 'https://api.nasa.gov/planetary/earth/imagery';

export const fetchEarthData = async (lat, lon, date) => {
  try {
    const queryParams = new URLSearchParams({
      lat,
      lon,
      date,
      api_key: NASA_API_KEY,
    });

    const response = await fetch(`${API_URL}?${queryParams.toString()}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching Earth data:', error);
    throw error;
  }
};