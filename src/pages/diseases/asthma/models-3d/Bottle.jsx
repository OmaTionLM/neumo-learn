import React, { useEffect, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Bottle({
  scale,
  position,
  rotation,
  ...props
}) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models-3d/asthma/bottle.glb");
  const [hovered, setHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(true);

  useFrame((state) => {
    if (group.current && isJumping) {
      const t = state.clock.getElapsedTime();
      // Suma el rebote al valor original de position[1]
      group.current.position.y = (position?.[1] ?? 0) + Math.sin(t * 2) * 0.2;
    }
  });

  const handleClick = () => {
    setIsJumping(false); // Detiene el rebote
    if (props.onClick) props.onClick();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "r" || e.key === "R") {
        setIsJumping(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <group
      ref={group}
      scale={scale}
      position={position}
      rotation={rotation}
      {...props}
      dispose={null}
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
      <group name="Scene">
        <group name="Armature">
          <mesh
            name="Bottle"
            castShadow
            receiveShadow
            geometry={nodes.Bottle.geometry}
            material={materials.BottleMaterial}
          />
          <primitive object={nodes._rootJoint} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/asthma/bottle.glb");
