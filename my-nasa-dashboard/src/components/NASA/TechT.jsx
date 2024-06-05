// TechTransferSection.jsx
import { NASA_API_KEY } from '../../constants';

import React, { useState, useEffect } from 'react';

const TechTransferSection = () => {
  const [patents, setPatents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`https://api.nasa.gov/techtransfer/patent/?engine&api_key=${NASA_API_KEY}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPatents(data.results || []);
      } catch (error) {
        console.error('Error fetching patents:', error);
        setError(error.message || 'Failed to fetch patents');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatents();
  }, []);

  if (isLoading) return <p>Loading NASA Tech Transfer patents...</p>;
  if (error) return <p>Error: {error}</p>;
  if (patents.length === 0) return <p>No patents found.</p>;

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <div>
      <h1>NASA Tech Transfer Patents</h1>
      <ul>
        {patents.map((patent, index) => (
          <li key={patent[0]}>
            <h3>{stripHtml(patent[2])}</h3>
            <p><strong>ID:</strong> {patent[0]}</p>
            <p><strong>NASA ID:</strong> {patent[1]}</p>
            <p><strong>Description:</strong> {stripHtml(patent[3])}</p>
            <p><strong>Center:</strong> {patent[6]}</p>
            <p><strong>Category:</strong> {patent[4]}</p>
            {patent[8] && <p><strong>Image:</strong> <img src={patent[8]} alt={patent[2]} style={{ maxWidth: '300px' }} /></p>}
            <p><strong>Relevance Score:</strong> {patent[10]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechTransferSection;