// starbackground.jsx
import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const StarBackground = (props) => {
  console.log('Rendering StarBackground component');
  const ref = useRef();
  const [positions] = useState(() => {
    const positionsArray = [];
    for (let i = 0; i < 5000; i++) {
      positionsArray.push(
        Math.random() * 2 - 1, // x position between -1 and 1
        Math.random() * 2 - 1, // y position between -1 and 1
        Math.random() * 2 - 1  // z position between -1 and 1
      );
    }
    return new Float32Array(positionsArray);
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default StarBackground;