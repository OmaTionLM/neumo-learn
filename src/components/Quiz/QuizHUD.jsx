import { useEffect, useState } from "react"

const QuizHUD = ({ currentQuestion, totalQuestions, title, answers, gameState, isComplete }) => {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let interval
    if (gameState === "playing") {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameState])

  useEffect(() => {
    if (gameState === "playing") {
      setTimer(0)
    }
  }, [currentQuestion])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressPercentage = () => {
    return (answers.length / totalQuestions) * 100
  }

  const getCurrentScore = () => {
    if (answers.length === 0) return 0
    const correct = answers.filter((a) => a.correct).length
    // Calcular el porcentaje basado en el total de preguntas, no solo las respondidas
    return Math.round((correct / totalQuestions) * 100)
  }

  const getScoreColor = () => {
    const score = getCurrentScore()
    if (score >= 75) return "#4ecdc4" // Verde para 75% o más
    if (score >= 50) return "#feca57" // Amarillo para 50-74%
    return "#ff6b6b" // Rojo para menos de 50%
  }

  return (
    <>
      {/* HUD Principal - Solo información de estado */}
      <div className="quiz-hud-main">
        <div className="quiz-hud-stats">
          <div className="quiz-progress-section">
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{
                  width: `${getProgressPercentage()}%`,
                }}
              />
            </div>
            <span className="quiz-progress-text">
              Pregunta {currentQuestion} de {totalQuestions}
            </span>
          </div>

          <div className="quiz-timer-section">⏱️ {formatTime(timer)}</div>

          <div className="quiz-score-section" style={{ color: getScoreColor() }}>
            📊 {getCurrentScore()}%
          </div>
        </div>
      </div>

      {/* Título de la pregunta - Separado y centrado */}
      <div className="quiz-question-header">
        <h2 className="quiz-question-title-text">{title}</h2>
      </div>

      {/* Instrucciones - Posición fija en la parte inferior */}
      <div className="quiz-controls-info">
        <span className="quiz-control-item">🖱️ Clic para interactuar</span>
        <span className="quiz-control-item">🎮 Arrastra para rotar</span>
        <span className="quiz-control-item">🔍 Rueda para zoom</span>
      </div>

      {/* Feedback */}
      {gameState === "feedback" && answers.length > 0 && (
        <div
          className={`quiz-feedback-overlay ${answers[answers.length - 1].correct ? "quiz-correct" : "quiz-incorrect"}`}
        >
          {answers[answers.length - 1].correct ? (
            <div className="quiz-feedback-content">
              <span className="quiz-feedback-icon">✅</span>
              <span>¡Excelente! Respuesta correcta</span>
            </div>
          ) : (
            <div className="quiz-feedback-content">
              <span className="quiz-feedback-icon">❌</span>
              <span>Incorrecto. ¡Sigue intentando!</span>
            </div>
          )}
        </div>
      )}

      {/* Completion */}
      {isComplete && (
        <div className="quiz-completion-overlay">
          <h2>🎉 ¡Quiz Completado!</h2>
          <p style={{ fontSize: "1.5em", margin: "20px 0" }}>
            Puntuación final: <strong style={{ color: getScoreColor() }}>{getCurrentScore()}%</strong>
          </p>
          <p>Guardando resultados y redirigiendo al medallero...</p>
          <div style={{ marginTop: "20px" }}>
            {getCurrentScore() >= 90 && "🥇 ¡Medalla de Oro!"}
            {getCurrentScore() >= 70 && getCurrentScore() < 90 && "🥈 ¡Medalla de Plata!"}
            {getCurrentScore() < 70 && "🥉 ¡Medalla de Bronce!"}
          </div>
        </div>
      )}
    </>
  )
}

export default QuizHUD
