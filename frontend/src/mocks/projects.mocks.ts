import { TProjectCard } from "@/types/project.types";

export const projectsData: TProjectCard[] = [
  {
    id: "123-sda-234-sdf",
    title: "Solución integral para la gestión de tareas y seguimiento de proyectos en tiempo real.",
    instructor: {
      name: "John Doe",
      img: {
        url: "/temp/imgs/profile-mini.png",
        width: 60,
        height: 60,
        alt: "Imagen del Proyecto 1"
      },
      userType: "PRO",
      description: "Instructor y Desarrollador",
      rating: 5
    },
    description: "Crear una aplicación que permita a los equipos organizar, asignar y priorizar tareas diarias de manera intuitiva. La plataforma centraliza todas las actividades pendientes, mostrando plazos, responsables y estados de avance en tiempo real. Se busca mejorar la eficiencia del equipo, evitando retrasos y sobrecargas de trabajo. Además, se incluirán notificaciones automáticas para recordar fechas límite y reuniones importantes.",
    platform: "PowerApps",
    // tags: ["Logística", "Retail", "Inventarios"],
    rating: 4.5,
    ratingCount: 120,
    status: "en-curso",
    // initialDate: "2024-12-13",
    // finalDate: "2024-12-13"
  },
  {
    id: "2",
    title: "App móvil para gestión de inventarios con AppSheet",
    instructor: {
      name: "Jane Smith",
      img: {
        url: "/temp/imgs/profile-mini.png",
        width: 60,
        height: 60,
        alt: "Imagen del Proyecto 2"
      },
      userType: "PRO",
      description: "Instructor y Desarrollador",
      rating: 5
    },
    description: "Implementación de una aplicación móvil en AppSheet para gestionar inventarios en tiendas minoristas.",
    platform: "AppSheet",
    // tags: ["Logística", "Retail", "Inventarios"],
    rating: 3.8,
    ratingCount: 85,
    status: "finalizado",
    // initialDate: "2024-12-12",
    // finalDate: "2024-12-13"
  },
  {
    id: "3",
    title: "Optimización logística con PowerApps",
    instructor: {
      name: "Alice Johnson",
      img: {
        url: "/temp/imgs/profile-mini.png",
        width: 60,
        height: 60,
        alt: "Imagen del Proyecto 3"
      },
      userType: "PRO",
      description: "Instructor y Desarrollador",
      rating: 5
    },
    description: "Creación de dashboards en PowerApps para monitorear en tiempo real el estado de inventarios.",
    platform: "PowerApps",
    // tags: ["Logística", "Retail", "Inventarios"],
    rating: 4.2,
    ratingCount: 98,
    status: "en-curso",
    // initialDate: "2024-12-01",
    // finalDate: "2024-12-13"
  },
  {
    id: "4",
    title: "App móvil para gestión de inventarios con AppSheet",
    instructor: {
      name: "Robert Brown",
      img: {
        url: "/temp/imgs/profile-mini.png",
        width: 60,
        height: 60,
        alt: "Imagen del Proyecto 4"
      },
      userType: "PRO",
      description: "Instructor y Desarrollador",
      rating: 5
    },
    description: "Automatización de reportes de inventarios con AppSheet para cadenas de tiendas.",
    platform: "AppSheet",
    // tags: ["Logística", "Retail", "Inventarios"],
    rating: 4.7,
    ratingCount: 150,
    status: "finalizado",
    // initialDate: "2024-12-01",
    // finalDate: "2024-12-10"
  },
  {
    id: "5",
    title: "Optimización logística con PowerApps",
    instructor: {
      name: "Emily Davis",
      img: {
        url: "/temp/imgs/profile-mini.png",
        width: 60,
        height: 60,
        alt: "Imagen del Proyecto 5"
      },
      userType: "PRO",
      description: "Instructor y Desarrollador",
      rating: 5
    },
    description: "Desarrollo de formularios personalizados en PowerApps para optimizar la logística de inventarios.",
    platform: "PowerApps",
    // tags: ["Logística", "Retail", "Inventarios"],
    rating: 4.1,
    ratingCount: 73,
    status: "en-curso",
    // initialDate: "2024-11-21",
    // finalDate: "2024-12-13"
  }
];
