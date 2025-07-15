import { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { Color } from "three"
import { useState, useEffect } from "react"

export function Vaccine(props) {
  const group = useRef()
  const [vaccineModel, setVaccineModel] = useState(null)
  const [errorLoading, setErrorLoading] = useState(false)

  useEffect(() => {
    let gltf = null
    try {
      gltf = useGLTF("/models-3d/pneumonia/vaccine.glb")
      setVaccineModel(gltf)
    } catch (error) {
      console.error("Error cargando el modelo de vacuna:", error)
      setErrorLoading(true)
    }
  }, [])

  if (errorLoading) {
    // Modelo de respaldo simple para la vacuna (jeringa estilizada)
    return (
      <group ref={group} {...props}>
        {/* Cuerpo de la jeringa */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.15, 0.15, 2, 32]} />
          <meshStandardMaterial color="#AED6F1" roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Émbolo */}
        <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 32]} />
          <meshStandardMaterial color="#5DADE2" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Aguja */}
        <mesh position={[0, -1.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.5, 16]} />
          <meshStandardMaterial color="#BFC9CA" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Líquido dentro de la jeringa */}
        <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.13, 0.8, 32]} />
          <meshStandardMaterial color="#58D68D" roughness={0.3} metalness={0.1} transparent opacity={0.7} />
        </mesh>
      </group>
    )
  }

  if (!vaccineModel) {
    return null // O un loader
  }

  const { nodes, materials } = vaccineModel

  // Creamos copias de los materiales para no afectar al modelo original
  const vaccineMaterials = {}

  Object.keys(materials).forEach((matName) => {
    // Clonamos el material
    vaccineMaterials[matName] = materials[matName].clone()

    // Modificamos el color para que parezca más "saludable" (tonos azulados/verdosos)
    if (vaccineMaterials[matName].color) {
      const originalColor = vaccineMaterials[matName].color.clone()
      // Mezclamos con un tono azul/verde para simular protección
      vaccineMaterials[matName].color = new Color(
        originalColor.r * 0.5 + 0.5 * 0.2, // Reducimos rojo
        originalColor.g * 0.7 + 0.3 * 0.8, // Aumentamos verde
        originalColor.b * 0.7 + 0.3 * 0.9  // Aumentamos azul
      )

      // Bajamos la rugosidad para un aspecto más limpio
      if (vaccineMaterials[matName].roughness !== undefined) {
        vaccineMaterials[matName].roughness = Math.max(0, vaccineMaterials[matName].roughness - 0.2)
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
              material={materialName ? vaccineMaterials[materialName] : nodes[nodeName].material}
              position={nodes[nodeName].position}
              rotation={nodes[nodeName].rotation}
              scale={nodes[nodeName].scale}
            />
          )
        }
        return null
      })}

      {/* Añadimos elementos adicionales para resaltar la protección de la vacuna */}
      <group position={[0, 0, 0]}>
        {/* Esferas translúcidas para simular "escudo" de protección */}
        {[...Array(4)].map((_, i) => {
          const x = (Math.random() - 0.5) * 1.2
          const y = (Math.random() - 0.5) * 1.2
          const z = (Math.random() - 0.5) * 1.2
          const size = 0.5 + Math.random() * 0.2

          return (
            <mesh key={i} position={[x, y, z]} castShadow>
              <sphereGeometry args={[size, 24, 24]} />
              <meshStandardMaterial color="#76D7C4" roughness={0.2} metalness={0.1} transparent={true} opacity={0.18} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

// Intentamos precargar el modelo
try {
  useGLTF.preload("/models-3d/pneumonia/vaccine.glb")
} catch (error) {
  console.error("Error precargando el modelo de vacuna:", error)
}
