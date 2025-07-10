// src/components/Pulmon3DLogo.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function PulmonModel() {
  const { scene } = useGLTF("/models-3d/home/logo.glb");
  const modelRef = useRef();

  // Rotación continua en eje Y (horizontal)
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.2} />;
}

const Pulmon3DLogo = () => (
  <div style={{ width: "100px", height: "100px" }}>
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />
      <PulmonModel />
    </Canvas>
  </div>
);

export default Pulmon3DLogo;


