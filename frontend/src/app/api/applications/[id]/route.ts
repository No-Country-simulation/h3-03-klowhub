import { NextRequest, NextResponse } from "next/server";
import applicationsMock from "@/mocks/applications.mock.json"
import { reviews } from "@/mocks/reviews.mocks";
import authorsMocks from "@/mocks/authors.mock.json";

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const withAuthor = searchParams.get("withAuthor");
  const withReviews = searchParams.get("withReviews");

  const mockedResponse = {
    applicationData: {
      ...applicationsMock[0], 
      ...(withAuthor ? { author: authorsMocks[0] } : {}),
      ...(withReviews ? { reviews } : {}),
    },
  };

  return NextResponse.json(mockedResponse, { status: 200 })
}
