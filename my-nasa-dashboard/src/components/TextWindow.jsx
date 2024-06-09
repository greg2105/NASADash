import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { Vector3, Euler, Quaternion, Matrix4, FrontSide } from 'three';
import fontJSON from '../../public/Orbitron.json'; // Replace with the path to your font JSON file

const TextWindow = ({ content, latitude, longitude }) => {
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

  // Function to convert latitude and longitude to a point on the sphere
  const latLongToPoint = (latitude, longitude, radius) => {
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new Vector3(x, y, z);
  };

  // Function to calculate rotation to make the text tangential to the sphere
  const calculateTangentialRotation = (position) => {
    const normal = position.clone().normalize();
    const tangent = new Vector3(0, 1, 0).cross(normal).normalize();
    const binormal = new Vector3().crossVectors(normal, tangent);
  
    const rotationMatrix = new Matrix4();
    rotationMatrix.makeBasis(tangent, binormal, normal);
  
    const quaternion = new Quaternion();
    quaternion.setFromRotationMatrix(rotationMatrix);
  
    return new Euler().setFromQuaternion(quaternion);
  };
  

  useEffect(() => {
    if (textRef.current && textGeometry) {
      const radius = 1.2;
      const position = latLongToPoint(latitude, longitude, radius);
      const rotation = calculateTangentialRotation(position);

      textRef.current.position.copy(position);
      textRef.current.rotation.set(rotation.x, rotation.y, rotation.z);

      // Center the text geometry
      textGeometry.computeBoundingBox();
      const { max, min } = textGeometry.boundingBox;
      const center = new Vector3().addVectors(max, min).multiplyScalar(0.5);
      textGeometry.translate(-center.x, -center.y, -center.z);
    }
  }, [latitude, longitude, textGeometry]);

  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(0, 0, 0);
    }
  });

  if (!font || !textGeometry) return null;

  return (
    <mesh ref={textRef}>
      <bufferGeometry attach="geometry" {...textGeometry} />
      <meshBasicMaterial color="white" side={FrontSide} />
    </mesh>
  );
};


export default TextWindow;