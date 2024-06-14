import React, { useState, useEffect } from 'react';
import { fetchExoplanetDataFromAPI } from '../../services/ExoplanetService';

const Exoplanet = () => {
  const [exoplanetData, setExoplanetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `
          SELECT pl_name, pl_masse, ra, dec
          FROM ps
          WHERE upper(soltype) LIKE '%CONF%'
            AND pl_masse BETWEEN 0.5 AND 2.0
        `;

        const data = await fetchExoplanetDataFromAPI(query, 'votable');
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

export default Exoplanet;