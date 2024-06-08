// src/components/PlanetModel.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

const Model = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002; // Rotate the model slowly
    }
  });

  return gltf ? (
    <primitive ref={modelRef} object={gltf.scene} scale={[1.5, 1.5, 1.5]} />
  ) : null;
};

const PlanetModel = () => {
  return (
    <Canvas style={{ background: 'black' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Model url="../assets/Curiosity.glb" />
      <OrbitControls /> {/* Allows interactive rotation and zoom */}
    </Canvas>
  );
};

export default PlanetModel;