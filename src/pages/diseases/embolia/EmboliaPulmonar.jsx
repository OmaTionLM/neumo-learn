import DiseaseTemplate from "../../../components/DiseaseTemplate/DiseaseTemplate"
import { emboliaData } from "../../../data/emboliaData"

const EmboliaPulmonarPage = () => {
  return <DiseaseTemplate
    diseaseData={emboliaData}
    ModeloPosition={{
      hero: [0, 0, 0],
      causes: [0, 0, 0],
      treatment: [0, 0, 0],
      prevention: [0, 0, 0],
    }}
    ModeloScale={{
      hero: [1, 1, 1],
      causes: [1, 1, 1],
      treatment: [1, 1, 1],
      prevention: [1, 1, 1],
    }}
    ModeloRotation={{
      hero: [0, 0, 0],
      causes: [0, 0, 0],
      treatment: [0, 0, 0],
      prevention: [0, 0, 0],
    }}
    title3DPositions={{
      hero: [-0.5, 2, -1],
      causes: [2.5, 2, 0],
      treatment: [2.5, 2, 0.5],
      prevention: [3, 1, -2]
    }}
    Button3DPosition={{
      hero: [-1, -1, 0],
      causes: [-0.55, -1.5, 0],
      treatment: [-0.6, -1.5, 0],
      prevention: [-1, -1.4, 0]
    }}
  />
}

export default EmboliaPulmonarPage;

// import React, { useState, useEffect } from "react";
// import ModeloVascular from "./models-3d/vascular/ModeloVascular";
// import VistaDetalle from "./models-3d/seccion-1/ModeloSeccion1";
// import VistaSintomas from "./models-3d/seccion-2/ModeloSeccion2";
// import "./EmboliaPulmonar.css";

// const EmboliaPulmonar = () => {
//   const [iniciarTransicion, setIniciarTransicion] = useState(false);
//   const [mostrarFlecha, setMostrarFlecha] = useState(false);
//   const [seccionActual, setSeccionActual] = useState("inicio");

//   const manejarInteraccion = (tipo) => {
//     if (tipo === "start") {
//       setIniciarTransicion(true);
//     }
//   };

//   useEffect(() => {
//     if (iniciarTransicion) {
//       const timer = setTimeout(() => {
//         setMostrarFlecha(true);
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [iniciarTransicion]);

//   const manejarScroll = () => {
//        setSeccionActual("seccion1");
//     };

//   const volverVistaInicial = () => {
//       setSeccionActual("inicio");
//       setIniciarTransicion(false);
//       setMostrarFlecha(false);
//     };

//   return (
//     <div className={`embol-container ${iniciarTransicion ? "activo" : ""}`}>
//        <h1 className="titulo-enfermedad">EMBOLIA PULMONAR</h1>
//        <p className="frase-impacto">
//           "Cuando el aire no llega, el cuerpo lo grita en silencio"
//        </p>
//            {seccionActual === "inicio" && (
//               <>
//                 <ModeloVascular play={iniciarTransicion} onFinish={manejarInteraccion} />
//                 {mostrarFlecha && (
//                   <button className="flecha-siguiente" onClick={() => setSeccionActual("seccion1")}>
//                     →
//                   </button>
//                 )}
//               </>
//             )}

//             {seccionActual === "seccion1" && (
//               <VistaDetalle
//                 volver={() => setSeccionActual("inicio")}
//                 avanzar={() => setSeccionActual("seccion2")}
//               />
//             )}

//             {seccionActual === "seccion2" && (
//               <VistaSintomas
//                 volver={() => setSeccionActual("seccion1")}
//                 avanzar={() => setSeccionActual("seccion3")} // Futuro
//               />
//             )}
//          </div>
//       );
//     };

// export default EmboliaPulmonar;


