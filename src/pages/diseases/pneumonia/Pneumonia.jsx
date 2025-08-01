import DiseaseTemplate from "../../../components/DiseaseTemplate/DiseaseTemplate";
import { pneumoniaData } from "../../../data/pneumoniaData";

const PneumoniaPage = () => {
  return (
    <DiseaseTemplate
      diseaseData={pneumoniaData}
      ModeloPosition={{
        hero: [0, 2, 5],
        causes: [0, 0, 3],
        treatment: [0, 0, 3],
        prevention: [0, 0, 5],
      }}
      ModeloScale={{
        hero: [1, 1, 1],
        causes: [1, 1, 1],
        treatment: [1, 1, 1],
        prevention: [1, 1, 1],
      }}
      ModeloRotation={{
        hero: [0, 0, 0],
        causes: [0, 0, 0],
        treatment: [0, 0, 0],
        prevention: [0, 0, 0],
      }}
      title3DPositions={{
        hero: [-0.5, 2, -1],
        causes: [2.5, 2, 0],
        treatment: [2.5, 2, 0.5],
        prevention: [3, 1, -2],
      }}
      Button3DPosition={{
        hero: [-1, -1, 0],
        causes: [-0.55, -1.5, 0],
        treatment: [-0.6, -1.5, 0],
        prevention: [-1, -1.4, 0],
      }}
    />
  );
};

export default PneumoniaPage;
