import { useRef, useEffect, useState } from "react"
import {
  useGLTF,
  PerspectiveCamera,
  Html,
  Environment,
  Stars,
  Sparkles,
  OrbitControls,
  Text
} from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { KeyboardControls } from "@react-three/drei"
import * as THREE from "three"

export function HealthyLung(props) {
  const group = useRef()
  const cameraRef = useRef()
  const { scene } = useThree()

  const [lungModel, setLungModel] = useState(null)
  const [errorLoading, setErrorLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [modelColor, setModelColor] = useState(null)
  const [message, setMessage] = useState("Pulmón Sano")
  const [colorIndex, setColorIndex] = useState(0)
  const [eventLog, setEventLog] = useState([])
  const [confetti, setConfetti] = useState([])

  const pulseRef = useRef(0)

  const colorList = ["#E74C3C", "#F39C12", "#8E44AD", "#1ABC9C", "#2ECC71"]

  useEffect(() => {
    try {
      const gltf = useGLTF("/models-3d/pneumonia/healthy-lung.glb")
      setLungModel(gltf)
    } catch (error) {
      console.error("Error cargando el modelo:", error)
      setErrorLoading(true)
    }
  }, [])

  useEffect(() => {
    scene.background = null
  }, [scene])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "c") {
        const nextIndex = (colorIndex + 1) % colorList.length
        const newColor = colorList[nextIndex]
        setColorIndex(nextIndex)
        setModelColor(newColor)
        addToLog(`Tecla C → Color cambiado`)
      }
      if (event.key === "b") {
        setModelColor(null)
        addToLog("Tecla B → Color original restaurado")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [colorIndex])

  useFrame(() => {
    if (clicked && group.current) {
      pulseRef.current += 0.05
      const scale = 1 + Math.sin(pulseRef.current) * 0.05
      group.current.scale.set(scale, scale, scale)
    }

    // Confeti animado
    setConfetti((prev) =>
      prev
        .map((c) => ({
          ...c,
          position: [
            c.position[0],
            c.position[1] - 0.1,
            c.position[2] + Math.sin(c.position[0]) * 0.05
          ]
        }))
        .filter((c) => c.position[1] > -5)
    )
  })

  const handleClick = () => {
    setClicked(!clicked)
  }

  const handleWheel = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z += 1
    }
  }

  const addToLog = (text) => {
    setEventLog((prev) => [text, ...prev.slice(0, 4)])
  }

  const launchConfetti = () => {
    const newBalls = Array.from({ length: 20 }).map((_, i) => ({
      id: `ball-${Date.now()}-${i}`,
      position: [
        Math.random() * 4 - 2,
        Math.random() * 2 + 2,
        Math.random() * 4 - 2
      ],
      color: colorList[Math.floor(Math.random() * colorList.length)]
    }))
    setConfetti((prev) => [...prev, ...newBalls])
  }

  if (errorLoading) {
    return <Text position={[0, 0, 0]} fontSize={1} color="red">Error cargando modelo</Text>
  }

  if (!lungModel) return null

  const { nodes } = lungModel

  return (
    <KeyboardControls
      map={[
        { name: "cycleColor", keys: ["c"] },
        { name: "resetColor", keys: ["b"] }
      ]}
    >
      <group ref={group} {...props} dispose={null}>
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 5, 15]} fov={40} />

        {/* HDRI */}
        <Environment files="/scenes-pneumonia/hdr/childrens_hospital.hdr" background />

        {/* Iluminación */}
        <ambientLight intensity={0.25} />
        <directionalLight
          castShadow
          position={[4, 10, 4]}
          intensity={2.5}
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-bias={-0.0005}
          shadow-camera-near={1}
          shadow-camera-far={30}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <pointLight
          position={[-3, 5, -3]}
          intensity={0.6}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Plano receptor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#eeeeee" />
        </mesh>

        {/* Modelo */}
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
                modelColor
                  ? new THREE.MeshStandardMaterial({ color: modelColor })
                  : node.material
              }
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
              onClick={handleClick}
              onWheel={handleWheel}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            />
          )
        })}

        {/* Confeti */}
        {confetti.map((ball) => (
          <mesh key={ball.id} position={ball.position} castShadow>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={ball.color} />
          </mesh>
        ))}

        {/* Botón HTML */}
        <Html position={[0, -2, 0]} transform>
          <button
            style={{
              padding: "10px 20px",
              background: hovered ? "#F1C40F" : "#3498DB",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={launchConfetti}
          >
            Interactúa
          </button>
        </Html>

        {/* Texto 3D */}
        <Text position={[0, 3.5, 0]} fontSize={0.5} color="white">
          {message}
        </Text>

        {/* Historial */}
        {eventLog.map((line, i) => (
          <Text
            key={`log-${i}`}
            position={[-4, 3 - i * 0.4, -2]}
            fontSize={0.25}
            color="#aaaaaa"
            anchorX="left"
          >
            {line}
          </Text>
        ))}

        <Stars radius={100} depth={50} count={5000} factor={4} />
        <Sparkles count={30} scale={5} size={2} speed={0.4} />
        <OrbitControls />
      </group>
    </KeyboardControls>
  )
}

useGLTF.preload("/models-3d/pneumonia/healthy-lung.glb")
