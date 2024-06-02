// InsightSection.jsx
import React, { useState, useEffect } from 'react';
import { fetchInsightData } from '../../services/InsightService';

const InsightSection = () => {
    const [insightData, setInsightData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Received data:", data);
          setInsightData(data);
          setError(null);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <h2>InSight Weather Data</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : insightData.length > 0 ? (
          insightData.map((item) => <p key={item}>{item}</p>)
        ) : (
          <p>No data available</p>
        )}
      </div>
    );
  };
  
  export default InsightSection;