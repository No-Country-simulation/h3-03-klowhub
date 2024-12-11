import { FilePayload } from "@/types/global.types";

export const uploadAsset = async (file: File, entity: "courses" | "apps" | "projects") => {
  let endpoint = ""
  if (entity === "courses") endpoint = process.env.NEXT_PUBLIC_COURSES_URL as string;
  if (entity === "apps") endpoint = process.env.NEXT_PUBLIC_APPS_URL as string;
  if (entity === "projects") endpoint = process.env.NEXT_PUBLIC_COURSES_URL as string; // temporary

  const formData = new FormData();
  formData.append('file', file)
  const res = await fetch(`${endpoint}/multimedia`, {
    method: 'post',
    body: formData
  });

  const uploadedAsset: FilePayload = await res.json();

  return uploadedAsset
};
