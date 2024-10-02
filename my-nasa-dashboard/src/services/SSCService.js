const API_URL = 'http://sscweb.gsfc.nasa.gov/WS/sscr/2';

export const echoDataRequest = async (xmlRequest) => {
  try {
    const response = await fetch(`${API_URL}/echoDataRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Accept': 'application/json',
      },
      body: xmlRequest,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error echoing data request:', error);
    throw error;
  }
};

export const echoGraphRequest = async (xmlRequest) => {
  try {
    const response = await fetch(`${API_URL}/echoGraphRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Accept': 'application/json',
      },
      body: xmlRequest,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error echoing graph request:', error);
    throw error;
  }
};

export const echoQueryRequest = async (xmlRequest) => {
  try {
    const response = await fetch(`${API_URL}/echoQueryRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Accept': 'application/json',
      },
      body: xmlRequest,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error echoing query request:', error);
    throw error;
  }
};