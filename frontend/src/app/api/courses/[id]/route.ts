import { TCourseDetail } from "@/app/courses/components/detail/detail.types";
import { courseDataNew } from "@/mocks/course-detail";
import { Lesson } from "@/types/courses.types";
import { NextResponse } from "next/server";

export const modulesAdapter = (courseData: TCourseDetail) => {
  return courseData.modules.map((module) => ({
      moduleTitle: module.title,
      lessons: module.lessons.map((lesson) => lesson.title),
  }))
};

export const lessonsAdapter = (courseData: TCourseDetail) => {
  return courseData.modules.flatMap((module) => 
      module.lessons.filter((lesson) => lesson.free === true
  ))
};

export type TEMPMockedResponse = {
  courseData: typeof courseDataNew
  transformedProgram: {
    moduleTitle: string
    lessons: string[]
  }[]
  freeLessons: Lesson[]
}

export async function GET () {
  const mockedResponse = {
    courseData: courseDataNew,
    freeLessons: lessonsAdapter(courseDataNew),
    transformedProgram: modulesAdapter(courseDataNew),
  };
  return NextResponse.json(mockedResponse, { status: 200 })
}
