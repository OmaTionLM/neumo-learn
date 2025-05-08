import { NavLink } from "react-router";
import "./Header.css";
import useAuthStore from "../../stores/use-auth-store";

const Header = () => {
  const { logout } = useAuthStore();
  return (
    <header>
      <nav>
        <div className="header-left">
          <NavLink to="/" end>
            Inicio
          </NavLink>
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
        <div className="/header-right">
          <NavLink to="/" onClick={logout} end>
          Salir
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;