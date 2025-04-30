import "./Asthma.css";
import { Canvas } from "@react-three/fiber";
import Mask from "./models-3d/Mask";
import { OrbitControls } from "@react-three/drei";
import ContentModule from "../../../components/ContentModule/ContentModule";
import Lights from "./Lights/Lights";

const Asthma = () => {
  return (
    <div className="asthma-container">
      <ContentModule type="primary" size={"10vh"}>
        <h1
          id="asthma-style"
          style={{ color: "black", fontWeight: 400, fontSize: "4rem" , letterSpacing: "px" }}
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
          }}
        >
          El asma es una enfermedad crónica que afecta las vías respiratorias,
          causando inflamación y estrechamiento lo que puede producir mayor
          mucosidad y dificultar la respiración. Se caracteriza por episodios
          recurrentes de sibilancias(un silbido) al exhalar, tos, falta de aire
          y opresión en el pecho. Se clasifica en cuatro etapas: intermitente,
          persistente leve, persistente moderada y persistente grave. Aunque no
          tiene cura, el asma se puede controlar con tratamiento adecuado.
          El asma es una enfermedad frecuente que varía mucho de un país a otro.
          Afecta alrededor del 3 al 7 % de la población adulta, siendo más
          frecuente en edades infantiles. Es una de las más importantes
          enfermedades crónicas, es decir, de duración prolongada, en
          niños. Es más frecuente en el sexo masculino en una relación de 2:1, pero al llegar a la pubertad, esta relación tiende a igualarse.
        </p>
        
      </ContentModule>

      <ContentModule type="primary" className="asthma-content" size={"50vh"}>
        <Canvas camera={{ position: [0, 1, 2] }}>
          <Lights />
          <OrbitControls target={[0, 0, 0]} />

          <Mask />
        </Canvas>
      </ContentModule>

          <ContentModule
            type="primary"
            backgroundColor="var(--color-sec)"
            size={"70vh"}

            >
            <h2>Sintomas</h2>
            </ContentModule>
    </div>
  );
};

export default Asthma;
