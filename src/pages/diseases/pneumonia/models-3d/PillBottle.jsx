import { useRef, useState, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { Color } from "three"

export function PillBottle(props) {
  const group = useRef()
  const [pillBottleModel, setPillBottleModel] = useState(null)
  const [errorLoading, setErrorLoading] = useState(false)

  useEffect(() => {
    try {
      const gltf = useGLTF("/models-3d/pneumonia/pill-bottle.glb")
      setPillBottleModel(gltf)
    } catch (error) {
      setErrorLoading(true)
    }
  }, [])

  if (errorLoading) {
    // Modelo de respaldo simple para el frasco de pastillas
    return (
      <group ref={group} {...props}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
          <meshStandardMaterial color="#F5CBA7" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 0.55, 0.25, 32]} />
          <meshStandardMaterial color="#D5DBDB" roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.51, 0.51, 0.5, 32, 1, true, Math.PI / 4, Math.PI / 2]} />
          <meshStandardMaterial color="#85C1E9" roughness={0.4} metalness={0.05} transparent opacity={0.7} />
        </mesh>
        {[...Array(5)].map((_, i) => {
          const angle = (i / 5) * Math.PI * 2
          const x = Math.cos(angle) * 0.2
          const z = Math.sin(angle) * 0.2
          return (
            <mesh key={i} position={[x, -0.3, z]} castShadow receiveShadow>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color="#F9E79F" roughness={0.3} metalness={0.1} />
            </mesh>
          )
        })}
      </group>
    )
  }

  if (!pillBottleModel) return null

  const { nodes, materials } = pillBottleModel
  const pillBottleMaterials = {}

  Object.keys(materials).forEach((matName) => {
    pillBottleMaterials[matName] = materials[matName].clone()
    if (pillBottleMaterials[matName].color) {
      const originalColor = pillBottleMaterials[matName].color.clone()
      pillBottleMaterials[matName].color = new Color(
        originalColor.r * 0.7 + 0.3 * 1.0,
        originalColor.g * 0.7 + 0.3 * 0.85,
        originalColor.b * 0.7 + 0.3 * 0.6
      )
      if (pillBottleMaterials[matName].roughness !== undefined) {
        pillBottleMaterials[matName].roughness = Math.max(0, pillBottleMaterials[matName].roughness - 0.15)
      }
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {Object.keys(nodes).map((nodeName) => {
        if (nodes[nodeName].type === "Mesh" || (nodes[nodeName].isObject3D && nodes[nodeName].children.length === 0)) {
          const materialName = nodes[nodeName].material ? nodes[nodeName].material.name : null
          return (
            <mesh
              key={nodeName}
              castShadow
              receiveShadow
              geometry={nodes[nodeName].geometry}
              material={materialName ? pillBottleMaterials[materialName] : nodes[nodeName].material}
              position={nodes[nodeName].position}
              rotation={nodes[nodeName].rotation}
              scale={nodes[nodeName].scale}
            />
          )
        }
        return null
      })}
      <group position={[0, 0.5, 0]}>
        {[...Array(3)].map((_, i) => {
          const x = (Math.random() - 0.5) * 1.0
          const y = (Math.random() - 0.5) * 1.0
          const z = (Math.random() - 0.5) * 1.0
          const size = 0.35 + Math.random() * 0.15
          return (
            <mesh key={i} position={[x, y, z]} castShadow>
              <sphereGeometry args={[size, 20, 20]} />
              <meshStandardMaterial color="#F7DC6F" roughness={0.18} metalness={0.08} transparent opacity={0.13} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

try {
  useGLTF.preload("/models-3d/pneumonia/pill-bottle.glb")
} catch {}
