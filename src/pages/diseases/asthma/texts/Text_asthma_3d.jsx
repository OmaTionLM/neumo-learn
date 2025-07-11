import "./Text_asthma_3d.css"
import { Html } from "@react-three/drei"

const Title = ({title, id, position=[0,0,0]}) => {
    return (
        <Html
        // occlude
        position={position}
        distanceFactor={5}
        wrapperClass="title"
        billboard
        >
            <h1 id={id}>{title}</h1>
            </Html>
    );
};

export default Title;