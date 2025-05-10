import "./Asthma.css";
import { Canvas } from "@react-three/fiber";
import Mask from "./models-3d/Mask";
import { OrbitControls } from "@react-three/drei";
import ContentModule from "../../../components/ContentModule/ContentModule";
import Lights from "./Lights/Lights";
import Floor from "./Lights/Floor";
import { Bottle } from "./models-3d/Bottle";
import  {Inhaler}  from "./models-3d/Inhaler";

const Asthma = () => {
  return (
    <>
    <div className="asthma-container-hero">
     <div className="asthma-tittle">
        <h1>ASMA</h1>
      </div>
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
        <div className="modelo3d-asthma">
          <Canvas camera={{ position: [-Math.PI / 30, 3, 2.5] }} shadows={true} size={[50, 50]}>
            <Lights />
            <ambientLight />
            <directionalLight />
            <OrbitControls />
            <Floor x={25} y={25} color={"#8EE411"} />
            <Mask scale={[3, 3, 3]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
          </Canvas>
      </div>
  

      
  </div>
      <ContentModule
        type="primary"
        // backgroundColor={"var(--color-sec)"}
       backgroundColor= "#7b1fa2"
        size={"90dvh"}
      >
        <div className="asthma-container-causas-tratamiento">
         
           
                  
              
              <div className="asthma-descripcion-causas">
           
                <div className="lista-causas">
                  <div className="tittle-causas-asthma">
                     <h2>🫁 Causas 🫁</h2>
                  </div>

                <div className="asthma-modelo3D">
                <Canvas
                  camera={{ position: [Math.PI / 9, 1, 4.0] }}
                  shadows={true}
                  size={[50, 50]}
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
              
            
            {/* <div className="asthma-texto-causas">
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
            </div> */}
           
           
          </div>
               
                <div className="asthma-tratamiento">
                  <div className="tratamiento-tittle-asthma">
                    <h2>💊 Tratamiento 💊</h2>
                  </div>
                  <div className="modelo-texto-tratamiento-asthma">
                  <div className="asthma-modelo3D-tratamiento">
                  <Canvas
                    camera={{ position: [Math.PI /-20, 1, 4] }}
                    shadows={true}
                    size={[50, 50]}
                  >
                    <Lights />
                    <ambientLight />
                    <directionalLight />
                    <pointLight/>
                    <OrbitControls />
                    <Inhaler
                      scale={[1, 1, 1]}
                      position={[0, -2, 0]}
                      rotation={[0, 0.5, 0]}
                    />
                    <Floor x={30} y={30} position={[0, -2, 0]} color={"white"} />
                  </Canvas>
                </div>
                   <ul>
                  <li>
                    <strong>Corticoides inhalados: </strong> Son la primera línea de tratamiento para reducir 
                    la inflamación en las vías respiratorias
                  </li>
                  <li><strong>Modificadores de leucotrienos: </strong>Son una alternativa a los corticoides o se usan en combinación
                   con ellos para controlar la inflamación.  </li>
                   <li><strong>Inhaladores combinados: </strong>Contienen un corticoide inhalado y un agonista beta de acción prolongada, 
                   lo que facilita la administración de ambos medicamentos en una sola inhalación.  </li>
                   <li><strong>Agonistas beta de acción corta (SABA): </strong>Como albuterol y levalbuterol, se usan para abrir rápidamente las vías
                    respiratorias durante un ataque de asma. </li>
                  
                  
                 
                </ul>
                
                </div>
              </div>

        </div>
      </ContentModule>
 </>
  );
};

export default Asthma;
