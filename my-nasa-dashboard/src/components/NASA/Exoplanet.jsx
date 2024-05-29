// ExoplanetSection.jsx
import React, { useState, useEffect } from 'react';
import { fetchExoplanetData } from '../../services/ExoplanetService';

const ExoplanetSection = () => {
  const [exoplanetData, setExoplanetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the Exoplanet Archive API
        const query = 'table=exoplanets&format=ipac&where=pl_kepflag=1';
        const data = await fetchExoplanetData(query);
        setExoplanetData(data);
      } catch (error) {
        console.error('Error fetching exoplanet data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {exoplanetData ? (
        <div>
          <h2>Exoplanet Data</h2>
          <pre>{exoplanetData}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExoplanetSection;