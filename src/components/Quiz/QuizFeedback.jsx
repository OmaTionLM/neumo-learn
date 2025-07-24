// 📍 PUNTO: Retroalimentación (preguntas correctas e incorrectas)
const QuizFeedback = ({ feedback, onClose }) => {
  if (!feedback) return null

  return (
    <div className="quiz-feedback-overlay">
      <div className={`quiz-feedback-modal ${feedback.isCorrect ? 'quiz-correct' : 'quiz-incorrect'}`}>
        <div className="quiz-feedback-icon">
          {feedback.isCorrect ? '✅' : '❌'}
        </div>
        
        <h3 className="quiz-feedback-title">
          {feedback.isCorrect ? '¡Correcto!' : 'Incorrecto'}
        </h3>
        
        <div className="quiz-feedback-points">
          {feedback.isCorrect ? `+${feedback.earnedPoints} puntos` : '0 puntos'}
        </div>
        
        {feedback.explanation && (
          <div className="quiz-feedback-explanation">
            <h4>Explicación:</h4>
            <p>{feedback.explanation}</p>
          </div>
        )}
        
        <div className="quiz-feedback-progress">
          <div className="quiz-feedback-progress-bar"></div>
        </div>
      </div>
    </div>
  )
}

export default QuizFeedback
