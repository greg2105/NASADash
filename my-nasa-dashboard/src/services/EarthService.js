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

    if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
      const data = await response.json();
      return data;
    }

    if (response.ok) {
      return { url: response.url };
    }

    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  } catch (error) {
    console.error('Error fetching Earth data:', error);
    throw error;
  }
};