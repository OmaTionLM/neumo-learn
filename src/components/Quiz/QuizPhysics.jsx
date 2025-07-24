import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Physics, RigidBody, CuboidCollider, BallCollider } from "@react-three/rapier"
import { Text, Html } from "@react-three/drei"
import * as THREE from "three"

// 📍 PUNTO: Mundo de físicas MEJORADO con mejor interactividad
const QuizPhysics = ({ question, onQuestionComplete }) => {
  const [gameState, setGameState] = useState("playing")
  const [timeLeft, setTimeLeft] = useState(30)

  // Timer del juego
  useEffect(() => {
    if (gameState !== "playing") return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("timeout")
          onQuestionComplete(false, 0, { reason: "timeout" })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState, onQuestionComplete])

  // Renderizar diferentes tipos de preguntas físicas
  const renderQuestionType = () => {
    if (!question) return null

    switch (question.type) {
      case "drag_drop_organs":
        return <DragDropOrgans question={question} onComplete={onQuestionComplete} />
      case "physics_simulation":
        return <PhysicsSimulation question={question} onComplete={onQuestionComplete} />
      case "collision_detection":
        return <CollisionDetection question={question} onComplete={onQuestionComplete} />
      case "force_application":
        return <ForceApplication question={question} onComplete={onQuestionComplete} />
      default:
        return (
          <Text position={[0, 0, 0]} fontSize={1} color="#ffffff" anchorX="center">
            Tipo de pregunta no reconocido
          </Text>
        )
    }
  }

  return (
    <Physics gravity={[0, -9.82, 0]} debug={false}>
      {/* Suelo mejorado */}
      <RigidBody type="fixed" position={[0, -2, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[30, 0.2, 30]} />
          <meshStandardMaterial color="#2a2a4a" roughness={0.8} metalness={0.2} />
        </mesh>
        <CuboidCollider args={[15, 0.1, 15]} />
      </RigidBody>

      {/* Timer 3D mejorado */}
      <Text
        position={[0, 8, 0]}
        fontSize={1.2}
        color={timeLeft < 10 ? "#ff4444" : "#4CAF50"}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {`⏱️ ${timeLeft}s`}
      </Text>

      {/* Iluminación ambiental mejorada */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Pregunta específica */}
      {renderQuestionType()}
    </Physics>
  )
}

// 📍 PUNTO: Situación interactiva 1 - MEJORADA - Arrastrar y soltar órganos
const DragDropOrgans = ({ question, onComplete }) => {
  const [correctPlacements, setCorrectPlacements] = useState(0)
  const [completedOrgans, setCompletedOrgans] = useState(new Set())
  const [draggedOrgan, setDraggedOrgan] = useState(null)

  // Zona de infección (target) mejorada
  const handleInfectionZoneEnter = (organName) => {
    if (organName && question.correctOrgans.includes(organName) && !completedOrgans.has(organName)) {
      const newCompletedOrgans = new Set([...completedOrgans, organName])
      setCompletedOrgans(newCompletedOrgans)

      const newCount = newCompletedOrgans.size
      setCorrectPlacements(newCount)

      if (newCount >= question.correctOrgans.length) {
        setTimeout(() => {
          onComplete(true, question.points, { correctOrgans: Array.from(newCompletedOrgans) })
        }, 500)
      }
    }
  }

  // Órganos arrastrables con mejor posicionamiento
  const organs = [
    { name: "lungs", position: [-6, 3, 0], color: "#ff6b6b", size: [1, 0.8, 0.6] },
    { name: "heart", position: [-3, 3, 0], color: "#e74c3c", size: [0.8, 0.8, 0.8] },
    { name: "liver", position: [0, 3, 0], color: "#8b4513", size: [1.2, 0.6, 0.8] },
    { name: "kidney", position: [3, 3, 0], color: "#d2691e", size: [0.6, 1, 0.4] },
    { name: "bronchi", position: [6, 3, 0], color: "#feca57", size: [0.4, 1.2, 0.4] },
  ]

  return (
    <group>
      {/* Zona de infección mejorada */}
      <RigidBody type="fixed" position={[0, 1, 0]}>
        <mesh>
          <boxGeometry args={[4, 2.5, 2]} />
          <meshStandardMaterial color="#ff4444" transparent opacity={0.4} emissive="#ff2222" emissiveIntensity={0.2} />
        </mesh>
        <CuboidCollider
          args={[2, 1.25, 1]}
          sensor
          onIntersectionEnter={({ other }) => {
            const organName = other.rigidBodyObject?.userData?.organName
            if (organName) {
              handleInfectionZoneEnter(organName)
            }
          }}
        />
      </RigidBody>

      {/* Etiqueta de zona mejorada */}
      <Text position={[0, -0.5, 0]} fontSize={0.6} color="#ffffff" anchorX="center">
        🦠 ZONA DE INFECCIÓN
      </Text>

      {/* Partículas flotantes alrededor de la zona */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 3
        const z = Math.sin(angle) * 3
        return (
          <mesh key={i} position={[x, 1 + Math.sin(i) * 0.3, z]}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial color="#ff6666" emissive="#ff2222" emissiveIntensity={0.5} />
          </mesh>
        )
      })}

      {/* Contador de progreso mejorado */}
      <Html position={[0, 6, 0]} center>
        <div className="quiz-progress-counter">
          🎯 Órganos correctos: {correctPlacements}/{question.correctOrgans.length}
          {draggedOrgan && (
            <div style={{ fontSize: "0.9rem", marginTop: "5px" }}>Arrastrando: {draggedOrgan.toUpperCase()}</div>
          )}
        </div>
      </Html>

      {/* Órganos mejorados */}
      {organs.map((organ) => (
        <DraggableOrgan
          key={organ.name}
          name={organ.name}
          position={organ.position}
          size={organ.size}
          color={organ.color}
          isCorrect={question.correctOrgans.includes(organ.name)}
          isCompleted={completedOrgans.has(organ.name)}
          onDragStart={() => setDraggedOrgan(organ.name)}
          onDragEnd={() => setDraggedOrgan(null)}
        />
      ))}
    </group>
  )
}

