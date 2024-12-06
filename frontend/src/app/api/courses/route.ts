import { NextResponse, NextRequest } from "next/server";
import coursesMock from "@/mocks/courses.mock.json";
import coursesWithAuthorMock from "@/mocks/courses-with-author.mock.json";

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const withAuthor = searchParams.get("withAuthor");

  if (withAuthor) {
    return NextResponse.json({ data: coursesWithAuthorMock }, { status: 200 })
  } else {
    return NextResponse.json({ data: coursesMock }, { status: 200 })
  };

}
