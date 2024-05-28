import React, { useState, useEffect } from 'react';

const ApodSection = () => {
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    const fetchApodData = async () => {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=fqvAIjn9L1eu461GmoODoBYKkgvsfLsTNr4cBmBG');
      const data = await response.json();
      setApodData(data);
    };

    fetchApodData();
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