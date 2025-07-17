import { Bottle } from "../pages/diseases/asthma/models-3d/Bottle"
import { Inhaler } from "../pages/diseases/asthma/models-3d/Inhaler"
import { Cigarette } from "../pages/diseases/asthma/models-3d/Cigarette"
import Mask from "../pages/diseases/asthma/models-3d/Mask"
import Staging from "../pages/diseases/asthma/staging/Staging"
import Staging_2 from "../pages/diseases/asthma/staging/Staging_2"
import Title from "../pages/diseases/asthma/texts/Text_asthma_3d"
import Staging_3 from "../pages/diseases/asthma/staging/Staging_3"

export const asthmaData = {
  title: "ASMA",
  colors: {
    primary: "#2196F3",
    secondary: "#1976D2",
    lightBackground: "#E3F2FD",
    modelBackground: "#f0f8ff",
  },
  heroSection: {
    description:
      "El asma es una enfermedad crónica que afecta las vías respiratorias, causando inflamación y estrechamiento de los bronquios, lo que dificulta la respiración y provoca episodios recurrentes de sibilancias, tos y falta de aire.",
    additionalInfo:
      "El asma afecta a personas de todas las edades, pero a menudo comienza en la infancia. Es una condición que puede controlarse efectivamente con el tratamiento adecuado, permitiendo a los pacientes llevar una vida normal y activa.",
    statistics: [
      { number: "300M", text: "personas afectadas mundialmente" },
      { number: "250K", text: "muertes anuales" },
      { number: "10%", text: "de niños tienen asma" },
    ],
  },
  causesSection: {
    description:
      "El asma puede ser desencadenado por múltiples factores ambientales, genéticos y emocionales. Identificar y evitar estos desencadenantes es fundamental para el control de la enfermedad.",
    causes: [
      {
        icon: "🌸",
        title: "Alérgenos Ambientales",
        description:
          "Polen de árboles, pastos y malezas, ácaros del polvo doméstico, caspa de mascotas y esporas de moho.",
      },
      {
        icon: "🚭",
        title: "Irritantes del Aire",
        description:
          "Humo del tabaco, contaminación del aire, vapores químicos, perfumes fuertes y productos de limpieza.",
      },
      {
        icon: "🦠",
        title: "Infecciones Respiratorias",
        description:
          "Resfriados comunes, gripe, sinusitis y otras infecciones virales o bacterianas del tracto respiratorio.",
      },
      {
        icon: "🏃",
        title: "Ejercicio Físico",
        description:
          "Actividad física intensa, especialmente en ambientes fríos y secos, puede desencadenar broncoespasmo.",
      },
      {
        icon: "😰",
        title: "Factores Emocionales",
        description: "Estrés emocional intenso, ansiedad, risa excesiva o llanto pueden provocar episodios asmáticos.",
      },
      {
        icon: "🌡️",
        title: "Cambios Climáticos",
        description: "Cambios bruscos de temperatura, alta humedad, tormentas y cambios de presión barométrica.",
      },
    ],
  },
  treatmentSection: {
    description:
      "El tratamiento del asma se basa en un enfoque escalonado que incluye medicamentos de control a largo plazo y medicamentos de rescate para crisis agudas.",
    treatments: [
      {
        title: "Medicamentos de Control",
        description: "Tratamientos diarios para prevenir síntomas y mantener el asma bajo control a largo plazo.",
        methods: [
          "Corticosteroides inhalados (fluticasona, budesonida)",
          "Broncodilatadores de acción prolongada (salmeterol, formoterol)",
          "Modificadores de leucotrienos (montelukast)",
          "Terapias combinadas (corticosteroide + broncodilatador)",
        ],
      },
      {
        title: "Medicamentos de Rescate",
        description: "Tratamientos de acción rápida para aliviar síntomas agudos y crisis asmáticas.",
        methods: [
          "Broncodilatadores de acción corta (salbutamol, terbutalina)",
          "Corticosteroides orales para crisis severas",
          "Anticolinérgicos inhalados (ipratropio)",
          "Epinefrina para reacciones alérgicas severas",
        ],
      },
      {
        title: "Terapias Complementarias",
        description: "Enfoques adicionales para mejorar el control del asma y la calidad de vida.",
        methods: [
          "Inmunoterapia para alergias específicas",
          "Educación sobre técnicas de inhalación",
          "Fisioterapia respiratoria",
          "Manejo del estrés y técnicas de relajación",
        ],
      },
    ],
  },
  preventionSection: {
    description:
      "La prevención del asma se centra en evitar desencadenantes conocidos, mantener un ambiente saludable y seguir un plan de manejo personalizado.",
    categories: [
      {
        title: "Control de Alérgenos",
        recommendations: [
          "Usar fundas antialérgicas en colchones y almohadas",
          "Lavar ropa de cama semanalmente en agua caliente",
          "Mantener la humedad del hogar entre 30-50%",
          "Evitar alfombras y cortinas que acumulen polvo",
          "Controlar la caspa de mascotas",
        ],
      },
      {
        title: "Calidad del Aire",
        recommendations: [
          "Evitar la exposición al humo del tabaco",
          "Usar purificadores de aire con filtros HEPA",
          "Evitar salir durante días de alta contaminación",
          "Ventilar adecuadamente los espacios cerrados",
          "Evitar productos químicos fuertes y aerosoles",
        ],
      },
      {
        title: "Estilo de Vida",
        recommendations: [
          "Mantener un peso saludable",
          "Realizar ejercicio regular adaptado a la condición",
          "Practicar técnicas de manejo del estrés",
          "Dormir adecuadamente (7-9 horas por noche)",
          "Seguir una dieta antiinflamatoria rica en omega-3",
        ],
      },
      {
        title: "Monitoreo y Seguimiento",
        recommendations: [
          "Usar un medidor de flujo espiratorio máximo",
          "Llevar un diario de síntomas y desencadenantes",
          "Tener un plan de acción para el asma por escrito",
          "Realizar controles médicos regulares",
          "Mantener medicamentos de rescate siempre disponibles",
        ],
      },
    ],
  },
  models: {
    hero: Mask,
    causes: Bottle,
    treatment: Inhaler,
    prevention: Cigarette,
  },
}
