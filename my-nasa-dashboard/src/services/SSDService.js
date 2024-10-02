const SERVER_URL = 'http://localhost:3000'; 

const fetchFromServer = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'API request failed');
  }
  return response.json();
};

export const searchByAsteroid = async (asteroidId, dateMin, dateMax, distMax) => {
  const url = new URL(`${SERVER_URL}/api/ssd/cad/asteroid/${asteroidId}`);
  url.search = new URLSearchParams({ dateMin, dateMax, distMax });
  return fetchFromServer(url.toString());
};

export const searchCloseApproaches = async ({ distMax, dateMin, sort }) => {
  const url = new URL(`${SERVER_URL}/api/ssd/cad/earth`);
  url.search = new URLSearchParams({ 'dist-max': distMax, 'date-min': dateMin, sort });
  return fetchFromServer(url.toString());
};

export const customCADQuery = async (params) => {
  const url = new URL(`${SERVER_URL}/api/ssd/cad`);
  url.search = new URLSearchParams(params);
  return fetchFromServer(url.toString());
};

export const parseCADFields = (fieldsArray, dataArray) => {
  return dataArray.map(item => 
    item.reduce((obj, value, index) => {
      obj[fieldsArray[index]] = value;
      return obj;
    }, {})
  );
};