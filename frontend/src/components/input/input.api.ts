import { FilePayload } from "@/types/global.types";

export const uploadAsset = async (file: File, entity: "course" | "app" | "project") => {
  let endpoint = ""
  if (entity === "course") endpoint = process.env.NEXT_PUBLIC_COURSES_URL as string;
  if (entity === "app") endpoint = process.env.NEXT_PUBLIC_APPLICATIONS_URL as string;
  if (entity === "project") endpoint = process.env.NEXT_PUBLIC_COURSES_URL as string; // temporary
console.log('endpoint: ', endpoint);

  const formData = new FormData();
  formData.append('file', file)
  const res = await fetch(`${endpoint}/multimedia`, {
    method: 'post',
    body: formData
  });

  const uploadedAsset: FilePayload = await res.json();

  return uploadedAsset
};
