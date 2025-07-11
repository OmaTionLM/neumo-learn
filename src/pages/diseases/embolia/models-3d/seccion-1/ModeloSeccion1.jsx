import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls, Center } from "@react-three/drei";
import FondoHospital from "./FondoHospital";
import "./DisenoSeccion1.css";

const ModeloEstatico = () => {
  const { scene } = useGLTF("/models-3d/emboliaPulmonar/vascular.glb");
  return <primitive object={scene} scale={[2.5, 2.5, 2.5]} position={[1.5, 0, 0]} />;
};

const Etiqueta = ({ position, texto, descripcion, audio }) => {
  const ref = useRef();
  const { camera, size } = useThree();
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ left: 0, top: 0 });

  useFrame(() => {
    const vector = new THREE.Vector3(...position);
    vector.project(camera);
    const x = (vector.x * 0.5 + 0.5) * size.width;
    const y = (1 - (vector.y * 0.5 + 0.5)) * size.height;
    setCoords({ left: x, top: y });
  });

  const reproducirAudio = () => {
    const speech = new SpeechSynthesisUtterance(descripcion);
    speech.lang = "es-ES";
    window.speechSynthesis.speak(speech);
  };

  return (
    <Html position={position}>
      <div
        className="etiqueta-modelo"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <span className="etiqueta-texto">{texto}</span>
        {visible && (
          <div className="tooltip-etiqueta">
            {descripcion}
            <button onClick={reproducirAudio} className="icono-audio">🎧 Escuchar</button>
          </div>
         )}
      </div>
    </Html>
  );
};
const VistaDetalle = ({ volver, avanzar }) => {
  const [seccion, setSeccion] = useState("queEs");

  const toggleSeccion = (nombre) => {
    setSeccion(seccion === nombre ? "" : nombre);
  };

  const etiquetas = [
    {
      position: [0, 1.0, 0],
      texto: "Tronco Pulmonar",
      descripcion: "Conduce la sangre del corazón hacia los pulmones."
    },
    {
      position: [-0.3, -0.2, 0],
      texto: "Arteria Izquierda",
      descripcion: "Transporta sangre al pulmón izquierdo."
    },
    {
      position: [0, -2.0, 0.2],
      texto: "Coágulo",
      descripcion: "Obstrucción representada en la arteria."
    }
  ];

  return (
    <div className="detalle-container">
      <div className="menu-vertical">
        <button
          className={`menu-btn ${seccion === "queEs" ? "activo" : ""}`}
          onClick={() => setSeccion(seccion === "queEs" ? "" : "queEs")}
        >
          ¿Qué es?
        </button>
        {seccion === "queEs" && (
          <div className="descripcion">
            La embolia pulmonar es una condición grave que ocurre cuando una arteria en los pulmones se bloquea. Esta obstrucción generalmente es causada por coágulos sanguíneos que se desplazan desde otras partes del cuerpo (especialmente las piernas).

            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
              <li>Dificulta el paso de oxígeno a la sangre.</li>
              <li>Puede provocar daños en los pulmones o el corazón.</li>
              <li>Es potencialmente mortal si no se trata a tiempo.</li>
            </ul>
          </div>
        )}

        <button
          className={`menu-btn ${seccion === "causaEfecto" ? "activo" : ""}`}
          onClick={() => setSeccion(seccion === "causaEfecto" ? "" : "causaEfecto")}
        >
          Causa y efecto
        </button>
        {seccion === "causaEfecto" && (
          <div className="descripcion">
            Las causas y efectos más comunes de la embolia pulmonar incluyen:

            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
              <li><strong>Causas:</strong> Trombosis venosa profunda, sedentarismo prolongado, cirugía reciente, antecedentes familiares.</li>
              <li><strong>Efectos:</strong> Dolor en el pecho, dificultad para respirar, tos con sangre, mareo o colapso repentino.</li>
            </ul>
          </div>
        )}

      </div>

     <div className="contenido-detalle">
        <Canvas camera={{ position: [0, 0, 4] }} shadows style={{ width: "100%", height: "100%", borderRadius: "1rem" }}>
          <ambientLight intensity={0.4} color="#ffffff" />
          <directionalLight
              position={[0, 0, 5]}
              intensity={1.1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              color="#ffffff"
            />
           <spotLight
              position={[0, 10, 0]}
              angle={0.5}
              penumbra={0.3}
              intensity={0.6}
              castShadow
            />
          <FondoHospital />
         <Center>
            <ModeloEstatico />
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, -0.2]}>
              <planeGeometry args={[20, 20]} />
              <shadowMaterial opacity={0.15} />
            </mesh>
            {etiquetas.map((etq, index) => (
              <Etiqueta
                key={index}
                position={etq.position}
                texto={etq.texto}
                descripcion={etq.descripcion}
              />
             ))}
          </Center>

         <OrbitControls
            enableZoom={true}
            enableRotate={false}
            enablePan={false}
            zoomSpeed={0.8}
          />
        </Canvas>

        {/* Flechas debajo del Canvas */}
        <div className="navegacion-flechas">
          <button className="flecha-siguiente" onClick={volver}>←</button>
          <button className="flecha-siguiente" onClick={avanzar}>→</button>
        </div>
      </div>
    </div>
  );
};

export default VistaDetalle;


