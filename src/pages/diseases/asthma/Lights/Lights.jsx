const Lights = () => {
    return (
        <>
        <ambientLight intensity={0.5} 
        color="#ffffff" position={[0, 0, 0]} 
        castShadow={true} />

        <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" castShadow={true} />
        </>
    )}

    export default Lights;