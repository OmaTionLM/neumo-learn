import { Environment} from "@react-three/drei";

const Staging_3 = () => {
  return (
    <>
      <Environment
        files={"staging-asthma/hdris/surgery/house.hdr"}

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
          height: 40,
          radius: 100,
          scale: 0.5,
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

export default Staging_3;
