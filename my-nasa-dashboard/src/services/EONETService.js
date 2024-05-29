import { NASA_API_KEY } from '../constants';

const API_URL = '/api';

export const fetchEONETData = async (endpoint, params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      ...params,
      api_key: NASA_API_KEY,
    });

    const response = await fetch(`${API_URL}/${endpoint}?${queryParams.toString()}`);
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching EONET data:', error);
    throw error;
  }
};