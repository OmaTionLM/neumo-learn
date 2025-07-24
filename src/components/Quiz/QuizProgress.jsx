// 📍 PUNTO: Progreso del quiz visible
const QuizProgress = ({ currentQuestion, totalQuestions, score, user }) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100

  return (
    <div className="quiz-progress-container">
      <div className="quiz-user-info">
        <img 
          src={user?.photoURL || 'https://via.placeholder.com/40'} 
          alt="User Avatar" 
          className="quiz-user-avatar"
        />
        <span className="quiz-user-name">{user?.displayName || 'Usuario'}</span>
      </div>
      
      <div className="quiz-progress-bar">
        <div className="quiz-progress-track">
          <div 
            className="quiz-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="quiz-progress-text">
          Pregunta {currentQuestion + 1} de {totalQuestions}
        </span>
      </div>
      
      <div className="quiz-score-display">
        <span className="quiz-score-label">Puntuación:</span>
        <span className="quiz-score-value">{score}</span>
      </div>
    </div>
  )
}

export default QuizProgress
