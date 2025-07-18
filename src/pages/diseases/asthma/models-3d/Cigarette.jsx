import { Html, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export function Cigarette({
  scale,
  position,
  rotation,
  ...props
}) {
  const { nodes, materials } = useGLTF("/models-3d/asthma/cigarettes.glb");
  const [hovered, setHovered] = useState(false);
  const [isFloating, setIsFloating] = useState(true);
  const group = useRef();

  useFrame((state) => {
    if (group.current && isFloating) {
      const t = state.clock.getElapsedTime();
      // Suma el rebote al valor original de position[1]
      group.current.position.y = (position?.[1] ?? 0) + Math.sin(t * 2) * 0.2;
    }
  });

  const handleClick = () => {
    setIsFloating(false);
    if (props.onClick) props.onClick();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "r" || e.key === "R") {
        setIsFloating(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <group
      {...props}
      ref={group}
      dispose={null}
      scale={scale}
      position={position}
      rotation={rotation}
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
        geometry={nodes.Object_2.geometry}
        material={materials.material_0}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/asthma/cigarettes.glb");
