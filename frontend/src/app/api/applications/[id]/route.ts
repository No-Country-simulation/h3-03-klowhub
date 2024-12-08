import { NextRequest, NextResponse } from "next/server";
import applicationsMock from "@/mocks/applications.mock.json"
import { reviews } from "@/mocks/reviews.mocks";
import authorsMocks from "@/mocks/authors.mock.json";

export async function GET (req: NextRequest) {
  console.log('ASASAS');
  // TODO: this endpoint should be called when calling `/api/applications/${params.id}?withAuthor=true&withReviews=true` but is not
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
  console.log('mockedResponse: ', mockedResponse);

  return NextResponse.json(mockedResponse, { status: 200 })
}
