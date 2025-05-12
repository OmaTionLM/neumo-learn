import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'

export default function ModeloPulmon(props) {
  const ref = useRef()
  const { scene } = useGLTF('/models-3d/emboliaPulmonar/structure-pulmon.glb')

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.5}
      position={[0, -1, 0]}
      {...props}
      castShadow
      receiveShadow
    />
  )
}

