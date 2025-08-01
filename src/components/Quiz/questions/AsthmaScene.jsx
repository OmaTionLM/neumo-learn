import { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useCylinder } from "@react-three/cannon"
import { Cylinder, Sphere, Box, Text } from "@react-three/drei"

const InhalerModel = ({ position, onSelect, isSelected, isCorrect }) => {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      // Animación de flotación
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2

      // Rotación suave
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      // Pulsación si está seleccionado
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
    onSelect("inhalador", isCorrect)
  }

  return (
    <group>
      {/* Etiqueta del inhalador */}
      <Text
        position={[position[0], position[1] + 3, position[2]]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
        maxWidth={4}
        textAlign="center"
      >
        Inhalador de Rescate
      </Text>

      {/* Modelo del inhalador */}
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
        {/* Cuerpo principal del inhalador */}
        <Box args={[0.8, 1.5, 0.4]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#0066cc"}
            emissive={hovered ? "#003366" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Box>

        {/* Boquilla del inhalador */}
        <Cylinder args={[0.15, 0.2, 0.6, 8]} position={[0, 0.8, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#004499"}
            emissive={hovered ? "#002244" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.8}
            roughness={0.1}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Cylinder>

        {/* Tapa superior */}
        <Box args={[0.6, 0.2, 0.3]} position={[0, 0.85, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#003d7a"}
            emissive={hovered ? "#001a33" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Box>

        {/* Botón de activación */}
        <Box args={[0.3, 0.1, 0.2]} position={[0, 0.3, 0.25]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffffff"}
            emissive={hovered ? "#666666" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            metalness={0.1}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Box>

        {/* Etiqueta en el cuerpo */}
        <Box args={[0.5, 0.3, 0.01]} position={[0, 0, 0.21]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#000000"
            emissiveIntensity={0}
            metalness={0}
            roughness={1}
            transparent
            opacity={0.9}
          />
        </Box>

        {/* Indicador LED */}
        <Sphere args={[0.05, 8, 8]} position={[0.2, 0.6, 0.21]}>
          <meshStandardMaterial
            color="#00ff00"
            emissive="#00aa00"
            emissiveIntensity={0.8}
            metalness={0}
            roughness={0.1}
          />
        </Sphere>
      </group>

      {/* Indicador de selección */}
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

const PillsModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("pastillas", isCorrect)
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
        Pastillas Antihistamínicas
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
        {/* Frasco de pastillas */}
        <Cylinder args={[0.6, 0.6, 1.2, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ff6666"}
            emissive={hovered ? "#cc3333" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.1}
            roughness={0.8}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 0.9}
          />
        </Cylinder>

        {/* Tapa del frasco */}
        <Cylinder args={[0.65, 0.65, 0.2, 16]} position={[0, 0.7, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffffff"}
            emissive={hovered ? "#666666" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            metalness={0.3}
            roughness={0.7}
          />
        </Cylinder>

        {/* Etiqueta del frasco */}
        <Box args={[1, 0.6, 0.01]} position={[0, 0, 0.61]}>
          <meshStandardMaterial color="#ffffff" metalness={0} roughness={1} transparent opacity={0.9} />
        </Box>

        {/* Pastillas visibles dentro */}
        {[...Array(6)].map((_, i) => (
          <Sphere
            key={i}
            args={[0.08, 8, 8]}
            position={[(Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8]}
          >
            <meshStandardMaterial color="#ffaaaa" metalness={0} roughness={0.9} />
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

const SyrupModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("jarabe", isCorrect)
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
        Jarabe para la Tos
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
        {/* Botella de jarabe */}
        <Cylinder args={[0.4, 0.5, 1.8, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#9966cc"}
            emissive={hovered ? "#663399" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.2}
            roughness={0.6}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 0.8}
          />
        </Cylinder>

        {/* Cuello de la botella */}
        <Cylinder args={[0.2, 0.25, 0.4, 16]} position={[0, 1.1, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#9966cc"}
            emissive={hovered ? "#663399" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.2}
            roughness={0.6}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 0.8}
          />
        </Cylinder>

        {/* Tapa de la botella */}
        <Cylinder args={[0.3, 0.3, 0.3, 16]} position={[0, 1.45, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffffff"}
            emissive={hovered ? "#666666" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : isSelected ? 0.3 : 0}
            metalness={0.4}
            roughness={0.6}
          />
        </Cylinder>

        {/* Líquido dentro */}
        <Cylinder args={[0.35, 0.45, 1.4, 16]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color="#cc88ff" transparent opacity={0.7} metalness={0} roughness={0.1} />
        </Cylinder>

        {/* Etiqueta */}
        <Box args={[0.8, 0.8, 0.01]} position={[0, 0, 0.51]}>
          <meshStandardMaterial color="#ffffff" metalness={0} roughness={1} transparent opacity={0.9} />
        </Box>

        {/* Cuchara dosificadora */}
        <Box args={[0.15, 0.05, 0.4]} position={[0.6, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial color="#ffdd00" metalness={0.8} roughness={0.2} />
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

const AntibioticsModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("antibioticos", isCorrect)
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
        Antibióticos
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
        {/* Caja de antibióticos */}
        <Box args={[1.2, 0.8, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#ffaa00"}
            emissive={hovered ? "#cc7700" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.1}
            roughness={0.9}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Box>

        {/* Etiqueta frontal */}
        <Box args={[1.1, 0.6, 0.01]} position={[0, 0, 0.16]}>
          <meshStandardMaterial color="#ffffff" metalness={0} roughness={1} transparent opacity={0.95} />
        </Box>

        {/* Blister de pastillas visible */}
        <Box args={[0.8, 0.4, 0.05]} position={[0, 0, 0.18]}>
          <meshStandardMaterial color="#silver" metalness={0.8} roughness={0.2} transparent opacity={0.7} />
        </Box>

        {/* Pastillas individuales en el blister */}
        {[...Array(8)].map((_, i) => (
          <Sphere key={i} args={[0.06, 8, 8]} position={[-0.3 + (i % 4) * 0.2, -0.1 + Math.floor(i / 4) * 0.2, 0.2]}>
            <meshStandardMaterial color="#ffffff" metalness={0} roughness={0.8} />
          </Sphere>
        ))}

        {/* Cruz médica */}
        <Box args={[0.15, 0.05, 0.01]} position={[0.4, 0.2, 0.17]}>
          <meshStandardMaterial color="#ff0000" />
        </Box>
        <Box args={[0.05, 0.15, 0.01]} position={[0.4, 0.2, 0.17]}>
          <meshStandardMaterial color="#ff0000" />
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

const OxygenTankModel = ({ position, onSelect, isSelected, isCorrect }) => {
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
    onSelect("oxigeno", isCorrect)
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
        Tanque de Oxígeno
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
        {/* Tanque principal */}
        <Cylinder args={[0.4, 0.4, 2.2, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#00ccaa"}
            emissive={hovered ? "#008866" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={isSelected && !isCorrect ? 0.6 : 1}
          />
        </Cylinder>

        {/* Válvula superior */}
        <Cylinder args={[0.15, 0.15, 0.3, 8]} position={[0, 1.25, 0]}>
          <meshStandardMaterial
            color={isSelected ? (isCorrect ? "#00ff88" : "#ff4444") : "#666666"}
            emissive={hovered ? "#333333" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : isSelected ? 0.5 : 0}
            metalness={0.9}
            roughness={0.1}
          />
        </Cylinder>

        {/* Manómetro */}
        <Sphere args={[0.2, 16, 16]} position={[0.3, 0.8, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#000000" metalness={0.1} roughness={0.8} />
        </Sphere>

        {/* Manguera */}
        <Cylinder args={[0.05, 0.05, 1.5, 8]} position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
          <meshStandardMaterial color="#333333" metalness={0.2} roughness={0.8} />
        </Cylinder>

        {/* Mascarilla */}
        <Sphere args={[0.25, 16, 16]} position={[1.5, -0.5, 0]}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.8} metalness={0.1} roughness={0.9} />
        </Sphere>

        {/* Etiqueta O2 */}
        <Box args={[0.3, 0.3, 0.01]} position={[0, 0, 0.41]}>
          <meshStandardMaterial color="#ffffff" metalness={0} roughness={1} />
        </Box>

        {/* Base del tanque */}
        <Cylinder args={[0.45, 0.45, 0.1, 16]} position={[0, -1.15, 0]}>
          <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.4} />
        </Cylinder>
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

const Bronchus = ({ position, rotation }) => {
  const [ref] = useCylinder(() => ({
    mass: 0,
    position,
    rotation,
    args: [0.2, 0.3, 1.5, 8],
  }))

  useFrame((state) => {
    if (ref.current) {
      // Animación de constricción para simular asma
      const constriction = Math.sin(state.clock.elapsedTime * 3) * 0.05 + 1
      ref.current.scale.set(constriction, 1, constriction)
    }
  })

  return (
    <Cylinder ref={ref} args={[0.2, 0.3, 1.5, 8]} rotation={rotation}>
      <meshStandardMaterial
        color="#ff9999"
        emissive="#ff6666"
        emissiveIntensity={0.2}
        transparent
        opacity={0.7}
        metalness={0.3}
        roughness={0.4}
      />
    </Cylinder>
  )
}

const AsthmaScene = ({ onAnswer, gameState, questionData }) => {
  const [attempts, setAttempts] = useState(0)
  const [startTime] = useState(Date.now())
  const [selectedTreatments, setSelectedTreatments] = useState([])
  const [correctAnswered, setCorrectAnswered] = useState(false)

  // Bronquios para ambientación - más separados
  const bronchi = [
    { position: [-2, 0, 2], rotation: [0, 0, 0] },
    { position: [2, 0, 2], rotation: [0, 0, 0] },
    { position: [0, 1, -2], rotation: [Math.PI / 4, 0, 0] },
    { position: [-1.5, -0.5, 0], rotation: [0, Math.PI / 4, 0] },
    { position: [1.5, -0.5, 0], rotation: [0, -Math.PI / 4, 0] },
  ]

  const handleTreatmentSelect = (treatmentType, isCorrect) => {
    setAttempts((prev) => prev + 1)

    if (!selectedTreatments.includes(treatmentType)) {
      setSelectedTreatments([...selectedTreatments, treatmentType])
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
      {/* Inhalador especial - CORRECTO */}
      <InhalerModel
        position={[0, 2, 0]}
        onSelect={handleTreatmentSelect}
        isSelected={selectedTreatments.includes("inhalador")}
        isCorrect={true}
      />

      {/* Pastillas Antihistamínicas - INCORRECTO */}
      <PillsModel
        position={[-5, 1, 3]}
        onSelect={handleTreatmentSelect}
        isSelected={selectedTreatments.includes("pastillas")}
        isCorrect={false}
      />

      {/* Jarabe para la Tos - INCORRECTO */}
      <SyrupModel
        position={[5, 0, -2]}
        onSelect={handleTreatmentSelect}
        isSelected={selectedTreatments.includes("jarabe")}
        isCorrect={false}
      />

      {/* Antibióticos - INCORRECTO */}
      <AntibioticsModel
        position={[-4, -1, -4]}
        onSelect={handleTreatmentSelect}
        isSelected={selectedTreatments.includes("antibioticos")}
        isCorrect={false}
      />

      {/* Tanque de Oxígeno - INCORRECTO */}
      <OxygenTankModel
        position={[4, 1, 4]}
        onSelect={handleTreatmentSelect}
        isSelected={selectedTreatments.includes("oxigeno")}
        isCorrect={false}
      />

      {/* Sistema bronquial para ambientación */}
      {bronchi.map((bronchus, index) => (
        <Bronchus key={index} position={bronchus.position} rotation={bronchus.rotation} />
      ))}

      {/* Suelo */}
      <Box position={[0, -4, 0]} args={[20, 1, 20]}>
        <meshStandardMaterial color="#2c3e50" metalness={0.3} roughness={0.7} />
      </Box>

      {/* Feedback visual */}
      {correctAnswered && (
        <Text position={[0, -2, 0]} fontSize={1} color="#00ff88" anchorX="center" anchorY="middle" fontWeight="bold">
          ✅ ¡Correcto! El INHALADOR DE RESCATE es el tratamiento de emergencia
        </Text>
      )}

      {/* Iluminación */}
      <pointLight position={[0, 8, 0]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-8, 4, 8]} intensity={0.4} color="#0066cc" />
      <pointLight position={[8, 4, -8]} intensity={0.4} color="#ff9999" />
    </group>
  )
}

export default AsthmaScene
