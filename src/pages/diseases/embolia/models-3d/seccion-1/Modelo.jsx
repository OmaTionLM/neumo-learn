import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Modelo = () => {
  const { scene } = useGLTF("/models-3d/emboliaPulmonar/vascular.glb");
  const ref = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const [lastMouseMove, setLastMouseMove] = useState(Date.now());

  // Habilitar sombras en el modelo
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.frustumCulled = false;
      }
    });
  }, [scene]);

  // Pausar rotación al mover el mouse
  useEffect(() => {
    const handleMouseMove = () => {
      setIsPaused(true);
      setLastMouseMove(Date.now());
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Reanudar rotación después de 3 segundos sin movimiento
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMouseMove > 3000) {
        setIsPaused(false);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [lastMouseMove]);

  // Rotación automática si no está pausado
  useFrame((_, delta) => {
    if (!isPaused && ref.current) {
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive object={scene} ref={ref} />;
};

export default Modelo;

