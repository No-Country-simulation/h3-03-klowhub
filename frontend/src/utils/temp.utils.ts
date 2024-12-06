// here goes temporary utils to test things or implement temporary server side logic
import { NextRequest } from "next/server";
import { Course } from "@/types/courses.types";
import { promises as fs, createReadStream } from 'fs';
import path from "path";
import authorsMock from "@/mocks/authors.mock.json"

export async function streamVideo (req: NextRequest) {
  try {
    const range = req.headers.get("range");
    if (!range) throw new Error('range header is required');

    const videoPath = path.join(process.cwd(), 'public', 'temp', 'videos', 'sample-video.mp4');
    const videoSize = (await fs.stat(videoPath)).size;
    const chunkSize = 10 ** 6; // 1mb
    const startByte = Number(range.replace(/\D/g, ""));
    const endByte = Math.min(startByte + chunkSize, videoSize - 1);

    // headers
    const contentLength = endByte - startByte + 1;
    const headers = {
      "Content-Range": `bytes ${startByte}-${endByte}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
    
    const videoStream = createReadStream(videoPath, { start: startByte, end: endByte });
    return { headers, videoStream }
  } catch (err) {
    throw err;
  }
};

export const attachAuthors = (courses: Course[]) => {
  return courses.map((c, idx) => ({ ...c, author: authorsMock[idx] }))
};
