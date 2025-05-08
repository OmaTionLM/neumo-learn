const Floor = ({ x, y , position, color}) => {
  // const PATH = useMemo(() => "textures/asthma/floor/silver_" , []);

  // const floorTexture = useTexture({
  //     map: PATH + "preview.jpg",
  //     normalMap: PATH + "normal-ogl.png",
  //     roughnessMap: PATH + "roughness.png",
  //     aoMap: PATH + "ao.png",
  //     metalnessMap: PATH + "metallic.png",
  // });

  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow={true} position={position} color={color}>

      <circleGeometry args={[x, y]} />
      <meshStandardMaterial color={color} />
      <shadowMaterial opacity={0.2} />
    </mesh>
    
  );
};

export default Floor;
