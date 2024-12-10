import { Platform, Language } from "@/types/global.types";
import { 
  Sectors,
  Funcionalitites, 
  ToolsAndPlatforms, 
  WorkMethodology, 
  ContentType, 
  CourseDificulty, 
  CoreContent, 
  AccessType, 
  ExperienceLevel,
  Tag
} from "./filters.types";

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
    { name: "spanish", label: "Español" },
    { name: "english", label: "Inglés" }
  ]
};

export const sector: Filter<Sectors> = {
  header: "Sector",
  items: [
    { name: "industria", label: "Industria" },
    { name: "gestion-del-tiempo", label: "Gestión del tiempo" },
    { name: "gestion-de-proyectos", label: "Gestión de proyectos" },
    { name: "gestion-de-inventarios", label: "Gestión de inventarios" },
    { name: "ventas-y-crm", label: "Ventas y crm" },
    { name: "obras-y-construccion", label: "Obras y construcción" },
    { name: "logistica-y-transporte", label: "Logística y transporte" },
    { name: "servicios-profesionales", label: "Servicios profesionales" },
    { name: "marketing-digital", label: "Marketing digital" },
    { name: "e-commerce", label: "E commerce" },
    { name: "entretenimiento-y-medios", label: "Entretenimiento y medios" },
    { name: "seguridad-y-vigilancia", label: "Seguridad y vigilancia" },
    { name: "investigacion-y-desarrollo", label: "Investigación y desarrollo" },
    { name: "agricultura-y-medio-ambiente", label: "Agricultura y medio ambiente" },
    { name: "administracion", label: "Administración" },
  ] as const
};

export const functionalities: Filter<Funcionalitites> = {
  header: "Funcionalidades",
  items: [
    { name: "calendario", label: "Calendario" },
    { name: "generacion-de-pdf", label: "Generación de pdf" },
    { name: "reportes-automaticos", label: "Reportes automáticos" },
    { name: "chatbot-bot", label: "Chatbot (bot)" },
    { name: "emails", label: "Emails" },
    { name: "sms", label: "Sms" },
    { name: "notificaciones-push", label: "Notificaciones push" },
    { name: "generacion-y-escaneo-qr", label: "Generación y \n Escaneo QR" },
    { name: "geolocalizacion", label: "Geolocalización" },
    { name: "ocr", label: "Ocr" },
    { name: "machine-learning", label: "Machine learning" },
    { name: "estadisticas-de-uso", label: "Estadísticas de uso" },
    { name: "dashboard-reportes-y-analisis", label: "Dashboard - \n Reportes y análisis" },
    { name: "gestion-de-usuarios", label: "Gestión de usuarios" },
    { name: "reporting-avanzado", label: "Reporting avanzado" },
    { name: "integracion-de-datos", label: "Integración de datos" },
    { name: "gestion-de-permisos", label: "Gestión de permisos" },
    { name: "analisis-de-datos", label: "Análisis de datos" },
    { name: "optimizacion-performance", label: "Optimización -\n Performance" },
    { name: "despliegue-deploy", label: "Despliegue-Deploy" },
    { name: "importacion-exportacion-de-datos", label: "Importación - Exportación \n de datos" },
    { name: "firmas-digitales", label: "Firmas digitales" },
    { name: "escaneo-de-documentos", label: "Escaneo de \n documentos" },
    { name: "monitor-de-automatizaciones", label: "Monitor de \n automatizaciones" },
    { name: "historial-de-auditoria", label: "Historial de auditoría" },
    { name: "api-integraciones", label: "Api integraciones" }
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

// do we need to change this 'free' to 'freeCourse'?
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
    { name: "course", label: "Curso" },
    { name: "lesson", label: "Lección" },
  ]
};

export const courseDifficulty: Filter<CourseDificulty> = {
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

export const tags: Filter<Tag> = {
  header: "Tags",
  items: [
    { name: "plataforma-de-cursos", label: "Plataforma de cursos" },
    { name: "aplicaciones-sin-codigo", label: "Aplicaciones sin código" },
    { name: "desarrolladores-nocode", label: "Desarrolladores no-code" },
    { name: "powerapps-para-empresas", label: "PowerApps para empresas" },
    { name: "appsheet-para-negocios", label: "AppSheet para negocios" },
    { name: "automatizacion-de-tareas", label: "Automatización de tareas" },
    { name: "apps-de-productividad", label: "Apps de productividad" },
    { name: "tecnologia-para-empresas", label: "Tecnología para empresas" },
    { name: "herramientas-nocode", label: "Herramientas no-code" },
    { name: "creacion-de-aplicaciones", label: "Creación de aplicaciones" },
  ]
}

