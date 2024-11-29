import { coreContent, toolsAndPlatforms } from "@/consts/filters.consts";
import { Label } from "@radix-ui/react-label";

export const courseData = {
    title: 'Gestión de inventarios con Power Apps',
    details: {
        description: 'Descubre cómo transformar ideas en aplicaciones funcionales sin necesidad de programar utilizando Power Apps Este curso te guiará paso a paso para que aprendas a crear aplicaciones personalizadas que se adapten a tus necesidades optimizando procesos y mejorando la eficiencia en tu trabajo o negocio',
        rating: 4.1,
        ratingCount: 88,
        image: '/temp/imgs/course-image.png',
    },
    lessons: [
        { id: 1, image: '/temp/imgs/course-image.png', title: 'Lección 1' },
        { id: 2, image: '/temp/imgs/course-image.png', title: 'Lección 2' },
    ],
    instructor: {
        name: "Sebastián Rico",
        description: "Instructor y desarrollador",
        rating: 4.3,
        students: 43830,
        courses: 77,
        image: "/temp/imgs/avatar.png",
        profileLink: "/mentor",
    },
    objectives: [
        'Crear aplicaciones personalizadas desde cero',
        'Automatizar tareas y optimizar procesos',
    ],
    about: 'Este curso está diseñado para quienes desean aprender a crear aplicaciones personalizadas de manera rápida y sencilla Con ejemplos prácticos y explicaciones claras, te guiaré en el proceso de convertir tus ideas en aplicaciones funcionales. Al finalizar el curso, tendr las habilidades necesarias para desarrollar aplicaciones profesionales utilizando Power App.',
    additionalDetails: [
        { title: '¿Por qué aprender con Sebastián?', content: 'Sebastián Ríos es un apasionado...' },
        { title: '¿Para quien es este curso?', content: 'Sebastián Ríos es un apasionado...' },
    ],
    requirements: [
        'Fundamentos de Power Apps: Entiende cómo funciona la plataforma y cómo empezar a construir tus primeras aplicaciones.'
    ],
    appInfoSections: {
        sections: [
            {
                title: 'Funcionalidades',
                badges: ['APIs - Integraciones', 'APIs - Integraciones'],
            },
            {
                title: 'Herramientas y plataformas',
                badges: ['Otras', 'Otras'],
            },
            {
                title: 'Sector',
                badges: ['Ventas y CRM', 'Finanzas y contabilidad'],
            },
            {
                title: 'Pilar de contenido',
                badges: ['Automatización', 'Flujo de trabajo'],
            },
        ]
    },
    reviews: [
        { author: 'John Doe', rating: 4.5, comment: 'Excelente curso' },
    ],
    modules: [
        {
            id: "module-1",
            title: "Módulo 1",
            lessons: [
                { id: "lesson-1", title: "¿Qué es Power Apps?" },
                { id: "lesson-2", title: "Configuración de la cuenta y entorno de trabajo" },
                { id: "lesson-3", title: "Navegación por la interfaz de Power Apps" },
            ],
        },
        {
            id: "module-2",
            title: "Módulo 2",
            lessons: [{ id: "lesson-4", title: "Contenido del Módulo 2" }],
        },
        {
            id: "module-3",
            title: "Módulo 3",
            lessons: [{ id: "lesson-5", title: "Contenido del Módulo 3" }],
        },
    ],
};

