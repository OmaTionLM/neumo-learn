import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'

export function Inhaler(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models-3d/asthma/inhaler.glb')


  return (
    <group ref={group} {...props} dispose={null} scale={[2.5, 2.6, 2.0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_1.geometry}
        material={materials.CoverMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_2.geometry}
        material={materials.BodyMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_3.geometry}
        material={materials.ContainerMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_4.geometry}
        material={nodes.Inhaler_4.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_5.geometry}
        material={nodes.Inhaler_5.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_6.geometry}
        material={nodes.Inhaler_6.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_7.geometry}
        material={nodes.Inhaler_7.material}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/asthma/inhaler.glb')
