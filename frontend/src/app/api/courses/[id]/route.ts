import { courseData } from "@/mocks/course-detail";
import { NextResponse } from "next/server";

const transformedProgram = courseData.modules.map((module) => ({
    moduleTitle: module.title,
    lessons: module.lessons.map((lesson) => lesson.title),
}));

export async function GET () {
  const transformedProgram = courseData.modules.map((module) => ({
      moduleTitle: module.title,
      lessons: module.lessons.map((lesson) => lesson.title),
  }));
  return NextResponse.json({ data: course }, { status: 200 })
}