export const courseDataNew = {
    title: "Curso de Desarrollo Web",
    summarizeDescription: "Aprende a desarrollar aplicaciones web modernas.",
    rating: 4.5,
    ratingCount: 123,
    coverImg: {
        url: "/temp/imgs/course-image.png",
        size: 2048,
        width: 1200,
        height: 800,
        format: "jpg",
        created_at: "2024-01-01",
    },
    instructor: {
        name: "Juan Pérez",
        description: "Instructor con experiencia en desarrollo web.",
        image: "/temp/imgs/avatar.png",
        rating: 4.7,
        students: 2000,
        courses: 5,
        profileLink: "/profile/juan-perez",
    },
    learningSubjects: [
        "Entender los fundamentos de HTML, CSS y JavaScript.",
        "Construir aplicaciones interactivas con React.",
        "Diseñar APIs robustas con Node.js.",
    ],

    sector: [
        {
            label: "Gestión de Usuarios",
            name: "gestion-de-usuarios"
        },
        {
            label: "Marketing digital",
            name: "marketing-digital"
        }
    ],

    coreContent: [
        {
            label: "Expresiones y fórmulas",
            name: "expresiones-y-formulas"
        },
        {
            label: "Automatización",
            name: "automatizacion"
        }
    ],


    toolsAndPlatform: [
        {
            label: "Power BI",
            name: "power-bi"
        },
        {
            label: "Google Sheets",
            name: "google-sheets"
        }
    ],

    functionalities: [
        {
            label: "Reportes automáticos",
            name: "reportes-automaticos"
        },
        {
            label: "Generación de PDF",
            name: "generacion-de-pdf"
        }
    ],
    
    prevRequirements: ["Conocimientos básicos de programación", "Ganas de aprender"],
    detailedDescription: "Este curso está diseñado para quienes desean aprender a crear aplicaciones personalizadas de manera rápida y sencilla, sin necesidad de conocimientos previos en programación. A lo largo de las lecciones, explorarás las funcionalidades clave de Power Apps, desde los conceptos básicos hasta técnicas avanzadas, que te permitirán desarrollar soluciones adaptadas a tus necesidades. Con ejemplos prácticos y explicaciones claras, te guiaré en el proceso de convertir tus ideas en aplicaciones funcionales que mejoren la productividad y eficiencia de tus proyectos.",

    modules: [
        {
            id: "module-1",
            title: "Módulo App",
            description: "Aprende los fundamentos básicos de Appsheet.",
            lessons: [
                { id: "lesson-1", title: "¿Qué es Power Apps?", free: true, image: '/temp/imgs/course-image.png' },
                { id: "lesson-2", title: "Configuración de la cuenta y entorno de trabajo", free: true, image: '/temp/imgs/course-image.png' },
                { id: "lesson-3", title: "Navegación por la interfaz de Power Apps", free: false, image: '/temp/imgs/course-image.png' },
            ],
        },
        {
            id: "module-2",
            title: "Módulo 2",
            description: "Aprende los fundamentos básicos de Appsheet.",
            lessons: [{ id: "lesson-4", title: "Contenido del Módulo 2", free: false, image: '/temp/imgs/course-image.png' }],
        },
        {
            id: "module-3",
            title: "Módulo 3",
            description: "Aprende los fundamentos básicos de Appsheet.",
            lessons: [{ id: "lesson-5", title: "Contenido del Módulo 3", free: true, image: '/temp/imgs/course-image.png' }],
        },
    ],

    additionalDetails: [
        { title: "¿Por que estudiar con Sebastian?", content: "Sebastián Ríos es un apasionado del desarrollo no-code, con más de 5 años de experiencia en AppSheet y un enfoque práctico y accesible para la enseñanza. Ha ayudado a cientos de profesionales y emprendedores a transformar sus ideas en aplicaciones exitosas, simplificando procesos y mejorando la productividad. Su metodología se centra en ejemplos reales y soluciones prácticas, lo que te permitirá aplicar lo aprendido de inmediato en tus propios proyectos. Aprender con Sebastián significa adquirir habilidades valiosas de la mano de un experto comprometido con tu éxito." },
        { title: "¿Para quién es este curso?", content: "Este curso está dirigido a emprendedores, profesionales y cualquier persona interesada en crear aplicaciones personalizadas sin necesidad de programar. Si buscas optimizar procesos, mejorar la eficiencia en tu trabajo o simplemente explorar nuevas herramientas tecnológicas, este curso es ideal para ti. No se requiere experiencia previa en desarrollo, ya que te guiaré desde lo más básico hasta técnicas avanzadas, asegurando que puedas aplicar lo aprendido en proyectos reales, independientemente de tu nivel de conocimientos." },
    ],
};
