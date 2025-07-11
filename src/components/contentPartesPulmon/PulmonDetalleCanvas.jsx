import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import "./PulmonDetalleCanvas.css";

const PulmonModel = ({ scale }) => {
  const { scene } = useGLTF("/models-3d/home/partesPulmon.glb");
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.y = scale + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    }
  });

  return <primitive object={scene} ref={ref} scale={[scale, scale, scale]} />;
};

const parts = [
  {
    name: "Laringe",
    description: "Órgano que permite el paso del aire y produce la voz.",
    style: { top: "20%", left: "48%" },
  },
  {
    name: "Tráquea",
    description: "Conducto que lleva el aire desde la laringe hasta los pulmones.",
    style: { top: "35%", left: "48%" },
  },
  {
    name: "Ápice",
    description: "Parte superior del pulmón, ubicada cerca de la clavícula.",
    style: { top: "46%", left: "44%" },
  },
  {
    name: "Lóbulo superior",
    description: "Zona superior de cada pulmón, encargada del intercambio de gases.",
    style: { top: "58%", left: "60%" },
  },
  {
    name: "Lóbulo medio",
    description: "Solo en el pulmón derecho, ayuda en la respiración.",
    style: { top: "70%", left: "40%" },
  },
  {
    name: "Lóbulo inferior",
    description: "Parte más baja de los pulmones, fundamental para la oxigenación.",
    style: { top: "85%", left: "40%" },
  },
  {
    name: "Base",
    description: "Parte inferior que reposa sobre el diafragma.",
    style: { top: "95%", left: "40%" },
  },
  {
    name: "Escotadura cardíaca",
    description: "Curvatura en el pulmón izquierdo donde encaja el corazón.",
    style: { top: "70%", left: "53%" },
  },
  {
    name: "Bronquios",
    description: "Tubos principales que llevan aire a cada pulmón.",
    style: { top: "42%", left: "35%" },
  },
  {
    name: "Bronquiolos",
    description: "Pequeños conductos que conectan los bronquios con los alvéolos.",
    style: { top: "50%", left: "30%" },
  },
];

const PulmonDetalleCanvas = () => {
  const [scale, setScale] = useState(2.3);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.pitch = 1;
    utterance.rate = 0.95;
    synth.cancel();
    synth.speak(utterance);
  };

  return (
    <div className="pulmon-detalle-wrapper">
      <div className="pulmon-detalle-canvas">
        <Canvas shadows camera={{ position: [0, 0, 3.5] }} style={{ background: '#008080' }}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[0, 5, 5]}
            angle={0.35}
            penumbra={0.5}
            intensity={6}
            castShadow
          />
          <PulmonModel scale={scale} />
        </Canvas>

        {/* Etiquetas 2D */}
        {parts.map((part, idx) => (
          <div key={idx} className="tag"  style={part.style}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {part.name}
            {hoveredIndex === idx && (
              <div className="tooltip">
                {part.description}
                <button
                  onClick={() => speak(part.description)}
                  className="audio-button"
                >🔊</button>
              </div>
            )}
          </div>
        ))}
        <div className="info-box">
          <span role="img" aria-label="tip">💡</span>
          <strong> Tip:</strong> Para más información sobre las partes, pasa el mouse por encima de los nombres.
        </div>
      </div>
    </div>
  );
};

export default PulmonDetalleCanvas;