// Órgano arrastrable MEJORADO con mejor física
const DraggableOrgan = ({ name, position, size, color, isCorrect, isCompleted, onDragStart, onDragEnd }) => {
  const rigidBodyRef = useRef()
  const meshRef = useRef()
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Mejorar el sistema de arrastre
  useFrame((state) => {
    if (isDragging && rigidBodyRef.current && !isCompleted) {
      // Convertir posición del mouse a coordenadas 3D
      const mouse = new THREE.Vector2(state.mouse.x, state.mouse.y)
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, state.camera)

      // Proyectar a un plano invisible
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const intersection = new THREE.Vector3()
      raycaster.ray.intersectPlane(plane, intersection)

      // Suavizar el movimiento
      const currentPos = rigidBodyRef.current.translation()
      const targetPos = {
        x: intersection.x,
        y: Math.max(intersection.y, 0.5), // No dejar que caiga muy bajo
        z: currentPos.z,
      }

      rigidBodyRef.current.setTranslation(targetPos, true)
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true) // Detener velocidad
    }

    // Efecto de hover
    if (meshRef.current && !isCompleted) {
      const targetScale = isHovered ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  const handlePointerDown = (e) => {
    e.stopPropagation()
    if (!isCompleted) {
      setIsDragging(true)
      onDragStart()
      if (rigidBodyRef.current) {
        rigidBodyRef.current.setBodyType(0) // Kinematic
      }
      document.body.style.cursor = "grabbing"
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
    onDragEnd()
    if (rigidBodyRef.current && !isCompleted) {
      rigidBodyRef.current.setBodyType(1) // Dynamic
    }
    document.body.style.cursor = "default"
  }

  const handlePointerEnter = () => {
    setIsHovered(true)
    if (!isCompleted) {
      document.body.style.cursor = "grab"
    }
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    if (!isDragging) {
      document.body.style.cursor = "default"
    }
  }

  // Limpiar cursor al desmontar
  useEffect(() => {
    return () => {
      document.body.style.cursor = "default"
    }
  }, [])

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      userData={{ organName: name }}
      type={isCompleted ? 0 : 1} // Kinematic si está completado
    >
      <mesh
        ref={meshRef}
        castShadow
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={`quiz-draggable-object ${isCompleted ? "" : "quiz-hover-effect"}`}
      >
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={isCompleted ? "#00ff00" : color}
          emissive={isCorrect ? "#004400" : "#440000"}
          emissiveIntensity={isCompleted ? 0.5 : 0.2}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />

      {/* Etiqueta mejorada */}
      <Html position={[0, size[1] / 2 + 0.5, 0]} center>
        <div className="quiz-organ-label">
          {name.toUpperCase()} {isCompleted && "✅"}
          {isCorrect && !isCompleted && " 🎯"}
        </div>
      </Html>
    </RigidBody>
  )
}

// 📍 PUNTO: Situación interactiva 2 - MEJORADA - Simulación de partículas
const PhysicsSimulation = ({ question, onComplete }) => {
  const [particlesReached, setParticlesReached] = useState(0)
  const [particlesLaunched, setParticlesLaunched] = useState(0)
  const particleCount = 15
  const targetPercentage = 0.6 // 60% deben llegar

  // Zona objetivo (alvéolos) mejorada
  const handleTargetEnter = () => {
    setParticlesReached((prev) => {
      const newCount = prev + 1
      if (newCount >= Math.ceil(particleCount * targetPercentage)) {
        setTimeout(() => {
          onComplete(true, question.points, { particlesReached: newCount, particlesLaunched })
        }, 1000)
      }
      return newCount
    })
  }

  // Obstáculos mejorados
  const obstacles = [
    { position: [2, 2, 0], args: [0.3, 2.5, 0.8], color: "#8b4513" },
    { position: [4, 1.5, 1], args: [0.4, 2, 0.6], color: "#a0522d" },
    { position: [3, 3, -1], args: [0.5, 1.5, 0.7], color: "#cd853f" },
  ]

  return (
    <group>
      {/* Zona objetivo mejorada */}
      <RigidBody type="fixed" position={[8, 2, 0]}>
        <mesh>
          <sphereGeometry args={[2]} />
          <meshStandardMaterial color="#44ff44" transparent opacity={0.4} emissive="#22aa22" emissiveIntensity={0.3} />
        </mesh>
        <BallCollider args={[2]} sensor onIntersectionEnter={handleTargetEnter} />
      </RigidBody>

      <Text position={[8, 5, 0]} fontSize={0.5} color="#44ff44" anchorX="center">
        🫁 ALVÉOLOS
      </Text>

      {/* Obstáculos mejorados */}
      {obstacles.map((obstacle, index) => (
        <ObstacleBox key={index} {...obstacle} />
      ))}

      {/* Generador de partículas mejorado */}
      <ParticleGenerator count={particleCount} onLaunch={() => setParticlesLaunched((prev) => prev + 1)} />

      {/* Contador de progreso mejorado */}
      <Html position={[0, 7, 0]} center>
        <div className="quiz-progress-counter">
          💨 Partículas en alvéolos: {particlesReached}/{Math.ceil(particleCount * targetPercentage)}
          <div style={{ fontSize: "0.9rem", marginTop: "5px" }}>
            Lanzadas: {particlesLaunched}/{particleCount}
          </div>
        </div>
      </Html>
    </group>
  )
}

// Generador de partículas mejorado
const ParticleGenerator = ({ count, onLaunch }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    let launched = 0
    const interval = setInterval(() => {
      if (launched < count) {
        const newParticle = {
          id: Date.now() + Math.random(),
          position: [-8, 2 + Math.random() * 3, Math.random() * 4 - 2],
          delay: 0,
        }
        setParticles((prev) => [...prev, newParticle])
        onLaunch()
        launched++
      } else {
        clearInterval(interval)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [count, onLaunch])

  return (
    <group>
      {particles.map((particle) => (
        <OxygenParticle
          key={particle.id}
          position={particle.position}
          delay={particle.delay}
          onRemove={() => setParticles((prev) => prev.filter((p) => p.id !== particle.id))}
        />
      ))}
    </group>
  )
}

// Partícula de oxígeno mejorada
const OxygenParticle = ({ position, delay, onRemove }) => {
  const rigidBodyRef = useRef()
  const meshRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rigidBodyRef.current) {
        // Aplicar fuerza inicial con variación
        const force = {
          x: 4 + Math.random() * 2,
          y: Math.random() * 2 - 1,
          z: Math.random() * 2 - 1,
        }
        rigidBodyRef.current.applyImpulse(force, true)
      }
    }, delay * 1000)

    // Auto-remover después de 15 segundos
    const removeTimer = setTimeout(() => {
      onRemove()
    }, 15000)

    return () => {
      clearTimeout(timer)
      clearTimeout(removeTimer)
    }
  }, [delay, onRemove])

  // Efecto de brillo
  useFrame((state) => {
    if (meshRef.current) {
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      meshRef.current.material.emissiveIntensity = intensity
    }
  })

  return (
    <RigidBody ref={rigidBodyRef} position={position}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[0.12]} />
        <meshStandardMaterial color="#87ceeb" emissive="#4169e1" emissiveIntensity={0.3} transparent opacity={0.9} />
      </mesh>
      <BallCollider args={[0.12]} />
    </RigidBody>
  )
}

