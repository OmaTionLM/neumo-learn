import { Environment } from "@react-three/drei"

const Staging = () => {
    return(
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
        ground = {{
            height: 40,
            radius : 100,
            scale: 0.5,

        }}

        background
        />
         

    )
}

export default Staging;