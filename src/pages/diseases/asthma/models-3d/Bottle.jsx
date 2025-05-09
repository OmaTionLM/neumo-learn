
import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Bottle(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models-3d/asthma/bottle.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <mesh
            name="Bottle"
            castShadow
            receiveShadow
            geometry={nodes.Bottle.geometry}
            material={materials.BottleMaterial}
          />
          <primitive object={nodes._rootJoint} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/asthma/bottle.glb')