// Obstáculo mejorado
const ObstacleBox = ({ position, args, color = "#8b4513" }) => {
  return (
    <RigidBody type="fixed" position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
      </mesh>
      <CuboidCollider args={[args[0] / 2, args[1] / 2, args[2] / 2]} />
    </RigidBody>
  )
}

// 📍 PUNTO: Situación interactiva 3 - MEJORADA - Detección de colisiones
const CollisionDetection = ({ question, onComplete }) => {
  const [coagulosBlocked, setCoagulosBlocked] = useState(0)
  const [coagulosEscaped, setCoagulosEscaped] = useState(0)
  const [coagulosActive, setCoagulosActive] = useState(0)
  const maxEscapes = 3
  const targetBlocked = 8

  useEffect(() => {
    if (coagulosEscaped >= maxEscapes) {
      onComplete(false, 0, { reason: "too_many_escaped", coagulosBlocked })
    } else if (coagulosBlocked >= targetBlocked) {
      onComplete(true, question.points, { coagulosBlocked })
    }
  }, [coagulosBlocked, coagulosEscaped, onComplete, question.points])

  return (
    <group>
      {/* Generador de coágulos mejorado */}
      <CoagulationGenerator
        onBlock={() => {
          setCoagulosBlocked((prev) => prev + 1)
          setCoagulosActive((prev) => prev - 1)
        }}
        onEscape={() => {
          setCoagulosEscaped((prev) => prev + 1)
          setCoagulosActive((prev) => prev - 1)
        }}
        onSpawn={() => setCoagulosActive((prev) => prev + 1)}
      />

      {/* Contador mejorado */}
      <Html position={[0, 7, 0]} center>
        <div className="quiz-collision-stats">
          <div>
            🎯 Coágulos bloqueados: {coagulosBlocked}/{targetBlocked}
          </div>
          <div>
            ❌ Coágulos escapados: {coagulosEscaped}/{maxEscapes}
          </div>
          <div>🔴 Coágulos activos: {coagulosActive}</div>
          <div style={{ fontSize: "0.9rem", marginTop: "8px", color: "#4CAF50" }}>
            💡 Haz click en los coágulos rojos para bloquearlos
          </div>
        </div>
      </Html>
    </group>
  )
}

