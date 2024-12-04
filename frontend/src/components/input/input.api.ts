import { FilePayload } from "@/types/global.types";

export const uploadAsset = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file)
  const res = await fetch('http://localhost:3003/courses/multimedia', {
    method: 'post',
    body: formData
  });

  const payload: FilePayload = await res.json();

  return {
    ...payload.fileMetadata,
    id: payload.id
  }
};
