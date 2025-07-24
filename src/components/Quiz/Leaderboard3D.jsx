import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
// import { quizService } from '../../services/quizService' // Comentado hasta conectar BD

// 📍 PUNTO: Medallero 3D de posiciones generales de usuarios con modelo 3D real
const Leaderboard3D = () => {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [loading, setLoading] = useState(true)
  const groupRef = useRef()

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Comentado hasta conectar con MongoDB
        // const data = await quizService.getLeaderboard()
        
        // Datos mock para testing
        const mockData = [
          {
            userId: 'user1',
            userName: 'Ana García',
            score: 570,
            correctAnswers: 4,
            totalQuestions: 4,
            completedAt: new Date()
          },
          {
            userId: 'user2',
            userName: 'Carlos López',
            score: 420,
            correctAnswers: 3,
            totalQuestions: 4,
            completedAt: new Date()
          },
          {
            userId: 'user3',
            userName: 'María Rodríguez',
            score: 350,
            correctAnswers: 2,
            totalQuestions: 4,
            completedAt: new Date()
          },
          {
            userId: 'user4',
            userName: 'Juan Pérez',
            score: 280,
            correctAnswers: 2,
            totalQuestions: 4,
            completedAt: new Date()
          },
          {
            userId: 'user5',
            userName: 'Laura Martín',
            score: 220,
            correctAnswers: 1,
            totalQuestions: 4,
            completedAt: new Date()
          }
        ]
        
        setLeaderboardData(mockData)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
        setLeaderboardData([])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  if (loading) {
    return (
      <Text position={[0, 0, 0]} fontSize={1} color="#ffffff" anchorX="center">
        Cargando medallero...
      </Text>
    )
  }

  return (
    <group ref={groupRef}>
      {/* Podio 3D */}
      <PodiumStructure />
      
      {/* Top 3 usuarios en el podio con medallas 3D */}
      {leaderboardData.slice(0, 3).map((user, index) => (
        <PodiumPosition
          key={user.userId}
          user={user}
          position={index}
          totalUsers={leaderboardData.length}
        />
      ))}
      
      {/* Lista completa de usuarios */}
      <UserList users={leaderboardData} />
      
      {/* Medallas flotantes decorativas */}
      <FloatingMedals />
    </group>
  )
}

