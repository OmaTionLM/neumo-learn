import "./DiseaseTemplate.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D } from "@react-three/drei"
import { Suspense, useState } from "react"
import Title from "../../pages/diseases/asthma/texts/Text_asthma_3d"
import EnvironmentDefault from "../Environment/Environment"
import Button3D from "../../pages/diseases/asthma/modal/Button3D"
import Lights from "../../pages/diseases/asthma/Lights/Lights"
import Floor from "../../pages/diseases/asthma/Lights/Floor"
import InfoModal from "../../pages/diseases/asthma/modal/InfoModal"


// Componente de respaldo mientras se carga el modelo
const LoadingFallback = () => (
  <mesh>
    <sphereGeometry args={[1, 16, 16]} />
    <meshStandardMaterial color="#CCCCCC" wireframe />
  </mesh>
)

const DiseaseTemplate = ({
  diseaseData,
  ModeloPosition,
  ModeloScale,
  ModeloRotation,
  title3DPositions,
  Button3DPosition,
  Sombras,
  SombraUp
}) => {
  const { title, heroSection, causesSection, treatmentSection, preventionSection, models, colors, Environment3D, texts3D, texts2D, InfoButtonModal, Luz } = diseaseData
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const handleOpenModal = ({ modalTitle, modalText }) => {
    setModalData({ title: modalTitle, text: modalText }); //guarda la info
    setShowModal(true);                                   //muestra el modal
  };

  return (
    console.log(Luz),
    <div className="dst-disease-container">
      {/* Sección 1: ¿Qué es la enfermedad? */}
      <section className="dst-hero-section">
        <div className="dst-hero-content">
          <h1 className="dst-disease-title" style={{ color: colors.primary }}>
            {title}
          </h1>
          <div className="dst-hero-description">
            <div className="dst-description-content">
              <p className="dst-intro-text">{heroSection.description}</p>
              <p className="dst-additional-info">{heroSection.additionalInfo}</p>
              <div className="dst-stat-container">
                {heroSection.statistics.map((stat, index) => (
                  <div
                    key={index}
                    className="dst-stat-box"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                  >
                    <span className="dst-stat-number">{stat.number}</span>
                    <span className="dst-stat-text">{stat.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modelo 3D principal */}
        <div className="dst-main-model-container">
          <div className="dst-model">
            <div className="dst-2d-model">
              {texts2D && texts2D.hero && (
                <h1 className="dst-title-text" style={{ color: colors.primary }}>
                  {texts2D.hero.title}
                </h1>
              )}
            </div>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
              <color attach="background" args={["#f8f9fa"]} />
              <ambientLight intensity={1.5} />
              <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
              {Sombras?.hero && <Floor x={30} y={30} position={[0, SombraUp.hero, 0]} color={"white"} />}
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              {texts3D && texts3D.hero && (
              <Text3D 
              position={title3DPositions.hero} 
              font="/fonts/Sixty_Regular.json"
              scale = {[0.2, 0.2, 0.1]}
              >
              <meshStandardMaterial 
              color={"rgb(139, 6, 143)"} />

                {texts3D.hero.title}
              </Text3D>

              )}
              {Environment3D && Environment3D.hero
                ? <Environment3D.hero />
                : <EnvironmentDefault />
              }
              <Suspense fallback={<LoadingFallback />}>
                {models.hero && <models.hero scale={ModeloScale.hero} position={ModeloPosition.hero} rotation={ModeloRotation.hero} castShadow />}
              </Suspense>
              {InfoButtonModal?.hero && (
                <Button3D
                  buttonLabel={InfoButtonModal.hero.buttonLabel}
                  buttonPosition={Button3DPosition.hero}
                  modalTitle={InfoButtonModal.hero.modalTitle}
                  modalText={InfoButtonModal.hero.modalText}
                  onClick={() => handleOpenModal(InfoButtonModal.hero)}
                />
              )}
            </Canvas>
          </div>
          {showModal && modalData && (
            <InfoModal
              title={modalData.title}
              text={modalData.text}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      </section>

      {/* Sección 2: Causas */}
      <section className="dst-causes-section" style={{ backgroundColor: colors.lightBackground }}>
        <div className="dst-section-container">
          <h2 className="dst-section-title" style={{ color: colors.primary }}>
            Causas
          </h2>
          <div className="dst-causes-content">
            <div className="dst-causes-info">
              <p className="dst-causes-description">{causesSection.description}</p>
              <div className="dst-causes-grid">
                {causesSection.causes.map((cause, index) => (
                  <div key={index} className="dst-cause-card">
                    <div className="dst-cause-icon" style={{ backgroundColor: colors.primary }}>
                      {cause.icon}
                    </div>
                    <h4 className="dst-cause-title">{cause.title}</h4>
                    <p className="dst-cause-description">{cause.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="dst-causes-model">
              <div className="dst-model">
                <div className="dst-2d-model">
                  {texts2D && texts2D.causes && (
                    <h1 className="dst-title-text" style={{ color: colors.primary }}>
                      {texts2D.causes.title}
                    </h1>
                  )}
                </div>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
                  <color attach="background" args={[colors.modelBackground]} />
                  <ambientLight intensity={1.5} />
                  {Luz?.causes && <Lights />}
                  <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
                  {Sombras?.causes && <Floor x={30} y={30} position={[0, SombraUp.causes, 0]} color={"white"} />}
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  {texts3D && texts3D.causes && (
                   <Text3D 
              position={title3DPositions.causes} 
              font="/fonts/Sixty_Regular.json"
              scale = {[0.2, 0.2, 0.1]}
              >
              <meshStandardMaterial 
              color={"rgb(139, 6, 143)"} />
              
                {texts3D.causes.title}
              </Text3D>

                  )}
                  {Environment3D && Environment3D.causes
                    ? <Environment3D.causes />
                    : <EnvironmentDefault />
                  }
                  <Suspense fallback={<LoadingFallback />}>
                    {models.causes && <models.causes scale={ModeloScale.causes} position={ModeloPosition.causes} rotation={ModeloRotation.causes} castShadow />}
                  </Suspense>
                  {InfoButtonModal?.causes && (
                    <Button3D
                      buttonLabel={InfoButtonModal.causes.buttonLabel}
                      buttonPosition={Button3DPosition.causes}
                      modalTitle={InfoButtonModal.causes.modalTitle}
                      modalText={InfoButtonModal.causes.modalText}
                      onClick={() => handleOpenModal(InfoButtonModal.causes)}
                    />
                  )}
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Tratamiento */}
      <section className="dst-treatment-section">
        <div className="dst-section-container">
          <h2 className="dst-section-title" style={{ color: colors.primary }}>
            Tratamiento
          </h2>
          <div className="dst-treatment-content">
            <div className="dst-treatment-model">
              <div className="dst-model">
                <div className="dst-2d-model">
                  {texts2D && texts2D.treatment && (
                    <h1 className="dst-title-text" style={{ color: colors.primary }}>
                      {texts2D.treatment.title}
                    </h1>
                  )}
                </div>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
                  <color attach="background" args={[colors.modelBackground]} />
                  <ambientLight intensity={1.5} />
                  <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
                  {Sombras?.treatment && <Floor x={30} y={30} position={[0, SombraUp.treatment, 0]} color={"white"} />}
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  {texts3D && texts3D.treatment && (
                   <Text3D 
              position={title3DPositions.treatment} 
              font="/fonts/Sixty_Regular.json"
              scale = {[0.2, 0.2, 0.1]}
              >
              <meshStandardMaterial 
              color={"rgb(139, 6, 143)"} />
              
                {texts3D.treatment.title}
              </Text3D>

                  )}
                  {Environment3D && Environment3D.treatment
                    ? <Environment3D.treatment />
                    : <EnvironmentDefault />
                  }
                  <Suspense fallback={<LoadingFallback />}>
                    {models.treatment && (
                      <models.treatment scale={ModeloScale.treatment} position={ModeloPosition.treatment} rotation={ModeloRotation.treatment} castShadow />
                    )}
                  </Suspense>
                  {InfoButtonModal?.treatment && (
                    <Button3D
                      buttonLabel={InfoButtonModal.treatment.buttonLabel}
                      buttonPosition={Button3DPosition.treatment}
                      modalTitle={InfoButtonModal.treatment.modalTitle}
                      modalText={InfoButtonModal.treatment.modalText}
                      onClick={() => handleOpenModal(InfoButtonModal.treatment)}
                    />
                  )}
                </Canvas>
              </div>
            </div>
            <div className="dst-treatment-info">
              <p className="dst-treatment-description">{treatmentSection.description}</p>
              <div className="dst-treatment-options">
                {treatmentSection.treatments.map((treatment, index) => (
                  <div key={index} className="dst-treatment-card">
                    <div className="dst-treatment-header" style={{ backgroundColor: colors.primary }}>
                      <h4 className="dst-treatment-title">{treatment.title}</h4>
                    </div>
                    <div className="dst-treatment-body">
                      <p className="dst-treatment-description">{treatment.description}</p>
                      <ul className="dst-treatment-methods">
                        {treatment.methods.map((method, methodIndex) => (
                          <li key={methodIndex}>{method}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: Prevención y cuidados */}
      <section className="dst-prevention-section" style={{ backgroundColor: colors.lightBackground }}>
        <div className="dst-section-container">
          <h2 className="dst-section-title" style={{ color: colors.primary }}>
            Prevención y Cuidados
          </h2>
          <div className="dst-prevention-content">
            <div className="dst-prevention-info">
              <p className="dst-prevention-description">{preventionSection.description}</p>
              <div className="dst-prevention-categories">
                {preventionSection.categories.map((category, index) => (
                  <div key={index} className="dst-prevention-category">
                    <h4 className="dst-category-title" style={{ color: colors.primary }}>
                      {category.title}
                    </h4>
                    <ul className="dst-category-recommendations">
                      {category.recommendations.map((recommendation, recIndex) => (
                        <li key={recIndex} className="dst-recommendation-item">
                          <span className="dst-recommendation-icon" style={{ color: colors.primary }}>
                            ✓
                          </span>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="dst-prevention-model">
              <div className="dst-model">
                <div className="dst-2d-model">
                  {texts2D && texts2D.prevention && (
                    <h1 className="dst-title-text" style={{ color: colors.primary }}>
                      {texts2D.prevention.title}
                    </h1>
                  )}
                </div>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
                  <color attach="background" args={[colors.modelBackground]} />
                  <ambientLight intensity={1.5} />
                  <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
                  {Sombras?.prevention && <Floor x={30} y={30} position={[0, SombraUp.prevention, 0]} color={"white"} />}
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                  {texts3D && texts3D.prevention && (
                   <Text3D 
              position={title3DPositions.prevention} 
              font="/fonts/Sixty_Regular.json"
              scale = {[0.2, 0.2, 0.1]}
              >
              <meshStandardMaterial 
              color={"rgb(139, 6, 143)"} />
              
                {texts3D.prevention.title}
              </Text3D>

                  )}
                  {Environment3D && Environment3D.prevention
                    ? <Environment3D.prevention />
                    : <EnvironmentDefault />
                  }
                  <Suspense fallback={<LoadingFallback />}>
                    {models.prevention && (
                      <models.prevention scale={ModeloScale.prevention} position={ModeloPosition.prevention} rotation={ModeloRotation.prevention} castShadow />
                    )}
                  </Suspense>
                  {InfoButtonModal?.prevention && (
                    <Button3D
                      buttonLabel={InfoButtonModal.prevention.buttonLabel}
                      buttonPosition={Button3DPosition.prevention}
                      modalTitle={InfoButtonModal.prevention.modalTitle}
                      modalText={InfoButtonModal.prevention.modalText}
                      onClick={() => handleOpenModal(InfoButtonModal.prevention)}
                    />
                  )}
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DiseaseTemplate
