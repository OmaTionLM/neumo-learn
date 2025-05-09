/*Sección Enfermedades de los pulmones*/
import "./Diseases.css";
import { Link } from "react-router-dom";
import ContentModule from "../../components/ContentModule/ContentModule";

const Disease = () => {
    return (
      <>
        <div className="disease-container">
          <div id = "diseases" className = "diseases">
            <ContentModule
              type="primary"
              backgroundImage="epoc.png"
              size={"100vh"}
            >
              <Link to="/epoc"><h1>EPOC</h1></Link>
            </ContentModule>


            <ContentModule
              type="primary"
              backgroundImage="asthma.png"
              size={"100vh"}
            >
              <Link to="/asthma"><h1>ASMA</h1></Link>
            </ContentModule>

            <ContentModule
              type="primary"
              backgroundImage="pneumonia.png" 
              size={"100vh"}
            > 
              <Link to="/pneumonia"><h1>NEUMONÍA</h1></Link>
            </ContentModule>

            <ContentModule
              type="primary"
              backgroundImage="embolism.png"
              size={"100vh"}
            >
              <Link to="/embolism"><h1>EMBOLIA PULMONAR</h1></Link>
            </ContentModule>
          </div>
        </div> 
      </>
    );
  };
  
  export default Disease;
