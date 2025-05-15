import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";

export function Inhaler(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models-3d/asthma/inhaler.glb");
  const [hovered, setHovered] = useState(false);
  const [isBreathing, setIsBreathing] = useState(true);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scale = 2.5 + Math.sin(t * 2) * 0.05; // pulso suave
    if (group.current && isBreathing) {
      group.current.scale.set(scale, scale + 0.05, scale); // sutil variación en Y
    }
  });

  const handleClick = () => {
    setIsBreathing(false); // Detiene el respiro
    if (props.onClick) props.onClick();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "r" || e.key === "R") {
        setIsBreathing(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={[2.5, 2.6, 2.0]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      {hovered && (
        <Html position={[0, 0, 0]} center>
          <div
            style={{
              background: "#fff",
              color: "#7b1fa2",
              padding: "0.3em 0.8em",
              borderRadius: "8px",
              fontSize: "1rem",
              width: "20rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            Click para detener la animación y <b>R</b> para reanudar.
          </div>
        </Html>
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_1.geometry}
        material={materials.CoverMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_2.geometry}
        material={materials.BodyMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_3.geometry}
        material={materials.ContainerMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_4.geometry}
        material={nodes.Inhaler_4.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_5.geometry}
        material={nodes.Inhaler_5.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_6.geometry}
        material={nodes.Inhaler_6.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Inhaler_7.geometry}
        material={nodes.Inhaler_7.material}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/asthma/inhaler.glb");
