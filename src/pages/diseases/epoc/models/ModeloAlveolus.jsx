import React, { useRef, useEffect } from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export function AlveolusModel(props) {
  const ref = useRef()
  const { scene } = useGLTF('/models-3d/epoc/alveolus.glb')
  const { camera } = useThree()

  // Configurar sombras en las mallas del modelo
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.depthWrite = true
        }
      }
    })
  }, [scene])

  // Ajustar cámara para que no quede lejos o sin zoom
  useEffect(() => {
    camera.position.set(0, 1.5, 4)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "a") {
          setHighlight(true)
          addToLog("Tecla A → Activado modo 'intensificado'")
          setMessage("Conductos respiratorios")
        }
        if (event.key === "r") {
          setHighlight(false)
          addToLog("Tecla R → Reinicio visual")
          setMessage("Modelo de bronquios")
        }
      }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <group ref={ref} {...props}>
      {/* Luces internas */}
      <ambientLight intensity={0.5} />
      <spotLight
        castShadow
        position={[5, 5, 5]}
        angle={0.35}
        penumbra={0.4}
        intensity={5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Modelo 3D */}
      <primitive object={scene} scale={[0.9, 0.9, 0.9]} position={[0, 0, 0]} />


      {/* Piso receptor de sombras */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.1} />
      </mesh>

      {/* Controles individuales */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </group>
  )
}

useGLTF.preload('/models-3d/epoc/alveolus.glb')
