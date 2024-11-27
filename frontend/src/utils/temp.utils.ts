// here goes temporary utils to test things or implement temporary server side logic
import { NextRequest } from "next/server";
import { promises as fs, createReadStream } from 'fs';
import path from "path";
import { Course, CourseFormData } from "@/types/courses.types";
import { title } from "process";

export async function streamVideo (req: NextRequest) {
  try {
    const range = req.headers.get("range");
    if (!range) throw new Error('range header is required');

    const videoPath = path.join(process.cwd(), 'public', 'temp', 'videos', 'sample-video.mp4');
    const videoSize = (await fs.stat(videoPath)).size;
    const chunkSize = 10 ** 6; // 1mb
    const startByte = Number(range.replace(/\D/g, ""));
    const endByte = Math.min(startByte + chunkSize, videoSize - 1);

    // headers
    const contentLength = endByte - startByte + 1;
    const headers = {
      "Content-Range": `bytes ${startByte}-${endByte}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    
    const videoStream = createReadStream(videoPath, { start: startByte, end: endByte });
    return { headers, videoStream }
  } catch (err) {
    throw err;
  }
};

// inputs faltantes
// precio
//
// inputs a modificar
// leaning subjects - debe ser multiples cajas de texto, no richtext
//
export const transformCourse = (course: CourseFormData) => {

  const freeLessons = course.modules.map(m => {
    const lessons = m.lessons.filter(l => l.free);
    const formattedLesson = lessons.map(l => ({
      id: l.id,
      image: '/temp/imgs/course-image.png',
      title: l.title
    }));
    return formattedLesson
  }).flat();

  const detail = {
    details: {
        title: course.general.title,
        description: course.general.about,
        image: course.details.img?.url,
    },
    lessons: freeLessons,
    instructor: {
        name: "Sebastián Rico",
        description: "Instructor y desarrollador",
        rating: 4.3,
        students: 43830,
        courses: 77,
        image: "/temp/imgs/avatar.png",
        profileLink: "/mentor",
    },
    // este campo corresponde al input 'learningSubjects' que debe ser modificado por una multiple caja de texto
    objectives: [
        'Crear aplicaciones personalizadas desde cero',
        'Automatizar tareas y optimizar procesos',
        'Crear aplicaciones personalizadas desde cero',
        'Automatizar tareas y optimizar procesos',
    ],
    about: course.details.courseContent,
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
}
