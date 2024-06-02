// InsightService.js
import { NASA_API_KEY } from '../constants';

export const fetchInsightData = async () => {
  try {
    const response = await fetch(`https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching InSight data:', error);
    throw error;
  }
};