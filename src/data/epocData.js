import { LungSickModel } from "../pages/diseases/epoc/models/ModeloPulmon";
import { AlveolusModel } from "../pages/diseases/epoc/models/ModeloAlveolus";
import { BronchiModel } from "../pages/diseases/epoc/models/ModeloBronquios";
import { PillBottle } from "../pages/diseases/pneumonia/models-3d/PillBottle";


export const epoceData = {
  title: "EPOC",
  colors: {
    primary: "#7b1fa2",
    secondary: "#9c27b0",
    lightBackground: "#f8f4ff",
    modelBackground: "#f0f0f0",
  },
  heroSection: {
    description:
      "La Enfermedad Pulmonar Obstructiva Crónica (EPOC) es una enfermedad progresiva que causa dificultad respiratoria debido al daño en los pulmones. Incluye enfisema y bronquitis crónica, caracterizándose por la obstrucción del flujo de aire que no es completamente reversible.",
    additionalInfo:
      "La EPOC es una de las principales causas de muerte en el mundo y es completamente prevenible. Aunque el daño pulmonar no se puede revertir completamente, el tratamiento puede ralentizar la progresión y mejorar significativamente la calidad de vida.",
    statistics: [
      { number: "384M", text: "personas afectadas mundialmente" },
      { number: "3.2M", text: "muertes anuales" },
      { number: "4ta", text: "causa de muerte global" },
    ],
  },
  causesSection: {
    description:
      "La EPOC es causada principalmente por la exposición prolongada a irritantes que dañan los pulmones y las vías respiratorias. El tabaquismo es la causa principal, pero existen otros factores importantes.",
    causes: [
      {
        icon: "🚬",
        title: "Tabaquismo",
        description:
          "Causa principal (85-90% de casos). El humo del tabaco contiene más de 4,000 químicos tóxicos que dañan progresivamente los pulmones.",
      },
      {
        icon: "🌫️",
        title: "Humo de Segunda Mano",
        description:
          "Exposición pasiva al humo del tabaco en el hogar, trabajo o espacios públicos, especialmente peligrosa en niños y adultos mayores.",
      },
      {
        icon: "🏭",
        title: "Contaminación Ambiental",
        description:
          "Contaminación del aire exterior por industrias, vehículos y quema de combustibles, así como contaminación interior por cocinas de leña.",
      },
      {
        icon: "⚒️",
        title: "Exposición Ocupacional",
        description:
          "Inhalación de polvo, vapores químicos, humos y gases en el lugar de trabajo, especialmente en minería, construcción y manufactura.",
      },
      {
        icon: "🧬",
        title: "Deficiencia Genética",
        description:
          "Deficiencia de alfa-1 antitripsina, una condición hereditaria rara que predispone al desarrollo temprano de enfisema.",
      },
      {
        icon: "🤧",
        title: "Infecciones Respiratorias",
        description:
          "Infecciones respiratorias frecuentes y severas durante la infancia que pueden afectar el desarrollo pulmonar normal.",
      },
    ],
  },
  treatmentSection: {
    description:
      "El tratamiento de la EPOC es multifacético, enfocándose en aliviar síntomas, mejorar la calidad de vida y prevenir exacerbaciones.",
    treatments: [
      {
        title: "Broncodilatadores",
        description: "Medicamentos que relajan los músculos de las vías respiratorias para facilitar la respiración.",
        methods: [
          "Beta-2 agonistas de acción corta (salbutamol) para rescate",
          "Beta-2 agonistas de acción prolongada (salmeterol, formoterol)",
          "Anticolinérgicos de acción corta (ipratropio)",
          "Anticolinérgicos de acción prolongada (tiotropio)",
        ],
      },
      {
        title: "Antiinflamatorios",
        description: "Medicamentos para reducir la inflamación en las vías respiratorias y prevenir exacerbaciones.",
        methods: [
          "Corticosteroides inhalados en combinación",
          "Corticosteroides orales para exacerbaciones",
          "Inhibidores de fosfodiesterasa-4 (roflumilast)",
          "Terapias combinadas (broncodilatador + corticosteroide)",
        ],
      },
      {
        title: "Terapias de Soporte",
        description: "Tratamientos complementarios para mejorar la función pulmonar y calidad de vida.",
        methods: [
          "Oxigenoterapia domiciliaria continua",
          "Rehabilitación pulmonar integral",
          "Ventilación no invasiva nocturna",
          "Cirugía de reducción de volumen pulmonar",
          "Trasplante pulmonar en casos seleccionados",
        ],
      },
    ],
  },
  preventionSection: {
    description:
      "La prevención de la EPOC se centra principalmente en evitar la exposición al tabaco y otros irritantes pulmonares, junto con el manejo de factores de riesgo.",
    categories: [
      {
        title: "Cesación del Tabaquismo",
        recommendations: [
          "Dejar de fumar completamente (medida más importante)",
          "Terapia de reemplazo de nicotina",
          "Medicamentos para dejar de fumar (varenicline, bupropión)",
          "Apoyo psicológico y grupos de apoyo",
          "Evitar la exposición al humo de segunda mano",
        ],
      },
      {
        title: "Protección Ambiental",
        recommendations: [
          "Evitar la contaminación del aire exterior",
          "Mejorar la calidad del aire interior",
          "Usar equipos de protección en trabajos de riesgo",
          "Evitar la exposición a químicos y vapores",
          "Mantener una buena ventilación en el hogar",
        ],
      },
      {
        title: "Fortalecimiento Inmunológico",
        recommendations: [
          "Vacunación anual contra la influenza",
          "Vacuna neumocócica según recomendaciones",
          "Vacuna COVID-19 y refuerzos",
          "Tratamiento temprano de infecciones respiratorias",
          "Mantener una buena higiene de manos",
        ],
      },
      {
        title: "Estilo de Vida Saludable",
        recommendations: [
          "Ejercicio regular adaptado a la capacidad",
          "Mantener un peso corporal saludable",
          "Dieta rica en antioxidantes y antiinflamatorios",
          "Técnicas de respiración y relajación",
          "Manejo del estrés y apoyo emocional",
          "Controles médicos regulares",
        ],
      },
    ],
  },
  models: {
    hero: LungSickModel,
    causes: AlveolusModel,
    treatment: BronchiModel,
    prevention: PillBottle,
  },
  Environment3D: {
    hero: null,
    causes: null,
    treatment: null,
    prevention: null,
  },
  // texts3D: {
  //   hero: { title: "Pulmón enfermo", id: "epoc-title-3d" },
  //   causes: { title: "Alvéolo", id: "epoc-title-3d" },
  //   treatment: { title: "Bronquios", id: "epoc-title-3d" },
  //   prevention: { title: "Prevención", id: "epoc-title-3d" },
  // },
  // InfoButtonModal: {
  //   hero: {
  //     buttonLabel: "Saber más💡",
  //     modalTitle: "¿Qué es EPOC?",
  //     modalText: "La EPOC es una enfermedad pulmonar crónica que causa dificultad para respirar y limita la calidad de vida. Incluye enfisema y bronquitis crónica.",
  //   },
  //   causes: {
  //     buttonLabel: "Causas",
  //     modalTitle: "¿Qué causa la EPOC?",
  //     modalText: "El tabaquismo es la causa principal, pero también influyen la contaminación ambiental, factores genéticos y exposiciones laborales.",
  //   },
  //   treatment: {
  //     buttonLabel: "Tratamiento",
  //     modalTitle: "¿Cómo se trata?",
  //     modalText: "El tratamiento incluye broncodilatadores, antiinflamatorios, oxigenoterapia y rehabilitación pulmonar.",
  //   },
  //   prevention: {
  //     buttonLabel: "Prevención",
  //     modalTitle: "¿Cómo prevenir?",
  //     modalText: "Evitar el tabaco, protegerse de contaminantes y mantener un estilo de vida saludable son claves para prevenir la EPOC.",
  //   },
  // },
};