// Generador de coágulos mejorado
const CoagulationGenerator = ({ onBlock, onEscape, onSpawn }) => {
  const [coagulos, setCoagulos] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newCoagulo = {
        id: Date.now() + Math.random(),
        position: [-10, Math.random() * 4 + 1, Math.random() * 4 - 2],
        speed: 1.5 + Math.random() * 1,
      }
      setCoagulos((prev) => [...prev, newCoagulo])
      onSpawn()
    }, 1500)

    return () => clearInterval(interval)
  }, [onSpawn])

  return (
    <group>
      {coagulos.map((coagulo) => (
        <Coagulo
          key={coagulo.id}
          position={coagulo.position}
          speed={coagulo.speed}
          onBlock={onBlock}
          onEscape={onEscape}
          onRemove={() => setCoagulos((prev) => prev.filter((c) => c.id !== coagulo.id))}
        />
      ))}

      {/* Línea de escape visual */}
      <RigidBody type="fixed" position={[12, 2, 0]}>
        <mesh>
          <boxGeometry args={[0.2, 8, 6]} />
          <meshStandardMaterial color="#ff6666" transparent opacity={0.3} emissive="#ff2222" emissiveIntensity={0.2} />
        </mesh>
        <CuboidCollider args={[0.1, 4, 3]} sensor />
      </RigidBody>
    </group>
  )
}

