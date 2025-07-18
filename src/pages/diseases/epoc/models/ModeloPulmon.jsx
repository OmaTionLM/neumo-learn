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
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function LungSickModel(props) {
  const group = useRef();
  const cameraRef = useRef();
  const { scene } = useThree();
  const [lungModel, setLungModel] = useState(null);
  const [errorLoading, setErrorLoading] = useState(false);
  const [colorMode, setColorMode] = useState(false);

  useEffect(() => {
    try {
      const gltf = useGLTF("/models-3d/epoc/lungSick.glb");
      setLungModel(gltf);
    } catch (error) {
      console.error("Error cargando el modelo de pulmón enfermo:", error);
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
    if (!lungModel) return;

    lungModel.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (!child.userData.originalColor) {
          child.userData.originalColor = child.material.color.clone();
        }
        child.material.color = colorMode
          ? new THREE.Color(1, 0.3, 0.3)
          : child.userData.originalColor.clone();
        child.material.needsUpdate = true;
      }
    });
  }, [colorMode, lungModel]);

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

  if (!lungModel) return null;

  return (
    <group ref={group} {...props} dispose={null}>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 5, 15]} fov={40} />
      <Environment files="/scenes-pneumonia/hdr/vaccine.hdr" background />

      <ambientLight intensity={0.3} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={2.2}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.0005}
      />

      <Stars radius={80} depth={40} count={3000} factor={4} />
      <Sparkles count={25} scale={4} size={1.5} speed={0.5} />

      <OrbitControls />

      <Float floatIntensity={1.3} speed={1.7}>
        <group castShadow receiveShadow scale={[15, 15, 15]}>
          <primitive object={lungModel.scene} />
        </group>
      </Float>

      <Text position={[0, 3.5, 0]} fontSize={0.5} color="white">
        Pulmón Enfermo
      </Text>

      <Html position={[0, -2.2, 0]} transform>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "white", fontSize: "14px", marginBottom: "8px" }}>
            Pulsa <strong>T</strong> para cambiar el color del modelo
          </p>
          <button
            style={{
              padding: "8px 16px",
              background: "#D35400",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={() => setColorMode((prev) => !prev)}
          >
            Efecto visual 🔄
          </button>
        </div>
      </Html>
    </group>
  );
}

useGLTF.preload("/models-3d/epoc/lungSick.glb");
