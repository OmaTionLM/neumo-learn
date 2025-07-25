import DiseaseTemplate from "../../../components/DiseaseTemplate/DiseaseTemplate"
import { asthmaData } from "../../../data/asthmaData"

const Asthma = () => {
  return <DiseaseTemplate 
  diseaseData={asthmaData} 
  ModeloPosition={{
    hero: [0, 0, 0] ,
    causes: [0, -1.1, 0],
    treatment: [-0.7, -1, 0],
    prevention: [0, -0.25, 0]
  }}
  ModeloScale={{
    hero: [0.1, 0.1, 0.1],
    causes: [0.7, 0.6, 0.65],
    treatment: [1.15, 1.15, 1.15],
    prevention: [0.05, 0.05, 0.05]
  }}
  ModeloRotation={{
    hero: [0.2, 0, 0],
    causes: [0, 0, 0],
    treatment: [0, 0, 0],
    prevention: [-1, 0, 0]
  }}
  title3DPositions={{
    hero: [-0.75, 1.5, 0],
    causes: [-0.5, 1.8, 0],
    treatment: [-0.4, 1.4, 0],
    prevention: [-0.42, 1.7, 0]
  }}
  Button3DPosition={{
    hero: [-1, -1.5, 0],
    causes: [-1.05, -1.4, 0],
    treatment: [-1, -1.3, 0],
    prevention: [-1.02, -1.4, 0]
  }}
  Sombras={{
    hero: true,
    causes: true,
    treatment: true,
    prevention: true
  }}
  SombraUp={{
    hero: -1.5,
    causes: -2,
    treatment: -1,
    prevention: -1.5
  }}
  />
}

export default Asthma

// import "./Asthma.css";
// import { Canvas } from "@react-three/fiber";
// import Mask from "./models-3d/Mask";
// import {
//   ContactShadows,
//   Html,
//   OrbitControls,
//   SoftShadows,
// } from "@react-three/drei";
// import ContentModule from "../../../components/ContentModule/ContentModule";
// import Lights from "./Lights/Lights";
// import Floor from "./Lights/Floor";
// import { Bottle } from "./models-3d/Bottle";
// import { Inhaler } from "./models-3d/Inhaler";
// import { Cigarette } from "./models-3d/Cigarette";
// import Staging from "./staging/Staging";
// import { useState } from "react";
// import Staging_2 from "./staging/Staging_2";
// import Title from "./texts/Text_asthma_3d";
// import Staging_3 from "./staging/Staging_3";

// const Asthma = () => {
//   const [showMaskInfo, setShowMaskInfo] = useState(false);
//   const [showBottleInfo, setShowBottleInfo] = useState(false);
//   const [showInhalerInfo, setShowInhalerInfo] = useState(false);
//   const [showCigaretteInfo, setCigaretteInfo] = useState(false);
//   return (
//     <>
//       <div className="asthma-container-hero">
//         <div className="asthma-tittle">
//           <h1>ASMA</h1>
//         </div>
        
//         <div className="asthma-description">
//           <p>
//             El asma es una <strong>enfermedad crónica</strong> que afecta las
//             vías respiratorias, causando inflamación y estrechamiento lo que
//             puede producir mayor mucosidad y dificultar la respiración. <br />
//             <br /> Se caracteriza por episodios recurrentes de{" "}
//             <strong>sibilancias</strong>(un silbido) al exhalar,{" "}
//             <strong>tos, falta de aire y opresión en el pecho</strong>. Se
//             clasifica en cuatro etapas: intermitente, persistente leve,
//             persistente moderada y persistente grave. Aunque no tiene cura, el
//             asma se puede controlar con tratamiento adecuado.
//           </p>
//         </div>
//         <div className="modelo3d-asthma">
//           <Canvas camera={{ position: [-Math.PI / 30, 3, 2.5] }} shadows={true}>
//             <Staging />
//             <Title
//               title={"Nebulizador"}
//               id="asma-title-3d"
//               position={[-0.5, 2, -1]}
//             />
//             <SoftShadows size={20} samples={15} focus={25} />
//             <Lights />
//             <ambientLight />
//             <directionalLight />
//             <Staging />
//             <OrbitControls />

//             <Floor x={25} y={25} color={"#8EE411"} />

//             <Mask
//               scale={[3, 3, 3]}
//               position={[0, 0, 0]}
//               rotation={[0, 0, 0]}
//               onClick={() => setShowMaskInfo(false)}
//             />

