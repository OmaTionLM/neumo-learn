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
            <h1>BIENVENIDO</h1>
            <h2>
              Con NeumoLearn conocerás más sobre los pulmones y su cuidado
            </h2>

            <p>
              El primer llanto de un bebé es más que una simple señal de vida:
              es la prueba de que sus pulmones han comenzado a funcionar. Al
              tomar su primera bocanada de aire y soltar un llanto fuerte, el
              recién nacido demuestra que puede respirar por sí mismo. Desde ese
              momento y a lo largo de la vida, nuestros pulmones trabajan sin
              descanso para mantenernos vivos.{" "}
            </p>
            <h3>Conocerlos y cuidarlos es esencial.</h3>
          </div>
        </ContentModule>

        <ContentModule
          type="secondary"
          backgroundColor="var( --color-neutral)"
          size="70vh"
        >
          <h1>¡Conoce tu sistema respiratorio!</h1>
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
