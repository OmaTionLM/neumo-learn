import { useEffect } from "react"
import { useThree } from "@react-three/fiber"

const EnvironmentHospital = () => {
  const { scene } = useThree()

  useEffect(() => {
    scene.background = null // Fondo transparente o pon un color si deseas
  }, [scene])

  return (
    <>
      {/* ILUMINACIÓN */}
      <ambientLight intensity={0.3} />
      <spotLight
        position={[0, 5, 0]}
        angle={Math.PI / 5}
        intensity={1.8}
        penumbra={0.6}
        castShadow
        color="#ffffff"
      />
      <directionalLight
        position={[-3, 2, 5]}
        intensity={0.6}
        castShadow
        color="#cde7f7"
      />

      {/* MESA CLÍNICA (PISO) */}
      <mesh receiveShadow position={[0, -1.2, 0]}>
        <boxGeometry args={[15, 0.1, 15]} />
        <meshStandardMaterial
          color="#d9dee0"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* PARED DEL FONDO */}
      <mesh position={[0, 2.5, -7]}>
        <boxGeometry args={[20, 5, 0.2]} />
        <meshStandardMaterial color="#e6f1f5" />
      </mesh>

      {/* PAREDES LATERALES (opcional) */}
      <mesh position={[-10, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[15, 5, 0.2]} />
        <meshStandardMaterial color="#e6f1f5" />
      </mesh>
      <mesh position={[10, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[15, 5, 0.2]} />
        <meshStandardMaterial color="#e6f1f5" />
      </mesh>
    </>
  )
}

export default EnvironmentHospital

