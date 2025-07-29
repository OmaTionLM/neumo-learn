import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/cannon"
import { Suspense, useState, useRef } from "react"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import PneumoniaScene from "./questions/PneumoniaScene"
import AsthmaScene from "./questions/AsthmaScene"
import COPDScene from "./questions/COPDScene"
import EmbolismScene from "./questions/EmbolismScene"
import QuizHUD from "./QuizHUD"
import { saveQuizResult } from "../../utils/firebaseUtils"
import "./QuizHUD.css"

const QUESTIONS = [
  { id: 1, type: "pneumonia", title: "Neumonía: ¿A qué órganos afecta principalmente?" },
  { id: 2, type: "asthma", title: "Asma: ¿Cuál es el principal tratamiento de emergencia?" },
  { id: 3, type: "copd", title: "EPOC: ¿Cuál es la principal causa de esta enfermedad?" },
  { id: 4, type: "embolism", title: "Embolia Pulmonar: ¿Cuál es el principal factor de riesgo?" },
]

const QuizGame = ({ user, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const [gameState, setGameState] = useState("playing") // 'playing', 'feedback', 'complete'
  const gameRef = useRef()

  const handleAnswer = (isCorrect, timeSpent, attempts) => {
    const newAnswer = {
      questionId: QUESTIONS[currentQuestion].id,
      correct: isCorrect,
      timeSpent,
      attempts,
      timestamp: new Date(),
    }

    const newAnswers = [...answers, newAnswer]
    setAnswers(newAnswers)
    setGameState("feedback")

    // Mostrar feedback por 3 segundos antes de continuar
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setGameState("playing")
      } else {
        finishQuiz(newAnswers)
      }
    }, 3000)
  }

  const finishQuiz = async (finalAnswers) => {
    setIsComplete(true)

    const correctCount = finalAnswers.filter((a) => a.correct).length
    const incorrectCount = finalAnswers.length - correctCount
    const score = (correctCount / finalAnswers.length) * 100

    let medal = "bronce"
    if (score >= 90) medal = "oro"
    else if (score >= 70) medal = "plata"

    const quizResult = {
      userId: user.uid,
      userName: user.displayName,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      score: Math.round(score),
      progress: finalAnswers.map((a) => a.correct),
      medal,
      timestamp: new Date(),
    }

    try {
      await saveQuizResult(quizResult)
      setGameState("complete")
      setTimeout(() => onComplete(), 5000)
    } catch (error) {
      console.error("Error saving quiz result:", error)
    }
  }

  const renderCurrentScene = () => {
    const questionData = QUESTIONS[currentQuestion]
    const commonProps = {
      onAnswer: handleAnswer,
      gameState,
      questionData,
    }

    switch (questionData.type) {
      case "pneumonia":
        return <PneumoniaScene {...commonProps} />
      case "asthma":
        return <AsthmaScene {...commonProps} />
      case "copd":
        return <COPDScene {...commonProps} />
      case "embolism":
        return <EmbolismScene {...commonProps} />
      default:
        return null
    }
  }

  return (
    <div className="quiz-game-container">
      <QuizHUD
        currentQuestion={currentQuestion + 1}
        totalQuestions={QUESTIONS.length}
        title={QUESTIONS[currentQuestion]?.title}
        answers={answers}
        gameState={gameState}
        isComplete={isComplete}
      />

      <div className="quiz-3d-viewport">
        <Canvas
          ref={gameRef}
          camera={{ position: [0, 5, 10], fov: 60 }}
          shadows
          onPointerMissed={() => {
            document.body.style.cursor = "default"
          }}
        >
          <Suspense
            fallback={
              <Html center>
                <div className="quiz-loading">Cargando escena 3D...</div>
              </Html>
            }
          >
            <Environment preset="studio" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />

            <Physics gravity={[0, -9.81, 0]} iterations={15}>
              {renderCurrentScene()}
            </Physics>

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minDistance={5}
              maxDistance={20}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default QuizGame
