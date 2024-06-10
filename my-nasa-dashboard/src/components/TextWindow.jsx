import React, { useMemo, useRef, useEffect } from 'react';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { Vector3, FrontSide, Euler } from 'three';
import fontJSON from '../../public/Orbitron.json';

const TextWindow = ({ content, latitude, longitude, rotation }) => {
  const textRef = useRef();
  const font = useMemo(() => {
    const fontLoader = new FontLoader();
    return fontLoader.parse(fontJSON);
  }, []);

  
  const textGeometry = useMemo(() => {
    return new TextGeometry(content, {
      font: font,
      size: 0.05,
      height: 0.01,
    });
  }, [content, font]);

  const latLongToPoint = (latitude, longitude, radius) => {
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new Vector3(x, y, z);
  };

  useEffect(() => {
    if (textRef.current && textGeometry) {
      const radius = 1.2;
      const position = latLongToPoint(latitude, longitude, radius);
      // Set the text position
      textRef.current.position.copy(position);
    
      // Center the text geometry
      textGeometry.computeBoundingBox();
      const { max, min } = textGeometry.boundingBox;
      const center = new Vector3().addVectors(max, min).multiplyScalar(0.5);
      textGeometry.translate(-center.x, -center.y, -center.z);

      // Apply the passed rotation
      textRef.current.rotation.set(rotation.x, rotation.y, rotation.z, 'XYZ');
    }
  }, [latitude, longitude, textGeometry, rotation]);

  if (!font || !textGeometry) return null;

  return (
    <mesh ref={textRef}>
      <bufferGeometry attach="geometry" {...textGeometry} />
      <meshBasicMaterial color="white" side={FrontSide} />
    </mesh>
  );
};

export default TextWindow;