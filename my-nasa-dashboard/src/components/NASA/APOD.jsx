// ApodSection.jsx
import React, { useState, useEffect } from 'react';
import { fetchAPODData } from '../../services/APODService';

const ApodSection = () => {
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAPODData();
        setApodData(data);
      } catch (error) {
        console.error('Error fetching APOD data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {apodData ? (
        <div>
          <h2>{apodData.title}</h2>
          <img src={apodData.url} alt={apodData.title} />
          <p>{apodData.explanation}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApodSection;