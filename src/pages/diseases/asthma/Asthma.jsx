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
      <ContentModule type="primary" size={"50vh"}>
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
        <div className="asthma-description">
          <p>
            El asma es una <strong>enfermedad crónica</strong> que afecta las
            vías respiratorias, causando inflamación y estrechamiento lo que
            puede producir mayor mucosidad y dificultar la respiración. <br />
            <br /> Se caracteriza por episodios recurrentes de{" "}
            <strong>sibilancias</strong>(un silbido) al exhalar,{" "}
            <strong>tos, falta de aire y opresión en el pecho</strong>. Se
            clasifica en cuatro etapas: intermitente, persistente leve,
            persistente moderada y persistente grave. Aunque no tiene cura, el
            asma se puede controlar con tratamiento adecuado.
          </p>
        </div>
      </ContentModule>

      <div className="modelo3d-asma">
        <Canvas camera={{ position: [-Math.PI / 30, 3, 2.5] }} shadows={true}>
          <Lights />
          <ambientLight />
          <directionalLight />
          <OrbitControls />
          <Floor x={25} y={25} color={"#8EE411"} />
          <Mask scale={[3, 3, 3]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </Canvas>
      </div>

      <ContentModule
        type="primary"
        backgroundColor="var(--color-sec)"
        size={"100vh"}
      >
        <div className="container">
          <div className="causas-container">
            <h2>Causas</h2>
            <div className="modelo-texto">
              <div className="modelo3D">
                <Canvas
                  camera={{ position: [Math.PI / 30, 2, 3] }}
                  shadows={true}
                >
                  <Lights />
                  <ambientLight />
                  <directionalLight />
                  <OrbitControls />
                  <Bottle
                    scale={[1, 1, 1]}
                    position={[0, -2, 0]}
                    rotation={[0, 0, 0]}
                  />
                  <Floor x={30} y={30} position={[0, -2, 0]} color={"white"} />
                </Canvas>
              </div>
              <div className="descripcion-causas">
                <ul>
                  <li>Animales (caspa o pelaje de mascotas)</li>
                  <li>
                    Ciertos medicamentos{" "}
                    <strong>(ácido acetilsalicílico (aspirin)</strong> y otros
                    fármacos antiinflamatorios no esteroides (AINEs)
                  </li>
                  <li>Cambios en el clima (con mayor frecuencia clima frío)</li>
                  <li>
                    Químicos en el aire (contaminación) o en los alimentos
                  </li>
                  <li>Actividad física</li>
                  <li>Moho</li>
                  <li>Emociones fuertes (estrés)</li>
                  <li>Tabaco u otro inhalante que se fuma</li>
                </ul>
              </div>
            </div>
            <div className="texto-causas">
              <p>
                Las sustancias que se encuentran en algunos lugares de trabajo
                también pueden desencadenar los síntomas de asma, lo que lleva
                al asma ocupacional.Los desencadenantes más comunes son el polvo
                de la madera, el polvo de los granos, la caspa animal, los
                hongos o los químicos. Muchas personas con asma tienen
                antecedentes personales o familiares de alergias, como la fiebre
                del heno (rinitis alérgica) o eccema. Otros no tienen
                antecedentes de alergias.
              </p>
            </div>
          </div>
        </div>
      </ContentModule>
    </div>
  );
};

export default Asthma;
