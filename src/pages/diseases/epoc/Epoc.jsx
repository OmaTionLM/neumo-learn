import DiseaseTemplate from "../../../components/DiseaseTemplate/DiseaseTemplate";
import { epoceData } from "../../../data/epocData";

const EPOC = () => {
  return (
    <DiseaseTemplate
      diseaseData={epoceData}
      ModeloPosition={{
        hero: [0, 0, 0],
        causes: [0, 0, 3],
        treatment: [0, 0, 3],
        prevention: [0, 0, 5],
      }}
      ModeloScale={{
        hero: [10, 10, 10],
        causes: [4, 4, 4],
        treatment: [6, 6, 6],
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
        causes: [0, 2, 0],
        treatment: [-1, 2, 0],
        prevention: [-1, 2, 0],
      }}
      Button3DPosition={{
        hero: [0, -1, 0],
        causes: [-0, -1.5, 0],
        treatment: [-0.6, -1.5, 0],
        prevention: [-0.3, -1.4, 0],
      }}
    />
  );
};

export default EPOC;

// import React, { useRef, useState, useEffect } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Environment, OrbitControls } from "@react-three/drei";
// import { LungSickModel } from "./models/ModeloPulmon";
// import { AlveolusModel } from "./models/ModeloAlveolus";
// import { BronchiModel } from "./models/ModeloBronquios";
// import Lights from './components/Lights';
// import "./Epoc.css";

// function CameraControls() {
//   const { camera } = useThree();
//   useEffect(() => {
//     camera.lookAt(0, 0, 0);
//   }, [camera]);
//   return null;
// }

// function RotatingLungModel({ onLungClick, setHovered }) {
//   const ref = useRef();

//   useFrame(() => {
//     if (ref.current) {
//       ref.current.rotation.y += 0.003;
//     }
//   });

//   return (
//     <group
//       ref={ref}
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//       onClick={() => onLungClick()}
//     >
//       <LungSickModel scale={[16, 16, 16]} position={[0, 0, 0]} />
//     </group>
//   );
// }

// const EPOC = () => {
//   const [hovered, setHovered] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);

//   const handleLungClick = () => {
//     setShowMenu(true);
//   };

//   const handleMenuClick = (sectionId) => {
//     document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
//     setShowMenu(false);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setShowMenu(false);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="epoc-section relative">
//       {hovered && <div className="hover-text show">Pulmón — Haz clic para más detalles</div>}

//       <section className="epoc-header">
//         <h1 className="epoc-title">EPOC</h1>
//         <p className="epoc-description">
//           Es una enfermedad respiratoria progresiva que causa obstrucción del flujo de aire en los pulmones. Se asocia principalmente con el tabaquismo y la exposición a contaminantes ambientales. Incluye afecciones como la <strong>bronquitis crónica y el enfisema.</strong>
//         </p>

//         <div className="epoc-model w-full h-[600px] relative">
//           <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }}>
//             <ambientLight intensity={1} />
//             <directionalLight position={[10, 10, 5]} intensity={1} />
//             <Environment preset="sunset" background={false} />
//             <CameraControls />
//             <OrbitControls enableZoom={false} />
//             <RotatingLungModel onLungClick={handleLungClick} setHovered={setHovered} />
//           </Canvas>

//           {/* Menú lateral derecho */}
//           {showMenu && (
//             <div className="menu-panel">
//               <button onClick={() => handleMenuClick("sintomas")}>Síntomas</button>
//               <button onClick={() => handleMenuClick("tratamientos")}>Tratamientos</button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Sección de síntomas */}
//       <section id="sintomasEpoc" className="info-sections">
//         <div className="vertical-title">SÍNTOMAS</div>
//         <ul className="info-list">
//           <li>Dificultad para respirar (disnea), especialmente durante el ejercicio.</li>
//           <li>Tos crónica, persistente y con mucosidad (esputo).</li>
//           <li>Sibilancias (sonidos silbantes al respirar).</li>
//           <li>Opresión en el pecho.</li>
//           <li>Fatiga y sensación de falta de energía.</li>
//           <li>Infecciones respiratorias frecuentes.</li>
//           <li>Cianosis (coloración azulada en labios o uñas).</li>
//           <li>Pérdida de peso involuntaria en etapas avanzadas.</li>
//         </ul>
//       </section>

//       <div id="tratamientosEPOC" className="treatment-section">
//           <div className="treatment-header">
//             <h1>TRATAMIENTO</h1>
//           </div>
//           <div className="treatment-content">
//             <ul>
//               <li>Uso de medicamentos broncodilatadores.</li>
//               <li>Terapias respiratorias personalizadas.</li>
//               <li>Oxigenoterapia en casos avanzados.</li>
//               <li>Programas de rehabilitación pulmonar.</li>
//             </ul>
//           </div>
//       </div>
//      <section className="prevention-section">
//           <h2 className="prevention-title">PREVENCIÓN</h2>
//           <p className="prevention-text">
//             Evitar el consumo de tabaco, minimizar la exposición a contaminantes del aire,
//             realizar ejercicio físico regularmente y seguir controles médicos periódicos son
//             claves para prevenir la EPOC.
//           </p>
//           <div className="video-wrapper">
//             <video controls className="video-player">
//               <source src="/Video/EPOC.mp4" type="video/mp4" />
//               Tu navegador no soporta este formato de video.
//             </video>
//           </div>
//       </section>

//       <section className="visual-section-green">
//       {/* Primer bloque */}
//       <div className="model-row">
//         <div className="text-box">
//           <p>
//             La tráquea y los<br />
//             bronquios permiten<br />
//             el paso del aire<br />
//             hacia los alvéolos.
//           </p>
//         </div>
//         <div className="model-container">
//           <Canvas 
//             camera={{ position: [0, 0, 3], fov: 20 }}  
//             style={{ 
//               background: 'transparent', 
//               width: '100%', 
//               height: '100%' 
//             }}
//           >
//             <Lights />
//             <AlveolusModel scale={[4, 4, 4]} />
//             <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
//           </Canvas>
//         </div>
//       </div>

//       {/* Segundo bloque (invertido) */}
//       <div className="model-row">
//         <div className="model-container">
//           <Canvas  
//             camera={{ position: [0, 0, 3], fov: 20 }}
//             gl={{ preserveDrawingBuffer: true }}
//             style={{ 
//               backgroundColor: 'transparent', 
//               width: '100%', 
//               height: '100%' 
//             }}
//           >
//             <Lights />
//             <ambientLight intensity={1.5} />
//             <directionalLight position={[5, 5, 5]} intensity={1.2} />
//             <Environment preset="city" background={false} />
//             <BronchiModel scale={[2.5, 2.5, 2.5]} />
//             <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
//           </Canvas>
//         </div>
//         <div className="text-box">
//           <p>
//             El intercambio de gases<br />
//             ocurre en los alvéolos,<br />
//             donde el oxígeno entra<br />
//             en la sangre y el dióxido<br />
//             de carbono es eliminado.
//           </p>
//         </div>
//       </div>
//     </section>

//     </div>

//   );
// };

// export default EPOC;

