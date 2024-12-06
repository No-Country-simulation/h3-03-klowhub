import { NextResponse, NextRequest } from "next/server";
import { Course } from "@/types/courses.types";
import coursesMock from "@/mocks/courses.mock.json";
import authorsMock from "@/mocks/authors.mock.json";

const attachAuthors = (courses: Course[]) => {
  return courses.map((c, idx) => ({ ...c, author: authorsMock[idx] }))
};

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const withAuthor = searchParams.get("withAuthor");

  if (withAuthor) {
    return NextResponse.json({ data: attachAuthors(coursesMock) }, { status: 200 })
  } else {
    return NextResponse.json({ data: coursesMock }, { status: 200 })
  };

}
