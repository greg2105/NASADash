// InsightSection.jsx
import React, { useState, useEffect } from 'react';
import { fetchInsightData } from '../../services/InsightService';

const InsightSection = () => {
  const [insightData, setInsightData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInsightData();
        setInsightData(data);
      } catch (error) {
        console.error('Error fetching InSight data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {insightData ? (
        <div>
          <h2>InSight Weather Data</h2>
          {/* Render InSight data here */}
          {/* You can access the data using insightData */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InsightSection;