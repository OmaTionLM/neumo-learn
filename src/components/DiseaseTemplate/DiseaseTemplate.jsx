import "./DiseaseTemplate.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"

// Componente de respaldo mientras se carga el modelo
const LoadingFallback = () => (
  <mesh>
    <sphereGeometry args={[1, 16, 16]} />
    <meshStandardMaterial color="#CCCCCC" wireframe />
  </mesh>
)

const DiseaseTemplate = ({ diseaseData }) => {
  const { title, heroSection, symptomsSection, treatmentSection, preventionSection, models, colors } = diseaseData

  return (
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
              <div className="dst-causes-box" style={{ backgroundColor: colors.lightBackground }}>
                <h3 className="dst-causes-title" style={{ color: colors.primary }}>
                  Causas principales:
                </h3>
                <ul className="dst-causes-list">
                  {heroSection.causes.map((cause, index) => (
                    <li key={index}>
                      <span className="dst-cause-icon" style={{ color: colors.primary }}>
                        •
                      </span>
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
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
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
            <color attach="background" args={["#f8f9fa"]} />
            <ambientLight intensity={0.6} />
            <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            <Environment preset="studio" />
            <Suspense fallback={<LoadingFallback />}>
              {models.hero && <models.hero scale={[1, 1, 1]} position={[0, 0, 0]} rotation={[0, 0, 0]} />}
            </Suspense>
          </Canvas>
        </div>
      </section>

      {/* Sección 2: Síntomas */}
      <section className="dst-symptoms-section" style={{ backgroundColor: colors.lightBackground }}>
        <div className="dst-section-container">
          <h2 className="dst-section-title" style={{ color: colors.primary }}>
            Síntomas
          </h2>
          <div className="dst-symptoms-content">
            <div className="dst-symptoms-info">
              <p className="dst-symptoms-description">{symptomsSection.description}</p>
              <div className="dst-symptoms-grid">
                {symptomsSection.symptoms.map((symptom, index) => (
                  <div key={index} className="dst-symptom-card">
                    <div className="dst-symptom-icon" style={{ backgroundColor: colors.primary }}>
                      {symptom.icon}
                    </div>
                    <h4 className="dst-symptom-title">{symptom.title}</h4>
                    <p className="dst-symptom-description">{symptom.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="dst-symptoms-model">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
                <color attach="background" args={[colors.modelBackground]} />
                <ambientLight intensity={0.7} />
                <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <Environment preset="studio" />
                <Suspense fallback={<LoadingFallback />}>
                  {models.symptoms && (
                    <models.symptoms scale={[0.8, 0.8, 0.8]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                  )}
                </Suspense>
              </Canvas>
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
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
                <color attach="background" args={[colors.modelBackground]} />
                <ambientLight intensity={0.7} />
                <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <Environment preset="studio" />
                <Suspense fallback={<LoadingFallback />}>
                  {models.treatment && (
                    <models.treatment scale={[0.8, 0.8, 0.8]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                  )}
                </Suspense>
              </Canvas>
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
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
                <color attach="background" args={[colors.modelBackground]} />
                <ambientLight intensity={0.7} />
                <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <Environment preset="studio" />
                <Suspense fallback={<LoadingFallback />}>
                  {models.prevention && (
                    <models.prevention scale={[0.8, 0.8, 0.8]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                  )}
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DiseaseTemplate
