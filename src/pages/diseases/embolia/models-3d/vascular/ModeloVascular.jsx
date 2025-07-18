import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stars } from "@react-three/drei";
import "./VascularDiseno.css";

const ModeloMesh = ({ play, pausado, onPrimerGiro }) => {
  const { scene } = useGLTF("/models-3d/emboliaPulmonar/vascular.glb");
  const ref = useRef();
  const [giroDetectado, setGiroDetectado] = useState(false);

  useFrame(() => {
    if (ref.current && play && !pausado) {
      ref.current.rotation.y += 0.01;

      if (!giroDetectado && ref.current.rotation.y > 0.5) {
        setGiroDetectado(true);
        onPrimerGiro();
      }
    }
  });

  return <primitive object={scene} ref={ref} scale={[2, 2, 2]} />;
};

const ModeloVascular = ({ play, onFinish }) => {
  const [fondoAguaMarina, setFondoAguaMarina] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#010b1f");
  const [colorIndicador, setColorIndicador] = useState("#ffffff");

  // Cambiar fondo después del primer giro
  useEffect(() => {
    if (play) {
      const transition = setTimeout(() => {
        setBackgroundColor("#001f3f");
      }, 3000);
      return () => clearTimeout(transition);
    }
  }, [play]);

  useEffect(() => {
     const manejarTecla = (e) => {
       if (e.code === "Space" && play) {
         setPausado((prev) => !prev);
       }
     };

     window.addEventListener("keydown", manejarTecla);
      return () => window.removeEventListener("keydown", manejarTecla);
   }, [play]);

  return (
    <div className="vascular-model-container">

      {play && (
        <div className="espacio-indicador">
          Presiona <strong>ESPACIO</strong> para {pausado ? "reanudar" : "pausar"}
        </div>
      )}

      <Canvas camera={{ position: [0, 0, 3.5] }} shadows>
        <color attach="background" args={[backgroundColor]} />
        <Stars
          radius={100}
          depth={50}
          count={500}
          factor={4}
          saturation={0}
          fade
        />
        <ambientLight intensity={0.7} />
        <directionalLight
            position={[2, 2, 2]}
            intensity={1}
            castShadow
            color={"#ffffff"}
         />
        <spotLight
          position={[0, 3, 5]}
          angle={0.4}
          penumbra={0.5}
          intensity={2}
          color="#00ffff"
          castShadow
        />
        <ModeloMesh
          play={play}
          pausado={pausado}
          onPrimerGiro={() => setFondoAguaMarina(true)}
        />
      </Canvas>

      {!play && (
        <button className="play-button" onClick={() => onFinish("start")}>
          ▶
        </button>
      )}
    </div>
  );
};

export default ModeloVascular;
export { ModeloMesh };
