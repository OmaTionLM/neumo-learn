import { HealthyLung } from "../pages/diseases/pneumonia/models-3d/HealthyLung";
import { InfectedLung } from "../pages/diseases/pneumonia/models-3d/InfectedLung";
import { Vaccine } from "../pages/diseases/pneumonia/models-3d/Vaccine";
import { PillBottle } from "../pages/diseases/pneumonia/models-3d/PillBottle";

export const pneumoniaData = {
  title: "NEUMONÍA",
  colors: {
    primary: "#7b1fa2",
    secondary: "#9c27b0",
    lightBackground: "#f8f4ff",
    modelBackground: "#f0f0f0",
  },
  heroSection: {
    description:
      "La neumonía es una infección grave que afecta a los pulmones, causando que los alvéolos se llenen de líquido o pus, lo que dificulta la respiración y el intercambio de oxígeno.",
    additionalInfo:
      "Puede ser causada por bacterias, virus u hongos. La neumonía puede variar en gravedad desde leve hasta potencialmente mortal, especialmente en personas mayores, niños pequeños y aquellos con sistemas inmunológicos comprometidos.",
    statistics: [
      { number: "450M", text: "casos anuales mundiales" },
      { number: "4M", text: "muertes por año" },
      { number: "7%", text: "de todas las muertes" },
    ],
  },
  causesSection: {
    description:
      "La neumonía puede ser causada por diversos microorganismos patógenos y factores de riesgo. Identificar el agente causante es crucial para determinar el tratamiento más efectivo.",
    causes: [
      {
        icon: "🦠",
        title: "Bacterias",
        description:
          "Streptococcus pneumoniae es la causa más común. También Haemophilus influenzae, Staphylococcus aureus y bacterias atípicas como Mycoplasma.",
      },
      {
        icon: "🔬",
        title: "Virus",
        description:
          "Influenza A y B, virus respiratorio sincitial (VRS), adenovirus, y más recientemente SARS-CoV-2 (COVID-19).",
      },
      {
        icon: "🍄",
        title: "Hongos",
        description:
          "Pneumocystis jirovecii en pacientes inmunodeprimidos, Histoplasma, Coccidioides y Aspergillus en ciertas regiones geográficas.",
      },
      {
        icon: "🫁",
        title: "Aspiración",
        description:
          "Inhalación de contenido gástrico, saliva o cuerpos extraños, especialmente en pacientes con alteración de la conciencia o disfagia.",
      },
      {
        icon: "🏥",
        title: "Neumonía Nosocomial",
        description:
          "Adquirida en el hospital, causada por bacterias resistentes como Pseudomonas aeruginosa, Klebsiella pneumoniae y MRSA.",
      },
      {
        icon: "⚕️",
        title: "Factores de Riesgo",
        description:
          "Edad avanzada, inmunodepresión, enfermedades crónicas, tabaquismo, alcoholismo y hospitalización prolongada.",
      },
    ],
  },
  treatmentSection: {
    description:
      "El tratamiento de la neumonía depende del tipo de microorganismo causante y la gravedad de la infección. Es fundamental iniciar el tratamiento lo antes posible.",
    treatments: [
      {
        title: "Tratamiento Antibiótico",
        description: "Para neumonía bacteriana, el pilar del tratamiento son los antibióticos específicos.",
        methods: [
          "Amoxicilina para casos leves ambulatorios",
          "Azitromicina en pacientes alérgicos a penicilina",
          "Ceftriaxona + azitromicina para casos hospitalizados",
          "Vancomicina para casos resistentes",
        ],
      },
      {
        title: "Tratamiento Antiviral",
        description: "Para neumonía viral, se utilizan antivirales específicos cuando están disponibles.",
        methods: [
          "Oseltamivir para influenza",
          "Remdesivir para COVID-19",
          "Aciclovir para herpes virus",
          "Tratamiento de soporte en otros casos virales",
        ],
      },
      {
        title: "Cuidados de Soporte",
        description: "Medidas para aliviar síntomas y apoyar la recuperación del paciente.",
        methods: [
          "Oxígeno suplementario si es necesario",
          "Hidratación adecuada",
          "Analgésicos para el dolor",
          "Reposo y nutrición adecuada",
        ],
      },
    ],
  },
  preventionSection: {
    description:
      "La prevención de la neumonía incluye medidas de vacunación, higiene personal y mantenimiento de un sistema inmunológico saludable.",
    categories: [
      {
        title: "Vacunación",
        recommendations: [
          "Vacuna neumocócica (PCV13 y PPSV23)",
          "Vacuna anual contra la influenza",
          "Vacuna COVID-19 y refuerzos",
          "Vacuna Hib en niños",
        ],
      },
      {
        title: "Higiene Personal",
        recommendations: [
          "Lavado frecuente de manos con agua y jabón",
          "Uso de desinfectante de manos a base de alcohol",
          "Evitar tocarse la cara con manos sucias",
          "Cubrirse la boca al toser o estornudar",
        ],
      },
      {
        title: "Estilo de Vida Saludable",
        recommendations: [
          "No fumar y evitar el humo de segunda mano",
          "Mantener una dieta equilibrada rica en vitaminas",
          "Ejercicio regular para fortalecer el sistema inmune",
          "Dormir adecuadamente (7-9 horas por noche)",
        ],
      },
      {
        title: "Medidas Ambientales",
        recommendations: [
          "Evitar lugares con alta concentración de personas enfermas",
          "Mantener buena ventilación en espacios cerrados",
          "Limpiar y desinfectar superficies frecuentemente tocadas",
          "Usar mascarilla en situaciones de alto riesgo",
        ],
      },
    ],
  },
  models: {
    hero: HealthyLung,
    causes: InfectedLung,
    treatment: PillBottle,
    prevention: Vaccine,
  },
  Environment3D: {
    hero: null,
    causes: null,
    treatment: null,
    prevention: null,
  },
  // texts3D: {
  //   hero: { title: "Pulmón sano", id: "pneumonia-title-3d" },
  //   causes: { title: "Pulmón infectado", id: "pneumonia-title-3d" },
  //   treatment: { title: "Medicamentos", id: "pneumonia-title-3d" },
  //   prevention: { title: "Vacuna", id: "pneumonia-title-3d" },
  // },
  // InfoButtonModal: {
  //   hero: {
  //     buttonId: "button-healthy-pneumonia",
  //     buttonLabel: "Saber más💡",
  //     modalTitle: "¿Qué es la neumonía?",
  //     modalText: "La neumonía es una infección pulmonar que puede ser causada por bacterias, virus u hongos y puede ser potencialmente mortal si no se trata adecuadamente.",
  //   },
  //   causes: {
  //     buttonId: "button-infected-pneumonia",
  //     buttonLabel: "Causas",
  //     modalTitle: "¿Qué causa la neumonía?",
  //     modalText: "Las causas incluyen bacterias, virus, hongos, aspiración y factores de riesgo como edad avanzada y enfermedades crónicas.",
  //   },
  //   treatment: {
  //     buttonId: "button-pill-pneumonia",
  //     buttonLabel: "Tratamiento",
  //     modalTitle: "¿Cómo se trata?",
  //     modalText: "El tratamiento depende del agente causal e incluye antibióticos, antivirales y cuidados de soporte como oxígeno y líquidos.",
  //   },
  //   prevention: {
  //     buttonId: "button-vaccine-pneumonia",
  //     buttonLabel: "Prevención",
  //     modalTitle: "¿Cómo prevenir?",
  //     modalText: "La prevención incluye vacunación, higiene personal, evitar el tabaco y mantener un sistema inmunológico saludable.",
  //   },
  // },
};
