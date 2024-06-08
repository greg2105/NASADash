import React from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ReactDOM from 'react-dom/client';
import StarrySky from './components/StarrySky';
import Scene from './components/Scene';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="app-container">
    <div className="planet-model-container">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls 
            minDistance={2} 
            maxDistance={10} 
          />
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <directionalLight 
            position={[-5, 5, 5]} 
            intensity={1} 
            color="white" 
            castShadow 
          />
        </Suspense>
      </Canvas>
    </div>
    <StarrySky />
  </div>
);