import { NextResponse } from "next/server";
import { courses } from "../../../mocks/products.mocks"

export async function GET (_) {
  return NextResponse.json({ data: courses }, { status: 200 })
}
