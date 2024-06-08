import React from 'react'; // Add this line
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ReactDOM from 'react-dom/client';
import StarrySky from './components/StarrySky';
import Title from './components/Title';
import ContentArea from './components/ContentArea';
import Earth from '../public/Earth';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="app-container">
    <Title />
    <ContentArea />
    <div className="planet-model-container">
      <Canvas>
        <Suspense fallback = {null}>
          <Earth />
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
        </Suspense>
      </Canvas>
    </div>
    <StarrySky />
  </div>
);