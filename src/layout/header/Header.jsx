import { NavLink } from "react-router";
import "./Header.css";
import useAuthStore from "../../stores/use-auth-store";
import Pulmon3DLogo from "../../components/Pulmon3DLogo"

const Header = () => {
  const { logout } = useAuthStore();
  return (
    <header>
      <nav>
        <div className="pulmon-icon">
          <Pulmon3DLogo />
        </div>
        <div className="header-left">
          <NavLink to="/perfil" end>
            Sistema respiratorio
          </NavLink>
          <NavLink to="/diseases" end>
            Enfermedades de los pulmones
          </NavLink>
          <NavLink to="/explore_en_3D" end>
            Explora en 3D
          </NavLink>
          <NavLink to="/quiz" end>
            Quiz
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
