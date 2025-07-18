import { Environment, Stars } from "@react-three/drei";

const Staging = () => {
  return (
    <>
      <Environment
        files={"staging-asthma/hdris/surgery/hospital_room.hdr"}
        // files={[
        //     "nx.png",
        //     "ny.png",
        //     "nz.png",
        //     "px.png",
        //     "py.png",
        //     "pz.png",
        // ]}

        // path={"staging-asthma/cubemaps/surgery/"}
        environment={null}
        ground={{
          height: 10,
          radius: 100,
          scale: 0.05,
        }}
        background
      />
      {/* <Stars
        radius={500}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      /> */}
    </>
  );
};

export default Staging;
