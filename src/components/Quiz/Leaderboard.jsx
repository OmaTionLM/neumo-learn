import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useEffect } from "react"
import { OrbitControls, Environment, Html, Text } from "@react-three/drei"
import { getTopResults } from "../../utils/firebaseUtils"
import Medal3DModel from "./Medal3DModel"
import "./Ranking.css"

const Podium = ({ position, height, color }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[2, height, 2]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
    </mesh>
  )
}

const Leaderboard = ({ onBack }) => {
  const [topResults, setTopResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const results = await getTopResults(10)
        setTopResults(results)
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
        setError("Error al cargar el medallero")
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [])

  if (loading) {
    return (
      <div className="ranking-loading">
        <h2>Cargando medallero...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="ranking-loading">
        <h2>{error}</h2>
        <button className="ranking-back-btn" onClick={onBack}>
          ← Volver al menú
        </button>
      </div>
    )
  }

  const top3 = topResults.slice(0, 3)

  return (
    <div className="ranking-container">
      {/* Header */}
      <div className="ranking-header">
        <h2 className="ranking-header-title">🏆 Medallero Respiratorio 3D</h2>
        <button className="ranking-back-btn" onClick={onBack}>
          ← Volver al menú
        </button>
      </div>

      {/* 3D Leaderboard */}
      <div className="ranking-3d-section">
        <Canvas camera={{ position: [0, 6, 15], fov: 50 }}>
          <Suspense
            fallback={
              <Html center>
                <div style={{ color: "white", fontSize: "18px" }}>Cargando medallero 3D...</div>
              </Html>
            }
          >
            <Environment preset="sunset" />
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <pointLight position={[-10, 5, -10]} intensity={0.5} />

            {/* Podios */}
            {top3.length >= 2 && <Podium position={[-5.5, 0.5, 0]} height={1} color="#C0C0C0" />}
            {top3.length >= 1 && <Podium position={[0, 1, 0]} height={2} color="#FFD700" />}
            {top3.length >= 3 && <Podium position={[5.5, 0.25, 0]} height={0.5} color="#CD7F32" />}

            {/* Medallas */}
            {top3.map((result, index) => {
              const positions = [
                [0, 3.5, 0],
                [-5.5, 3, 0],
                [5.5, 2.5, 0],
              ]
              const medals = ["oro", "plata", "bronce"]

              return (
                <Medal3DModel
                  key={result.id}
                  position={positions[index]}
                  type={medals[index]}
                  userName={result.userName}
                  score={result.score}
                />
              )
            })}

            {/* Títulos 3D */}
            <Text
              position={[0, 7.2, 0]}
              fontSize={0.9}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              🏆 Top 3 Medallero Respiratorio
            </Text>

            <Text
              position={[0, 6.5, 0]}
              fontSize={0.5}
              color="#ffdd00"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              Los Mejores Especialistas
            </Text>

            {/* Números de posición */}
            {top3.length >= 1 && (
              <Text position={[0, 0.2, 2.1]} fontSize={0.6} color="#000" anchorX="center" anchorY="middle">
                1°
              </Text>
            )}
            {top3.length >= 2 && (
              <Text position={[-5.5, -0.3, 2.1]} fontSize={0.6} color="#000" anchorX="center" anchorY="middle">
                2°
              </Text>
            )}
            {top3.length >= 3 && (
              <Text position={[5.5, -0.6, 2.1]} fontSize={0.6} color="#000" anchorX="center" anchorY="middle">
                3°
              </Text>
            )}

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={10}
              maxDistance={25}
              target={[0, 2, 0]}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Ranking List */}
      <div className="ranking-list-section">
        <div className="ranking-list-container">
          <h3 className="ranking-list-title">🏅 Ranking Completo</h3>
          {topResults.length === 0 ? (
            <div className="ranking-empty">
              <p>No hay resultados disponibles aún.</p>
            </div>
          ) : (
            <div className="ranking-table">
              {topResults.map((result, index) => (
                <div key={result.id} className={`ranking-row ranking-row-${Math.min(index + 1, 3)}`}>
                  <span className="ranking-position">#{index + 1}</span>
                  <span className="ranking-player-name">{result.userName}</span>
                  <span className="ranking-score">{result.score}%</span>
                  <span className="ranking-medal">
                    {result.medal === "oro" && "🥇"}
                    {result.medal === "plata" && "🥈"}
                    {result.medal === "bronce" && "🥉"}
                  </span>
                  <span className="ranking-date">
                    {result.timestamp?.toDate
                      ? result.timestamp.toDate().toLocaleDateString()
                      : new Date(result.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
