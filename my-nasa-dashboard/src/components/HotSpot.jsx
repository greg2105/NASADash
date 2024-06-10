import React from 'react';
import { Html } from '@react-three/drei';
import styled from 'styled-components';

const StyledText = styled.div`
  color: #00ffff; /* Light cyan */
  font-size: 0.8em; /* Adjust as needed */
  font-weight: bold;
  text-align: center;
`;

const HotSpot = ({ position, onClick, children }) => {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.05, 16, 16]} /> {/* Adjust size and resolution as needed */}
      <meshBasicMaterial color="#00ffff" transparent opacity={0} /> {/* Adjust color and opacity as needed */}
      <Html center distanceFactor={10}>
        <StyledText>{children}</StyledText>
      </Html>
    </mesh>
  );
};

export default HotSpot;