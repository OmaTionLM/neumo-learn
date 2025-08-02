import * as THREE from 'three'
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const EnvironmentHero = ({ hospitalMode }) => {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = hospitalMode
      ? new THREE.Color("#183D5D") // fondo hospital
      : new THREE.Color("#cce6ff"); // fondo azul claro
  }, [hospitalMode, scene]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
};

export default EnvironmentHero;

