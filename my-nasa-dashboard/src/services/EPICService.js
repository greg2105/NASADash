import { NASA_API_KEY } from '../constants';

const API_URL = 'https://api.nasa.gov/EPIC/api';
const EPIC_ARCHIVE_URL = 'https://epic.gsfc.nasa.gov/archive/natural';

export const fetchEPICData = async (endpoint, date) => {
  try {
    const dateParam = date ? `&date=${date}` : '';
    const response = await fetch(`${API_URL}/${endpoint}?api_key=${NASA_API_KEY}${dateParam}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching EPIC data:', error);
    throw error;
  }
};

export const fetchImageMetadata = async (date) => {
    try {
      const metadataUrl = `${API_URL}/natural/date/${date}?api_key=${NASA_API_KEY}`;
      const response = await fetch(metadataUrl);
      const data = await response.json();
  
      const imageMetadata = data.map((item) => {
        const dateObj = new Date(item.date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
  
        const imageUrl = `${EPIC_ARCHIVE_URL}/${year}/${month}/${day}/png/${item.image}.png`;
        return {
          ...item,
          image: imageUrl,
        };
      });
  
      return imageMetadata;
    } catch (error) {
      console.error('Error fetching EPIC image metadata:', error);
      throw error;
    }
  };