import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export function ModeloMesh(props) {
  const ref = useRef();
  const { scene } = useGLTF("/models-3d/emboliaPulmonar/anticuagulantes.glb");

  // Rotación automática
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={props.scale || [1, 1, 1]}
      position={props.position || [0, -1, 0]}
      rotation={props.rotation || [0, 0, 0]}
      castShadow
      receiveShadow
    />
  );
}

export default ModeloMesh;

