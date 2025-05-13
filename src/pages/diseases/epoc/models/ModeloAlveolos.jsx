import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function AlveolusModel(props) {
  const ref = useRef();
  const { nodes, materials } = useGLTF('/models-3d//epoc/alveolus.glb');
  
  return (
    <group ref={ref} {...props} dispose={null} castShadow receiveShadow>
      <primitive object={nodes.Scene || nodes.root} />
    </group>
  );
}

useGLTF.preload('/models-3d/epoc/alveolus.glb');

