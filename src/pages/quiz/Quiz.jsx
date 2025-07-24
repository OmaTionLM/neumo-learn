"use client"

import "./Quiz.css"
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import QuizPhysics from "../../components/Quiz/QuizPhysics"
import QuizProgress from "../../components/Quiz/QuizProgress"
import QuizFeedback from "../../components/Quiz/QuizFeedback"
import Leaderboard3D from "../../components/Quiz/Leaderboard3D"
// import { quizService } from '../services/quizService' // Comentado hasta conectar BD
// import { useAuth } from '../hooks/useAuth' // Comentado hasta conectar Firebase

// 📍 PUNTO: Quiz con situaciones interactivas 3D (no tradicional)
const quizQuestions = [
  {
    id: 1,
    type: "drag_drop_organs",
    disease: "pneumonia",
    question: "¿Qué órganos se ven afectados por la neumonía?",
    instruction: "Arrastra los órganos afectados al área de infección",
    controls: {
      primary: "🖱️ Click y arrastra los órganos",
      secondary: "🎯 Suelta en la zona roja",
      tip: "💡 Solo los órganos correctos se quedarán en la zona",
    },
    correctOrgans: ["lungs", "bronchi"],
    incorrectOrgans: ["heart", "liver", "kidney"],
    points: 100,
    explanation: "La neumonía afecta principalmente a los pulmones y bronquios, causando inflamación en los alvéolos.",
  },
  {
    id: 2,
    type: "physics_simulation",
    disease: "asthma",
    question: "¿Cómo se comportan las partículas en un ataque de asma?",
    instruction: "Observa cómo las partículas de oxígeno navegan por los bronquios estrechados",
    controls: {
      primary: "👀 Observa la simulación automática",
      secondary: "⏱️ Espera a que lleguen suficientes partículas",
      tip: "💡 En el asma, menos partículas llegan a los alvéolos",
    },
    targetZone: "alveoli",
    obstacles: ["narrowed_bronchi", "mucus"],
    points: 150,
    explanation: "En el asma, los bronquios se estrechan dificultando el paso del aire hacia los alvéolos.",
  },
  {
    id: 3,
    type: "collision_detection",
    disease: "embolia",
    question: "¿Qué sucede cuando un coágulo bloquea una arteria pulmonar?",
    instruction: "Haz click en los coágulos rojos para bloquearlos antes de que escapen",
    controls: {
      primary: "🖱️ Click en los coágulos rojos",
      secondary: "⚡ Reacciona rápido antes de que escapen",
      tip: "💡 Máximo 3 coágulos pueden escapar",
    },
    coagulationSpeed: 2,
    points: 200,
    explanation: "Los coágulos pueden bloquear las arterias pulmonares, impidiendo el flujo sanguíneo normal.",
  },
  {
    id: 4,
    type: "force_application",
    disease: "epoc",
    question: "¿Cómo afecta el EPOC a la capacidad pulmonar?",
    instruction: "Ajusta el deslizador para aplicar la fuerza correcta de respiración",
    controls: {
      primary: "🎚️ Mueve el deslizador",
      secondary: "🎯 Mantén la fuerza en el rango verde",
      tip: "💡 Mantén 3 segundos en el rango correcto",
    },
    forceRange: [0.3, 0.7],
    points: 120,
    explanation: "El EPOC reduce la capacidad pulmonar, requiriendo más esfuerzo para respirar.",
  },
]

