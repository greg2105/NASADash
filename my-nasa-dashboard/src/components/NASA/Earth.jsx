import React, { useState } from 'react';
import { fetchEarthData } from '../../services/EarthService';

const Earth = () => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [date, setDate] = useState('');
  const [earthData, setEarthData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchEarthData(lat, lon, date);
      setEarthData(data);
    } catch (error) {
      console.error('Error fetching Earth data:', error);
    }
  };

  return (
    <div className="earth-container">
      <h2>Earth Imagery</h2>
      <div className="earth-form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Latitude:
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
          <label>
            Longitude:
            <input
              type="text"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
            />
          </label>
          <label>
            Date (YYYY-MM-DD):
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <button type="submit">Get Imagery</button>
        </form>
      </div>
      {earthData && (
        <div>
          <div className="earth-image-container">
            {earthData.url && <img src={earthData.url} alt="Earth Imagery" />}
          </div>
          {earthData.date && <p>Date: {earthData.date}</p>}
        </div>
      )}
    </div>
  );
};

export default Earth;