import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Environment, Stars, Sparkles } from '@react-three/drei';
import ModeloPulmon from './models-3d/EstructuraPulmon';
import ModeloEmbolo from './models-3d/Vascular';
import './DisenoEmbolia.css';

export default function EmboliaPulmonar() {
  return (
    <div className="embolia-container">
      {/* SECCIÓN 1 */}
      <section className="seccion">
        <div className="texto">
          <h1>🫁 ¿Qué es la Embolia Pulmonar?</h1>
          <p>
            La embolia pulmonar es una obstrucción en una arteria del pulmón, 
            causada por coágulos sanguíneos. Puede reducir el oxígeno en la sangre y dañar tejidos pulmonares.
          </p>
        </div>

        <Canvas shadows camera={{ position: [0, 1.5, 4.5], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[2, 4, 2]} intensity={1.2} castShadow />
          <Environment preset="sunset" />
          <ModeloPulmon />

          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.3} />
          </mesh>

          <OrbitControls />
          <Html position={[0, 1.8, 0]}>
            <button className="boton-accion" onClick={() => alert('Más info sobre el tratamiento')}>
              Ver tratamiento
            </button>
          </Html>
        </Canvas>
      </section>

      {/* SECCIÓN 2 */}
      <section className="seccion">
        <div className="texto">
          <h2>📋 Síntomas y Causas</h2>
          <p>Descubre los síntomas más comunes de una embolia pulmonar:</p>
          <ul>
            <li>Dificultad para respirar</li>
            <li>Dolor en el pecho al inhalar</li>
            <li>Tos con sangre</li>
            <li>Coloración azulada</li>
          </ul>
        </div>

        <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 50 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[-3, 3, 3]} intensity={0.7} color="red" />
          <Environment preset="night" />
          <Stars />
          <Sparkles count={40} scale={6} speed={0.5} />
          <ModeloEmbolo />

          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.2} />
          </mesh>

          <OrbitControls />
          <Html position={[0, 2, 0]}>
            <input
              className="input-html"
              type="text"
              placeholder="¿Tienes estos síntomas?"
              onKeyDown={(e) => {
                if (e.key === 'Enter') alert('Consulta médica recomendada');
              }}
            />
          </Html>
        </Canvas>
      </section>
    </div>
  );
}