//             {!showMaskInfo && (
//               <Html
//                 position={[-2, -2.5, 1]}
//                 transform={false}
//                 zIndexRange={[100]}
//               >
//                 <button
//                   id="button-mask-asthma"
//                   onClick={() => setShowMaskInfo(true)}
//                 >
//                   Saber más💡
//                 </button>
//               </Html>
//             )}
//           </Canvas>
//           {showMaskInfo && (
//             <div className="mask-info-modal">
//               <div className="mask-info-content">
//                 <h2 id="tittle-nebu-modal">¿Qué es un nebulizador?</h2>
//                 <p id="text-modal-nebu">
//                   Un nebulizador es un dispositivo que convierte medicamentos
//                   líquidos en vapor para que puedan ser inhalados directamente a
//                   los pulmones, facilitando el tratamiento de enfermedades
//                   respiratorias como el <strong>asma.</strong>
//                 </p>
//                 <button id="cerrar-nebu" onClick={() => setShowMaskInfo(false)}>
//                   Cerrar
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <ContentModule
//         type="primary"
//         // backgroundColor={"var(--color-primary)"}
//         backgroundColor="#7b1fa2"
//         size={"100dvh"}
//       >
//         <div className="asthma-container-causas-tratamiento">
//           <div className="asthma-descripcion-causas">
//             <div className="lista-causas">
//               <div className="tittle-causas-asthma">
//                 <h2 id="causas-title"> Causas </h2>
//               </div>

//               <div className="asthma-modelo3D-causas">
//                 <Canvas
//                   camera={{ position: [Math.PI / 9, 1, 4.5] }}
//                   shadows={true}
//                 >
//                   <Staging_2 />
//                   <ContactShadows
//                     opacity={0.05}
//                     width={10}
//                     height={10}
//                     blur={5}
//                     far={5}
//                     resolution={256}
//                     color="#000000"
//                   />
//                   <Lights />
//                   <ambientLight />
//                   <directionalLight />
//                   <OrbitControls />
//                   <Floor x={30} y={30} position={[0, -2, 0]} color={"white"} />
//                   <Bottle
//                     scale={[1, 1, 1]}
//                     position={[0, -2, 0]}
//                     rotation={[0, 0, 0]}
//                     onClick={() => setShowBottleInfo(false)}
//                   />

//                   {!showBottleInfo && (
//                     <Html
//                       position={[2.5, 2, 0]}
//                       transform={false}
//                       zIndexRange={[100]}
//                     >
//                       <button
//                         id="button-bottle-asthma"
//                         onClick={() => setShowBottleInfo(true)}
//                       >
//                         Aspirina
//                       </button>
//                     </Html>
//                   )}
//                 </Canvas>

//                 {showBottleInfo && (
//                   <div className="bottle-info-modal">
//                     <div className="bottle-info-content">
//                       <h2 id="tittle-modal-bottle">¿Qué puede causar esto?</h2>
//                       <p id="text-modal-bottle">
//                         En personas sensibles:
//                         <li>
//                           Broncoespasmos (contracción de los músculos de las
//                           vías respiratorias)
//                         </li>
//                         <li>Tos Silbidos al respirar (sibilancias)</li>
//                         <li>
//                           Dificultad para respirar En casos graves: ataques de
//                           asma
//                         </li>
//                         ¿A quién afecta más?<br></br>
//                         <br></br>Aproximadamente el 5-10% de los asmáticos son
//                         sensibles a la aspirina. El riesgo es mayor si también
//                         tienen rinitis crónica, pólipos nasales o sinusitis
//                         recurrente.
//                       </p>
//                       <button
//                         id="button-cerrar-bottle"
//                         onClick={() => setShowBottleInfo(false)}
//                       >
//                         Cerrar
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <ul>
//                 <li>Animales (caspa o pelaje de mascotas)</li>
//                 <li>
//                   Ciertos medicamentos{" "}
//                   <strong>(ácido acetilsalicílico (aspirin)</strong> y otros
//                   fármacos antiinflamatorios no esteroides (AINEs)
//                 </li>
//                 <li>Cambios en el clima (con mayor frecuencia clima frío)</li>
//                 <li>Químicos en el aire (contaminación) o en los alimentos</li>
//                 <li>Actividad física</li>
//                 <li>Moho</li>
//                 <li>Emociones fuertes (estrés)</li>
//                 <li>Tabaco u otro inhalante que se fuma</li>
//               </ul>
//             </div>
//           </div>

