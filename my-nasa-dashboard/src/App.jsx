import React from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ReactDOM from 'react-dom/client';
import StarrySky from './components/StarrySky';
import Scene from './components/Scene';
import Title from './components/Title';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="app-container">
    <Title />
    <div className="astronaut-container">
          <img src="../public/astronaut.png" alt="Astronaut" className="astronaut-image" />
    </div>
    <div className="starry-sky-container">
    <Canvas >  
      <StarrySky />
    </Canvas>
    </div>
    <div className="planet-model-container">
      <Canvas shadows camera= {{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls 
            minDistance={2} 
            maxDistance={4} 
          />
          <ambientLight intensity={0.1} />
          <directionalLight 
            position={[-5, 5, 5]} 
            intensity={1} 
            color="white" 
            castShadow 
          />
        </Suspense>
      </Canvas>
    </div>
  </div>
);