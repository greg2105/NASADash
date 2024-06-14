import { NASA_API_KEY } from '../constants';

const API_URL = 'https://api.nasa.gov/DONKI';

export const fetchDONKIData = async (endpoint, params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      ...params,
      api_key: NASA_API_KEY, 
    });

    const response = await fetch(`${API_URL}/${endpoint}?${queryParams.toString()}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching DONKI data:', error);
    throw error;
  }
};