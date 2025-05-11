/*Sección Explora en 3D*/
import ContentModule from "../../components/ContentModule/ContentModule";
import WaveImage from "../../assets/wave.png";
import three from "../../assets/explore3d.png";


const Explore = () => {
    return (
      <>
      <div className="explore-container">
        <div id="explore" className="explore">
          <ContentModule
            type="primary"
            backgroundColor="var(--color-neutral)"
            size={"30vh"}
          >
            <h1 id="lungs_explore" style={{ color: "black", fontWeight: 400, fontSize: "3rem" }}>
              Explora en 3D unos
            </h1>
            <h2 style={{ color: "black", fontSize: "3rem" }}>
              <span style={{ letterSpacing: "25px", fontWeight: 300 }}>PULMONES</span>
              <span style={{ letterSpacing: "25px", fontWeight: 300, marginLeft: "20px" }}>SANOS</span>
            </h2>
          </ContentModule>

          <ContentModule
            type="primary"
            backgroundImage={three}
            size={"100vh"}
          ></ContentModule>

          <ContentModule
            type="primary"
            backgroundColor="var(--color-sec)"
            size={"90vh"}
          >
            <h2>La importancia de la salud <br/>de nuestros pulmones</h2>
            <div className="explore-container-text">
            <h3>
              Los pulmones son esenciales para la vida porque suministran <br/>oxígeno
              a la sangre y eliminan dióxido de carbono. Un sistema <br/>respiratorio
              sano garantiza:
            </h3>
            </div>
            <ul>
              <li><strong>Mejor rendimiento</strong> físico y mental. </li>
              <li><strong>Menor riesgo</strong> de enfermedades respiratorias.</li>
              <li><strong>Mejor calidad</strong> de vida y longevidad.</li>
            </ul>
            <h2><br/><br/>Los pulmones llevan oxígeno<br/>
            a cada célula del cuerpo</h2>
          </ContentModule>
          <ContentModule
            type="primary"
            backgroundImage={WaveImage}
            size={"100vh"}
          >
            <h1>Hagamos en la vida lo que hacen los pulmones: quedarse con lo bueno y dejar ir lo malo</h1>
          </ContentModule>
        </div>
      </div>
      </>
    );
  };

  export default Explore;
