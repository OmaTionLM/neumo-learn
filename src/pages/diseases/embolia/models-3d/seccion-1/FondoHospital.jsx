import React from "react";
import { useGLTF } from "@react-three/drei";

const FondoHospital = () => {
  const { scene } = useGLTF("/models-3d/emboliaPulmonar/hospital.glb");

  return (
    <primitive
      object={scene}
      scale={[1.5, 1.5, 1.5]}         
      position={[0, -1.5, -2]}        
      rotation={[0, Math.PI, 0]}    
    />
  );
};

export default FondoHospital;

