// Imagen

export class ImageFileMissingException extends Error {
  constructor() {
    super('Image File is required');
  }
}

export class CloudinaryUploadFailedException extends Error {
  constructor() {
    super('Cloudinary upload failed');
  }
}

export class CourseCreationFailedException extends Error {
  constructor() {
    super('Failed to save course in the database');
  }
}

export class CourseImageSizeFailed extends Error {
  constructor() {
    super('The image file exceeds max size');
    console.log('Error en el tamaño de la imagen');
  }
}

// Video
export class CourseVideoSizeFailed extends Error {
  constructor() {
    super('The video file exceeds max size');
  }
}
export class VideoFileMissingException extends Error {
  constructor() {
    super('Video File is required');
  }
}

//Document
export class PDF_FileSize extends Error {
  constructor() {
    super('PDF File exceed max size');
  }
}
