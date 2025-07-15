import { HealthyLung } from "../pages/diseases/pneumonia/models-3d/HealthyLung"
import { InfectedLung } from "../pages/diseases/pneumonia/models-3d/InfectedLung"
import { Vaccine } from "../pages/diseases/pneumonia/models-3d/Vaccine"
import { PillBottle } from "../pages/diseases/pneumonia/models-3d/PillBottle"

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
    causes: [
      "Bacterias (Streptococcus pneumoniae)",
      "Virus (influenza, COVID-19)",
      "Hongos (en personas inmunodeprimidas)",
      "Aspiración de contenido gástrico",
    ],
    additionalInfo:
      "Puede ser causada por bacterias, virus u hongos. La neumonía puede variar en gravedad desde leve hasta potencialmente mortal, especialmente en personas mayores, niños pequeños y aquellos con sistemas inmunológicos comprometidos.",
    statistics: [
      { number: "450M", text: "casos anuales mundiales" },
      { number: "4M", text: "muertes por año" },
      { number: "7%", text: "de todas las muertes" },
    ],
  },
  symptomsSection: {
    description:
      "Los síntomas de la neumonía pueden variar desde leves hasta graves, y su reconocimiento temprano es crucial para un tratamiento efectivo.",
    symptoms: [
      {
        icon: "🔥",
        title: "Fiebre alta",
        description: "Temperatura corporal elevada, a menudo acompañada de escalofríos y sudoración.",
      },
      {
        icon: "💨",
        title: "Dificultad respiratoria",
        description: "Sensación de falta de aire, especialmente durante actividades físicas.",
      },
      {
        icon: "🤧",
        title: "Tos productiva",
        description: "Tos con flema que puede contener sangre o tener color amarillento/verdoso.",
      },
      {
        icon: "💔",
        title: "Dolor torácico",
        description: "Dolor agudo en el pecho que empeora al respirar profundamente o toser.",
      },
      {
        icon: "😴",
        title: "Fatiga extrema",
        description: "Cansancio severo y debilidad que interfiere con las actividades diarias.",
      },
      {
        icon: "🤢",
        title: "Síntomas gastrointestinales",
        description: "Náuseas, vómitos o diarrea, especialmente en casos graves.",
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
    symptoms: InfectedLung,
    treatment: PillBottle,
    prevention: Vaccine,
  },
}
