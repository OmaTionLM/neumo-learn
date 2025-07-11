import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import pulmonSound from "../../assets/sound/latido.wav";
import "./Pulmon3DExplora.css";

function PulmonModel({ play }) {
  const gltf = useGLTF("/models-3d/home/logo.glb", true);
  const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

  useFrame((state) => {
    if (play && scene) {
      // Latido: escalar hacia arriba y abajo
      const scale = 2 + 0.05 * Math.sin(state.clock.elapsedTime * 2);
      scene.rotation.y += 0.005; // Rotación horizontal
      scene.scale.set(scale, scale, scale);
    }
  });

  return <primitive object={scene} scale={2.5}/>;
}

const Pulmon3DExplora = () => {
  const [play, setPlay] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        setPlay((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [play]);

  return (
    <div className="pulmon-explora-container">
      {!play && (
        <button className="play-button" onClick={() => setPlay(true)}>
          ▶
        </button>
      )}

      <audio ref={audioRef} loop volume={1.0} src={pulmonSound} />

      <Canvas shadows camera={{ position: [0, 0, 3.5] }} style={{ width: "100%", height: "100%" }}>
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[0, 5, 5]}
          angle={0.35}
          penumbra={0.7}
          intensity={6}
          color="#ffffff"
          castShadow
        />
        <directionalLight
          position={[0, 2, 2]}
          intensity={0.8}
          color="#ffffff"
        />
        <PulmonModel play={play} />
      </Canvas>
       
      {play && (
         <div className="pause-hint">
            Presiona <strong>espacio</strong> para pausar la animación y el sonido.
         </div>
      )}
    </div>
  );
};

export default Pulmon3DExplora;

