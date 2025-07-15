import { LungSickModel } from "../pages/diseases/epoc/models/ModeloPulmon"
import { AlveolusModel } from "../pages/diseases/epoc/models/ModeloAlveolus"
import { BronchiModel } from "../pages/diseases/epoc/models/ModeloBronquios"

export const epoceData = {
  title: "EPOC",
  colors: {
    primary: "#FF9800",
    secondary: "#F57C00",
    lightBackground: "#FFF3E0",
    modelBackground: "#fffaf0",
  },
  heroSection: {
    description:
      "La Enfermedad Pulmonar Obstructiva Crónica (EPOC) es una enfermedad progresiva que causa dificultad respiratoria debido al daño en los pulmones. Incluye enfisema y bronquitis crónica, caracterizándose por la obstrucción del flujo de aire que no es completamente reversible.",
    causes: [
      "Tabaquismo (causa principal - 85-90% de casos)",
      "Exposición a humo de segunda mano",
      "Contaminación del aire interior y exterior",
      "Exposición ocupacional (polvo, químicos, vapores)",
      "Deficiencia de alfa-1 antitripsina (genética)",
      "Infecciones respiratorias frecuentes en la infancia",
    ],
    additionalInfo:
      "La EPOC es una de las principales causas de muerte en el mundo y es completamente prevenible. Aunque el daño pulmonar no se puede revertir completamente, el tratamiento puede ralentizar la progresión y mejorar significativamente la calidad de vida.",
    statistics: [
      { number: "384M", text: "personas afectadas mundialmente" },
      { number: "3.2M", text: "muertes anuales" },
      { number: "4ta", text: "causa de muerte global" },
    ],
  },
  symptomsSection: {
    description:
      "Los síntomas de la EPOC se desarrollan gradualmente y empeoran con el tiempo. El reconocimiento temprano permite un mejor manejo de la enfermedad.",
    symptoms: [
      {
        icon: "💨",
        title: "Disnea progresiva",
        description:
          "Dificultad respiratoria que inicialmente ocurre con el esfuerzo y progresa hasta presentarse en reposo.",
      },
      {
        icon: "🤧",
        title: "Tos crónica",
        description: "Tos persistente que dura más de 3 meses al año durante 2 años consecutivos, a menudo productiva.",
      },
      {
        icon: "🟡",
        title: "Expectoración",
        description: "Producción excesiva de mucosidad espesa, a menudo de color amarillento o verdoso.",
      },
      {
        icon: "🌪️",
        title: "Sibilancias",
        description: "Sonidos silbantes al respirar debido al estrechamiento de las vías respiratorias.",
      },
      {
        icon: "😴",
        title: "Fatiga crónica",
        description: "Cansancio extremo y falta de energía que interfiere con las actividades diarias normales.",
      },
      {
        icon: "⚖️",
        title: "Pérdida de peso",
        description: "Pérdida de peso no intencional debido al aumento del trabajo respiratorio y pérdida de apetito.",
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
    symptoms: AlveolusModel,
    treatment: BronchiModel,
    prevention: null,
  },
}
