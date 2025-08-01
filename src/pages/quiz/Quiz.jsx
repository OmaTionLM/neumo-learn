import "./Quiz.css"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../firebase.config"
import { signInWithGoogle, logout } from "../../Auth/googleAuth"
import QuizGame from "../../components/Quiz/QuizGame"
import Leaderboard from "../../components/Quiz/Leaderboard"

const Quiz = () => {
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState("menu") // 'menu', 'quiz', 'leaderboard'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="quiz-loading-container">
        <h2>Cargando...</h2>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="quiz-login">
        {/* Partículas flotantes */}
        <div className="quiz-login-particles">
          <div className="quiz-login-particle"></div>
          <div className="quiz-login-particle"></div>
          <div className="quiz-login-particle"></div>
          <div className="quiz-login-particle"></div>
        </div>

        <div className="quiz-login-container">
          <div className="quiz-login-icon">🫁</div>
          <h2>Quiz Respiratorio 3D</h2>
          <p className="quiz-login-subtitle">Explora el sistema respiratorio de forma interactiva</p>

          <button onClick={signInWithGoogle}>
            <span className="quiz-google-icon">🔐</span>
            Iniciar sesión con Google
          </button>

          <div className="quiz-login-info">
            <h3>¿Qué encontrarás?</h3>
            <div className="quiz-login-features">
              <div className="quiz-login-feature">
                <div className="quiz-login-feature-icon">🎮</div>
                <div className="quiz-login-feature-text">Experiencia 3D Interactiva</div>
              </div>
              <div className="quiz-login-feature">
                <div className="quiz-login-feature-icon">🧠</div>
                <div className="quiz-login-feature-text">Aprendizaje Educativo</div>
              </div>
              <div className="quiz-login-feature">
                <div className="quiz-login-feature-icon">🏆</div>
                <div className="quiz-login-feature-text">Sistema de Medallero</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "quiz":
        return <QuizGame user={user} onComplete={() => setCurrentView("leaderboard")} />
      case "leaderboard":
        return <Leaderboard onBack={() => setCurrentView("menu")} />
      default:
        return (
          <div className="quiz-menu">
            <h2>Bienvenido, {user.displayName}</h2>
            <div className="quiz-menu-buttons">
              <button className="quiz-menu-btn quiz-start-btn" onClick={() => setCurrentView("quiz")}>
                🫁 Comenzar Quiz Respiratorio 3D
              </button>
              <button className="quiz-menu-btn quiz-leaderboard-btn" onClick={() => setCurrentView("leaderboard")}>
                🏆 Ver Medallero
              </button>
              <button className="quiz-menu-btn quiz-logout-btn" onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        )
    }
  }

  return <div className="quiz-page">{renderCurrentView()}</div>
}

export default Quiz
