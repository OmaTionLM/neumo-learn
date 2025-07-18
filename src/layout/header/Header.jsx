import { NavLink } from "react-router"
import "./Header.css"
import useAuthStore from "../../stores/use-auth-store"
import Pulmon3DLogo from "../../components/Pulmon3DLogo"

const Header = () => {
  const { logout } = useAuthStore()

  return (
    <header className="header-container">
      <nav className="header-nav">
        <div className="header-pulmon-icon">
          <div className="header-logo-wrapper">
            <Pulmon3DLogo />
          </div>
        </div>
        <div className="header-left">
          <NavLink to="/perfil" end className="header-nav-link">
            <span className="header-link-text">Sistema respiratorio</span>
            <div className="header-link-underline"></div>
          </NavLink>
          <NavLink to="/diseases" end className="header-nav-link">
            <span className="header-link-text">Enfermedades de los pulmones</span>
            <div className="header-link-underline"></div>
          </NavLink>
          <NavLink to="/explore_en_3D" end className="header-nav-link">
            <span className="header-link-text">Explora en 3D</span>
            <div className="header-link-underline"></div>
          </NavLink>
          <NavLink to="/quiz" end className="header-nav-link">
            <span className="header-link-text">Quiz</span>
            <div className="header-link-underline"></div>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header
