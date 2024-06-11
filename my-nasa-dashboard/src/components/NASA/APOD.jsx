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
    <div className="apod-container">
      {apodData ? (
        <>
          <h3>{apodData.title}</h3>
          <div className="apod-image-container">
            <img src={apodData.url} alt={apodData.title} className="apod-image" />
          </div>
          <p>{apodData.explanation}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApodSection;