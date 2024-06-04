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
        console.log('TLE Search Results:', searchData);
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
      {tleSearchResults && tleSearchResults.member && tleSearchResults.member.length > 0 ? (
        <div>
          <h2>TLE Search Results</h2>
          {tleSearchResults.member.map((result) => (
            <div key={result["@id"]}>
              <h3>{result.name}</h3>
              <p>Satellite Number: {result.satelliteId}</p>
              <p>Line 1: {result.line1}</p>
              <p>Line 2: {result.line2}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading TLE search results...</p>
      )}

      {tleBySatelliteNumber ? (
        <div>
          <h2>TLE by Satellite Number</h2>
          <div>
            <h3>{tleBySatelliteNumber.name}</h3>
            <p>Satellite Number: {tleBySatelliteNumber.satelliteId}</p>
            <p>Line 1: {tleBySatelliteNumber.line1}</p>
            <p>Line 2: {tleBySatelliteNumber.line2}</p>
            {/* Render additional details as needed */}
          </div>
        </div>
      ) : (
        <p>Loading TLE by satellite number...</p>
      )}
    </div>
  );
};

export default TLESection;