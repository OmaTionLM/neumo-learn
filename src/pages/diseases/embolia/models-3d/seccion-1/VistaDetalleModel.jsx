import EnvironmentHospital from "./FondoHospital";
import Modelo from "./Modelo"; // ya incluye animación y lógica de pausa
import Etiqueta from "./Etiqueta";

const VistaDetalleModel = () => {
  return (
    <>
      <EnvironmentHospital />

      <ambientLight intensity={0.5} />
      <spotLight
        position={[5, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      <Modelo />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>

      <Etiqueta
        position={[1.5, 1, 0]}
        title="Arteria Pulmonar"
        description="Transporta sangre del corazón a los pulmones."
        audio="voz"
      />
      <Etiqueta
        position={[-1.5, 0.8, 0.2]}
        title="Embolia"
        description="Obstrucción de una arteria por un coágulo."
        audio="voz"
      />
    </>
  );
};

export default VistaDetalleModel;


