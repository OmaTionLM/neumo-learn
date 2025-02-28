import { NavLink } from "react-router";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav>
        <NavLink to="/" end>
          <span className="inicio">Inicio</span>
        </NavLink>

        <NavLink to="/quiz">
          <span className="quiz">Quiz</span>
        </NavLink>
      </nav>
    </header>
  );
}
  
export default Header;
  