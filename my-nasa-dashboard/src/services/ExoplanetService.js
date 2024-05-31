// ExoplanetService.js
const API_URL = 'http://localhost:5000/api/exoplanets';

export const fetchExoplanetDataFromAPI = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching exoplanet data:', error);
    throw error;
  }
};