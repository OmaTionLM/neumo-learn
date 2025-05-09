import { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { Color } from "three"
import { useState, useEffect } from "react"

export function InfectedLung(props) {
  const group = useRef()
  const [lungModel, setLungModel] = useState(null)
  const [errorLoading, setErrorLoading] = useState(false)

  useEffect(() => {
    let gltf = null
    try {
      gltf = useGLTF("/models-3d/pneumonia/infected-lung.glb")
      setLungModel(gltf)
    } catch (error) {
      console.error("Error cargando el modelo de pulmón infectado:", error)
      setErrorLoading(true)
    }
  }, [])

  if (errorLoading) {
    return (
      <group ref={group} {...props}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#7D3C98" roughness={0.7} metalness={0.1} />
        </mesh>
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.2, 1.5, 32]} />
          <meshStandardMaterial color="#884EA0" roughness={0.8} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.6, 0.2, 16, 100]} />
          <meshStandardMaterial color="#9B59B6" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Elementos adicionales para mostrar la inflamación e infección */}
        <mesh position={[0.5, 0.3, 0.5]} castShadow receiveShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#C39BD3" roughness={0.5} metalness={0.1} transparent={true} opacity={0.8} />
        </mesh>
        <mesh position={[-0.4, -0.2, 0.4]} castShadow receiveShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#C39BD3" roughness={0.5} metalness={0.1} transparent={true} opacity={0.8} />
        </mesh>
      </group>
    )
  }

  if (!lungModel) {
    return null // O un loader
  }

  const { nodes, materials } = lungModel

  // Creamos copias de los materiales para no afectar al modelo original
  const infectedMaterials = {}

  Object.keys(materials).forEach((matName) => {
    // Clonamos el material
    infectedMaterials[matName] = materials[matName].clone()

    // Modificamos el color para que parezca infectado (tonos morados/rojizos)
    if (infectedMaterials[matName].color) {
      const originalColor = infectedMaterials[matName].color.clone()
      // Mezclamos con un tono morado para simular infección
      infectedMaterials[matName].color = new Color(
        originalColor.r * 0.7 + 0.3 * 0.5, // Reducimos rojo y mezclamos con morado
        originalColor.g * 0.5, // Reducimos verde
        originalColor.b * 0.7 + 0.3 * 0.8, // Aumentamos azul para tono morado
      )

      // Aumentamos la rugosidad para un aspecto enfermo
      if (infectedMaterials[matName].roughness !== undefined) {
        infectedMaterials[matName].roughness += 0.2
      }
    }
  })

  // Si se carga correctamente, renderizamos el modelo
  return (
    <group ref={group} {...props} dispose={null}>
      {/* Renderizamos todos los nodos del modelo con materiales modificados */}
      {Object.keys(nodes).map((nodeName) => {
        // Ignoramos los nodos que no son meshes
        if (nodes[nodeName].type === "Mesh" || (nodes[nodeName].isObject3D && nodes[nodeName].children.length === 0)) {
          // Obtenemos el nombre del material original
          const materialName = nodes[nodeName].material ? nodes[nodeName].material.name : null

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
          )
        }
        return null
      })}

      {/* Añadimos elementos adicionales para mostrar la infección */}
      <group position={[0, 0, 0]}>
        {/* Pequeñas esferas para representar infección/inflamación */}
        {[...Array(8)].map((_, i) => {
          const x = (Math.random() - 0.5) * 1.5
          const y = (Math.random() - 0.5) * 1.5
          const z = (Math.random() - 0.5) * 1.5
          const size = 0.1 + Math.random() * 0.15

          return (
            <mesh key={i} position={[x, y, z]} castShadow>
              <sphereGeometry args={[size, 16, 16]} />
              <meshStandardMaterial color="#C39BD3" roughness={0.5} metalness={0.1} transparent={true} opacity={0.8} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

// Intentamos precargar el modelo
try {
  useGLTF.preload("/models-3d/pneumonia/infected-lung.glb")
} catch (error) {
  console.error("Error precargando el modelo de pulmón infectado:", error)
}
