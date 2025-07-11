import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Center, Html, Environment, ContactShadows, Text3D, Float } from "@react-three/drei";
import ModeloOBJ from "../personaEmbolia/PersonaEmbolia";
import "../seccion-1/DisenoSeccion1.css";
import * as THREE from "three";

const PalabraRaspable = ({ palabra, position, onRevelada, reiniciar}) => {
  const [revelada, setRevelada] = useState(false);
  const coverRef = useRef();

  useEffect(() => {
    setRevelada(false);
    if (coverRef.current) {
      coverRef.current.style.opacity = 1;
    }
  }, [reiniciar]);

  useEffect(() => {
    if (revelada && coverRef.current) {
      coverRef.current.style.opacity = 0;
    }
  }, [revelada]);

  return (
    <Html position={position} center style={{ pointerEvents: 'auto' }}>
      <div style={{ position: "relative", width: 100, height: 40 }}>
        <div
          ref={coverRef}
          onMouseEnter={() => {
            if (!revelada) {
              setRevelada(true);
              onRevelada();
            }
          }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "gray",
            borderRadius: 5,
            zIndex: 2,
            transition: "opacity 0.5s ease-in-out"
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: "40px",
            userSelect: "none",
            zIndex: 1
          }}
        >
          {palabra}
        </div>
      </div>
    </Html>
  );
};

const VistaSintomas = ({ volver, avanzar }) => {
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [palabrasReveladas, setPalabrasReveladas] = useState(0);
  const [mostrarTitulo, setMostrarTitulo] = useState(false);
  const [reiniciar, setReiniciar] = useState(false);
      
  const palabras = [
    { palabra: "Dolor", pos: [-1.2, 1, 0] },
    { palabra: "Fiebre", pos: [1.2, 1, 0] },
    { palabra: "Tos", pos: [-1.2, -1, 0] },
    { palabra: "Palpitación", pos: [1.2, -1, 0] },
    { palabra: "Mareos", pos: [0, -1.5, 0] },
  ];

  useEffect(() => {
    if (palabrasReveladas === palabras.length) {
      setMostrarTitulo(true);
      setTimeout(() => {
        setMostrarTitulo(false);
        setPalabrasReveladas(0);
        setReiniciar((r) => !r);
      }, 15000);
    }
  }, [palabrasReveladas]);


    return (
        <div className="detalle-container">
          
          <div className="menu-vertical">
            <button
              className={`menu-btn ${mostrarDescripcion ? "activo" : ""}`}
              onClick={() => setMostrarDescripcion(!mostrarDescripcion)}
            >
              ¿Cuáles son sus síntomas?
            </button>

            {mostrarDescripcion && (
              <div className="descripcion">
                <p>
                  Los síntomas de la embolia pulmonar pueden variar mucho según el tamaño de los coágulos, 
                  la parte del pulmón afectada y si existen enfermedades cardíacas o pulmonares previas.
                </p>

                <p><strong>Síntomas comunes:</strong></p>
                <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                  <li>Falta de aire repentina, incluso en reposo.</li>
                  <li>Dolor en el pecho que se agrava al respirar, toser o inclinarse.</li>
                  <li>Desmayos por baja presión arterial o frecuencia cardíaca.</li>
                </ul>

                <p><strong>Otros síntomas posibles:</strong></p>
                <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                  <li>Tos con sangre o mucosidad con vetas de sangre.</li>
                  <li>Palpitaciones o ritmo cardíaco irregular.</li>
                  <li>Mareos, debilidad o sensación de desvanecimiento.</li>
                  <li>Sudoración excesiva (hiperhidrosis).</li>
                  <li>Fiebre.</li>
                  <li>Dolor o hinchazón en una pierna, sobre todo detrás de la pantorrilla.</li>
                  <li>Piel húmeda o de color azulado (cianosis).</li>
                </ul>
              </div>
            )}
          </div>

          {/* Canvas con modelo 3D */}
          <div className="contenido-detalle">
            <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }} style={{ width: "100%", height: "100%", borderRadius: "1rem" }}>
              {/* Fondo tipo parque 360º */}
              <Environment preset="sunset" background blur={0} />

              <ambientLight intensity={0.3} />
              <directionalLight position={[3, 5, 2]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

              <Center>
                <ModeloOBJ position={[0, 0, 0]} scale={[0.7, 0.7, 0.7]} />
              </Center>

             {palabras.map((item, i) => (
                <PalabraRaspable
                  key={i}
                  palabra={item.palabra}
                  position={item.pos}
                  onRevelada={() => setPalabrasReveladas((prev) => prev + 1)}
                  reiniciar={reiniciar}
                />
              ))}

              {/* Texto 3D central al completar */}
              {mostrarTitulo && (
                <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                  <Text3D
                    position={[-1.5, 0, 1]}
                    font="/fonts/Roboto_Regular.typeface.json"
                    size={0.4}
                    height={0.1}
                  >
                    Lo lograste!!! 
                    <meshStandardMaterial color="gold" />
                  </Text3D>
                </Float>
              )}

              {/* Sombra proyectada debajo */}
              <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2.5} far={1.5}/>

              <OrbitControls enableZoom={true} enableRotate={true} enablePan={false} />
            </Canvas>

            <p style={{ textAlign: "center", marginTop: "0.5rem", fontWeight: "bold", color: "white" }}>
                Raspa y gana
            </p>

            {/* Flechas de navegación */}
            <div className="navegacion-flechas">
              <button className="flecha-siguiente" onClick={volver}>←</button>
              <button className="flecha-siguiente" onClick={avanzar}>→</button>
            </div>
          </div>
        </div>
      );
};

export default VistaSintomas;


