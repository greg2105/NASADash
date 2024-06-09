import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, BackSide, Mesh, CylinderGeometry, MeshBasicMaterial, Quaternion, Matrix4 } from 'three';
import styled from 'styled-components';
import HotSpot from './HotSpot';
import FloatingCircle from './FloatingCircle';
import { Vector3, Euler } from 'three';

const StyledText = styled.div`
  color: #00ffff; /* Light cyan */
`;


const Scene = () => {
  const { nodes, materials } = useGLTF('/scene.gltf');
  const { camera, size } = useThree();
  const groupRef = useRef();
  const ringRotation = new Euler(Math.PI / 4, Math.PI / 2, 0); // Adjust the rotation values as needed
  const earthRadius = nodes.Object_4.geometry.boundingSphere.radius;

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
      groupRef.current.rotation.y += 0.0005;
    }
  });

  const ringData = [
    { latitude: 30, longitude: 0, label: '1' },
    { latitude: 45, longitude: 90, label: '2' },
    { latitude: 30, longitude: -100, label: '3' },
    { latitude: 40, longitude: -80, label: '4' },
    { latitude: 37, longitude: -115, label: '5' },
    { latitude: -15, longitude: -70, label: '6' },
    { latitude: 50, longitude: 10, label: '7' },
    { latitude: 45, longitude: 40, label: '8' },
    { latitude: 20, longitude: 15, label: '9' },
    { latitude: 25, longitude: 80, label: '10' },
    { latitude: 30, longitude: 100, label: '11' },
    { latitude: -5, longitude: -60, label: '12' },
    { latitude: -7, longitude: -45, label: '13' },
    { latitude: 25, longitude: 50, label: '14' },
    // Add more ring data here
  ];

  const [circleColors, setCircleColors] = useState(Array(ringData.length).fill("white"));

  // Function to convert latitude and longitude to a point on the sphere
  const latLongToPoint = (latitude, longitude, radius) => {
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new Vector3(x, y, z);
  };


  // Function to calculate rotation to make the ring tangential to the sphere
  const calculateTangentialRotation = (position) => {
    const normal = position.clone().normalize();
    const tangent = new Vector3(-normal.y, normal.x, 0).normalize();
    const binormal = new Vector3().crossVectors(normal, tangent);

    const rotationMatrix = new Matrix4();
    rotationMatrix.makeBasis(tangent, binormal, normal);

    const quaternion = new Quaternion();
    quaternion.setFromRotationMatrix(rotationMatrix);

    return new Euler().setFromQuaternion(quaternion);
  };

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
      {ringData.map((ring, index) => {
        const largeRingPosition = latLongToPoint(ring.latitude, ring.longitude, 1.13);
        const smallRingPosition = latLongToPoint(ring.latitude, ring.longitude, 1.17);
        const rotation = calculateTangentialRotation(largeRingPosition);

        return (
          <React.Fragment key={index}>
            <FloatingCircle
              position={largeRingPosition}
              radius={0.04}
              color={circleColors[index]} // Use the dynamic circleColor state
              rotation={rotation}
              pulseSpeed={2}
            />
            <FloatingCircle
              position={smallRingPosition}
              radius={0.01}
              color={circleColors[index]} // Use the dynamic circleColor state
              rotation={rotation}
              pulseSpeed={2}
            />
            <HotSpot 
          position={smallRingPosition} 
          onClick={() => {
          console.log(`Hotspot ${index + 1} clicked: ${ring.label}`);
          const newColors = [...circleColors]; // Create a copy of the array
          newColors[index] = "purple"; // #513c5f
          setCircleColors(newColors); //
          }}>
          </HotSpot>
          </React.Fragment>
        );
      })}
    </group>
  );
};

useGLTF.preload('/scene.gltf');
export default Scene;