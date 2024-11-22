export const getImage = <T extends File>(file: File) => {
  return new Promise((resolve, reject) => {
    try {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
          if (!e.target) return;
          img.src = e.target.result; // Set image source to the file's data URL
        };

        img.onload = () => {
          return resolve([ img.width, img.height ])
        };

        reader.readAsDataURL(file); 
      } catch(err) {
        reject(err)
      }
  });
}

export const removeImage = (imgs: File[], idxToRemove: number) => {
  const remaining = imgs.filter((_, idx) => idx !== idxToRemove);
  return remaining
}

export const formatImage = (files: File[]) => {
  const images = files.map((f, idx) => ({
    ...f,
    id: idx
  }));

  return images
}
