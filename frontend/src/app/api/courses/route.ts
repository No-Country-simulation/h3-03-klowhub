import { NextResponse, NextRequest } from "next/server";
import { courses } from "@/mocks/courses.mocks";
import { products } from "@/mocks/products.mocks";

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const withAuthor = searchParams.get("withAuthor");

  if (withAuthor) {
    return NextResponse.json({ data: products }, { status: 200 })
  } else {
    return NextResponse.json({ data: courses }, { status: 200 })
  };

}
