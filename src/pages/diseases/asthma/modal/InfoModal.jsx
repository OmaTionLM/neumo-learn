import { Html } from "@react-three/drei";
import "./infoModal.css";

const InfoModal = ({ title, text, onClose, closeId = "cerrar-modal", children }) => {
  return (
      <div className="info-modal">
        <div className="info-modal-content">
          <h2 id="title-modal">{title}</h2>
          <p id="text-modal">{text}</p>
          {children}
          <button id={closeId} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
  );
};

export default InfoModal;