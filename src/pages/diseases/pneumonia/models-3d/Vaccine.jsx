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

export function Vaccine(props) {
  const group = useRef()
  const cameraRef = useRef()
  const { scene } = useThree()

  const [vaccineModel, setVaccineModel] = useState(null)
  const [errorLoading, setErrorLoading] = useState(false)
  const [message, setMessage] = useState("Vacuna Activa")
  const [eventLog, setEventLog] = useState([])
  const [hovered, setHovered] = useState(false)
  const [highlight, setHighlight] = useState(false)
  const textRef = useRef()

  // Animación flotante
  useFrame(({ clock }) => {
    if (textRef.current) {
      const t = clock.getElapsedTime()
      textRef.current.position.y = 4.2 + Math.sin(t * 1.5) * 0.2
    }
  })

  useEffect(() => {
    try {
      const gltf = useGLTF("/models-3d/pneumonia/vaccine.glb")
      setVaccineModel(gltf)
    } catch (error) {
      console.error("Error cargando el modelo de vacuna:", error)
      setErrorLoading(true)
    }
  }, [])

  useEffect(() => {
    scene.background = null
  }, [scene])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "v") {
        setHighlight(true)
        addToLog("Tecla V → Activado modo 'destello clínico'")
      }
      if (event.key === "r") {
        setHighlight(false)
        addToLog("Tecla R → Reinicio visual")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const addToLog = (text) => {
    setEventLog((prev) => [text, ...prev.slice(0, 4)])
  }

  const handleClick = () => {
    addToLog("🖱️ Click → Vacuna interactuada")
  }

  const handleWheel = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z += 1
      addToLog("🖱️ Rueda → Zoom alejado")
    }
  }

  if (errorLoading) {
    return <Text position={[0, 0, 0]} fontSize={1} color="red">Error cargando modelo</Text>
  }

  if (!vaccineModel) return null

  const { nodes } = vaccineModel

  return (
    <KeyboardControls
      map={[
        { name: "visualBoost", keys: ["v"] },
        { name: "resetView", keys: ["r"] }
      ]}
    >
      <group ref={group} {...props} dispose={null}>
        {/* Cámara */}
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 2, 30]} fov={40} />

        {/* HDRI */}
        <Environment files="/scenes-pneumonia/hdr/vaccine.hdr" background />

        {/* Iluminación intensificada */}
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={highlight ? 3 : 1.5}
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
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* Partículas */}
        <Stars radius={80} depth={40} count={1500} factor={2} fade />
        <Sparkles count={25} scale={4} size={1.5} speed={0.4} color="#d6f5ff" />

        {/* Modelo */}
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
                material={
                  highlight
                    ? new THREE.MeshStandardMaterial({ color: "#58D68D" })
                    : node.material
                }
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
            onClick={() => {
              setHighlight(true)
              setMessage("💉 Intensificado manualmente")
              addToLog("Botón → Activación visual")
            }}
          >
            Activar Efecto
          </button>
        </Html>

        {/* Texto flotante */}
        <Text
          ref={textRef}
          fontSize={0.7}
          color="#3498db"
          anchorX="center"
          anchorY="middle"
          position={[0, 4.2, 2]}
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

useGLTF.preload("/models-3d/pneumonia/vaccine.glb")
