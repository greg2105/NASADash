// TechTransferSection.jsx
import React, { useState, useEffect } from 'react';
import { searchPatents, searchSoftware, searchSpinoffs } from '../../services/TechTransferService';

const TechTransferSection = () => {
  const [patentResults, setPatentResults] = useState(null);
  const [softwareResults, setSoftwareResults] = useState(null);
  const [spinoffResults, setSpinoffResults] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Search for patents
        const patentQuery = 'engine';
        const patentData = await searchPatents(patentQuery);
        setPatentResults(patentData.patents);

        // Search for software
        const softwareQuery = 'mars';
        const softwareData = await searchSoftware(softwareQuery);
        setSoftwareResults(softwareData.software);

        // Search for spinoffs
        const spinoffQuery = 'water';
        const spinoffData = await searchSpinoffs(spinoffQuery);
        setSpinoffResults(spinoffData.spinoffs);
      } catch (error) {
        console.error('Error fetching tech transfer data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {patentResults ? (
        <div>
          <h2>Patent Results</h2>
          {/* Render patent results here */}
          {/* You can access the patent results using patentResults */}
        </div>
      ) : (
        <p>Loading patent results...</p>
      )}

      {softwareResults ? (
        <div>
          <h2>Software Results</h2>
          {/* Render software results here */}
          {/* You can access the software results using softwareResults */}
        </div>
      ) : (
        <p>Loading software results...</p>
      )}

      {spinoffResults ? (
        <div>
          <h2>Spinoff Results</h2>
          {/* Render spinoff results here */}
          {/* You can access the spinoff results using spinoffResults */}
        </div>
      ) : (
        <p>Loading spinoff results...</p>
      )}
    </div>
  );
};

export default TechTransferSection;