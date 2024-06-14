import React, { useState, useEffect } from 'react';
import { fetchAsteroidData } from '../../services/NeoWsService';

const NearEarthObjects = () => {
  const [asteroidData, setAsteroidData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = '2023-05-27'; 
        const endDate = '2023-05-28';
        const data = await fetchAsteroidData(startDate, endDate);
        setAsteroidData(data);
      } catch (error) {
        console.error('Error fetching asteroid data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="neo-container">
      {asteroidData ? (
        <div className="neo-data-container">
          <pre>{JSON.stringify(asteroidData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NearEarthObjects;