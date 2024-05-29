// ImageRepositoryService.js
const API_URL = 'https://images-api.nasa.gov';

export const searchImages = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching images:', error);
    throw error;
  }
};

export const getAssetManifest = async (nasaId) => {
  try {
    const response = await fetch(`${API_URL}/asset/${nasaId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching asset manifest:', error);
    throw error;
  }
};

export const getAssetMetadata = async (nasaId) => {
  try {
    const response = await fetch(`${API_URL}/metadata/${nasaId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching asset metadata:', error);
    throw error;
  }
};

export const getVideoCaptions = async (nasaId) => {
  try {
    const response = await fetch(`${API_URL}/captions/${nasaId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching video captions:', error);
    throw error;
  }
};