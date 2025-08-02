import { useGLTF, useAnimations, Environment } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"

const VistaPrevencionModel = () => {
  const group = useRef()
  const { scene, animations } = useGLTF("/models-3d/emboliaPulmonar/modeloMovimiento/Situps.glb")
  const { actions, mixer } = useAnimations(animations, group)
  const [play, setPlay] = useState(true)

  useEffect(() => {
    if (actions && actions["Run"]) {
      actions["Run"].play()
    }

    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "r") {
        setPlay((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [actions])

  useEffect(() => {
    if (play) {
      actions["Run"]?.play()
    } else {
      actions["Run"]?.stop()
    }
  }, [play, actions])

  useFrame((_, delta) => {
    if (play) mixer?.update(delta)
  })

  return (
    <>
      {/* ILUMINACIÓN */}
      <ambientLight intensity={0.4} />
      <spotLight
        intensity={1.5}
        angle={0.4}
        penumbra={0.5}
        position={[5, 8, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* HDRI BACKGROUND */}
      <Environment files="/hdrs/playa.hdr" background />

      {/* MODELO */}
      <group ref={group} dispose={null} position={[0, -2, 0]} scale={0.7}>
        <primitive object={scene} castShadow receiveShadow />
      </group>
    </>
  )
}

export default VistaPrevencionModel




