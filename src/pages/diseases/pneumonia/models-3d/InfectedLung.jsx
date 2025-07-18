import { useRef, useEffect, useState } from "react";
import {
  useGLTF,
  PerspectiveCamera,
  Html,
  Environment,
  Stars,
  Sparkles,
  OrbitControls,
  Text,
  Float
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function InfectedLung(props) {
  const group = useRef();
  const cameraRef = useRef();
  const { scene } = useThree();

  const [lungModel, setLungModel] = useState(null);
  const [errorLoading, setErrorLoading] = useState(false);

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

  const { nodes, materials } = lungModel;
  const infectedMaterials = {};

  Object.keys(materials).forEach((matName) => {
    infectedMaterials[matName] = materials[matName].clone();
    if (infectedMaterials[matName].color) {
      const originalColor = infectedMaterials[matName].color.clone();
      infectedMaterials[matName].color = new THREE.Color(
        originalColor.r * 0.7 + 0.3 * 0.5,
        originalColor.g * 0.5,
        originalColor.b * 0.7 + 0.3 * 0.8
      );
      if (infectedMaterials[matName].roughness !== undefined) {
        infectedMaterials[matName].roughness += 0.2;
      }
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 5, 500]} fov={40} />
      <Environment files="/scenes-pneumonia/hdr/vaccine.hdr" background />

      <ambientLight intensity={0.25} />
      <directionalLight
        castShadow
        position={[4, 10, 500]}
        intensity={2.5}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-bias={-0.0005}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <pointLight
        position={[-3, 5, -3]}
        intensity={0.6}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Stars radius={100} depth={50} count={5000} factor={4} />
      <Sparkles count={30} scale={5} size={2} speed={0.4} />

      <OrbitControls />

      <Float floatIntensity={1.2} speed={2}>
        {Object.keys(nodes).map((nodeName) => {
          if (nodes[nodeName].type === "Mesh" || (nodes[nodeName].isObject3D && nodes[nodeName].children.length === 0)) {
            const materialName = nodes[nodeName].material ? nodes[nodeName].material.name : null;
            return (
              <mesh
                key={nodeName}
                castShadow
                receiveShadow
                geometry={nodes[nodeName].geometry}
                material={materialName ? infectedMaterials[materialName] : nodes[nodeName].material}
                position={nodes[nodeName].position}
                rotation={nodes[nodeName].rotation}
                scale={nodes[nodeName].scale}
              />
            );
          }
          return null;
        })}
      </Float>

      <Html position={[0, -2, 100]} transform>
        <button
          style={{
            padding: "10px 20px",
            background: "#9B59B6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Información
        </button>
      </Html>

      <Text position={[0, 3.5, 100]} fontSize={0.5} color="white">
        Pulmón Infectado
      </Text>
    </group>
  );
}

useGLTF.preload("/models-3d/pneumonia/infected-lung.glb");
