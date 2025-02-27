import "./App.css";
import logo from "./assets/images/logo.png";

function App() {
  return (
    <div className="container">
      <img src={logo} alt="Logo de la empresa" className="logo" />
      <h1>Nombre de la Empresa</h1>
      <p className="subtitle">¡Próximamente!</p>
    </div>
  );
}

export default App;
