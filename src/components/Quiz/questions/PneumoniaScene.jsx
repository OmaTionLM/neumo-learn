import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { Sphere, Box, Text } from "@react-three/drei"

const LungsModel = ({ position, onSelect, isSelected, isCorrect }) => {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2

      if (isSelected) {
        const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 1
        groupRef.current.scale.setScalar(pulse)
      } else {
        groupRef.current.scale.setScalar(1)
      }
    }
  })

  const handleClick = (event) => {
    event.stopPropagation()
    onSelect("pulmon", isCorrect)
  }

  return (
    <group>
      <Text
        position={[position[0], position[1] + 3, position[2]]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={4}
        textAlign="center"
      >
        Pulmones
      </Text>

      <group
        ref={groupRef}
        position={position}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = "default"
        }}
      >
        {/* Pulmón izquierdo */}
        <Sphere args={[0.8, 16, 16]} position={[-0.6, 0.3, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ff9999"}
            emissive={hovered ? "#ff6666" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.1}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 0.9}
          />
        </Sphere>

        {/* Pulmón derecho (más grande) */}
        <Sphere args={[0.9, 16, 16]} position={[0.7, 0.2, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ff9999"}
            emissive={hovered ? "#ff6666" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.1}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 0.9}
          />
        </Sphere>

        {/* Lóbulos del pulmón izquierdo */}
        <Sphere args={[0.4, 12, 12]} position={[-0.8, 0.8, 0.2]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffaaaa"}
            emissive={hovered ? "#ff6666" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.4 : 0.1}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Sphere args={[0.4, 12, 12]} position={[-0.8, -0.2, 0.2]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffaaaa"}
            emissive={hovered ? "#ff6666" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.4 : 0.1}
            transparent
            opacity={0.8}
          />
        </Sphere>

        {/* Lóbulos del pulmón derecho */}
        <Sphere args={[0.35, 12, 12]} position={[0.9, 0.9, 0.2]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffaaaa"}
            emissive={hovered ? "#ff6666" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.4 : 0.1}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Sphere args={[0.35, 12, 12]} position={[0.9, 0.3, 0.2]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffaaaa"}
            emissive={hovered ? "#ff6666" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.4 : 0.1}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Sphere args={[0.35, 12, 12]} position={[0.9, -0.3, 0.2]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffaaaa"}
            emissive={hovered ? "#ff6666" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.4 : 0.1}
            transparent
            opacity={0.8}
          />
        </Sphere>

        {/* Tráquea */}
        <Box args={[0.2, 1.5, 0.2]} position={[0, 1.8, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffcccc"}
            emissive={hovered ? "#ff9999" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0.1}
            transparent
            opacity={0.7}
          />
        </Box>

        {/* Bronquios principales */}
        <Box args={[0.8, 0.15, 0.15]} position={[-0.3, 1.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffcccc"}
            emissive={hovered ? "#ff9999" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0.1}
            transparent
            opacity={0.7}
          />
        </Box>
        <Box args={[0.8, 0.15, 0.15]} position={[0.4, 1.2, 0]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffcccc"}
            emissive={hovered ? "#ff9999" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0.1}
            transparent
            opacity={0.7}
          />
        </Box>

        {/* Alvéolos (pequeñas esferas) */}
        {[...Array(20)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.05, 8, 8]}
            position={[(Math.random() - 0.5) * 2.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 0.8]}
          >
            <meshStandardMaterial
              color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffdddd"}
              emissive={hovered ? "#ffaaaa" : "#000000"}
              emissiveIntensity={hovered ? 0.3 : isSelected ? 0.4 : 0.2}
              transparent
              opacity={0.6}
            />
          </Sphere>
        ))}
      </group>

      {isSelected && (
        <Sphere args={[2.5, 16, 16]} position={position}>
          <meshStandardMaterial
            color={isCorrect ? "#00ff88" : "#ff4444"}
            transparent
            opacity={0.2}
            emissive={isCorrect ? "#00aa44" : "#aa2222"}
            emissiveIntensity={0.3}
          />
        </Sphere>
      )}
    </group>
  )
}

const HeartModel = ({ position, onSelect, isSelected, isCorrect }) => {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      if (isSelected) {
        const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 1
        groupRef.current.scale.setScalar(pulse)
      } else {
        groupRef.current.scale.setScalar(1)
      }
    }
  })

  const handleClick = (event) => {
    event.stopPropagation()
    onSelect("corazon", isCorrect)
  }

  return (
    <group>
      <Text
        position={[position[0], position[1] + 2.5, position[2]]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={4}
        textAlign="center"
      >
        Corazón
      </Text>

      <group
        ref={groupRef}
        position={position}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = "default"
        }}
      >
        {/* Ventrículo izquierdo */}
        <Sphere args={[0.6, 16, 16]} position={[-0.3, -0.2, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#cc4444"}
            emissive={hovered ? "#aa2222" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.2}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Sphere>

        {/* Ventrículo derecho */}
        <Sphere args={[0.5, 16, 16]} position={[0.4, -0.1, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#dd5555"}
            emissive={hovered ? "#bb3333" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.2}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Sphere>

        {/* Aurícula izquierda */}
        <Sphere args={[0.4, 12, 12]} position={[-0.4, 0.6, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ee6666"}
            emissive={hovered ? "#cc4444" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.2}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Sphere>

        {/* Aurícula derecha */}
        <Sphere args={[0.4, 12, 12]} position={[0.5, 0.7, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ee6666"}
            emissive={hovered ? "#cc4444" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.2}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Sphere>

        {/* Aorta */}
        <Box args={[0.2, 0.8, 0.2]} position={[0, 1.2, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ff7777"}
            emissive={hovered ? "#dd5555" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.3}
            roughness={0.7}
          />
        </Box>

        {/* Arterias coronarias */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          return (
            <Box
              key={i}
              args={[0.05, 0.4, 0.05]}
              position={[Math.cos(angle) * 0.7, 0.2, Math.sin(angle) * 0.7]}
              rotation={[0, angle, Math.PI / 4]}
            >
              <meshStandardMaterial
                color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ff8888"}
                emissive={hovered ? "#ee6666" : "#000000"}
                emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
                transparent
                opacity={0.8}
              />
            </Box>
          )
        })}

        {/* Latido del corazón (partículas) */}
        {[...Array(3)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.08, 8, 8]}
            position={[Math.cos(Date.now() * 0.01 + i) * (1 + i * 0.3), Math.sin(Date.now() * 0.01 + i) * 0.5, 0]}
          >
            <meshStandardMaterial
              color="#ff0000"
              emissive="#cc0000"
              emissiveIntensity={0.6}
              transparent
              opacity={0.7 - i * 0.2}
            />
          </Sphere>
        ))}
      </group>

      {isSelected && (
        <Sphere args={[1.5, 16, 16]} position={position}>
          <meshStandardMaterial
            color={isCorrect ? "#00ff88" : "#ff4444"}
            transparent
            opacity={0.2}
            emissive={isCorrect ? "#00aa44" : "#aa2222"}
            emissiveIntensity={0.3}
          />
        </Sphere>
      )}
    </group>
  )
}

const LiverModel = ({ position, onSelect, isSelected, isCorrect }) => {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      if (isSelected) {
        const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 1
        groupRef.current.scale.setScalar(pulse)
      } else {
        groupRef.current.scale.setScalar(1)
      }
    }
  })

  const handleClick = (event) => {
    event.stopPropagation()
    onSelect("higado", isCorrect)
  }

  return (
    <group>
      <Text
        position={[position[0], position[1] + 2.5, position[2]]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={4}
        textAlign="center"
      >
        Hígado
      </Text>

      <group
        ref={groupRef}
        position={position}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = "default"
        }}
      >
        {/* Lóbulo derecho (más grande) */}
        <Box args={[1.2, 1.5, 0.8]} position={[0.3, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#8B4513"}
            emissive={hovered ? "#654321" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.1}
            roughness={0.9}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Box>

        {/* Lóbulo izquierdo */}
        <Box args={[0.8, 1.2, 0.6]} position={[-0.5, 0.1, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#A0522D"}
            emissive={hovered ? "#8B4513" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.1}
            roughness={0.9}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Box>

        {/* Vesícula biliar */}
        <Sphere args={[0.15, 12, 12]} position={[0.6, -0.5, 0.4]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#228B22"}
            emissive={hovered ? "#006400" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.2}
            roughness={0.8}
          />
        </Sphere>

        {/* Vena porta */}
        <Box args={[0.1, 0.8, 0.1]} position={[0, 0.8, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#4169E1"}
            emissive={hovered ? "#0000CD" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.3}
            roughness={0.7}
          />
        </Box>

        {/* Conductos biliares */}
        {[...Array(4)].map((_, i) => (
          <Box
            key={i}
            args={[0.03, 0.3, 0.03]}
            position={[0.2 + (i - 2) * 0.2, 0.3, 0.2 + (i % 2) * 0.2]}
            rotation={[Math.PI / 6, (i * Math.PI) / 4, 0]}
          >
            <meshStandardMaterial
              color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#FFD700"}
              emissive={hovered ? "#DAA520" : "#000000"}
              emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
              transparent
              opacity={0.8}
            />
          </Box>
        ))}

        {/* Textura del hígado (pequeños nódulos) */}
        {[...Array(15)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.05, 6, 6]}
            position={[(Math.random() - 0.5) * 1.8, (Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 0.6]}
          >
            <meshStandardMaterial
              color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#CD853F"}
              emissive={hovered ? "#8B4513" : "#000000"}
              emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
              transparent
              opacity={0.7}
            />
          </Sphere>
        ))}
      </group>

      {isSelected && (
        <Sphere args={[1.8, 16, 16]} position={position}>
          <meshStandardMaterial
            color={isCorrect ? "#00ff88" : "#ff4444"}
            transparent
            opacity={0.2}
            emissive={isCorrect ? "#00aa44" : "#aa2222"}
            emissiveIntensity={0.3}
          />
        </Sphere>
      )}
    </group>
  )
}

const KidneysModel = ({ position, onSelect, isSelected, isCorrect }) => {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      if (isSelected) {
        const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 1
        groupRef.current.scale.setScalar(pulse)
      } else {
        groupRef.current.scale.setScalar(1)
      }
    }
  })

  const handleClick = (event) => {
    event.stopPropagation()
    onSelect("rinones", isCorrect)
  }

  return (
    <group>
      <Text
        position={[position[0], position[1] + 2.5, position[2]]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={4}
        textAlign="center"
      >
        Riñones
      </Text>

      <group
        ref={groupRef}
        position={position}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = "default"
        }}
      >
        {/* Riñón izquierdo */}
        <Sphere args={[0.4, 16, 16]} position={[-0.6, 0, 0]} scale={[1, 1.5, 0.8]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#6B4423"}
            emissive={hovered ? "#4A2C17" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.2}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Sphere>

        {/* Riñón derecho */}
        <Sphere args={[0.4, 16, 16]} position={[0.6, 0, 0]} scale={[1, 1.5, 0.8]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#6B4423"}
            emissive={hovered ? "#4A2C17" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.2}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Sphere>

        {/* Corteza renal (capas internas) */}
        <Sphere args={[0.3, 12, 12]} position={[-0.6, 0, 0]} scale={[1, 1.3, 0.7]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#8B6914"}
            emissive={hovered ? "#654321" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Sphere args={[0.3, 12, 12]} position={[0.6, 0, 0]} scale={[1, 1.3, 0.7]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#8B6914"}
            emissive={hovered ? "#654321" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            transparent
            opacity={0.8}
          />
        </Sphere>

        {/* Uréteres */}
        <Box args={[0.05, 1.2, 0.05]} position={[-0.6, -1, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#DAA520"}
            emissive={hovered ? "#B8860B" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.1}
            roughness={0.9}
          />
        </Box>
        <Box args={[0.05, 1.2, 0.05]} position={[0.6, -1, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#DAA520"}
            emissive={hovered ? "#B8860B" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.1}
            roughness={0.9}
          />
        </Box>

        {/* Glándulas suprarrenales */}
        <Sphere args={[0.15, 8, 8]} position={[-0.6, 0.8, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#FF6347"}
            emissive={hovered ? "#CD5C5C" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.3}
            roughness={0.7}
          />
        </Sphere>
        <Sphere args={[0.15, 8, 8]} position={[0.6, 0.8, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#FF6347"}
            emissive={hovered ? "#CD5C5C" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.3}
            roughness={0.7}
          />
        </Sphere>

        {/* Nefronas (pequeñas unidades funcionales) */}
        {[...Array(10)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.02, 6, 6]}
            position={[
              (i < 5 ? -0.6 : 0.6) + (Math.random() - 0.5) * 0.4,
              (Math.random() - 0.5) * 0.8,
              (Math.random() - 0.5) * 0.3,
            ]}
          >
            <meshStandardMaterial
              color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#FFD700"}
              emissive={hovered ? "#DAA520" : "#000000"}
              emissiveIntensity={hovered ? 0.4 : isSelected ? 0.6 : 0.3}
              transparent
              opacity={0.8}
            />
          </Sphere>
        ))}
      </group>

      {isSelected && (
        <Sphere args={[1.5, 16, 16]} position={position}>
          <meshStandardMaterial
            color={isCorrect ? "#00ff88" : "#ff4444"}
            transparent
            opacity={0.2}
            emissive={isCorrect ? "#00aa44" : "#aa2222"}
            emissiveIntensity={0.3}
          />
        </Sphere>
      )}
    </group>
  )
}

const StomachModel = ({ position, onSelect, isSelected, isCorrect }) => {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      if (isSelected) {
        const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 1
        groupRef.current.scale.setScalar(pulse)
      } else {
        groupRef.current.scale.setScalar(1)
      }
    }
  })

  const handleClick = (event) => {
    event.stopPropagation()
    onSelect("estomago", isCorrect)
  }

  return (
    <group>
      <Text
        position={[position[0], position[1] + 2.5, position[2]]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={4}
        textAlign="center"
      >
        Estómago
      </Text>

      <group
        ref={groupRef}
        position={position}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = "default"
        }}
      >
        {/* Cuerpo principal del estómago */}
        <Sphere args={[0.8, 16, 16]} position={[0, 0, 0]} scale={[1.3, 1.8, 1]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#DDA0DD"}
            emissive={hovered ? "#BA55D3" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.1}
            roughness={0.9}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 0.8}
          />
        </Sphere>

        {/* Fondo del estómago */}
        <Sphere args={[0.4, 12, 12]} position={[-0.3, 0.8, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#E6E6FA"}
            emissive={hovered ? "#D8BFD8" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            transparent
            opacity={0.7}
          />
        </Sphere>

        {/* Antro pilórico */}
        <Sphere args={[0.3, 12, 12]} position={[0.5, -0.6, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#E6E6FA"}
            emissive={hovered ? "#D8BFD8" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            transparent
            opacity={0.7}
          />
        </Sphere>

        {/* Esófago (conexión superior) */}
        <Box args={[0.15, 0.6, 0.15]} position={[-0.2, 1.2, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#FFB6C1"}
            emissive={hovered ? "#FF69B4" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.1}
            roughness={0.8}
          />
        </Box>

        {/* Duodeno (conexión inferior) */}
        <Box args={[0.12, 0.5, 0.12]} position={[0.7, -0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#FFB6C1"}
            emissive={hovered ? "#FF69B4" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            metalness={0.1}
            roughness={0.8}
          />
        </Box>

        {/* Pliegues gástricos */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <Box
              key={i}
              args={[0.05, 0.8, 0.05]}
              position={[Math.cos(angle) * 0.6, 0, Math.sin(angle) * 0.3]}
              rotation={[0, angle, 0]}
            >
              <meshStandardMaterial
                color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#FF69B4"}
                emissive={hovered ? "#FF1493" : "#000000"}
                emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
                transparent
                opacity={0.6}
              />
            </Box>
          )
        })}

        {/* Contenido gástrico (líquido) */}
        <Sphere args={[0.6, 12, 12]} position={[0, -0.2, 0]} scale={[1.1, 1.4, 0.8]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#98FB98"}
            emissive={hovered ? "#90EE90" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0.1}
            transparent
            opacity={0.4}
            metalness={0}
            roughness={0.1}
          />
        </Sphere>
      </group>

      {isSelected && (
        <Sphere args={[1.8, 16, 16]} position={position}>
          <meshStandardMaterial
            color={isCorrect ? "#00ff88" : "#ff4444"}
            transparent
            opacity={0.2}
            emissive={isCorrect ? "#00aa44" : "#aa2222"}
            emissiveIntensity={0.3}
          />
        </Sphere>
      )}
    </group>
  )
}

const Virus = ({ position, index }) => {
  const [ref] = useSphere(() => ({
    mass: 0,
    position,
    args: [0.2],
  }))

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 2 + index
      ref.current.rotation.y = state.clock.elapsedTime * 1.5 + index
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3 + index) * 0.4

      if (ref.current.material && ref.current.material.emissive) {
        ref.current.material.emissive.setHSL(0.1, 1, 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2)
      }
    }
  })

  return (
    <Sphere ref={ref} args={[0.2, 12, 12]}>
      <meshStandardMaterial
        color="#ff6600"
        emissive="#cc4400"
        emissiveIntensity={0.4}
        metalness={0.6}
        roughness={0.2}
      />
    </Sphere>
  )
}

const PneumoniaScene = ({ onAnswer, gameState, questionData }) => {
  const [attempts, setAttempts] = useState(0)
  const [startTime] = useState(Date.now())
  const [selectedOrgans, setSelectedOrgans] = useState([])
  const [correctAnswered, setCorrectAnswered] = useState(false)

  const handleOrganSelect = (organType, isCorrect) => {
    setAttempts((prev) => prev + 1)

    if (!selectedOrgans.includes(organType)) {
      setSelectedOrgans([...selectedOrgans, organType])
    }

    if (isCorrect && !correctAnswered) {
      setCorrectAnswered(true)
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      setTimeout(() => {
        onAnswer(true, timeSpent, attempts + 1)
      }, 2000)
    } else if (!isCorrect) {
      if (attempts >= 4) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        setTimeout(() => {
          onAnswer(false, timeSpent, attempts + 1)
        }, 1500)
      }
    }
  }

  return (
    <group>
      {/* Pulmones - CORRECTO */}
      <LungsModel
        position={[0, 2, 0]}
        onSelect={handleOrganSelect}
        isSelected={selectedOrgans.includes("pulmon")}
        isCorrect={true}
      />

      {/* Corazón - INCORRECTO */}
      <HeartModel
        position={[-4, 1, 2]}
        onSelect={handleOrganSelect}
        isSelected={selectedOrgans.includes("corazon")}
        isCorrect={false}
      />

      {/* Hígado - INCORRECTO */}
      <LiverModel
        position={[4, 0, -1]}
        onSelect={handleOrganSelect}
        isSelected={selectedOrgans.includes("higado")}
        isCorrect={false}
      />

      {/* Riñones - INCORRECTO */}
      <KidneysModel
        position={[-3, -1, -3]}
        onSelect={handleOrganSelect}
        isSelected={selectedOrgans.includes("rinones")}
        isCorrect={false}
      />

      {/* Estómago - INCORRECTO */}
      <StomachModel
        position={[3, 1, 3]}
        onSelect={handleOrganSelect}
        isSelected={selectedOrgans.includes("estomago")}
        isCorrect={false}
      />

      {/* Virus/bacterias flotantes para ambientación */}
      <Virus position={[-6, 4, -2]} index={0} />
      <Virus position={[6, 3, 3]} index={1} />
      <Virus position={[-2, 5, 4]} index={2} />
      <Virus position={[2, 4, -4]} index={3} />
      <Virus position={[0, 6, -2]} index={4} />

      {/* Suelo */}
      <Box position={[0, -4, 0]} args={[20, 1, 20]}>
        <meshStandardMaterial color="#2c3e50" metalness={0.3} roughness={0.7} />
      </Box>

      {/* Feedback visual */}
      {correctAnswered && (
        <Text position={[0, -2, 0]} fontSize={1} color="#00ff88" anchorX="center" anchorY="middle" fontWeight="bold">
          ✅ ¡Correcto! La neumonía afecta principalmente a los PULMONES
        </Text>
      )}

      {/* Iluminación */}
      <pointLight position={[0, 8, 0]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-8, 4, 8]} intensity={0.4} color="#ff9999" />
      <pointLight position={[8, 4, -8]} intensity={0.4} color="#66aaff" />
    </group>
  )
}

export default PneumoniaScene
