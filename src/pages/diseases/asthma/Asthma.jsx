import "./Asthma.css";
import { Canvas } from "@react-three/fiber";
import Mask from "./models-3d/Mask";
import { OrbitControls } from "@react-three/drei";
import ContentModule from "../../../components/ContentModule/ContentModule";
import Lights from "./Lights/Lights";
import Floor from "./Lights/Floor";
import { Bottle } from "./models-3d/Bottle";

const Asthma = () => {
  return (
    <div className="asthma-container">
      <ContentModule type="primary" size={"10vh"}>
        <h1
          id="asthma-style"
          style={{
            color: "black",
            fontWeight: 400,
            fontSize: "4rem",
            letterSpacing: "2px",
            fontFamily: "Poppins",
          }}
        >
          ASMA
        </h1>
        <p
          style={{
            color: "black",
            fontSize: "1.2rem",
            fontWeight: 300,
            justifyContent: "center",
            textAlign: "justify",
            fontFamily: "Poppins",
          }}
        >
          El asma es una enfermedad crónica que afecta las vías respiratorias,
          causando inflamación y estrechamiento lo que puede producir mayor
          mucosidad y dificultar la respiración. Se caracteriza por episodios
          recurrentes de sibilancias(un silbido) al exhalar, tos, falta de aire
          y opresión en el pecho. Se clasifica en cuatro etapas: intermitente,
          persistente leve, persistente moderada y persistente grave. Aunque no
          tiene cura, el asma se puede controlar con tratamiento adecuado. El
          asma es una enfermedad frecuente que varía mucho de un país a otro.
          Afecta alrededor del 3 al 7 % de la población adulta, siendo más
          frecuente en edades infantiles. Es una de las más importantes
          enfermedades crónicas, es decir, de duración prolongada, en niños. Es
          más frecuente en el sexo masculino en una relación de 2:1, pero al
          llegar a la pubertad, esta relación tiende a igualarse.
        </p>
      </ContentModule>

      <ContentModule type="primary" className="asthma-content" size={"50vh"}>
        <Canvas camera={{ position: [-Math.PI / 30, 3, 3] }} shadows={true}>
          <Lights />
          <ambientLight />
          <directionalLight />
          <OrbitControls />
          <Floor x={6} y={6} />
          <Mask scale={[1, 1, 1]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </Canvas>
      </ContentModule>

      <ContentModule
        type="primary"
        backgroundColor="var(--color-sec)"
        size={"70vh"}
      >
        <div className="container">
          <div className="causas-container">
            <h2>Causas</h2>
            <div className="modelo-texto">
              <div className="modelo3D">
                <Canvas
                  camera={{ position: [Math.PI / 90, 1, 3] }}
                  shadows={true}
                >
                  <Lights />
                  <ambientLight />
                  <directionalLight />
                  <OrbitControls />
                  <Bottle
                    scale={[0.7, 0.7, 0.7]}
                    position={[0, -1, 0]}
                    rotation={[0, 0, 0]}
                  />
                  <Floor x={3} y={3} position={[0, -1, 0]} />
                </Canvas>
              </div>
              <div className="descripcion-causas">
                <ul>
                  <li>Causa 1</li>
                  <li>Causa 2</li>
                  <li>Causa 3</li>
                  <li>Causa 4</li>
                  <li>Causa 5</li>
                  <li>Causa 6</li>
                </ul>
              </div>
            </div>
            <div className="texto-causas">
              <p>
                Aquí va el texto adicional explicativo que respeta el ancho del
                contenedor principal.
              </p>
            </div>
          </div>
        </div>
      </ContentModule>
    </div>
  );
};

export default Asthma;
