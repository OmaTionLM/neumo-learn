import { useRef } from "react";
import { HemisphereLightHelper, SpotLightHelper } from "three";
import { useHelper } from "@react-three/drei";

const Lights = () => {
  const hemisphereLightRef = useRef();
  const spotLightRef = useRef();

  return (
    <>
      <hemisphereLight
        ref={hemisphereLightRef}
        color="orange"
        groundColor="blue"
        intensity={1.2}
        position={[0, 10, 0]}
      />
      <spotLight
        ref={spotLightRef}
        position={[4, 5, -2]}
        angle={Math.PI / 4}
        intensity={1.5}  // Ajusta la intensidad de la luz
        penumbra={0.8}   // Aumenta para sombras más suaves
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-radius={5} // Si deseas sombras más suaves
      />
    </>
  );
};

export default Lights;


