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

const Dashboard = ({ data }) => {
  // Render the dashboard content based on the data received from the hotspot click
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      {data.index == 0 && <ApodSection />}
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
    } else {
      setDashboardData({ name: `Hotspot ${index}`, description: `This is the hotspot ${index} description.`, index });
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