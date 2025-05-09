import React from "react";
import "./about-us.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
        <h1>¿Quiénes somos?</h1>
      <div className="texto-container-about-us">
        <p>
          El equipo de trabajo está integrado por cuatro estudiantes del <br/> programa
          académico Tecnología en Desarrollo de Software de La Facultad de
          Ingeniería<br/> de la Universidad del Valle, ubicada en Santiago de Cali.
        </p>
        <br />
        <p>
          Desarrollamos Neumo Learn, un proyecto educativo de desarrollo web,
          como parte <br/> de la asignatura Proyecto Integrador en el primer semestre
          del año 2025.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
