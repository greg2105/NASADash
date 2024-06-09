import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import fontJSON from '../../public/Orbitron.json'; // Replace with the path to your font JSON file

const TextWindow = ({ content, position }) => {
  const textRef = useRef();

  const textGeometry = useMemo(() => {
    const fontLoader = new FontLoader();
    const font = fontLoader.parse(fontJSON); // Use the font JSON directly
    return new TextGeometry(content, {
      font: font,
      size: 0.2,
      height: 0.01,
    });
  }, [content]);

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <mesh ref={textRef} position={position}>
      <primitive object={textGeometry} attach="geometry" />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

export default TextWindow;