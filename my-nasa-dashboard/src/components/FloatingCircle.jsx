import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Euler } from 'three';

const FloatingCircle = ({
  position = new Vector3(0, 0, 0),
  radius = 0.1,
  color = '#00ffff',
  rotation = new Euler(0, 0, 0),
  pulseSpeed = 3
}) => {
  const circleRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * pulseSpeed;
    const minScale = 0.6;
    const maxScale = 1.2;
    const scale = minScale + (Math.sin(t) + 1) * 0.5 * (maxScale - minScale);
    circleRef.current.scale.setScalar(scale);
  });

  return (
    <>
      <mesh ref={circleRef} position={position} rotation={rotation}>
        <ringGeometry args={[radius, radius + 0.005, 32]} />
        <meshStandardMaterial 
          color={color} 
          side={2} 
          transparent 
          opacity={0.8} 
          emissive={color}
          emissiveIntensity={1.5}
        />
      </mesh>
    </>
  );
};

export default FloatingCircle;