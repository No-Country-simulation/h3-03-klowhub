import { CourseFormData } from "@/types/courses.types";
import courseMock from '../mocks/course-detail-2.mock.json'

export const transformCourse = (course: CourseFormData) => {

  const freeLessons = course.modules.map(m => {
    const lessons = m.lessons.filter(l => l.free);
    const formattedLesson = lessons.map((l, idx) => ({
      id: idx,
      image: URL.createObjectURL(l.videos[0]),
      title: l.title
    }));
    return formattedLesson
  }).flat();

  const detail2 = courseMock
  // console.log('detail2: ', detail2);

  const detail: typeof courseMock = {
    details: {
        title: course.general.title,
        description: course.general.about,
        image: course.details.coverImg?.url,
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
    objectives: course.details.learningSubjects,
    about: course.details.courseContent,
    additionalDetails: [
        { title: '¿Por qué aprender con Sebastián?', content: 'Sebastián Ríos es un apasionado...' },
        { title: '¿Para quien es este curso?', content: 'Sebastián Ríos es un apasionado...' },
    ],
    requirements: course.details.prevRequirements,
    appInfoSections: {
        sections: [
            {
                title: 'Funcionalidades',
                badges: course.general.functionalities.map(f => f.label),
            },
            {
                title: 'Herramientas y plataformas',
                badges: course.general.tools.map(f => f.label),
            },
            {
                title: 'Sector',
                badges: course.general.sector.map(f => f.label),
            },
            {
                title: 'Pilar de contenido',
                badges: course.general.coreContent.map(f => f.label),
            },
        ]
    },
    reviews: [],
    modules: course.modules.map((m, idx) => ({
      id: `module-${idx}`,
      title: m.title,
      lessons: m.lessons.map((l, idx) => ({
        id: `lesson-${idx}`,
        title: l.title
      }))
    }))
  };

  return detail
}

