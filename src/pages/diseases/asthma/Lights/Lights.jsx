import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from "three";

const Lights = () => {
    const directionalLightRef = useRef();
    // useHelper(directionalLightRef, DirectionalLightHelper , 1, "red");

    const pointLightRef = useRef();
    // useHelper(directionalLightRef, PointLightHelper , 2, "red");

    const spotLightRef = useRef();
    // useHelper(spotLightRef,SpotLightHelper);

    const hemisphereLightRef = useRef();
    // useHelper(hemisphereLightRef, HemisphereLightHelper);

    return (
        <>

        {/* <hemisphereLight
            ref={hemisphereLightRef}
            color={"black"}
            groundColor={"black"}
           intensity={2}

        />
        <spotLight
            ref={spotLightRef}
            color={"white"}
            position={[4, 2, -2]}
            distance={10}
            intensity={100}
            angle={Math.PI / 4}
            penumbra={1}
         />


        <pointLight 
            color={"green"} 
            position={[0, 2, -4]} 
            intensity={10} 
        /> */}

        <ambientLight 
            intensity={0.5} 
            color="#ffffff" 
            position={[0, 0, 0]}
            castShadow={true} 
        />

        <directionalLight
            ref={directionalLightRef} 
            position={[0, 5, 5]} 
            intensity={1.2} 
            color={"white"} 
            castShadow={true} 
        />

        </>
    )}

    export default Lights;