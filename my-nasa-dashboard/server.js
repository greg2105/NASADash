import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const API_URL = 'https://tle.ivanstanojevic.me/api/tle';

const app = express();
app.use(cors());

// Route to get all TLEs (if needed)
app.get('/api/tle', async (req, res) => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to search TLE by satellite name
app.get('/api/tle/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const response = await fetch(`${API_URL}?search=${query}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get TLE by satellite number
app.get('/api/tle/number/:satelliteNumber', async (req, res) => {
  try {
    const satelliteNumber = req.params.satelliteNumber;
    const response = await fetch(`${API_URL}/${satelliteNumber}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});