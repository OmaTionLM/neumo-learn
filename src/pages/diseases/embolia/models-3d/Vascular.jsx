import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ModeloEmbolo(props) {
  const ref = useRef();
  const { scene } = useGLTF('/models-3d/emboliaPulmonar/vascular.glb');

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.5; // animación de rotación
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.6}
      position={[2, -1, 0]}
      {...props}
      castShadow
      receiveShadow
    />
  );
}

