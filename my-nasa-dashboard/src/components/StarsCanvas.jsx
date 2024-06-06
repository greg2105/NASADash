// starscanvas.jsx
import React from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import StarBackground from './StarBackground';

const CameraControls = () => {
  const { camera } = useThree();
  const zoomDistance = 0; // Adjust this value to control the zoom level

  useFrame(() => {
    camera.position.z = zoomDistance;
  });

  return null; // No need to return anything
};

const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 z-[20]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <CameraControls />
      <StarBackground />
    </Canvas>
  </div>
);

export default StarsCanvas;