// Componente de medalla 3D simple (sin modelo GLB)
const Medal3D = ({ position, rotation, scale, medalType = 'gold' }) => {
  const medalRef = useRef()
  
  // Colores para diferentes tipos de medalla
  const medalColors = {
    gold: '#FFD700',
    silver: '#C0C0C0', 
    bronze: '#CD7F32'
  }

  useFrame((state) => {
    if (medalRef.current) {
      // Rotación suave de la medalla
      medalRef.current.rotation.y += 0.01
      // Efecto de flotación
      medalRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={medalRef} position={position} rotation={rotation} scale={scale}>
      {/* Medalla como cilindro dorado */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
        <meshStandardMaterial 
          color={medalColors[medalType]}
          metalness={0.8}
          roughness={0.2}
          emissive={medalColors[medalType]}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Cinta de la medalla */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.1, 0.6, 0.05]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
    </group>
  )
}

// Estructura del podio 3D mejorada
const PodiumStructure = () => {
  const positions = [
    { height: 2, position: [0, 1, 0], color: '#ffd700' }, // 1er lugar - Oro
    { height: 1.5, position: [-3, 0.75, 0], color: '#c0c0c0' }, // 2do lugar - Plata
    { height: 1, position: [3, 0.5, 0], color: '#cd7f32' } // 3er lugar - Bronce
  ]

  return (
    <group>
      {positions.map((pos, index) => (
        <group key={index}>
          {/* Base del podio con mejor iluminación */}
          <mesh position={pos.position} castShadow receiveShadow>
            <cylinderGeometry args={[1, 1, pos.height]} />
            <meshStandardMaterial 
              color={pos.color} 
              metalness={0.8} 
              roughness={0.2}
              emissive={pos.color}
              emissiveIntensity={0.1}
            />
          </mesh>
          
          {/* Número de posición con mejor tipografía */}
          <Text
            position={[pos.position[0], pos.position[1] + pos.height/2 + 0.5, pos.position[2]]}
            fontSize={0.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {index + 1}
          </Text>

          {/* Medalla 3D en cada posición del podio */}
          <Medal3D
            position={[pos.position[0], pos.position[1] + pos.height/2 + 1.5, pos.position[2]]}
            rotation={[0, 0, 0]}
            scale={[0.3, 0.3, 0.3]}
            medalType={index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'}
          />
        </group>
      ))}
    </group>
  )
}

// Posición individual en el podio mejorada
const PodiumPosition = ({ user, position }) => {
  const positions = [
    [0, 3, 0], // 1er lugar
    [-3, 2.5, 0], // 2do lugar
    [3, 2, 0] // 3er lugar
  ]

  const medals = ['🥇', '🥈', '🥉']
  const colors = ['#ffd700', '#c0c0c0', '#cd7f32']
  const medalTypes = ['gold', 'silver', 'bronze']

  return (
    <group position={positions[position]}>
      {/* Avatar del usuario mejorado */}
      <mesh castShadow>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial 
          color={colors[position]} 
          metalness={0.6}
          roughness={0.3}
          emissive={colors[position]}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Medalla 3D flotante sobre el usuario */}
      <Medal3D
        position={[0, 1.5, 0]}
        rotation={[0, 0, 0]}
        scale={[0.2, 0.2, 0.2]}
        medalType={medalTypes[position]}
      />
      
      {/* Información del usuario */}
      <Html position={[0, 2.5, 0]} center>
        <div className="quiz-podium-user">
          <div className="quiz-medal">{medals[position]}</div>
          <div className="quiz-user-name">{user.userName}</div>
          <div className="quiz-user-score">{user.score} pts</div>
          <div className="quiz-user-accuracy">
            {Math.round((user.correctAnswers / user.totalQuestions) * 100)}% precisión
          </div>
        </div>
      </Html>
    </group>
  )
}

// Medallas flotantes decorativas en el fondo
const FloatingMedals = () => {
  const medalPositions = [
    { pos: [-8, 4, -3], type: 'gold', scale: 0.15 },
    { pos: [8, 3, -4], type: 'silver', scale: 0.12 },
    { pos: [-6, 1, -5], type: 'bronze', scale: 0.18 },
    { pos: [7, 5, -2], type: 'gold', scale: 0.1 },
    { pos: [-9, 2, -6], type: 'silver', scale: 0.14 },
    { pos: [9, 1, -3], type: 'bronze', scale: 0.16 }
  ]

  return (
    <group>
      {medalPositions.map((medal, index) => (
        <Medal3D
          key={index}
          position={medal.pos}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          scale={[medal.scale, medal.scale, medal.scale]}
          medalType={medal.type}
        />
      ))}
    </group>
  )
}

// Lista completa de usuarios con iconos de medalla
const UserList = ({ users }) => {
  const getMedalIcon = (position) => {
    if (position === 0) return '🥇'
    if (position === 1) return '🥈' 
    if (position === 2) return '🥉'
    return `#${position + 1}`
  }

  return (
    <Html position={[8, 2, 0]} center>
      <div className="quiz-leaderboard-list">
        <h3>🏆 Clasificación Completa</h3>
        <div className="quiz-leaderboard-scroll">
          {users.map((user, index) => (
            <div key={user.userId} className={`quiz-leaderboard-item ${index < 3 ? 'quiz-top-three' : ''}`}>
              <span className="quiz-position">{getMedalIcon(index)}</span>
              <span className="quiz-name">{user.userName}</span>
              <span className="quiz-score">{user.score}</span>
              <span className="quiz-accuracy">
                {Math.round((user.correctAnswers / user.totalQuestions) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Html>
  )
}

export default Leaderboard3D
