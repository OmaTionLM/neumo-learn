import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export function LungSickModel(props) {
  const ref = useRef();
  const { scene } = useGLTF('/models-3d/epoc/lungSick.glb');

  // Configurar sombras en las mallas del modelo
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.depthWrite = true;
        }
      }
    });
  }, [scene]);

  return (
    <group ref={ref} {...props}>
      {/* Modelo 3D con sombras activadas */}
      <primitive object={scene} scale={[0.9, 0.9, 0.9]} position={[0, 0, 0]} />

      {/* Piso receptor de sombras */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </group>
  );
}

useGLTF.preload('/models-3d/epoc/lungSick.glb');
