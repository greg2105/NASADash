import React, { useState, useEffect } from 'react';
import { fetchEPICData, fetchImageMetadata } from '../../services/EPICService';

const EPIC = () => {
  const [epicData, setEpicData] = useState(null);
  const [imageMetadata, setImageMetadata] = useState([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEPICData('natural', date);
        setEpicData(data);
        const metadata = await fetchImageMetadata(date);
        setImageMetadata(metadata);
      } catch (error) {
        console.error('Error fetching EPIC data:', error);
      }
    };
    fetchData();
  }, [date]);

  return (
    <div className="epic-container">
      <h2>EPIC Data</h2>
      <div className="date-input-container">
        <label htmlFor="date">Date (YYYY-MM-DD):</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {imageMetadata.length > 0 ? (
        <ul className="image-list">
          {imageMetadata.map((image) => (
            <li key={image.image} className="image-item">
              <h3>{image.caption}</h3>
              <p>Image Date: {image.date}</p>
              <p>Spacecraft: {image.spacecraft}</p>
              <img src={image.image} alt={image.caption} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EPIC;