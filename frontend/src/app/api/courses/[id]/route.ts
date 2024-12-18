import { NextRequest } from "next/server";
import coursesMock from "@/mocks/courses.mock.json"
import { CourseWithFullAssets, Lesson } from "@/types/courses.types";
import { NextResponse } from "next/server";
import { reviews } from "@/mocks/reviews.mocks";
import authorsMocks from "@/mocks/authors.mock.json";
import { modulesAdapter, lessonsAdapter } from "./utils";

export type TEMPMockedResponse = {
  courseData: CourseWithFullAssets
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
      ...coursesMock[0], 
      ...(withAuthor ? { author: authorsMocks[0] } : {}),
      ...(withReviews ? { reviews } : {}),
  };

  return NextResponse.json(mockedResponse, { status: 200 })
}
