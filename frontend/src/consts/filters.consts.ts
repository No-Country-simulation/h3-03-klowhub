import { Platform, Language } from "@/types/global.types";
import { Sectors, Funcionalitites, ToolsAndPlatforms, WorkMethodology, ContentType, CourseDificulty, CoreContent, AccessType, ExperienceLevel } from "./filters.types";

type Filter<T> = {
  header: string
  items: {
    name: T
    label: string
  }[]
}

export const platform: Filter<Platform> = {
  header: "Plataforma",
  items: [
    { name: "appsheet", label: "App sheet" },
    { name: "powerapps", label: "Power apps" }
  ]
};

export const language: Filter<Language> = {
  header: "Idiomas",
  items: [
    { name: "español", label: "Español" },
    { name: "inglés", label: "Inglés" }
  ]
};

export const sector: Filter<Sectors> = {
  header: "Sector",
  items: [
    { name: "industria", label: "Industria" },
    { name: "gestión-del-tiempo", label: "Gestión del tiempo" },
    { name: "gestión-de-proyectos", label: "Gestión de proyectos" },
    { name: "gestión-de-inventarios", label: "Gestión de inventarios" },
    { name: "ventas-y-crm", label: "Ventas y crm" },
    { name: "obras-y-construcción", label: "Obras y construcción" },
    { name: "logística-y-transporte", label: "Logística y transporte" },
    { name: "servicios-profesionales", label: "Servicios profesionales" },
    { name: "marketing-digital", label: "Marketing digital" },
    { name: "e_commerce", label: "E commerce" },
    { name: "entretenimiento-y-medios", label: "Entretenimiento y medios" },
    { name: "seguridad-y-vigilancia", label: "Seguridad y vigilancia" },
    { name: "investigación-y-desarrollo", label: "Investigación y desarrollo" },
    { name: "agricultura-y-medio-ambiente", label: "Agricultura y medio ambiente" },
    { name: "administración", label: "Administración" },
  ] as const
};

export const functionalities: Filter<Funcionalitites> = {
  header: "Funcionalidades",
  items: [
    { name: "calendario", label: "Calendario" },
    { name: "generación-de-pdf", label: "Generación de pdf" },
    { name: "reportes-automáticos", label: "Reportes automáticos" },
    { name: "chatbot-(bot)", label: "Chatbot (bot)" },
    { name: "emails", label: "Emails" },
    { name: "sms", label: "Sms" },
    { name: "notificaciones-push", label: "Notificaciones push" },
    { name: "generación-y-escaneo-qr", label: "Generación y \n Escaneo QR" },
    { name: "geolocalización", label: "Geolocalización" },
    { name: "ocr", label: "Ocr" },
    { name: "machine-learning", label: "Machine learning" },
    { name: "estadísticas-de-uso", label: "Estadísticas de uso" },
    { name: "dashboard_reportes-y-análisis", label: "Dashboard - \n Reportes y análisis" },
    { name: "gestión-de-usuarios", label: "Gestión de usuarios" },
    { name: "reporting-avanzado", label: "Reporting avanzado" },
    { name: "integración-de-datos", label: "Integración de datos" },
    { name: "gestión-de-permisos", label: "Gestión de permisos" },
    { name: "análisis-de-datos", label: "Análisis de datos" },
    { name: "optimización_performance", label: "Optimización -\n Performance" },
    { name: "despliegue_deploy", label: "Despliegue-Deploy" },
    { name: "importación_exportación-de-datos", label: "Importación - Exportación \n de datos" },
    { name: "firmas-digitales", label: "Firmas digitales" },
    { name: "escaneo-de-documentos", label: "Escaneo de \n documentos" },
    { name: "monitor-de-automatizaciones", label: "Monitor de \n automatizaciones" },
    { name: "historial-de-auditoría", label: "Historial de auditoría" },
    { name: "api_integraciones", label: "Api integraciones" }
  ]
};

export const toolsAndPlatforms: Filter<ToolsAndPlatforms> = {
  header: "Herramientas y Plataformas",
  items: [
    { name: "google-sheets", label: "Google sheets" },
    { name: "looker-studio", label: "Looker studio" },
    { name: "mysql", label: "Mysql" },
    { name: "postgresql", label: "Postgresql" },
    { name: "salesforce", label: "Salesforce" },
    { name: "airtable", label: "Airtable" },
    { name: "dropbox", label: "Dropbox" },
    { name: "box", label: "Box" },
    { name: "google-analytics", label: "Google analytics" },
    { name: "zapier", label: "Zapier" },
    { name: "wordpress", label: "Wordpress" },
    { name: "shopify", label: "Shopify" },
    { name: "whatsapp-api", label: "Whatsapp api" },
    { name: "power-bi", label: "Power bi" },
    { name: "twilio", label: "Twilio" },
    { name: "trello", label: "Trello" },
    { name: "google-calendar", label: "Google calendar" },
    { name: "google-drive", label: "Google drive" },
    { name: "google-maps", label: "Google maps" }
  ]
};

export const accessType: Filter<AccessType> = {
  header: "Tipo de acceso",
  items: [
    { name: "payed", label: "Pago" },
    { name: "free", label: "Gratuito" },
  ]
};

export const contentType: Filter<ContentType> = {
  header: "Tipo de contenido",
  items: [
    { name: "curso", label: "Curso" },
    { name: "leccion", label: "Lección" },
  ]
};

export const level: Filter<CourseDificulty> = {
  header: "Nivel de competencia",
  items: [
    { name: "basic", label: "Básico" },
    { name: "intermediate", label: "Intermedio" },
  ]
};

export const coreContent: Filter<CoreContent> = {
  header: "Pilar de contenido",
  items: [
    { name: "ux-ui", label: "UX-UI" },
    { name: "databases", label: "Base de datos" },
    { name: "expressions-and-formulas", label: "Expresiones y fórmulas" },
    { name: "automation", label: "Automatización" },
    { name: "workflows", label: "Flujos de trabajo" },
    { name: "actions-behavior", label: "Acciones-Behavior" },
    { name: "security-accesibility", label: "Seguridad-Accesibilidad" },
    { name: "general", label: "General" },
  ]
};

export const workMethodology: Filter<WorkMethodology> = {
  header: "Sector",
  items: [
    { name: "por-hora", label: "Por hora" },
    { name: "por-proyecto", label: "Por proyecto" },
    { name: "contrato-abierto", label: "Contrato abierto" },
    { name: "contrato-temporal", label: "Contrato temporal" },
  ] as const
};

export const experienceLevel: Filter<ExperienceLevel> = {
  header: "Sector",
  items: [
    { name: "sin-experiencia-previa", label: "Sin experiencia previa" },
    { name: "junior", label: "Junior" },
    { name: "semi-senior", label: "Semi senior" },
    { name: "senior", label: "Senior" },
  ] as const
};

