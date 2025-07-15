  import ModeloVascular from "../pages/diseases/embolia/models-3d/vascular/ModeloVascular"
  import VistaDetalle from "../pages/diseases/embolia/models-3d/seccion-1/ModeloSeccion1"
  import VistaSintomas from "../pages/diseases/embolia/models-3d/seccion-2/ModeloSeccion2"

export const emboliaData = {
  title: "EMBOLIA PULMONAR",
  colors: {
    primary: "#D32F2F",
    secondary: "#F44336",
    lightBackground: "#FFEBEE",
    modelBackground: "#fff5f5",
  },
  heroSection: {
    description:
      "La embolia pulmonar es una condición potencialmente mortal que ocurre cuando un coágulo de sangre (émbolo) bloquea una o más arterias pulmonares, impidiendo el flujo sanguíneo normal hacia los pulmones y afectando el intercambio de oxígeno.",
    causes: [
      "Trombosis venosa profunda (TVP)",
      "Inmovilización prolongada (vuelos largos, reposo en cama)",
      "Cirugías mayores, especialmente ortopédicas",
      "Fracturas de huesos largos",
      "Cáncer y tratamientos oncológicos",
      "Embarazo y puerperio",
      "Anticonceptivos orales y terapia hormonal",
    ],
    additionalInfo:
      "La embolia pulmonar es una emergencia médica que requiere diagnóstico y tratamiento inmediatos. La mayoría de los émbolos se originan en las venas profundas de las piernas, pero también pueden formarse en otras partes del cuerpo.",
    statistics: [
      { number: "600K", text: "casos anuales en EE.UU." },
      { number: "100K", text: "muertes anuales" },
      { number: "30%", text: "mortalidad sin tratamiento" },
    ],
  },
  symptomsSection: {
    description:
      "Los síntomas de la embolia pulmonar pueden variar desde leves hasta severos y potencialmente mortales. El reconocimiento temprano es crucial para un tratamiento exitoso.",
    symptoms: [
      {
        icon: "💨",
        title: "Disnea súbita",
        description: "Dificultad respiratoria de aparición repentina que puede empeorar con el esfuerzo físico.",
      },
      {
        icon: "💔",
        title: "Dolor torácico agudo",
        description: "Dolor punzante en el pecho que empeora al respirar profundamente, toser o moverse.",
      },
      {
        icon: "🤧",
        title: "Tos con sangre",
        description: "Tos que puede producir esputo con sangre (hemoptisis), indicando daño pulmonar.",
      },
      {
        icon: "💓",
        title: "Taquicardia",
        description: "Frecuencia cardíaca acelerada como respuesta del corazón a la falta de oxígeno.",
      },
      {
        icon: "😰",
        title: "Ansiedad severa",
        description: "Sensación de muerte inminente, pánico o ansiedad extrema sin causa aparente.",
      },
      {
        icon: "🥵",
        title: "Síntomas sistémicos",
        description: "Sudoración excesiva, mareos, desmayos o coloración azulada de labios y uñas.",
      },
    ],
  },
  treatmentSection: {
    description:
      "El tratamiento de la embolia pulmonar es una emergencia médica que requiere intervención inmediata para restaurar el flujo sanguíneo y prevenir complicaciones.",
    treatments: [
      {
        title: "Anticoagulación",
        description:
          "Tratamiento principal para prevenir la formación de nuevos coágulos y permitir la disolución natural.",
        methods: [
          "Heparina intravenosa para anticoagulación inmediata",
          "Heparinas de bajo peso molecular (enoxaparina)",
          "Anticoagulantes orales (warfarina, rivaroxabán, apixabán)",
          "Monitoreo regular de tiempos de coagulación",
        ],
      },
      {
        title: "Terapia Trombolítica",
        description: "Medicamentos que disuelven activamente los coágulos en casos severos o masivos.",
        methods: [
          "Alteplasa (tPA) para émbolos masivos",
          "Estreptoquinasa en casos seleccionados",
          "Trombolisis dirigida por catéter",
          "Evaluación cuidadosa del riesgo de sangrado",
        ],
      },
      {
        title: "Intervenciones Mecánicas",
        description: "Procedimientos invasivos para casos severos que no responden a medicamentos.",
        methods: [
          "Embolectomía pulmonar quirúrgica",
          "Trombectomía percutánea con catéter",
          "Filtros de vena cava inferior",
          "Soporte con ECMO en casos críticos",
        ],
      },
    ],
  },
  preventionSection: {
    description:
      "La prevención de la embolia pulmonar se centra en reducir el riesgo de formación de coágulos, especialmente en situaciones de alto riesgo.",
    categories: [
      {
        title: "Movilización Temprana",
        recommendations: [
          "Levantarse y caminar regularmente durante viajes largos",
          "Ejercicios de flexión de tobillos y pantorrillas",
          "Movilización precoz después de cirugías",
          "Fisioterapia en pacientes hospitalizados",
          "Evitar períodos prolongados de inmovilidad",
        ],
      },
      {
        title: "Profilaxis Farmacológica",
        recommendations: [
          "Heparina de bajo peso molecular en cirugías de alto riesgo",
          "Anticoagulantes orales en pacientes de riesgo",
          "Aspirina en casos seleccionados",
          "Evaluación del riesgo trombótico individual",
          "Ajuste de dosis según función renal",
        ],
      },
      {
        title: "Medidas Mecánicas",
        recommendations: [
          "Medias de compresión graduada",
          "Dispositivos de compresión neumática intermitente",
          "Elevación de extremidades inferiores",
          "Masaje de pantorrillas en pacientes encamados",
          "Filtros de vena cava en casos específicos",
        ],
      },
      {
        title: "Factores de Riesgo Modificables",
        recommendations: [
          "Mantener un peso corporal saludable",
          "Dejar de fumar completamente",
          "Control adecuado de la diabetes",
          "Manejo de la hipertensión arterial",
          "Evaluación de terapia hormonal en mujeres",
          "Hidratación adecuada, especialmente en viajes",
        ],
      },
    ],
  },
  models: {
    hero: ModeloVascular,
    symptoms: null,
    treatment: null,
    prevention: null,
  },
}