// Coágulo individual mejorado
const Coagulo = ({ position, speed, onBlock, onEscape, onRemove }) => {
  const rigidBodyRef = useRef()
  const meshRef = useRef()
  const [blocked, setBlocked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Mover hacia la derecha con velocidad variable
    if (rigidBodyRef.current && !blocked) {
      rigidBodyRef.current.setLinvel({ x: speed, y: 0, z: 0 }, true)
    }

    // Remover después de 12 segundos si no fue bloqueado
    const timer = setTimeout(() => {
      if (!blocked) {
        onEscape()
        onRemove()
      }
    }, 12000)

    return () => clearTimeout(timer)
  }, [blocked, speed, onEscape, onRemove])

  // Efecto de pulsación
  useFrame((state) => {
    if (meshRef.current && !blocked) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    if (!blocked && rigidBodyRef.current) {
      setBlocked(true)
      rigidBodyRef.current.setBodyType(0) // Kinematic (detener)
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      onBlock()

      // Efecto visual de bloqueo
      if (meshRef.current) {
        meshRef.current.material.color.setHex(0x00ff00)
        meshRef.current.material.emissiveIntensity = 0.8
      }

      setTimeout(onRemove, 1500) // Remover después de 1.5 segundos
    }
  }

  const handlePointerEnter = () => {
    setIsHovered(true)
    document.body.style.cursor = "pointer"
  }

  const handlePointerLeave = () => {
    setIsHovered(false)
    document.body.style.cursor = "default"
  }

  return (
    <RigidBody ref={rigidBodyRef} position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        castShadow
        className="quiz-clickable-object"
      >
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial
          color={blocked ? "#00ff00" : "#ff4444"}
          emissive={blocked ? "#004400" : "#440000"}
          emissiveIntensity={blocked ? 0.8 : 0.4}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <BallCollider args={[0.25]} />

      {/* Indicador de click */}
      {isHovered && !blocked && (
        <Html position={[0, 0.5, 0]} center>
          <div
            style={{
              background: "rgba(76, 175, 80, 0.9)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "0.8rem",
              fontWeight: "bold",
              pointerEvents: "none",
            }}
          >
            🖱️ CLICK
          </div>
        </Html>
      )}
    </RigidBody>
  )
}

