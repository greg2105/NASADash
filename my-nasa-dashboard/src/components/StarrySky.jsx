import React, { useState, useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props) => {
  const ref = useRef();
  const { size } = useThree();
  const sphereRadius = Math.max(size.width, size.height) / 2;

  const [sphere] = useState(() => {
    return random.inSphere(new Float32Array(4000), { radius: (sphereRadius / 30)});
  });

  const vertices = useMemo(() => sphere, [sphere]);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]} ref={ref}>
      <Points positions={vertices} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#fff"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default StarBackground;