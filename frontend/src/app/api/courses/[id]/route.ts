import { NextRequest } from "next/server";
// import { TCourseDetail } from "@/app/courses/components/detail/detail.types";
// import { courseDataNew } from "@/mocks/course-detail";
import coursesMock from "@/mocks/courses.mock.json"
import { Course, Lesson } from "@/types/courses.types";
import { NextResponse } from "next/server";
import { reviews } from "@/mocks/reviews.mocks";
import authorsMocks from "@/mocks/authors.mock.json";

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

export type TEMPMockedResponse = {
  courseData: Course
  transformedProgram: {
    moduleTitle: string
    lessons: string[]
  }[]
  freeLessons: Lesson[]
}

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const withAuthor = searchParams.get("withAuthor");
  const withReviews = searchParams.get("withReviews");

  const mockedResponse = {
    courseData: {
      ...coursesMock[0], 
      ...(withAuthor ? { author: authorsMocks[0] } : {}),
      ...(withReviews ? { reviews } : {}),
    },
    freeLessons: lessonsAdapter(coursesMock[0]),
    transformedProgram: modulesAdapter(coursesMock[0]),
  };

  return NextResponse.json(mockedResponse, { status: 200 })
}
