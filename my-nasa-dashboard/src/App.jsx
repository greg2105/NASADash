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
      {data.index == 6 && <ImageRepositorySection />}
      {data.index == 7 && <RoverPhotosSection />}
      {data.index == 8 && <TechTransferSection />}
    </div>
  );
};

const App = () => {
  const [bubbleText, setBubbleText] = useState("");
  const [dashboardData, setDashboardData] = useState({
    name: 'Try Clicking A Location',
    description: 'This will contain information about the selected API.'
  });

  useEffect(() => {
    setBubbleText("Welcome to NebulAPI. This application is designed to help you explore all of NASA's open APIs. Try clicking on one of the locations on the Earth. You can find all API information at https://api.nasa.gov/");
  }, []);


  const handleHotspotClicked = (index) => {
    if (index === 0) {
      setDashboardData({
        name: 'APOD',
        description: 'Astronomy Picture of the Day',
        index: 0
      });
      setBubbleText("The APOD API serves up NASA's Astronomy Picture of the Day, which features a stunning image or video of an astronomical object or phenomenon, along with a brief explanation written by a professional astronomer. This API is perfect for websites, applications, or projects that aim to showcase the beauty and wonders of the cosmos.");
    } else if (index === 1) {
      setDashboardData({
        name: 'DONKI',
        description: 'Space Weather Database Of Notifications, Knowledge, Information',
        index: 1
      });
      setBubbleText("The DONKI API facilitates access to NASA's vast collection of data, including datasets, publications, and multimedia resources. It provides a unified search interface, allowing users to discover and retrieve information across multiple NASA data repositories and disciplines.");
    } else if (index === 2) {
      setDashboardData({
        name: 'NeoWs',
        description: 'Near Earth Object Web Service',
        index: 2
      });
      setBubbleText("The Near Earth Objects API tracks and provides data on asteroids and comets that orbit relatively close to Earth's orbit around the Sun. It offers information such as orbit trajectories, potential Earth approach dates, and physical characteristics of these celestial objects, aiding in monitoring and research efforts.");
    } else if (index === 3) {
      setDashboardData({
        name: 'EARTH',
        description: 'Unlock the significant public investment in earth observation data',
        index: 3
      });
      setBubbleText("The EARTH API offers access to a wide range of Earth science data, including imagery, geospatial datasets, and information about Earth's physical and biological systems. It serves as a comprehensive resource for researchers, educators, and developers working on projects related to Earth observation and environmental monitoring.");
    } else if (index === 4) {
      setDashboardData({
        name: 'EONET',
        description: 'The Earth Observatory Natural Event Tracker',
        index: 4
      });
      setBubbleText("The EONET API provides real-time data and updates on natural events observed on Earth, such as wildfires, severe storms, and volcanic eruptions. It collects and aggregates data from various sources, making it a valuable tool for monitoring and responding to natural disasters and environmental changes.");
    } else if (index === 5) {
      setDashboardData({
        name: 'EPIC',
        description: 'Earth Polychromatic Imaging Camera',
        index: 5
      });
      setBubbleText("The EPIC API provides access to stunning images of Earth captured by NASA's EPIC camera aboard the DSCOVR spacecraft. These images offer a unique perspective of our planet from approximately one million miles away, enabling users to appreciate the beauty and fragility of Earth from a distance.");
    } else if (index === 6) {
      setDashboardData({
        name: 'IVL',
        description: 'API to access the NASA Image and Video Library site at images.nasa.gov',
        index: 6
      });
      setBubbleText("The Image and Video Library API serves as a gateway to NASA's vast collection of multimedia resources, including high-resolution images, videos, and animations. It enables users to search and retrieve these assets, which can be used for educational, research, or creative purposes, while adhering to NASA's usage policies.");
    } else if (index === 7) {
      setDashboardData({
        name: 'MRP',
        description: 'Image data gathered by NASAs Curiosity, Opportunity, and Spirit rovers on Mars',
        index: 7
      });
      setBubbleText("The Mars Rover Photos API provides access to the vast collection of images captured by NASA's Mars rovers, including Curiosity, Opportunity, and Spirit. It allows you to retrieve and filter images based on various parameters, such as rover name, camera type, and Earth date. This API is a valuable resource for researchers, educators, and space enthusiasts interested in exploring the Martian landscape.");
    } else if (index === 8) {
      setDashboardData({
        name: 'TechTransfer',
        description: 'Patents, Software, and Tech Transfer Reports',
        index: 8
      });
      setBubbleText("The Tech Transfer API allows users to explore and access information about NASA's technology transfer program, which aims to bring NASA-developed technologies and innovations to the public and commercial sectors. It provides details on available technologies, licensing opportunities, and success stories.");
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
          <img src="/assets/astronaut.png" alt="Astronaut" className="astronaut-image" />
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