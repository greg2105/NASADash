// RoverPhotosSection.jsx
import React, { useState, useEffect } from 'react';
import { fetchRoverPhotos } from '../../services/RoverPhotosService';

const RoverPhotosSection = () => {
  const [roverPhotos, setRoverPhotos] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch photos from the Mars Rover Photos API
        const rover = 'curiosity';
        const params = {
          sol: 1000,
          camera: 'fhaz',
        };
        const data = await fetchRoverPhotos(rover, params);
        setRoverPhotos(data.photos);
      } catch (error) {
        console.error('Error fetching rover photos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {roverPhotos ? (
        <div>
          <h2>Mars Rover Photos</h2>
          {/* Render rover photos here */}
          {/* You can access the photos using roverPhotos */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RoverPhotosSection;