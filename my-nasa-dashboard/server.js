import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

const TLE_API_URL = 'https://tle.ivanstanojevic.me/api/tle';
const SSD_API_URL = 'https://ssd-api.jpl.nasa.gov/cad.api';

// TLE API routes
app.get('/api/tle', async (req, res) => {
  try {
    const response = await fetch(TLE_API_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tle/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const response = await fetch(`${TLE_API_URL}?search=${query}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tle/number/:satelliteNumber', async (req, res) => {
  try {
    const satelliteNumber = req.params.satelliteNumber;
    const response = await fetch(`${TLE_API_URL}/${satelliteNumber}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// SSD/CNEOS API routes
app.get('/api/ssd/cad', async (req, res) => {
  try {
    const queryParams = new URLSearchParams(req.query).toString();
    const response = await fetch(`${SSD_API_URL}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(error.response?.status || 500).json({ 
      error: error.message || 'Internal Server Error' 
    });
  }
});

app.get('/api/ssd/cad/asteroid/:id', async (req, res) => {
  try {
    const asteroidId = req.params.id;
    const { dateMin, dateMax, distMax } = req.query;
    const queryParams = new URLSearchParams({
      des: asteroidId,
      'date-min': dateMin,
      'date-max': dateMax,
      'dist-max': distMax
    }).toString();

    const response = await fetch(`${SSD_API_URL}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(error.response?.status || 500).json({ 
      error: error.message || 'Internal Server Error' 
    });
  }
});

app.get('/api/ssd/cad/earth', async (req, res) => {
  try {
    const { distMax, dateMin, sort } = req.query;
    const queryParams = new URLSearchParams({
      'dist-max': distMax,
      'date-min': dateMin,
      sort
    });

    const response = await fetch(`${SSD_API_URL}?${queryParams}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(error.response?.status || 500).json({
      error: error.message || 'Internal Server Error'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});