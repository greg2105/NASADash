import React, { useRef, useEffect } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, BackSide, Mesh, CylinderGeometry, MeshBasicMaterial } from 'three';
import styled from 'styled-components';
import HotSpot from './HotSpot';

const StyledText = styled.div`
  color: #00ffff; /* Light cyan */
`;


const Scene = () => {
  const { nodes, materials } = useGLTF('/scene.gltf');
  const { camera, size } = useThree();
  const groupRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [camera, size]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Override the material to ensure it's set up correctly
  const earthMaterial = new MeshStandardMaterial({
    map: materials['Scene_-_Root'].map,
    normalMap: materials['Scene_-_Root'].normalMap,
    roughness: 0.5,
    metalness: 0.2,
    wireframe: false, // Ensure wireframe is off
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={nodes.Object_4.geometry} material={earthMaterial} scale={1.128} castShadow receiveShadow />
      {/* Add a backside mesh to simulate atmosphere */}
      <mesh geometry={nodes.Object_4.geometry} scale={1.132}>
        <meshBasicMaterial color="#90a3ff" transparent opacity={0.2} side={BackSide} />
      </mesh>
      <HotSpot position={[1, 0.5, 0]} onClick={() => console.log('Hotspot 1 clicked')}>
      </HotSpot>
    </group>
  );
};

useGLTF.preload('/scene.gltf');
export default Scene;