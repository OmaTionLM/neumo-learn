import { useRef, useEffect, useState } from "react";
import {
  useGLTF,
  PerspectiveCamera,
  Environment,
  Html,
  OrbitControls,
  Text3D,
  Float,
  Stars,
  Sparkles,
  Shadow,
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function InfectedLung(props) {
  const group = useRef();
  const cameraRef = useRef();
  const { scene } = useThree();

  const [lungModel, setLungModel] = useState(null);
  const [errorLoading, setErrorLoading] = useState(false);
  const [colorMode, setColorMode] = useState(false);

  useEffect(() => {
    try {
      const gltf = useGLTF("/models-3d/pneumonia/infected-lung.glb");
      setLungModel(gltf);
    } catch (error) {
      console.error("Error cargando el modelo de pulmón infectado:", error);
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
          ? new THREE.Color(0.7, 0.3, 0.2)
          : child.userData.originalColor.clone();
        child.material.needsUpdate = true;

        child.castShadow = true;
        child.receiveShadow = true;
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
        <Text3D
          font="/fonts/Roboto_Regular.typeface.json"
          size={0.6}
          height={0.1}
          position={[0, 0, 0]}
        >
          Error cargando modelo
        </Text3D>
      </group>
    );
  }

  if (!lungModel) return null;

  return (
    <group ref={group} {...props} dispose={null}>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 5, 60]} fov={40} />
      <Environment files="/scenes-pneumonia/hdr/vaccine.hdr" background />

      <ambientLight intensity={0.7} />
      <directionalLight
        castShadow
        position={[6, 12, 6]}
        intensity={5.5}
        shadow-mapSize-width={16384}
        shadow-mapSize-height={16384}
        shadow-bias={-0.0003}
      />

      <Stars radius={80} depth={40} count={3000} factor={4} />
      <Sparkles count={20} scale={4} size={1.5} speed={0.5} />
      <OrbitControls />

      <Float floatIntensity={1.2} speed={1.5}>
        <group castShadow receiveShadow scale={[0.1, 0.1, 0.1]} position={[0, 0, 0]}>
          <primitive object={lungModel.scene} />
        </group>
      </Float>

      <Text3D
        font="/fonts/Roboto_Regular.typeface.json"
        size={2}
        height={0.15}
        bevelEnabled
        bevelSize={0.01}
        bevelThickness={0.02}
        position={[-13, 15, 0]}
      >
        Pulmon Infectado
      </Text3D>

      <Html position={[-4, -12, 0]} scale={[4, 4, 4]} transform>
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

useGLTF.preload("/models-3d/pneumonia/infected-lung.glb");
