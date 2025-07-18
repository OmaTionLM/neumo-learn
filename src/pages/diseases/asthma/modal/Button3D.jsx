import { Html } from "@react-three/drei";
import "./Button3D.css";

const Button3D = ({ buttonLabel, buttonPosition, onClick }) => {
  return (
    <Html position={buttonPosition} transform={false} zIndexRange={[100]}>
      <button id="button-modal" onClick={onClick}>
        {buttonLabel}
      </button>
    </Html>
  );
};

export default Button3D;