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

    // If the response is successful and the content type is JSON, parse the JSON data
    if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
      const data = await response.json();
      return data;
    }

    // If the response is successful and the content type is not JSON (e.g., an image), return the response URL
    if (response.ok) {
      return { url: response.url };
    }

    // If the response is not successful, throw an error with the response status and text
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  } catch (error) {
    console.error('Error fetching Earth data:', error);
    throw error;
  }
};