// 📍 PUNTO: Situación interactiva 4 - MEJORADA - Aplicación de fuerzas
const ForceApplication = ({ question, onComplete }) => {
  const [appliedForce, setAppliedForce] = useState(0.5)
  const [isInRange, setIsInRange] = useState(false)
  const [timeInRange, setTimeInRange] = useState(0)
  const lungRef = useRef()
  const meshRef = useRef()

  useEffect(() => {
    const inRange = appliedForce >= question.forceRange[0] && appliedForce <= question.forceRange[1]
    setIsInRange(inRange)

    if (inRange) {
      const timer = setInterval(() => {
        setTimeInRange((prev) => {
          const newTime = prev + 0.1
          if (newTime >= 3) {
            // 3 segundos en el rango correcto
            onComplete(true, question.points, { finalForce: appliedForce, timeInRange: newTime })
            return newTime
          }
          return newTime
        })
      }, 100)

      return () => clearInterval(timer)
    } else {
      setTimeInRange(0)
    }
  }, [appliedForce, question.forceRange, question.points, onComplete])

  // Animación del pulmón basada en la fuerza
  useFrame((state) => {
    if (meshRef.current) {
      const breathingScale = 1 + appliedForce * 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.scale.setScalar(breathingScale)

      // Cambiar color basado en si está en rango
      const targetColor = isInRange ? 0x44ff44 : 0xff4444
      meshRef.current.material.color.lerp(new THREE.Color(targetColor), 0.1)
    }
  })

  const handleForceChange = (e) => {
    const force = Number.parseFloat(e.target.value)
    setAppliedForce(force)

    // Aplicar impulso al pulmón para simular respiración
    if (lungRef.current) {
      const impulse = { x: 0, y: force * 3, z: 0 }
      lungRef.current.applyImpulse(impulse, true)
    }
  }

  return (
    <group>
      {/* Pulmón con física mejorada */}
      <RigidBody ref={lungRef} position={[0, 3, 0]} type="dynamic">
        <mesh ref={meshRef} castShadow>
          <sphereGeometry args={[1.5]} />
          <meshStandardMaterial
            color={isInRange ? "#44ff44" : "#ff4444"}
            emissive={isInRange ? "#004400" : "#440000"}
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        <BallCollider args={[1.5]} />
      </RigidBody>

      {/* Indicadores visuales de rango */}
      <Text position={[-4, 5, 0]} fontSize={0.4} color="#4CAF50" anchorX="center">
        Rango mínimo: {question.forceRange[0]}
      </Text>
      <Text position={[4, 5, 0]} fontSize={0.4} color="#4CAF50" anchorX="center">
        Rango máximo: {question.forceRange[1]}
      </Text>

      {/* Control de fuerza mejorado */}
      <Html position={[6, 3, 0]} center>
        <div className="quiz-force-control">
          <label>🫁 Fuerza de respiración: {appliedForce.toFixed(2)}</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={appliedForce}
            onChange={handleForceChange}
            className="quiz-force-slider"
          />
          <div className={`quiz-force-indicator ${isInRange ? "quiz-in-range" : ""}`}>
            {isInRange ? "✅ En rango correcto" : "❌ Fuera de rango"}
          </div>
          <div className="quiz-time-counter">⏱️ Tiempo en rango: {timeInRange.toFixed(1)}s / 3.0s</div>
          <div style={{ fontSize: "0.9rem", marginTop: "10px", opacity: 0.8 }}>
            💡 El EPOC requiere fuerza controlada para respirar
          </div>
        </div>
      </Html>

      {/* Partículas de aire */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 3 + appliedForce * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <mesh key={i} position={[x, 3, z]}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial
              color="#87ceeb"
              emissive="#4169e1"
              emissiveIntensity={appliedForce}
              transparent
              opacity={0.7}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default QuizPhysics
