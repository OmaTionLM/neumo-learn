import { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Cylinder, Sphere, Box, Text } from "@react-three/drei"

const ImmobilityModel = ({ position, onSelect, isSelected, isCorrect }) => {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2
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
    onSelect("inmovilidad", isCorrect)
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
        Inmovilidad Prolongada
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
        {/* Cama de hospital */}
        <Box args={[2.5, 0.3, 1.2]} position={[0, -0.5, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffffff"}
            emissive={hovered ? "#cccccc" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.1}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Box>

        {/* Marco de la cama */}
        <Box args={[2.6, 0.8, 0.1]} position={[0, 0, 0.65]}>
          <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
        </Box>
        <Box args={[2.6, 0.8, 0.1]} position={[0, 0, -0.65]}>
          <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
        </Box>

        {/* Patas de la cama */}
        {[
          [-1.2, -1.2, 0.5],
          [1.2, -1.2, 0.5],
          [-1.2, -1.2, -0.5],
          [1.2, -1.2, -0.5],
        ].map((pos, i) => (
          <Cylinder key={i} args={[0.05, 0.05, 1.4, 8]} position={pos}>
            <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
          </Cylinder>
        ))}

        {/* Paciente acostado */}
        <Box args={[1.8, 0.3, 0.8]} position={[0, -0.1, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffdbac"}
            emissive={hovered ? "#e6c2a6" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            metalness={0}
            roughness={0.9}
          />
        </Box>

        {/* Cabeza */}
        <Sphere args={[0.25, 16, 16]} position={[0.8, 0.2, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffdbac"}
            emissive={hovered ? "#e6c2a6" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            metalness={0}
            roughness={0.9}
          />
        </Sphere>

        {/* Reloj mostrando tiempo prolongado */}
        <Cylinder args={[0.3, 0.3, 0.1, 16]} position={[1.5, 1, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
        </Cylinder>
        <Box args={[0.02, 0.15, 0.01]} position={[1.5, 1.05, 0.06]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#000000" />
        </Box>
        <Box args={[0.02, 0.1, 0.01]} position={[1.5, 1.05, 0.06]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#000000" />
        </Box>

        {/* Suero intravenoso */}
        <Cylinder args={[0.02, 0.02, 1.5, 8]} position={[-1.5, 0.5, 0]}>
          <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Cylinder args={[0.15, 0.15, 0.4, 16]} position={[-1.5, 1.5, 0]}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
        </Cylinder>
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

const SurgeryModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("cirugia", isCorrect)
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
        Cirugía Reciente
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
        {/* Mesa de operaciones */}
        <Box args={[2, 0.2, 1]} position={[0, -0.3, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#cccccc"}
            emissive={hovered ? "#999999" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>

        {/* Bisturí */}
        <Cylinder args={[0.02, 0.02, 0.8, 8]} position={[0.5, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#666666"}
            emissive={hovered ? "#333333" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.9}
            roughness={0.1}
          />
        </Cylinder>

        {/* Hoja del bisturí */}
        <Box args={[0.3, 0.02, 0.05]} position={[0.8, 0.35, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#cccccc"
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </Box>

        {/* Lámpara quirúrgica */}
        <Cylinder args={[0.6, 0.6, 0.2, 16]} position={[0, 2, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffffff"}
            emissive={hovered ? "#cccccc" : "#ffff99"}
            emissiveIntensity={hovered ? 0.3 : 0.6}
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>

        {/* Brazo de la lámpara */}
        <Cylinder args={[0.05, 0.05, 1.5, 8]} position={[0, 1, 0]}>
          <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
        </Cylinder>

        {/* Guantes quirúrgicos */}
        <Sphere args={[0.15, 8, 8]} position={[-0.8, 0.1, 0.3]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#87ceeb"}
            emissive={hovered ? "#4682b4" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0}
            roughness={0.9}
          />
        </Sphere>
        <Sphere args={[0.15, 8, 8]} position={[-0.8, 0.1, -0.3]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#87ceeb"}
            emissive={hovered ? "#4682b4" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0}
            roughness={0.9}
          />
        </Sphere>

        {/* Monitor de signos vitales */}
        <Box args={[0.8, 0.6, 0.1]} position={[1.5, 0.5, 0]}>
          <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.9} />
        </Box>
        <Box args={[0.7, 0.4, 0.01]} position={[1.5, 0.5, 0.06]}>
          <meshStandardMaterial color="#00ff00" emissive="#00cc00" emissiveIntensity={0.5} />
        </Box>
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

const ContraceptiveModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("anticonceptivos", isCorrect)
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
        Anticonceptivos Hormonales
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
        {/* Blister de pastillas anticonceptivas */}
        <Box args={[1.2, 0.8, 0.1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ff69b4"}
            emissive={hovered ? "#ff1493" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.1}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Box>

        {/* Pastillas individuales en círculo */}
        {[...Array(21)].map((_, i) => {
          const angle = (i / 21) * Math.PI * 2
          const radius = 0.4
          return (
            <Sphere key={i} args={[0.04, 8, 8]} position={[Math.cos(angle) * radius, 0.06, Math.sin(angle) * radius]}>
              <meshStandardMaterial color={i < 7 ? "#ffffff" : "#ffb6c1"} metalness={0} roughness={0.8} />
            </Sphere>
          )
        })}

        {/* Caja del medicamento */}
        <Box args={[1.5, 0.3, 1]} position={[0, -0.8, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ff69b4"}
            emissive={hovered ? "#ff1493" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.1}
            roughness={0.8}
          />
        </Box>

        {/* Etiqueta médica */}
        <Box args={[1.3, 0.2, 0.01]} position={[0, -0.8, 0.51]}>
          <meshStandardMaterial color="#ffffff" metalness={0} roughness={1} />
        </Box>

        {/* Símbolo femenino */}
        <Cylinder args={[0.15, 0.15, 0.02, 16]} position={[1, 0.5, 0]}>
          <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.3} />
        </Cylinder>
        <Box args={[0.02, 0.2, 0.02]} position={[1, 0.25, 0]}>
          <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.3} />
        </Box>
        <Box args={[0.15, 0.02, 0.02]} position={[1, 0.15, 0]}>
          <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.3} />
        </Box>
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

const SmokingModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("tabaquismo", isCorrect)
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
        Tabaquismo
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
        {/* Cigarrillo */}
        <Cylinder args={[0.08, 0.08, 1.5, 16]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#f5deb3"}
            emissive={hovered ? "#8b7355" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0}
            roughness={0.9}
          />
        </Cylinder>

        {/* Filtro */}
        <Cylinder args={[0.08, 0.08, 0.3, 16]} position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#ffffff" metalness={0} roughness={0.8} />
        </Cylinder>

        {/* Punta encendida */}
        <Sphere args={[0.1, 8, 8]} position={[-0.8, 0, 0]}>
          <meshStandardMaterial color="#ff4500" emissive="#ff2200" emissiveIntensity={0.8} />
        </Sphere>

        {/* Humo */}
        {[...Array(6)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.05 + i * 0.02, 8, 8]}
            position={[-1 - i * 0.3, i * 0.2, (Math.random() - 0.5) * 0.2]}
          >
            <meshStandardMaterial color="#cccccc" transparent opacity={0.6 - i * 0.1} />
          </Sphere>
        ))}

        {/* Cenicero */}
        <Cylinder args={[0.4, 0.5, 0.1, 16]} position={[0, -1, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#696969"}
            emissive={hovered ? "#2f2f2f" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.6}
            roughness={0.4}
          />
        </Cylinder>

        {/* Colillas en el cenicero */}
        {[...Array(3)].map((_, i) => (
          <Cylinder
            key={i}
            args={[0.04, 0.04, 0.3, 8]}
            position={[(Math.random() - 0.5) * 0.6, -0.9, (Math.random() - 0.5) * 0.6]}
            rotation={[Math.random(), Math.random(), Math.random()]}
          >
            <meshStandardMaterial color="#8b4513" metalness={0} roughness={0.9} />
          </Cylinder>
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

const ObesityModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("obesidad", isCorrect)
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
        Obesidad
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
        {/* Báscula */}
        <Box args={[1.2, 0.1, 1.2]} position={[0, -1, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffffff"}
            emissive={hovered ? "#cccccc" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.3}
            roughness={0.7}
          />
        </Box>

        {/* Display de la báscula */}
        <Box args={[0.4, 0.2, 0.05]} position={[0, -0.8, 0.6]}>
          <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.9} />
        </Box>
        <Box args={[0.35, 0.15, 0.01]} position={[0, -0.8, 0.63]}>
          <meshStandardMaterial color="#ff0000" emissive="#cc0000" emissiveIntensity={0.5} />
        </Box>

        {/* Figura representando obesidad */}
        <Sphere args={[0.8, 16, 16]} position={[0, 0.2, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffdbac"}
            emissive={hovered ? "#e6c2a6" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            metalness={0}
            roughness={0.9}
          />
        </Sphere>

        {/* Cabeza */}
        <Sphere args={[0.3, 16, 16]} position={[0, 1.2, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffdbac"}
            emissive={hovered ? "#e6c2a6" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            metalness={0}
            roughness={0.9}
          />
        </Sphere>

        {/* Brazos */}
        <Sphere args={[0.25, 8, 8]} position={[-0.9, 0.5, 0]}>
          <meshStandardMaterial color="#ffdbac" metalness={0} roughness={0.9} />
        </Sphere>
        <Sphere args={[0.25, 8, 8]} position={[0.9, 0.5, 0]}>
          <meshStandardMaterial color="#ffdbac" metalness={0} roughness={0.9} />
        </Sphere>

        {/* Piernas */}
        <Sphere args={[0.35, 8, 8]} position={[-0.4, -0.6, 0]}>
          <meshStandardMaterial color="#ffdbac" metalness={0} roughness={0.9} />
        </Sphere>
        <Sphere args={[0.35, 8, 8]} position={[0.4, -0.6, 0]}>
          <meshStandardMaterial color="#ffdbac" metalness={0} roughness={0.9} />
        </Sphere>

        {/* Comida chatarra */}
        <Box args={[0.3, 0.3, 0.1]} position={[1.5, 0, 0]}>
          <meshStandardMaterial color="#ff6600" metalness={0} roughness={0.8} />
        </Box>
        <Cylinder args={[0.1, 0.1, 0.4, 16]} position={[1.8, 0, 0]}>
          <meshStandardMaterial color="#ff0000" metalness={0.1} roughness={0.8} />
        </Cylinder>
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

const EmbolismScene = ({ onAnswer, gameState, questionData }) => {
  const [attempts, setAttempts] = useState(0)
  const [startTime] = useState(Date.now())
  const [selectedFactors, setSelectedFactors] = useState([])
  const [correctAnswered, setCorrectAnswered] = useState(false)

  const handleFactorSelect = (factorType, isCorrect) => {
    setAttempts((prev) => prev + 1)

    if (!selectedFactors.includes(factorType)) {
      setSelectedFactors([...selectedFactors, factorType])
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
      {/* Inmovilidad prolongada - CORRECTO */}
      <ImmobilityModel
        position={[0, 2, 0]}
        onSelect={handleFactorSelect}
        isSelected={selectedFactors.includes("inmovilidad")}
        isCorrect={true}
      />

      {/* Cirugía reciente - INCORRECTO (factor de riesgo pero no el principal) */}
      <SurgeryModel
        position={[-5, 1, 3]}
        onSelect={handleFactorSelect}
        isSelected={selectedFactors.includes("cirugia")}
        isCorrect={false}
      />

      {/* Anticonceptivos hormonales - INCORRECTO (factor de riesgo pero no el principal) */}
      <ContraceptiveModel
        position={[5, 0, -2]}
        onSelect={handleFactorSelect}
        isSelected={selectedFactors.includes("anticonceptivos")}
        isCorrect={false}
      />

      {/* Tabaquismo - INCORRECTO (factor de riesgo pero no el principal) */}
      <SmokingModel
        position={[-4, -1, -4]}
        onSelect={handleFactorSelect}
        isSelected={selectedFactors.includes("tabaquismo")}
        isCorrect={false}
      />

      {/* Obesidad - INCORRECTO (factor de riesgo pero no el principal) */}
      <ObesityModel
        position={[4, 1, 4]}
        onSelect={handleFactorSelect}
        isSelected={selectedFactors.includes("obesidad")}
        isCorrect={false}
      />

      {/* Pulmones para ambientación */}
      <Box args={[1.5, 2, 1]} position={[-2, 0, 1]}>
        <meshStandardMaterial color="#ff9999" transparent opacity={0.3} emissive="#ff6666" emissiveIntensity={0.2} />
      </Box>
      <Box args={[1.5, 2, 1]} position={[2, 0, 1]}>
        <meshStandardMaterial color="#ff9999" transparent opacity={0.3} emissive="#ff6666" emissiveIntensity={0.2} />
      </Box>

      {/* Coágulos sanguíneos flotantes para ambientación */}
      {[...Array(5)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.1, 8, 8]}
          position={[(Math.random() - 0.5) * 8, Math.random() * 4, (Math.random() - 0.5) * 8]}
        >
          <meshStandardMaterial color="#cc0000" emissive="#880000" emissiveIntensity={0.4} />
        </Sphere>
      ))}

      {/* Suelo */}
      <Box position={[0, -4, 0]} args={[20, 1, 20]}>
        <meshStandardMaterial color="#2c3e50" metalness={0.3} roughness={0.7} />
      </Box>

      {/* Feedback visual */}
      {correctAnswered && (
        <Text position={[0, -2, 0]} fontSize={1} color="#00ff88" anchorX="center" anchorY="middle" fontWeight="bold">
          ✅ ¡Correcto! La INMOVILIDAD PROLONGADA es el principal factor de riesgo
        </Text>
      )}

      {/* Iluminación */}
      <pointLight position={[0, 8, 0]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-8, 4, 8]} intensity={0.4} color="#ff6666" />
      <pointLight position={[8, 4, -8]} intensity={0.4} color="#66aaff" />
    </group>
  )
}

export default EmbolismScene
