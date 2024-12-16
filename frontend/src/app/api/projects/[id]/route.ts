import { NextRequest, NextResponse } from "next/server";
import projectMock from "@/mocks/project.mock";
import authorsMocks from "@/mocks/authors.mock.json"

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const withAuthor = searchParams.get("withAuthor");

  const projectData = {
    ...projectMock,
    requiredSkills: [],
    ...(withAuthor ? { author: authorsMocks[0] } : {}),
    // ...(withReviews ? { reviews } : {}),
  }

  return NextResponse.json(projectData, { status: 200 })
}
