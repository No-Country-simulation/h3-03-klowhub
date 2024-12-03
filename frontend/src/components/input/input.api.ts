export const postVideo = async (file: File) => {
  const formData = new FormData();
  formData.append('video', file)
  const res = await fetch('http://localhost:3003/courses/video', {
    method: 'post',
    body: formData
  });

  const videoObj = await res.json();

  return videoObj
};
