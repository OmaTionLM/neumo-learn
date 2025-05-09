import "./Pneumonia.css"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense } from "react"
import { HealthyLung } from "./models-3d/HealthyLung"
import { InfectedLung } from "./models-3d/InfectedLung"

// Componente de respaldo mientras se carga el modelo
const LoadingFallback = () => (
  <mesh>
    <sphereGeometry args={[1, 16, 16]} />
    <meshStandardMaterial color="#FF9999" wireframe />
  </mesh>
)

const Pneumonia = () => {
  return (
    <div className="pneumonia-container">
      <div className="hero-section">
          <h1 className="pneumonia-title">NEUMONÍA</h1>
          <div className="pneumonia-description">
            <div className="description-content">
              <p className="intro-text">
                La neumonía es una <span className="highlight">infección grave</span> que afecta a los pulmones,
                causando que los alvéolos se llenen de líquido o pus, lo que dificulta la respiración y el intercambio
                de oxígeno.
              </p>
              <div className="symptoms-box">
                <h3 className="symptoms-title">Síntomas principales:</h3>
                <ul className="symptoms-list">
                  <li>
                    <span className="symptom-icon">🔴</span> Fiebre y escalofríos
                  </li>
                  <li>
                    <span className="symptom-icon">🔴</span> Tos con flema
                  </li>
                  <li>
                    <span className="symptom-icon">🔴</span> Dificultad para respirar
                  </li>
                  <li>
                    <span className="symptom-icon">🔴</span> Dolor en el pecho
                  </li>
                </ul>
              </div>
              <p className="additional-info">
                Puede ser causada por bacterias, virus u hongos. La neumonía puede variar en gravedad desde leve hasta
                potencialmente mortal, especialmente en personas mayores, niños pequeños y aquellos con sistemas
                inmunológicos comprometidos.
              </p>
              <div className="stat-container">
                <div className="stat-box">
                  <span className="stat-number">450</span>
                  <span className="stat-text">millones de casos al año</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">4</span>
                  <span className="stat-text">millones de muertes anuales</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">7%</span>
                  <span className="stat-text">de todas las muertes mundiales</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="comparacion-section">
        <h2 className="comparacion-title">Comparación: Pulmón Sano vs. Pulmón con Neumonía</h2>

        <div className="modelos-comparacion">
          <div className="modelo-container">
            <h3 className="modelo-title">Pulmón Sano</h3>
            <div className="modelo3D">
              <Canvas camera={{ position: [0, 5, -5], fov: 50 }} shadows>
                <color attach="background" args={["#E6F7FF"]} />
                <ambientLight intensity={0.7} />
                <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <Environment preset="studio" />
                <Suspense fallback={<LoadingFallback />}>
                  <HealthyLung scale={[0.8, 0.8, 0.8]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                </Suspense>
              </Canvas>
            </div>
            <div className="descripcion-pulmon">
              <p>
                Un pulmón sano tiene alvéolos limpios y despejados que permiten un intercambio eficiente de oxígeno y
                dióxido de carbono. Los bronquios y bronquiolos están abiertos y libres de obstrucciones, permitiendo
                que el aire fluya sin dificultad.
              </p>
            </div>
          </div>

          <div className="modelo-container">
            <h3 className="modelo-title">Pulmón con Neumonía</h3>
            <div className="modelo3D">
              <Canvas camera={{ position: [5, 20, 250], fov: 50 }} shadows>
                <color attach="background" args={["#FFE6E6"]} />
                <ambientLight intensity={0.7} />
                <spotLight position={[5, 5, 5]} intensity={0.8} castShadow />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <Environment preset="studio" />
                <Suspense fallback={<LoadingFallback />}>
                  <InfectedLung scale={[0.8, 0.8, 0.8]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                </Suspense>
              </Canvas>
            </div>
            <div className="descripcion-pulmon">
              <p>
                En un pulmón con neumonía, los alvéolos se llenan de líquido inflamatorio y pus, lo que dificulta la
                respiración. El tejido pulmonar se inflama, causando dolor y reduciendo la capacidad del pulmón para
                absorber oxígeno y eliminar dióxido de carbono.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="sintomas-tratamiento">
          <div className="sintomas">
            <h2 className="section-title">Síntomas</h2>
            <ul className="symptom-list">
              <li>Tos con flema que puede contener sangre</li>
              <li>Fiebre alta, escalofríos y sudoración</li>
              <li>Dificultad para respirar, especialmente durante actividades</li>
              <li>Dolor agudo en el pecho que empeora al respirar profundamente</li>
              <li>Fatiga y debilidad</li>
              <li>Náuseas, vómitos o diarrea</li>
              <li>Confusión o cambios en la conciencia, especialmente en personas mayores</li>
            </ul>
          </div>
          <div className="tratamiento">
            <h2 className="section-title">Tratamiento</h2>
            <ul className="treatment-list">
              <li>
                <strong>Antibióticos:</strong> Para neumonía bacteriana
              </li>
              <li>
                <strong>Antivirales:</strong> Para ciertos tipos de neumonía viral
              </li>
              <li>
                <strong>Medicamentos para la fiebre:</strong> Para reducir la temperatura y el malestar
              </li>
              <li>
                <strong>Reposo:</strong> Descansar lo suficiente para permitir que el cuerpo combata la infección
              </li>
              <li>
                <strong>Hidratación:</strong> Beber muchos líquidos para ayudar a aflojar las secreciones
              </li>
              <li>
                <strong>Oxígeno suplementario:</strong> En casos graves para mantener niveles adecuados de oxígeno
              </li>
              <li>
                <strong>Hospitalización:</strong> Necesaria en casos graves o para pacientes de alto riesgo
              </li>
            </ul>
          </div>
        </div>

        <div className="prevencion">
          <h2 className="section-title">Prevención</h2>
          <p>
            La prevención de la neumonía incluye vacunarse contra la neumonía neumocócica y la gripe, mantener una buena
            higiene (lavarse las manos regularmente), evitar el tabaco, mantener un sistema inmunológico saludable con
            una dieta equilibrada y ejercicio regular, y evitar el contacto cercano con personas enfermas cuando sea
            posible.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Pneumonia
