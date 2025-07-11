import React, { useMemo, useEffect, useRef } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { MTLLoader, OBJLoader } from "three-stdlib";

const ModeloOBJ = ({ position = [0, 0, 0], scale = [1.5, 1.5, 1.5] }) => {
  const materials = useLoader(MTLLoader, "/models-3d/emboliaPulmonar/modeloSintomas/modelo.mtl");

  const obj = useLoader(
    OBJLoader,
    "/models-3d/emboliaPulmonar/modeloSintomas/modelo.obj",
    (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    }
  );

  const cloned = useMemo(() => obj.clone(), [obj]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = child.material.clone(); 
        child.material.side = 2; 
      }
    });
  }, [cloned]);

  return <primitive object={cloned} position={position} scale={scale} />;
};

export default ModeloOBJ;

