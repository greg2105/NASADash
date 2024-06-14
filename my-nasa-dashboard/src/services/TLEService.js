const API_URL = 'http://localhost:3000/api/tle';

export const searchTLEBySatelliteName = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search/${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching TLE by satellite name:', error);
    throw error;
  }
};

export const getTLEBySatelliteNumber = async (satelliteNumber) => {
  try {
    const response = await fetch(`${API_URL}/number/${satelliteNumber}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TLE by satellite number:', error);
    throw error;
  }
};