const Quiz = () => {
  // 📍 PUNTO: Estados del progreso del quiz
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [feedback, setFeedback] = useState(null)

  // Usuario mock para testing (hasta conectar Firebase)
  const mockUser = {
    uid: "test-user-123",
    displayName: "Usuario de Prueba",
    email: "test@example.com",
    photoURL: "https://via.placeholder.com/40",
  }
  const user = mockUser
  const loading = false

  // 📍 PUNTO: Guardar progreso (comentado hasta conectar MongoDB)
  const saveProgress = async (questionIndex, newScore, newAnswers) => {
    console.log("Progreso guardado localmente:", { questionIndex, newScore, newAnswers })
  }

  // 📍 PUNTO: Retroalimentación (preguntas correctas e incorrectas)
  const handleQuestionComplete = async (isCorrect, earnedPoints, answerData) => {
    const newAnswer = {
      questionId: quizQuestions[currentQuestion].id,
      isCorrect,
      earnedPoints,
      answerData,
      timestamp: new Date(),
    }

    const newAnswers = [...answers, newAnswer]
    const newScore = score + (isCorrect ? earnedPoints : 0)

    setAnswers(newAnswers)
    setScore(newScore)

    // Mostrar feedback
    setFeedback({
      isCorrect,
      earnedPoints,
      correctAnswer: quizQuestions[currentQuestion].correctAnswer,
      explanation: quizQuestions[currentQuestion].explanation,
    })

    // Guardar progreso
    await saveProgress(currentQuestion + 1, newScore, newAnswers)

    // Avanzar a la siguiente pregunta después de 3 segundos
    setTimeout(() => {
      setFeedback(null)
      if (currentQuestion + 1 >= quizQuestions.length) {
        completeQuiz(newScore, newAnswers)
      } else {
        setCurrentQuestion(currentQuestion + 1)
      }
    }, 3000)
  }

  // 📍 PUNTO: Calificación obtenida y guardado final
  const completeQuiz = async (finalScore, finalAnswers) => {
    setQuizCompleted(true)
    console.log("Quiz completado:", { finalScore, finalAnswers })
  }

  const resetQuiz = async () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
    setFeedback(null)
    console.log("Quiz reiniciado")
  }

  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="quiz-spinner"></div>
        <p>Cargando quiz...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="quiz-auth-required">
        <h2>Inicia sesión para acceder al quiz</h2>
        <p>Necesitas una cuenta de Google para guardar tu progreso</p>
      </div>
    )
  }

  return (
    <div className="quiz-container">
      {/* 📍 PUNTO: Progreso del quiz visible */}
      <QuizProgress currentQuestion={currentQuestion} totalQuestions={quizQuestions.length} score={score} user={user} />

      {!quizCompleted && !showLeaderboard && (
        <div className="quiz-game-area quiz-fade-in">
          <div className="quiz-question-header">
            <h2 className="quiz-question-title">{quizQuestions[currentQuestion]?.question}</h2>
            <p className="quiz-instruction">{quizQuestions[currentQuestion]?.instruction}</p>

            {/* 📍 PUNTO: INSTRUCCIONES DE INTERACTIVIDAD */}
            <div className="quiz-controls-info">
              <div className="quiz-controls-title">🎮 Cómo interactuar:</div>
              <div className="quiz-controls-grid">
                <div className="quiz-control-item">
                  <span className="quiz-control-icon">🎯</span>
                  <span>{quizQuestions[currentQuestion]?.controls?.primary}</span>
                </div>
                <div className="quiz-control-item">
                  <span className="quiz-control-icon">⚡</span>
                  <span>{quizQuestions[currentQuestion]?.controls?.secondary}</span>
                </div>
                <div className="quiz-control-item">
                  <span className="quiz-control-icon">💡</span>
                  <span>{quizQuestions[currentQuestion]?.controls?.tip}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 📍 PUNTO: Mundo de físicas con cuerpos rígidos, colisionadores, eventos y fuerzas */}
          <div className="quiz-3d-scene">
            <div className="quiz-interaction-hint">{quizQuestions[currentQuestion]?.controls?.primary}</div>
            <Canvas camera={{ position: [0, 5, 10], fov: 60 }} shadows style={{ width: "100%", height: "100%" }}>
              <color attach="background" args={["#1a1a2e"]} />
              <ambientLight intensity={0.4} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              <pointLight position={[-10, 5, -5]} intensity={0.3} color="#4CAF50" />
              <pointLight position={[10, -5, 5]} intensity={0.3} color="#2196F3" />

              <QuizPhysics question={quizQuestions[currentQuestion]} onQuestionComplete={handleQuestionComplete} />
            </Canvas>
          </div>
        </div>
      )}

      {/* 📍 PUNTO: Retroalimentación visual */}
      {feedback && <QuizFeedback feedback={feedback} onClose={() => setFeedback(null)} />}

      {/* 📍 PUNTO: Calificación obtenida y quiz completado */}
      {quizCompleted && (
        <div className="quiz-completion quiz-fade-in">
          <div className="quiz-final-score">
            <h2>🎉 ¡Quiz Completado!</h2>
            <div className="quiz-score-display">
              <span className="quiz-score-number">{score}</span>
              <span className="quiz-score-total">/ {quizQuestions.reduce((sum, q) => sum + q.points, 0)}</span>
            </div>
            <div className="quiz-stats">
              <div className="quiz-stat">
                <span className="quiz-stat-label">Respuestas correctas:</span>
                <span className="quiz-stat-value">
                  {answers.filter((a) => a.isCorrect).length} / {quizQuestions.length}
                </span>
              </div>
              <div className="quiz-stat">
                <span className="quiz-stat-label">Precisión:</span>
                <span className="quiz-stat-value">
                  {Math.round((answers.filter((a) => a.isCorrect).length / quizQuestions.length) * 100)}%
                </span>
              </div>
              <div className="quiz-stat">
                <span className="quiz-stat-label">Tiempo promedio:</span>
                <span className="quiz-stat-value">45s por pregunta</span>
              </div>
            </div>
            <div className="quiz-completion-actions">
              <button className="quiz-btn quiz-btn-primary" onClick={() => setShowLeaderboard(true)}>
                🏆 Ver Medallero
              </button>
              <button className="quiz-btn quiz-btn-secondary" onClick={resetQuiz}>
                🔄 Reintentar Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📍 PUNTO: Medallero 3D de posiciones generales */}
      {showLeaderboard && (
        <div className="quiz-leaderboard-container">
          <div className="quiz-leaderboard-header">
            <h2>🏆 Medallero de Posiciones</h2>
            <button className="quiz-btn-close" onClick={() => setShowLeaderboard(false)}>
              ✕
            </button>
          </div>
          <div className="quiz-leaderboard-3d">
            <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
              <color attach="background" args={["#0f0f23"]} />
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, 5, -5]} intensity={0.4} color="#FFD700" />
              <pointLight position={[10, -5, 5]} intensity={0.4} color="#C0C0C0" />
              <Leaderboard3D />
            </Canvas>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
