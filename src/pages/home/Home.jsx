import "./Home.css";
import logo from "../../assets/images/logo.jpg";

function Home() {
  return (
    <div className="container">
      <img src={logo} alt="Logo de la empresa" className="logo" />
      <p className="subtitle">
        🌿 Bienvenido a Neumo Learn 🫁💙
      </p>

      <p>
        Aquí encontrarás información confiable y accesible sobre las enfermedades que afectan al pulmón. Nuestro objetivo es ayudarte a comprender mejor estas condiciones, sus síntomas y opciones de tratamiento, para que puedas cuidar tu salud respiratoria o la de tus seres queridos.

        Porque respirar es vivir, y conocer más sobre nuestra salud pulmonar es el primer paso hacia una mejor calidad de vida. 🌬️✨
      </p>
    </div>
  );
}

export default Home;
