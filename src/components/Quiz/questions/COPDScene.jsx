import { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Cylinder, Sphere, Box, Text } from "@react-three/drei"

const CigaretteModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("tabaco", isCorrect)
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
        Tabaquismo / Cigarrillos
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
        {/* Cigarrillo principal */}
        <Cylinder args={[0.08, 0.08, 1.5, 16]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#f5deb3"}
            emissive={hovered ? "#8b7355" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0}
            roughness={0.9}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Cylinder>

        {/* Filtro del cigarrillo */}
        <Cylinder args={[0.08, 0.08, 0.3, 16]} position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffffff"}
            emissive={hovered ? "#cccccc" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            metalness={0}
            roughness={0.8}
          />
        </Cylinder>

        {/* Punta encendida */}
        <Sphere args={[0.1, 8, 8]} position={[-0.8, 0, 0]}>
          <meshStandardMaterial
            color="#ff4500"
            emissive="#ff2200"
            emissiveIntensity={0.8}
            metalness={0}
            roughness={0.1}
          />
        </Sphere>

        {/* Humo (partículas) */}
        {[...Array(5)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.05 + i * 0.02, 8, 8]}
            position={[-1 - i * 0.3, i * 0.2, (Math.random() - 0.5) * 0.2]}
          >
            <meshStandardMaterial
              color="#cccccc"
              transparent
              opacity={0.6 - i * 0.1}
              emissive="#666666"
              emissiveIntensity={0.2}
            />
          </Sphere>
        ))}

        {/* Cajetilla de cigarrillos */}
        <Box args={[0.6, 1, 0.3]} position={[2, -0.5, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#8b0000"}
            emissive={hovered ? "#4a0000" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.1}
            roughness={0.8}
          />
        </Box>

        {/* Etiqueta de advertencia */}
        <Box args={[0.5, 0.3, 0.01]} position={[2, -0.5, 0.16]}>
          <meshStandardMaterial color="#ffffff" metalness={0} roughness={1} />
        </Box>
      </group>

      {isSelected && (
        <Sphere args={[2, 16, 16]} position={position}>
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

const PollutionModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("contaminacion", isCorrect)
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
        Contaminación del Aire
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
        {/* Chimenea industrial */}
        <Cylinder args={[0.3, 0.4, 2, 8]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#666666"}
            emissive={hovered ? "#333333" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Cylinder>

        {/* Humo de la chimenea */}
        {[...Array(8)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.1 + i * 0.05, 8, 8]}
            position={[(Math.random() - 0.5) * 0.5, 1.2 + i * 0.3, (Math.random() - 0.5) * 0.5]}
          >
            <meshStandardMaterial
              color="#444444"
              transparent
              opacity={0.7 - i * 0.08}
              emissive="#222222"
              emissiveIntensity={0.3}
            />
          </Sphere>
        ))}

        {/* Base industrial */}
        <Box args={[1.2, 0.6, 1.2]} position={[0, -1.3, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#555555"}
            emissive={hovered ? "#222222" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.6}
            roughness={0.4}
          />
        </Box>

        {/* Señal de peligro */}
        <Box args={[0.4, 0.4, 0.05]} position={[0.8, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#ffff00" emissive="#cccc00" emissiveIntensity={0.3} />
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

const GeneticsModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("genetica", isCorrect)
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
        Factores Genéticos
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
        {/* Hélice de ADN */}
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 4
          const y = -1 + (i / 20) * 2
          return (
            <group key={i}>
              <Sphere args={[0.08, 8, 8]} position={[Math.cos(angle) * 0.3, y, Math.sin(angle) * 0.3]}>
                <meshStandardMaterial
                  color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#00aaff"}
                  emissive={hovered ? "#0066cc" : "#000000"}
                  emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
                  metalness={0.2}
                  roughness={0.8}
                />
              </Sphere>
              <Sphere
                args={[0.08, 8, 8]}
                position={[Math.cos(angle + Math.PI) * 0.3, y, Math.sin(angle + Math.PI) * 0.3]}
              >
                <meshStandardMaterial
                  color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ff6600"}
                  emissive={hovered ? "#cc4400" : "#000000"}
                  emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
                  metalness={0.2}
                  roughness={0.8}
                />
              </Sphere>
              {/* Conexión entre bases */}
              <Cylinder args={[0.02, 0.02, 0.6, 8]} position={[0, y, 0]} rotation={[0, 0, angle]}>
                <meshStandardMaterial color="#cccccc" metalness={0.5} roughness={0.5} />
              </Cylinder>
            </group>
          )
        })}

        {/* Microscopio */}
        <Cylinder args={[0.2, 0.3, 0.8, 8]} position={[1.5, -0.5, 0]}>
          <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
        </Cylinder>
        <Sphere args={[0.15, 8, 8]} position={[1.5, 0.2, 0]}>
          <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
        </Sphere>
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

const InfectionModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("infecciones", isCorrect)
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
        Infecciones Respiratorias
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
        {/* Virus/bacterias */}
        {[...Array(8)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.15 + Math.random() * 0.1, 8, 8]}
            position={[(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2]}
          >
            <meshStandardMaterial
              color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#00ff00"}
              emissive={hovered ? "#00cc00" : "#000000"}
              emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.4}
              metalness={0.3}
              roughness={0.7}
              transparent
              opacity={isSelected && !isCorrect ? 0.6 : 0.8}
            />
          </Sphere>
        ))}

        {/* Pulmón infectado */}
        <Box args={[1.5, 2, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffaaaa"}
            emissive={hovered ? "#ff6666" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0.2}
            transparent
            opacity={0.3}
            metalness={0.1}
            roughness={0.9}
          />
        </Box>

        {/* Termómetro */}
        <Cylinder args={[0.05, 0.05, 1.2, 8]} position={[1.8, 0, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
        </Cylinder>
        <Sphere args={[0.1, 8, 8]} position={[1.8, -0.7, 0]}>
          <meshStandardMaterial color="#ff0000" emissive="#cc0000" emissiveIntensity={0.5} />
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

const AgingModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("envejecimiento", isCorrect)
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
        Envejecimiento Natural
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
        {/* Reloj de arena */}
        <Cylinder args={[0.6, 0.6, 0.2, 8]} position={[0, 0.8, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#8b4513"}
            emissive={hovered ? "#654321" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.2}
            roughness={0.8}
          />
        </Cylinder>

        <Cylinder args={[0.6, 0.6, 0.2, 8]} position={[0, -0.8, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#8b4513"}
            emissive={hovered ? "#654321" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.2}
            roughness={0.8}
          />
        </Cylinder>

        {/* Cuerpo del reloj */}
        <Cylinder args={[0.1, 0.5, 1.4, 8]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#daa520"}
            emissive={hovered ? "#b8860b" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.6}
            roughness={0.4}
            transparent
            opacity={0.8}
          />
        </Cylinder>

        {/* Arena cayendo */}
        {[...Array(10)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.02, 4, 4]}
            position={[(Math.random() - 0.5) * 0.1, 0.5 - i * 0.1, (Math.random() - 0.5) * 0.1]}
          >
            <meshStandardMaterial color="#f4a460" metalness={0} roughness={1} />
          </Sphere>
        ))}

        {/* Calendario */}
        <Box args={[0.8, 1, 0.1]} position={[1.5, 0, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={0} roughness={1} />
        </Box>
        <Box args={[0.7, 0.2, 0.01]} position={[1.5, 0.3, 0.06]}>
          <meshStandardMaterial color="#ff0000" metalness={0} roughness={1} />
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

const COPDScene = ({ onAnswer, gameState, questionData }) => {
  const [attempts, setAttempts] = useState(0)
  const [startTime] = useState(Date.now())
  const [selectedCauses, setSelectedCauses] = useState([])
  const [correctAnswered, setCorrectAnswered] = useState(false)

  const handleCauseSelect = (causeType, isCorrect) => {
    setAttempts((prev) => prev + 1)

    if (!selectedCauses.includes(causeType)) {
      setSelectedCauses([...selectedCauses, causeType])
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
      {/* Tabaquismo - CORRECTO */}
      <CigaretteModel
        position={[0, 2, 0]}
        onSelect={handleCauseSelect}
        isSelected={selectedCauses.includes("tabaco")}
        isCorrect={true}
      />

      {/* Contaminación del aire - INCORRECTO (factor secundario) */}
      <PollutionModel
        position={[-5, 1, 3]}
        onSelect={handleCauseSelect}
        isSelected={selectedCauses.includes("contaminacion")}
        isCorrect={false}
      />

      {/* Factores genéticos - INCORRECTO (factor secundario) */}
      <GeneticsModel
        position={[5, 0, -2]}
        onSelect={handleCauseSelect}
        isSelected={selectedCauses.includes("genetica")}
        isCorrect={false}
      />

      {/* Infecciones respiratorias - INCORRECTO (complicación, no causa) */}
      <InfectionModel
        position={[-4, -1, -4]}
        onSelect={handleCauseSelect}
        isSelected={selectedCauses.includes("infecciones")}
        isCorrect={false}
      />

      {/* Envejecimiento natural - INCORRECTO (factor de riesgo, no causa principal) */}
      <AgingModel
        position={[4, 1, 4]}
        onSelect={handleCauseSelect}
        isSelected={selectedCauses.includes("envejecimiento")}
        isCorrect={false}
      />

      {/* Pulmones dañados para ambientación */}
      <Box args={[2, 2.5, 1.5]} position={[-2, 0, 1]}>
        <meshStandardMaterial color="#ff9999" transparent opacity={0.3} emissive="#ff6666" emissiveIntensity={0.2} />
      </Box>
      <Box args={[2, 2.5, 1.5]} position={[2, 0, 1]}>
        <meshStandardMaterial color="#ff9999" transparent opacity={0.3} emissive="#ff6666" emissiveIntensity={0.2} />
      </Box>

      {/* Suelo */}
      <Box position={[0, -4, 0]} args={[20, 1, 20]}>
        <meshStandardMaterial color="#2c3e50" metalness={0.3} roughness={0.7} />
      </Box>

      {/* Feedback visual */}
      {correctAnswered && (
        <Text position={[0, -2, 0]} fontSize={1} color="#00ff88" anchorX="center" anchorY="middle" fontWeight="bold">
          ✅ ¡Correcto! El TABAQUISMO es la principal causa de EPOC
        </Text>
      )}

      {/* Iluminación */}
      <pointLight position={[0, 8, 0]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-8, 4, 8]} intensity={0.4} color="#ff6666" />
      <pointLight position={[8, 4, -8]} intensity={0.4} color="#66aaff" />
    </group>
  )
}

export default COPDScene
