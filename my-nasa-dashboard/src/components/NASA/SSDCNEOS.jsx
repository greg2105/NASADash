import React, { useState, useEffect } from 'react';

const CloseApproachSection = () => {
  const [asteroidData, setAsteroidData] = useState(null);
  const [earthData, setEarthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseCADFields = (fieldsArray, dataArray) => {
    return dataArray.map(item =>
      item.reduce((obj, value, index) => {
        obj[fieldsArray[index]] = value;
        return obj;
      }, {})
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Search for close approaches of asteroid 433 Eros
        const erosResponse = await fetch('http://localhost:3000/api/ssd/cad/asteroid/433?dateMin=2000-01-01&dateMax=2100-01-01&distMax=0.2');
        const erosData = await erosResponse.json();
        setAsteroidData(erosData);

        // Search for Earth close-approaches within 10 lunar distances
        const earthResponse = await fetch('http://localhost:3000/api/ssd/cad/earth?distMax=10LD&dateMin=2020-01-01&sort=dist');
        const earthData = await earthResponse.json();
        setEarthData(earthData);
      } catch (error) {
        console.error('Error fetching close approach data:', error);
        setError(error.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) return <p>Loading close approach data...</p>;
  if (error) return <p>Error: {error}</p>;

  const renderApproachTable = (data, title) => {
    if (!data || data.count === 0) return <p>No {title} found.</p>;
    const parsedData = parseCADFields(data.fields, data.data);

    return (
      <div>
        <h2>{title}</h2>
        <table>
          <thead>
            <tr>
              <th>Object</th>
              <th>Close Approach Date</th>
              <th>Min Distance (au)</th>
              <th>Relative Velocity (km/s)</th>
            </tr>
          </thead>
          <tbody>
            {parsedData.map((approach, index) => (
              <tr key={index}>
                <td>{approach.fullname || approach.des}</td>
                <td>{approach.cd}</td>
                <td>{approach.dist_min}</td>
                <td>{approach.v_rel}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>Total approaches: {data.count}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>NASA Small-Body Database Close Approach Data</h1>
      {renderApproachTable(asteroidData, 'Close Approaches for Asteroid 433 Eros (1900-2100, within 0.2 au)')}
      {renderApproachTable(earthData, 'Earth Close-Approaches (within 10 lunar distances, since 2018)')}
      <p>Data source: {asteroidData?.signature.source} v{asteroidData?.signature.version}</p>
    </div>
  );
};

export default CloseApproachSection;