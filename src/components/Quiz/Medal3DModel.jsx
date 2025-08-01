import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, Text, Sphere, Cylinder, Torus } from "@react-three/drei"

const Medal3DModel = ({ position, type, userName, score }) => {
  const groupRef = useRef()
  const medalRef = useRef()

  const colors = {
    oro: "#FFD700",
    plata: "#C0C0C0",
    bronce: "#CD7F32",
  }

  const emissiveColors = {
    oro: "#B8860B",
    plata: "#808080",
    bronce: "#8B4513",
  }

  const { scene } = useGLTF("/models-3d/quiz/medal.glb")

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.15
    }

    if (medalRef.current) {
      medalRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.1
    }
  })

  // Renderizar medalla diferente según el tipo
  const renderMedal = () => {
    if (type === "oro") {
      // Para el 1er lugar: usar el modelo GLB real con escala mucho más grande
      return <primitive ref={medalRef} object={scene.clone()} scale={[8, 8, 8]} position={[0, 0, 0]} />
    } else {
      // Para 2do y 3er lugar: crear medallas 3D personalizadas
      return (
        <group ref={medalRef}>
          {/* Base principal de la medalla */}
          <Cylinder args={[1.2, 1.2, 0.2, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial
              color={colors[type]}
              emissive={emissiveColors[type]}
              emissiveIntensity={0.4}
              metalness={0.9}
              roughness={0.1}
            />
          </Cylinder>

          {/* Anillo exterior decorativo */}
          <Torus args={[1.0, 0.2, 8, 32]} position={[0, 0, 0.12]}>
            <meshStandardMaterial
              color={colors[type]}
              emissive={emissiveColors[type]}
              emissiveIntensity={0.5}
              metalness={1.0}
              roughness={0.0}
            />
          </Torus>

          {/* Centro elevado */}
          <Cylinder args={[0.6, 0.6, 0.1, 32]} position={[0, 0, 0.15]}>
            <meshStandardMaterial
              color={colors[type]}
              emissive={emissiveColors[type]}
              emissiveIntensity={0.6}
              metalness={1.0}
              roughness={0.0}
            />
          </Cylinder>

          {/* Detalles decorativos */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2
            return (
              <Sphere key={i} args={[0.08, 8, 8]} position={[Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 0.18]}>
                <meshStandardMaterial
                  color={colors[type]}
                  emissive={emissiveColors[type]}
                  emissiveIntensity={0.7}
                  metalness={0.8}
                  roughness={0.2}
                />
              </Sphere>
            )
          })}
        </group>
      )
    }
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Resplandor de fondo más intenso */}
      <Sphere args={[2, 32, 32]} position={[0, 0, -0.3]}>
        <meshStandardMaterial
          color={colors[type]}
          emissive={emissiveColors[type]}
          emissiveIntensity={0.2}
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Medalla principal */}
      {renderMedal()}

      {/* Texto del usuario mejorado con mejor posición */}
      <Text
        position={[0, -4.2, 0]}
        fontSize={0.35}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
        textAlign="center"
        fontWeight="bold"
      >
        🏆 {userName}
      </Text>

      <Text
        position={[0, -4.8, 0]}
        fontSize={0.3}
        color="#ffdd00"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
        textAlign="center"
        fontWeight="bold"
      >
        📊 {score}% de Precisión
      </Text>

      {/* Texto del tipo de medalla en la medalla */}
      <Text position={[0, 0, 0.25]} fontSize={0.25} color="#000000" anchorX="center" anchorY="middle" fontWeight="bold">
        {type === "oro" ? "1°" : type === "plata" ? "2°" : "3°"}
      </Text>

      {/* Partículas decorativas mejoradas */}
      {[...Array(16)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.06, 8, 8]}
          position={[
            Math.cos((i / 16) * Math.PI * 2) * (2.5 + Math.sin(Date.now() * 0.001 + i) * 0.5),
            Math.sin((i / 16) * Math.PI * 2) * (2.5 + Math.cos(Date.now() * 0.001 + i) * 0.5),
            Math.sin(Date.now() * 0.002 + i) * 0.3,
          ]}
        >
          <meshStandardMaterial
            color={colors[type]}
            emissive={emissiveColors[type]}
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </Sphere>
      ))}
    </group>
  )
}

// Precargar el modelo solo para oro
useGLTF.preload("/models-3d/quiz/medal.glb")

export default Medal3DModel
