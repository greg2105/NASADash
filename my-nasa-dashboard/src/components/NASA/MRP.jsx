// RoverPhotosSection.jsx
import React, { useState, useEffect } from 'react';
import { fetchRoverPhotos } from '../../services/MRPService';

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
          {roverPhotos.map((photo, index) => (
            <div key={index}>
              <img src={photo.img_src} alt={`Rover Photo ${index}`} />
              <p>Camera: {photo.camera.full_name}</p>
              <p>Rover: {photo.rover.name}</p>
              <p>Sol: {photo.sol}</p>
              <p>Earth Date: {photo.earth_date}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RoverPhotosSection;