import { useRef, useEffect, useState } from "react"
import {
  useGLTF,
  PerspectiveCamera,
  Html,
  OrbitControls,
  Text,
  Environment,
  Stars,
  Sparkles
} from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { KeyboardControls } from "@react-three/drei"
import * as THREE from "three"

export function PillBottle(props) {
  const group = useRef()
  const cameraRef = useRef()
  const { scene } = useThree()

  const [bottleModel, setBottleModel] = useState(null)
  const [errorLoading, setErrorLoading] = useState(false)
  const [message, setMessage] = useState("Frasco de Medicamento")
  const [eventLog, setEventLog] = useState([])
  const [caps, setCaps] = useState([])
  const [hovered, setHovered] = useState(false)
  const textRef = useRef()

  // Animación flotante del texto
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (textRef.current) {
      textRef.current.position.y = 4.2 + Math.sin(t * 1.5) * 0.2
    }

    setCaps((prev) =>
      prev
        .map((pill) => ({
          ...pill,
          position: [pill.position[0], pill.position[1] - 0.015, pill.position[2]],
        }))
        .filter((pill) => pill.position[1] > -2)
    )
  })

  useEffect(() => {
    try {
      const gltf = useGLTF("/models-3d/pneumonia/pill-bottle.glb")
      setBottleModel(gltf)
    } catch (error) {
      console.error("Error cargando el modelo de frasco de pastillas:", error)
      setErrorLoading(true)
    }
  }, [])

  useEffect(() => {
    scene.background = null
  }, [scene])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "d") {
        dropPill()
        addToLog("Tecla D → Pastilla dispensada")
      }
      if (event.key === "c") {
        setCaps([])
        addToLog("Tecla C → Pastillas eliminadas")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const addToLog = (text) => {
    setEventLog((prev) => [text, ...prev.slice(0, 4)])
  }

  const handleClick = () => {
    addToLog("🖱️ Click → Interacción con frasco")
  }

  const handleWheel = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z += 1
    }
  }

  const dropPill = () => {
    const newPill = {
      id: `pill-${Date.now()}`,
      position: [
        (Math.random() - 0.5) * 0.5,
        0.8,
        (Math.random() - 0.5) * 0.5,
      ],
      color: "#F9E79F",
    }
    setCaps((prev) => [...prev, newPill])
  }

  if (errorLoading) {
    return <Text position={[0, 0, 0]} fontSize={1} color="red">Error cargando modelo</Text>
  }

  if (!bottleModel) return null

  const { nodes } = bottleModel

  return (
    <KeyboardControls
      map={[
        { name: "dispensePill", keys: ["d"] },
        { name: "clearPills", keys: ["c"] }
      ]}
    >
      <group ref={group} {...props} dispose={null}>
        {/* Cámara */}
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 2, 15]} fov={40} />

        {/* HDRI ambiental */}
        <Environment files="/scenes-pneumonia/hdr/surgery.hdr" background />

        {/* Iluminación y sombras */}
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={2}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={1}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Plano receptor de sombras */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* Sparkles y estrellas */}
        <Stars radius={50} depth={20} count={700} factor={2} fade />
        <Sparkles count={15} scale={4} size={1.2} speed={0.2} color="#dff9fb" />

        {/* Modelo 3D */}
        {Object.keys(nodes).map((nodeName) => {
          const node = nodes[nodeName]
          if (
            node.type === "Mesh" ||
            (node.isObject3D && node.children.length === 0)
          ) {
            return (
              <mesh
                key={nodeName}
                castShadow
                receiveShadow
                geometry={node.geometry}
                material={node.material}
                position={node.position}
                rotation={node.rotation}
                scale={node.scale}
                onClick={handleClick}
                onWheel={handleWheel}
              />
            )
          }
          return null
        })}

        {/* Pastillas dinámicas */}
        {caps.map((pill) => (
          <mesh key={pill.id} position={pill.position} castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={pill.color} />
          </mesh>
        ))}

        {/* Botón HTML */}
        <Html position={[0, -2, 0]} transform>
          <button
            style={{
              padding: "10px 20px",
              background: hovered ? "#58D68D" : "#5DADE2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={dropPill}
          >
            Dispensar pastilla
          </button>
        </Html>

        {/* Texto 3D flotante */}
        <Text
          ref={textRef}
          fontSize={0.7}
          color="#3498db"
          anchorX="center"
          anchorY="middle"
          position={[0, 4.2, 0]}
        >
          {message}
        </Text>

        {/* Historial de eventos */}
        {eventLog.map((line, i) => (
          <Text
            key={`log-${i}`}
            position={[-4, 2.5 - i * 0.4, -2]}
            fontSize={0.25}
            color="#626567"
            anchorX="left"
          >
            {line}
          </Text>
        ))}

        <OrbitControls />
      </group>
    </KeyboardControls>
  )
}

useGLTF.preload("/models-3d/pneumonia/pill-bottle.glb")
