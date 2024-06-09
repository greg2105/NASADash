import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ReactDOM from 'react-dom/client';
import StarrySky from './components/StarrySky';
import Scene from './components/Scene';
import Title from './components/Title';
import SpeechBubble from './components/SpeechBubble';
import './styles/App.css';

const App = () => {
  const [bubbleText, setBubbleText] = useState("");

  useEffect(() => {
    setBubbleText("Welcome to the cosmic journey. Explore the wonders of the universe...");
  }, []);

  const handlePlanetClick = () => {
    setBubbleText("You've discovered a new planet! It's a gas giant with swirling storms.");
  };

  return (
    <div className="app-container">
      <Title />
      {bubbleText && <SpeechBubble text={bubbleText} speed={70} />}
      <Canvas className="starry-sky-canvas">
        <StarrySky />
      </Canvas>
      <div className="content-container">
        <div className="astronaut-container">
          <img src="../public/astronaut.png" alt="Astronaut" className="astronaut-image" />
        </div>
        <div className="planet-model-container" onClick={handlePlanetClick}>
          <Canvas shadows camera={{ position: [0, 0, 5] }}>
            <Suspense fallback={null}>
              <Scene />
              <OrbitControls minDistance={2} maxDistance={4} />
              <ambientLight intensity={0.4} color="purple" />
              <directionalLight position={[5, 5, -5]} intensity={2} color="pink" castShadow />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);