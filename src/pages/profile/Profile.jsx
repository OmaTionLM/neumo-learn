/*Sección Sistema respiratorio*/
import ContentModule from "../../components/ContentModule/ContentModule";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <div className="profile-container">
        <ContentModule type="primary" backgroundImage="profile.png" size="100vh">
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

        <ContentModule type="secondary" backgroundColor="var( --color-neutral)" size="70vh">
          <h1>¡Conoce tu sistema respiratorio!</h1>
        </ContentModule>

        <ContentModule type="secondary" backgroundColor="var(--color-secondary)" size="70vh">
            <h1>Sección 3</h1>
        </ContentModule>

        <ContentModule type="secondary" backgroundColor="var(--color-neutral)" size="70vh">
            <h1>¿Quiénes somos?</h1>
        </ContentModule>


      </div>
    </>
  );
};

export default Profile;
