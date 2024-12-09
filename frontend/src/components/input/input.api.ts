import { FilePayload } from "@/types/global.types";

export const uploadAsset = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file)
  const res = await fetch('http://localhost:3003/courses/multimedia', {
    method: 'post',
    body: formData
  });

  const uploadedAsset: FilePayload = await res.json();

  return uploadedAsset
};
