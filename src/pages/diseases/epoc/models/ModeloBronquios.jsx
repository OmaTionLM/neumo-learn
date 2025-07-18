import React, { useRef, useState, useEffect } from "react"
import {
  useGLTF,
  Html,
  Text,
  OrbitControls,
  Environment,
  Stars,
  Sparkles
} from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export function BronchiModel(props) {
  const group = useRef()
  const textRef = useRef()
  const { scene } = useThree()
  const { nodes } = useGLTF("/models-3d/epoc/bronchi.glb")

  const [highlight, setHighlight] = useState(false)
  const [message, setMessage] = useState("BRONQUIOS")
  const [eventLog, setEventLog] = useState([])
  const [hovered, setHovered] = useState(false)

  const colorBase = "#d87c41"
  const colorHighlight = "#ffca28"

  // Animación flotante del texto
  useFrame(({ clock }) => {
    if (textRef.current) {
      const t = clock.getElapsedTime()
      textRef.current.position.y = 1.5 + Math.sin(t * 1.5) * 0.2
    }
  })

  // Fondo transparente
  useEffect(() => {
    scene.background = null
  }, [scene])

  // Manejo de teclado
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "a") {
        setHighlight(true)
        addToLog("Tecla A → Activado modo 'intensificado'")
        setMessage("BRONQUIOS")
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

  // Click sobre modelo
  const handleClick = () => {
    setMessage("Das clic para interactuar con el modelo")
    addToLog("🖱️ Click → Diste click")
  }

  const addToLog = (text) => {
    setEventLog((prev) => [text, ...prev.slice(0, 4)])
  }

  return (
    <group ref={group} {...props} dispose={null}>
      {/* HDRI opcional */}
      <Environment preset="city" background />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Piso receptor de sombras */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* Modelo GLB mapeado manualmente */}
      {Object.keys(nodes).map((key) => {
        const node = nodes[key]
        if (!node.geometry) return null
        return (
          <mesh
            key={key}
            castShadow
            receiveShadow
            geometry={node.geometry}
            material={
              highlight
                ? new THREE.MeshStandardMaterial({ color: colorHighlight })
                : node.material || new THREE.MeshStandardMaterial({ color: colorBase })
            }
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          />
        )
      })}

      {/* Texto flotante */}
      <Text ref={textRef} position={[0, 3.5, 0]} fontSize={0.4} color="black">
        {message}
      </Text>

      {/* Bitácora */}
      {eventLog.map((line, i) => (
        <Text
          key={`log-${i}`}
          position={[-4, 3 - i * 0.4, -2]}
          fontSize={0.25}
          color="#666666"
          anchorX="left"
        >
          {line}
        </Text>
      ))}

      {/* Estrellas y brillo */}
      <Stars radius={100} depth={50} count={3000} factor={4} />
      <Sparkles count={25} scale={5} size={1.8} speed={0.3} />

      <OrbitControls />
    </group>
  )
}

useGLTF.preload("/models-3d/epoc/bronchi.glb")
