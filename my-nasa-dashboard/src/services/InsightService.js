import { NASA_API_KEY } from '../constants';

export const fetchInsightData = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      api_key: NASA_API_KEY,
      feedtype: 'json',
      ver: '1.0',
      ...params
    }).toString();

    const response = await fetch(`https://api.nasa.gov/insight_weather/?${queryParams}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching InSight data:', error);
    throw error;
  }
};

export const fetchHistoricalInsightData = async (startDate, endDate) => {
  return fetchInsightData({ start_date: startDate, end_date: endDate });
};
