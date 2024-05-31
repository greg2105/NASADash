// TLESection.jsx
import React, { useState, useEffect } from 'react';
import { searchTLEBySatelliteName, getTLEBySatelliteNumber } from '../../services/TLEService';

const TLESection = () => {
  const [tleSearchResults, setTleSearchResults] = useState(null);
  const [tleBySatelliteNumber, setTleBySatelliteNumber] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Search for TLE records by satellite name
        const searchQuery = 'ISS';
        const searchData = await searchTLEBySatelliteName(searchQuery);
        setTleSearchResults(searchData);

        // Fetch TLE record by satellite number
        const satelliteNumber = '25544';
        const tleData = await getTLEBySatelliteNumber(satelliteNumber);
        setTleBySatelliteNumber(tleData);
      } catch (error) {
        console.error('Error fetching TLE data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {tleSearchResults ? (
        <div>
          <h2>TLE Search Results</h2>
          {/* Render TLE search results here */}
          {/* You can access the search results using tleSearchResults */}
        </div>
      ) : (
        <p>Loading TLE search results...</p>
      )}

      {tleBySatelliteNumber ? (
        <div>
          <h2>TLE by Satellite Number</h2>
          {/* Render TLE by satellite number here */}
          {/* You can access the TLE data using tleBySatelliteNumber */}
        </div>
      ) : (
        <p>Loading TLE by satellite number...</p>
      )}
    </div>
  );
};

export default TLESection;