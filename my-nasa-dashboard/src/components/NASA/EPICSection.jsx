// EPICSection.jsx
import React, { useState, useEffect } from 'react';
import { fetchEPICData } from '../../services/EPICService';

const EPICSection = () => {
  const [epicData, setEpicData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from a specific EPIC API endpoint
        const data = await fetchEPICData('natural/images');
        setEpicData(data);
      } catch (error) {
        console.error('Error fetching EPIC data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {epicData ? (
        <div>
          <h2>EPIC Data</h2>
          {/* Render EPIC data here */}
          {/* You can access the data using epicData */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EPICSection;