import { Html } from "@react-three/drei";
import { useState } from "react";

const Etiqueta = ({ position, title, description, audio }) => {
  const [show, setShow] = useState(false);

  const reproducirAudio = () => {
    if (audio === "voz") {
      const speech = new SpeechSynthesisUtterance(description);
      speech.lang = "es-ES";
      window.speechSynthesis.speak(speech);
    } else if (audio) {
      const audioElement = new Audio(audio);
      audioElement.play();
    }
  };

  return (
    <Html position={position} center>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{
          background: "rgba(0,0,0,0.6)",
          padding: "8px",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
        }}
      >
        {title}
        {show && (
          <div style={{ marginTop: "5px" }}>
            <p style={{ margin: 0 }}>{description}</p>
            <button
              style={{
                marginTop: "5px",
                background: "#2d88ff",
                color: "white",
                border: "none",
                padding: "4px 8px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={reproducirAudio}
            >
              🔊 Escuchar
            </button>
          </div>
        )}
      </div>
    </Html>
  );
};

export default Etiqueta;


