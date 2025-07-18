import { Html, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';


const Mask = (props) => {

    const group = useRef();
    const{nodes, materials} = useGLTF("/models-3d/asthma/mask.glb");
    const [hovered, setHovered] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  
    useFrame(() => {
      if (group.current && isRotating) {
        group.current.rotation.y += 0.003;
      }
    });

   const handleClick = () => {
    setIsRotating(false); // Detiene la rotación al hacer click
    if (props.onClick) props.onClick();
  };

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "r" || e.key === "R") {
      setIsRotating(true); 
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);

    return(
        <group ref={group} {...props} 
        dispose={null} 
        onClick={handleClick}
        onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
 {hovered && (
        <Html position={[0, -1, 1]} center>
          <div style={{
            background: "#fff",
            color: "#7b1fa2",
            padding: "0.3em 0.8em",
            borderRadius: "8px",
            fontSize: "1rem",
            width:"20rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
          }}>
            Click para detener la rotación y <b>R</b> para reiniciar la rotación
          </div>
        </Html>
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_1.geometry}
        material={nodes.BagValveMask_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_2.geometry}
        material={materials.ExpiratoryValveMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_3.geometry}
        material={nodes.BagValveMask_3.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_4.geometry}
        material={materials.ContainerMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_5.geometry}
        material={nodes.BagValveMask_5.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_6.geometry}
        material={nodes.BagValveMask_6.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_7.geometry}
        material={materials.WordsMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_8.geometry}
        material={nodes.BagValveMask_8.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_9.geometry}
        material={materials.ValveMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_10.geometry}
        material={materials.NumbersMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_11.geometry}
        material={nodes.BagValveMask_11.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_12.geometry}
        material={nodes.BagValveMask_12.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_13.geometry}
        material={materials.MeasureYellowMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_14.geometry}
        material={materials.MeasureRedMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_15.geometry}
        material={materials.MeasureGreenMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_16.geometry}
        material={materials.PressureGaugeMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_17.geometry}
        material={materials.MeasurerMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_18.geometry}
        material={nodes.BagValveMask_18.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_19.geometry}
        material={materials.BagMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_20.geometry}
        material={nodes.BagValveMask_20.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BagValveMask_21.geometry}
        material={nodes.BagValveMask_21.material}
      />
    </group>
    );
}

export default Mask;

useGLTF.preload("models-3d/asthma/mask.glb");