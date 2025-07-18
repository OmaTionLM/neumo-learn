import { useState } from "react";
import { Html } from "@react-three/drei";
import "../Asthma.css";

const Info3DButtonModal = ({
  buttonId,
  buttonLabel,
  buttonPosition,
  modalTitle,
  modalText,
  closeId = "cerrar-modal",
  children,
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {!show && (
        <Html position={buttonPosition} transform={false} zIndexRange={[100]}>
          <button id={buttonId} onClick={() => setShow(true)}>
            {buttonLabel}
          </button>
        </Html>
      )}
      {show && (
        <div className="info-modal">
          <div className="info-modal-content">
            <h2>{modalTitle}</h2>
            <p>{modalText}</p>
            {children}
            <button id={closeId} onClick={() => setShow(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Info3DButtonModal;