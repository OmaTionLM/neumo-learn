// src/models/VistaSintomasSimple.jsx
import { useState, useRef, useEffect } from "react";
import { Html, ContactShadows, Text3D, Float } from "@react-three/drei";
import ModeloOBJ from "../personaEmbolia/PersonaEmbolia";

const PalabraRaspable = ({ palabra, position, onRevelada, reiniciar }) => {
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
    <Html position={position} center style={{ pointerEvents: "auto" }}>
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
            transition: "opacity 0.5s ease-in-out",
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: "40px",
            userSelect: "none",
            zIndex: 1,
          }}
        >
          {palabra}
        </div>
      </div>
    </Html>
  );
};

const ModeloConRotacion = () => {
  const ref = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.rotation.y += 0.01;
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return <ModeloOBJ ref={ref} scale={[0.7, 0.7, 0.7]} position={[0, 0, 0]} />;
};

const VistaSintomasSimple = () => {
  const [palabrasReveladas, setPalabrasReveladas] = useState(0);
  const [mostrarTitulo, setMostrarTitulo] = useState(false);
  const [reiniciar, setReiniciar] = useState(false);

  const palabras = [
    { palabra: "Dolor", pos: [-1.5, 1.5, 0] },
    { palabra: "Fiebre", pos: [1.5, 1.5, 0] },
    { palabra: "Tos", pos: [-1.5, -1.5, 0] },
    { palabra: "Palpitación", pos: [1.5, -1.5, 0] },
    { palabra: "Mareos", pos: [0, -2, 0] },
  ];

  useEffect(() => {
    if (palabrasReveladas === palabras.length) {
      setMostrarTitulo(true);
      setTimeout(() => {
        setMostrarTitulo(false);
        setPalabrasReveladas(0);
        setReiniciar((r) => !r);
      }, 10000);
    }
  }, [palabrasReveladas]);

  return (
    <>
      <ModeloConRotacion />

      {palabras.map((item, i) => (
        <PalabraRaspable
          key={i}
          palabra={item.palabra}
          position={item.pos}
          onRevelada={() => setPalabrasReveladas((prev) => prev + 1)}
          reiniciar={reiniciar}
        />
      ))}

      {mostrarTitulo && (
        <Float speed={1} rotationIntensity={1} floatIntensity={1}>
          <Text3D
            position={[-2, 0, 1]}
            font="/fonts/Roboto_Regular.typeface.json"
            size={0.5}
            height={0.1}
          >
            ¡Lo lograste!
            <meshStandardMaterial color="gold" />
          </Text3D>
        </Float>
      )}

      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.35}
        scale={10}
        blur={2.5}
        far={2.5}
      />
    </>
  );
};

export default VistaSintomasSimple;


