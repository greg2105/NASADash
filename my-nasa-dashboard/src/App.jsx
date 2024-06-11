import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ReactDOM from 'react-dom/client';
import StarrySky from './components/StarrySky';
import Scene from './components/Scene';
import Title from './components/Title';
import SpeechBubble from './components/SpeechBubble';
import './styles/App.css';
import ApodSection from './components/NASA/APOD';
import DonkiSection from './components/NASA/DONKI';
import NearEarthObjects from './components/NASA/NeoWs';
import Earth from './components/NASA/Earth';
import EONET from './components/NASA/EONET';
import EPIC from './components/NASA/EPIC';
import Exoplanet from './components/NASA/Exoplanet';
import ImageRepositorySection from './components/NASA/IVL';
import RoverPhotosSection from './components/NASA/MRP';
import SatelliteSituationCenterSection from './components/NASA/SSC';
import TechTransferSection from './components/NASA/TechT';
import TLESection from './components/NASA/TLE';
import WMTSSection from './components/NASA/WMTS';
import CloseApproachSection from './components/NASA/SSDCNEOS';

const Dashboard = ({ data }) => {
  // Render the dashboard content based on the data received from the hotspot click
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      {data.index == 0 && <ApodSection />}
      {data.index == 1 && <DonkiSection />}
      {data.index == 2 && <NearEarthObjects />}
      {data.index == 3 && <Earth />}
      {data.index == 4 && <EONET />}
      {data.index == 5 && <EPIC />}
      {data.index == 6 && <Exoplanet />}
      {data.index == 8 && <ImageRepositorySection />}
      {data.index == 9 && <RoverPhotosSection />}
      {data.index == 10 && <SatelliteSituationCenterSection />}
      {data.index == 11 && <TechTransferSection />}
      {data.index == 12 && <TLESection />}
      {data.index == 13 && <WMTSSection />}
      {data.index == 14 && <CloseApproachSection />}
    </div>
  );
};

const App = () => {
  const [bubbleText, setBubbleText] = useState("");
  const [dashboardData, setDashboardData] = useState({
    name: 'Placeholder Planet',
    description: 'This is a placeholder description for the dashboard.'
  });

  useEffect(() => {
    setBubbleText("Welcome to NebulAPI. This application is designed to help you explore all of NASA's open APIs. Try clicking on one of the locations on the Earth. You can find all API information at https://api.nasa.gov/");
  }, []);

  const handleHotspotClicked = (index) => {
    if (index === 0) {
      setDashboardData({ name: 'APOD', description: 'Astronomy Picture of the Day', index: 0 });
    } if (index === 1) {
      setDashboardData({ name: 'DONKI', description: 'Space Weather Database Of Notifications, Knowledge, Information', index: 1 });
    }
    if (index === 2) {
      setDashboardData({ name: 'NeoWs', description: 'Near Earth Object Web Service', index: 2 });
    }
    if (index === 3) {
      setDashboardData({ name: 'EARTH', description: 'Unlock the significant public investment in earth observation data', index: 3 });
    }
    if (index === 4) {
      setDashboardData({ name: 'EONET', description: 'The Earth Observatory Natural Event Tracker', index: 4 });
    }
    if (index === 5) {
      setDashboardData({ name: 'EPIC', description: 'Earth Polychromatic Imaging Camera', index: 5});
    }
    if (index === 6) {
      setDashboardData({ name: 'Exoplanet', description: 'Programmatic access to NASAs Exoplanet Archive Database', index: 6 });
    }
    if (index === 7) {
      setDashboardData({ name: 'WMTS', description: 'Vesta/Moon/Mars Trek WMTS', index: 7 });
    }
    if (index === 8) {
      setDashboardData({ name: 'IVL', description: 'Astronomy Picture of the Day', index: 8 });
    }
    if (index === 9) {
      setDashboardData({ name: 'MRP', description: 'Astronomy Picture of the Day', index: 9 });
    }
    if (index === 10) {
      setDashboardData({ name: 'SSC', description: 'Astronomy Picture of the Day', index: 10 });
    }
    if (index === 11) {
      setDashboardData({ name: 'TechTransfer', description: 'Astronomy Picture of the Day', index: 11 });
    }
    if (index === 12) {
      setDashboardData({ name: 'TLE', description: 'Astronomy Picture of the Day', index: 12 });
    }
    if (index === 13) {
      setDashboardData({ name: 'SSDCNEOS', description: 'Astronomy Picture of the Day', index: 13 });
    }
  };

  useEffect(() => {
    console.log('Updated dashboardData:', dashboardData);
  }, [dashboardData]);

  return (
    <div className="app-container">
      <Title />
      {bubbleText && <SpeechBubble text={bubbleText} speed={90} />}
      <Canvas className="starry-sky-canvas">
        <StarrySky />
      </Canvas>
      <div className="content-container">
        <div className="astronaut-container">
          <img src="../../public/astronaut.png" alt="Astronaut" className="astronaut-image" />
        </div>
        <div className="planet-model-container">
          <Canvas shadows camera={{ position: [0, 0, 5] }}>
            <Suspense fallback={null}>
              <Scene onHotspotClicked={handleHotspotClicked}/>
              <OrbitControls minDistance={2} maxDistance={4} enablePan={false} />
              <ambientLight intensity={0.4} color="purple" />
              <directionalLight position={[5, 5, -5]} intensity={2} color="pink" castShadow />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="dashboard-container">
        <Dashboard data={dashboardData} />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);