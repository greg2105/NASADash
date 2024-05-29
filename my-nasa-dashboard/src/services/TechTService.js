// TechTransferService.js
import { NASA_API_KEY } from '../constants';

const API_URL = 'https://api.nasa.gov/techtransfer';

export const searchPatents = async (query) => {
  try {
    const response = await fetch(`${API_URL}/patent/?${query}&api_key=${NASA_API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching patents:', error);
    throw error;
  }
};

export const searchSoftware = async (query) => {
  try {
    const response = await fetch(`${API_URL}/software/?${query}&api_key=${NASA_API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching software:', error);
    throw error;
  }
};

export const searchSpinoffs = async (query) => {
  try {
    const response = await fetch(`${API_URL}/spinoff/?${query}&api_key=${NASA_API_KEY}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching spinoffs:', error);
    throw error;
  }
};