//           <div className="asthma-tratamiento">
//             <div className="tratamiento-title-asthma">
//               <h2 id="tratamiento-title">Tratamiento</h2>
//             </div>
//             <div className="modelo-texto-tratamiento-asthma">
//               <div className="asthma-modelo3D-tratamiento">
//                 <Canvas
//                   camera={{ position: [Math.PI / -4, 0.5, 4.2] }}
//                   shadows={true}
//                 >
//                   <Staging_2 />
//                   <ContactShadows
//                     position={[0, -1.2, 0]} // posición del "suelo"
//                     opacity={0.5}
//                     width={10}
//                     height={10}
//                     blur={5}
//                     far={5}
//                     resolution={256}
//                     color="#000000"
//                   />
//                   <Lights />
//                   {/* <ambientLight /> */}
//                   <directionalLight />
//                   <spotLight />
//                   <pointLight />
//                   <OrbitControls />
//                   <Floor x={30} y={30} position={[0, -2, 0]} color={"white"} />
//                   <Inhaler
//                     scale={[1, 1, 1]}
//                     position={[0, -2, 0]}
//                     rotation={[0, 0.5, 0]}
//                     onClick={() => setShowInhalerInfo(false)}
//                   />
//                   {!showInhalerInfo && (
//                     <Html
//                       position={[2.5, 2, 0.5]}
//                       transform={false}
//                       zIndexRange={[100]}
//                     >
//                       <button
//                         id="button-inhaler-asthma"
//                         onClick={() => setShowInhalerInfo(true)}
//                       >
//                         Inhalador
//                       </button>
//                     </Html>
//                   )}
//                 </Canvas>
//                 {showInhalerInfo && (
//                   <div className="inhaler-info-modal">
//                     <div className="inhaler-info-content">
//                       <h2 id="inhaler-tittle">¿Qué es un inhalador?</h2>
//                       <p id="text-modal-inhaler">
//                         El inhalador es un dispositivo que administra
//                         medicamentos directamente a los pulmones, ayudando a
//                         aliviar y prevenir los síntomas del asma.
//                       </p>
//                       <button
//                         id="cerrar-inhaler"
//                         onClick={() => setShowInhalerInfo(false)}
//                       >
//                         Cerrar
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <ul>
//                 <li>
//                   <strong>Corticoides inhalados: </strong> Son la primera línea
//                   de tratamiento para reducir la inflamación en las vías
//                   respiratorias
//                 </li>
//                 <li>
//                   <strong>Modificadores de leucotrienos: </strong>Son una
//                   alternativa a los corticoides o se usan en combinación con
//                   ellos para controlar la inflamación.{" "}
//                 </li>
//                 <li>
//                   <strong>Inhaladores combinados: </strong>Contienen un
//                   corticoide inhalado y un agonista beta de acción prolongada,
//                   lo que facilita la administración de ambos medicamentos en una
//                   sola inhalación.{" "}
//                 </li>
//                 <li>
//                   <strong>Agonistas beta de acción corta (SABA): </strong>Como
//                   albuterol y levalbuterol, se usan para abrir rápidamente las
//                   vías respiratorias durante un ataque de asma.{" "}
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </ContentModule>
//       <div className="prevencion-asthma-container">
//         <div className="prevencion-asthma-title">
//           <h1>Prevención </h1>
//         </div>
//         <div className="prevencion-texto-modelo">
//           <div className="prevencion-asthma-description">
//             <p>
//               Puede disminuir los síntomas de asma evitando los desencadenantes
//               y las sustancias que irritan las vías respiratorias.
//             </p>
//             <ul>
//               <li>
//                 Cubra las camas con fundas a prueba de alergias para reducir la
//                 exposición a los <strong>ácaros del polvo.</strong>
//               </li>
//               <li>
//                 Mantenga los niveles de humedad bajos y arregle las fugas para
//                 reducir la proliferación de{" "}
//                 <strong>organismos como el moho.</strong>{" "}
//               </li>
//               <li>
//                 Elimine de la casa el <strong>humo del tabaco.</strong> Esta es
//                 la medida más importante que una familia puede tomar para ayudar
//                 a alguien que tenga asma.{" "}
//               </li>
//               <li>
//                 Evite la contaminación atmosférica, el polvo industrial y otros
//                 vapores irritantes tanto como sea posible..{" "}
//               </li>
//             </ul>
//           </div>
//           <div className="prevencion-modelo3d-asthma">
//             <Canvas
//               camera={{ position: [-Math.PI / 30, 3, 2.5] }}
//               shadows={true}
//             >
//               <Lights />
//               <ambientLight />
//               <directionalLight />
//               <OrbitControls />
//               <Cigarette onClick={() => setShowCigaretteInfo(true)} />
//               <Staging_3 />
//               <Floor x={25} y={25} color={"#8EE411"} />

//               {!showCigaretteInfo && (
//                 <Html
//                   position={[3, 1, -2]}
//                   transform={false}
//                   zIndexRange={[100]}
//                 >
//                   <button
//                     id="button-cigarette-asthma"
//                     onClick={() => setCigaretteInfo(true)}
//                   >
//                     Saber más🚭
//                   </button>
//                 </Html>
//               )}
//             </Canvas>
//           </div>
//           {showCigaretteInfo && (
//             <div className="cigarette-info-modal">
//               <div className="cigarette-info-content">
//                 <h2 id="title-cigarette-modal">
//                   ¿Por qué se debe evitar el cigarrillo?
//                 </h2>
//                 <p id="text-modal-cigarette">
//                   <strong>El cigarrillo es perjudicial</strong> para el asma
//                   porque irrita las vías respiratorias, causando inflamación,
//                   estrechamiento y producción de mucosidad, lo mismo que ocurre
//                   durante un ataque de asma. Esto puede desencadenar más
//                   ataques, hacerlos más graves y dificultar su control.
//                 </p>
//                 <button
//                   id="cerrar-cigarette"
//                   onClick={() => setCigaretteInfo(false)}
//                 >
//                   Cerrar
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Asthma;
