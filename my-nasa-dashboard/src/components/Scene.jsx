import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';

const Scene = () => {
  const { nodes, materials } = useGLTF('/scene.gltf');
  const { camera, size } = useThree();
  const earthRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, size]);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Adjust this value to control rotation speed
    }
  });

  return (
    <group dispose={null} ref={earthRef}>
      <mesh 
        geometry={nodes.Object_4.geometry} 
        material={materials['Scene_-_Root']} 
        scale={1.128}
        castShadow
        receiveShadow
      />
    </group>
  );
};

useGLTF.preload('/scene.gltf');
export default Scene;