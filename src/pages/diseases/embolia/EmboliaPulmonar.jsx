import React, { useState, useEffect } from "react";
import ModeloVascular from "./models-3d/vascular/ModeloVascular";
import VistaDetalle from "./models-3d/seccion-1/ModeloSeccion1";
import "./EmboliaPulmonar.css";

const EmboliaPulmonar = () => {
  const [iniciarTransicion, setIniciarTransicion] = useState(false);
  const [mostrarFlecha, setMostrarFlecha] = useState(false);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const manejarInteraccion = (tipo) => {
    if (tipo === "start") {
      setIniciarTransicion(true);
    }
  };

  useEffect(() => {
    if (iniciarTransicion) {
      const timer = setTimeout(() => {
        setMostrarFlecha(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [iniciarTransicion]);

  const manejarScroll = () => {
     setMostrarDetalle(true);
  };

  const volverVistaInicial = () => {
    setMostrarDetalle(false); 
    setIniciarTransicion(false);
    setMostrarFlecha(false);
  };

  return (
    <div className={`embol-container ${iniciarTransicion ? "activo" : ""}`}>
       <h1 className="titulo-enfermedad">EMBOLIA PULMONAR</h1>
       <p className="frase-impacto">
          "Cuando el aire no llega, el cuerpo lo grita en silencio"
       </p>
          {!mostrarDetalle ? (
            <>
              <ModeloVascular
                play={iniciarTransicion}
                onFinish={manejarInteraccion}
              />

              {mostrarFlecha && (
                <button className="flecha-siguiente" onClick={manejarScroll}>
                  →
                </button>
              )}
            </>
          ) : (
            <VistaDetalle volver={volverVistaInicial} />
          )}
        </div>
      );
    };

export default EmboliaPulmonar;


