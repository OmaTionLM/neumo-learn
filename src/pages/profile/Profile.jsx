/*Sección Sistema respiratorio*/
import ContentModule from "../../components/ContentModule/ContentModule";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <div className="profile-container">
        <ContentModule
          type="primary"
          backgroundImage="profile.png"
          size="100vh"
        >
          <div className="blurred-container">
            <h1>¡BIENVENIDO!</h1>
            <div className="subtitle-profile">
            <h2>
              <br/>Con NeumoLearn conocerás <br/>más sobre los pulmones y su cuidado<br/>
              </h2>
            </div>
            <div className="description-profile">
            <p>
              <strong> <br/>El primer llanto de un bebé</strong> es más que una simple señal de vida: <br/>
              es la prueba de que sus pulmones han comenzado a funcionar. <br/> <br/> Al
              tomar su primera bocanada de aire y soltar un llanto fuerte, <br/> el
              recién nacido<strong>demuestra que puede respirar por sí mismo.<br/></strong><br/> Desde ese
              momento y a lo largo de la vida, nuestros pulmones <br/> trabajan sin
              descanso para mantenernos vivos.{" "} <br/><strong> <br/>Conocerlos y cuidarlos es esencial.</strong><br/>
            </p>
            </div>
          </div>
        </ContentModule>

        <ContentModule
          type="secondary"
          backgroundColor="var( --color-neutral)"
          size="70vh"
        >
          <div className="titulo-conoce-tu-sr">
          <h1>¡Conoce tu sistema respiratorio!</h1>
          
          </div>
         
          <div className="sistema-respiratorio-container">
            <div className="medical-book">
              <img
                src="/medical-book.png"
                alt="Medical Book"
                className="medical-book-image"
              />
              <p>
              <strong>¿Qué órganos</strong>  componen<br /> 
              el sistema respiratorio? <br />
              </p>
            </div>

            <div className="lungs">
              <img
                src="/lungs-image.png"
                alt="Lungs"
                className="lungs-image"
              />
              <p>
                <strong>¿Cuál es la función</strong><br /> 
                principal de los pulmones?<br/> 
              </p>
             
            </div>
            
            <div className="medical-report">
              <img
                src="/medical-report.png"
                alt="Medical Report"
                className="medical-report-image"
              />
              <p>
              ¿Cómo <strong> puedo cuidar
               </strong> <br/> mi sistema respiratorio?
               <br />
              </p>
        
            </div>
          </div>
          <div className="button-container">
          <button className="button-conoce-tu-sr">Click aquí</button>
          </div>
        </ContentModule>

        <ContentModule
          type="secondary"
          backgroundColor="var(--color-sec)"
          size="70vh"
        >
          <div className="titulo-prevencion-container">
            <h1>Enfermedades: prevención y cuidados</h1>
          </div>
          <div className="prevencion-container">
            <div className="bacteria">
              <img
                src="/bacteria.png"
                alt="Bacteria"
                className="bacteria-image"
              />
              <p>
                Conoce <strong>cuatro enfermedades</strong> <br /> que suelen
                padecer los pulmones <br /> con frecuencia{" "}
              </p>
            </div>
            <div className="checklist">
              <img
                src="/checklist.png"
                alt="Checklist"
                className="checklist-image"
              />
              <p>
                <strong>Recomendaciones generales</strong> para <br />
                el cuidado del sistema respiratorio
                <br />y la buena salud de los pulmones
              </p>
            </div>
          </div>
          
          
        </ContentModule>

        <ContentModule
          type="secondary"
          backgroundColor="var(--color-neutral)"
          size="520px"
        >
          <div className="about-us-wrapper">
            <div className="title-about-us">
              <h1>¿Quiénes somos?</h1>
              <button className="button-about-us">Conoce al equipo</button>
            </div>
            <div className="about-us">
              <div className="image-container">
                <img
                  src="/about-us/Integrante1.png"
                  alt="Integrante1"
                  className="profile-image"
                />
              </div>
              <div className="image-container">
                <img
                  src="/about-us/Integrante2.png"
                  alt="Integrante2"
                  className="profile-image"
                />
              </div>
              <div className="image-container">
                <img
                  src="/about-us/Integrante3.png"
                  alt="Integrante3"
                  className="profile-image"
                />
              </div>
              <div className="image-container">
                <img
                  src="/about-us/Integrante4.png"
                  alt="Integrante4"
                  className="profile-image"
                />
              </div>
            </div>
          </div>
        </ContentModule>
      </div>
    </>
  );
};

export default Profile;

