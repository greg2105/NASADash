// InsightService.js
import { NASA_API_KEY } from '../constants';

const API_URL = 'https://api.nasa.gov/insight_weather';

export const fetchInsightData = async () => {
  try {
    const response = await fetch(`${API_URL}/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching InSight data:', error);
    throw error;
  }
};