
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Bottle(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models-3d/asthma/bottle.glb')

   useFrame((state) => {
    if (group.current) {
      const t = state.clock.getElapsedTime()
      // group.current.rotation.y = t * 0.8 // Giro suave
      group.current.position.y = Math.sin(t * 2) * 0.2 - 2.1 // Rebote
    }
  })
 
  return (
    <group ref={group} {...props} dispose={null} scale={[1.4, 1.2, 1.3]}>
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