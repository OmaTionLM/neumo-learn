import React, { useRef, useEffect, useState } from "react";
import {
  useGLTF,
  PerspectiveCamera,
  Environment,
  Html,
  OrbitControls,
  Text,
  Float,
  Stars,
  Sparkles,
  Shadow,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function BronchiModel(props) {
  const group = useRef();
  const cameraRef = useRef();
  const { scene } = useThree();
  const [bronchiModel, setBronchiModel] = useState(null);
  const [errorLoading, setErrorLoading] = useState(false);
  const [colorMode, setColorMode] = useState(false);

  useEffect(() => {
    try {
      const gltf = useGLTF("/models-3d/epoc/bronchi.glb");
      setBronchiModel(gltf);
    } catch (error) {
      console.error("Error cargando el modelo de bronquios:", error);
      setErrorLoading(true);
    }
  }, []);

  useEffect(() => {
    scene.background = null;
  }, [scene]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "t") {
        setColorMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    if (!bronchiModel) return;

    bronchiModel.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (!child.userData.originalColor) {
          child.userData.originalColor = child.material.color.clone();
        }
        child.material.color = colorMode
          ? new THREE.Color(0.8, 0.2, 0.4)
          : child.userData.originalColor.clone();
        child.material.needsUpdate = true;

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [colorMode, bronchiModel]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.0025;
    }
  });

  if (errorLoading) {
    return (
      <group ref={group} {...props}>
        <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 6]} fov={40} />
        <Text position={[0, 0, 0]} fontSize={1} color="red">Error cargando modelo</Text>
      </group>
    );
  }

  if (!bronchiModel) return null;

  return (
    <group ref={group} {...props} dispose={null}>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 5, 15]} fov={40} />
      <Environment files="/scenes-pneumonia/hdr/surgery.hdr" background />

      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={4}
        shadow-mapSize-width={8192}
        shadow-mapSize-height={8192}
        shadow-bias={-0.0005}
      />

      <Stars radius={80} depth={40} count={3000} factor={4} />
      <Sparkles count={25} scale={4} size={1.5} speed={0.5} />

      <OrbitControls />

      <Float floatIntensity={1.3} speed={1.7}>
        <group
          castShadow
          receiveShadow
          scale={[15, 15, 15]}
          position={[0, 0, 0]}
        >
          <primitive object={bronchiModel.scene} />
        </group>
      </Float>

      <Text
        position={[0, 3.5, 0]}
        fontSize={0.55}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Bronquios Humanos
      </Text>

      <Html position={[0, -2.6, 0]} transform>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "white", fontSize: "14px", marginBottom: "8px" }}>
            Pulsa <strong>T</strong> para cambiar el color del modelo
          </p>
          <button
            style={{
              padding: "8px 16px",
              background: "#2C3E50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
            }}
            onClick={() => setColorMode((prev) => !prev)}
          >
            Cambiar estilo 🧬
          </button>
        </div>
      </Html>
    </group>
  );
}

useGLTF.preload("/models-3d/epoc/bronchi.glb");
