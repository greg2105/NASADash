// ExoplanetService.js
const API_URL = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI';

export const fetchExoplanetData = async (query) => {
  try {
    const response = await fetch(`${API_URL}?${query}`);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error fetching exoplanet data:', error);
    throw error;
  }
};