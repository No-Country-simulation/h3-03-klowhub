import { NextResponse, NextRequest } from "next/server";
import { streamVideo } from "../../../utils/temp.utils"

export async function GET (req: NextRequest) {
  try {
    const { headers, videoStream } = await streamVideo(req);
    const readableStream = new ReadableStream({
      start(controller) {
        videoStream.on("data", (chunk) => controller.enqueue(chunk));
        videoStream.on("end", () => controller.close());
        videoStream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(readableStream, {
      status: 206,
      headers,
    });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
