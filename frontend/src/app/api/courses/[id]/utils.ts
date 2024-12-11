import { Course } from "@/types/courses.types";

export const modulesAdapter = (courseData: Course) => {
  return courseData.modules.map((module) => ({
      moduleTitle: module.title,
      lessons: module.lessons.map((lesson) => lesson.title),
  }))
};

export const lessonsAdapter = (courseData: Course) => {
  return courseData.modules.flatMap((module) => 
      module.lessons.filter((lesson) => lesson.freeLesson === true
  ))
};

