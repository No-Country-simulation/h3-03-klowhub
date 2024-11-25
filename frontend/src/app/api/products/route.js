import { NextResponse } from "next/server";
import { courses } from "../../../mocks/products.mocks"

export async function GET () {
  return NextResponse.json({ data: courses }, { status: 200 })
}
