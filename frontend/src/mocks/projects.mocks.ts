import { ProjectCard } from "@/types/project.types";

export const projectsData: ProjectCard[] = [
  {
    id: 1,
    img: {
      url: "/temp/imgs/profile-mini.png",
      width: 60,
      height: 60,
      alt: "Imagen del Proyecto 1"
    },
    description: "Desarrollo de una solución en PowerApps para optimizar procesos logísticos en el manejo de inventarios.",
    platform: "PowerApps",
    tags: ["Logística", "Retail", "Inventarios"],
    rating: 4.5,
    ratingCount: 120,
    status: "En curso",
    initialDate: "2024-01-10",
    finalDate: "2024-06-15"
  },
  {
    id: 2,
    img: {
      url: "/temp/imgs/profile-mini.png",
      width: 60,
      height: 60,
      alt: "Imagen del Proyecto 2"
    },
    description: "Implementación de una aplicación móvil en AppSheet para gestionar inventarios en tiendas minoristas.",
    platform: "AppSheet",
    tags: ["Logística", "Retail", "Inventarios"],
    rating: 3.8,
    ratingCount: 85,
    status: "Terminado",
    initialDate: "2023-05-01",
    finalDate: "2023-12-31"
  },
  {
    id: 3,
    img: {
      url: "/temp/imgs/profile-mini.png",
      width: 60,
      height: 60,
      alt: "Imagen del Proyecto 3"
    },
    description: "Creación de dashboards en PowerApps para monitorear en tiempo real el estado de inventarios.",
    platform: "PowerApps",
    tags: ["Logística", "Retail", "Inventarios"],
    rating: 4.2,
    ratingCount: 98,
    status: "En curso",
    initialDate: "2024-02-15",
    finalDate: "2024-08-30"
  },
  {
    id: 4,
    img: {
      url: "/temp/imgs/profile-mini.png",
      width: 60,
      height: 60,
      alt: "Imagen del Proyecto 4"
    },
    description: "Automatización de reportes de inventarios con AppSheet para cadenas de tiendas.",
    platform: "AppSheet",
    tags: ["Logística", "Retail", "Inventarios"],
    rating: 4.7,
    ratingCount: 150,
    status: "Terminado",
    initialDate: "2023-01-20",
    finalDate: "2023-09-15"
  },
  {
    id: 5,
    img: {
      url: "/temp/imgs/profile-mini.png",
      width: 60,
      height: 60,
      alt: "Imagen del Proyecto 5"
    },
    description: "Desarrollo de formularios personalizados en PowerApps para optimizar la logística de inventarios.",
    platform: "PowerApps",
    tags: ["Logística", "Retail", "Inventarios"],
    rating: 4.1,
    ratingCount: 73,
    status: "En curso",
    initialDate: "2024-03-01",
    finalDate: "2024-12-31"
  }
];