import { NextResponse, NextRequest } from "next/server";
import applicationsMock from "../../../mocks/applications.mock.json"
import { attachAuthors } from "@/utils/temp.utils";

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const withAuthor = searchParams.get("withAuthor");

  if (withAuthor) {
    return NextResponse.json({ data: attachAuthors(applicationsMock) }, { status: 200 })
  } else {
    return NextResponse.json({ data: applicationsMock }, { status: 200 })
  };

}
