export type Language = "english" | "spanish"
export type Platform = "appsheet" | "powerapps"

export type AuthorInfo = {
  name: string
  about: string
  img: TImage
}

export type FileType = {
  [key: string]: string[]
}

export type Dimensions = {
  width: number
  height: number
}

export type TDocumentProps = {
  filename: string
  size: string
}

export type TImageProps = {
  alt: string
} & Dimensions

export type TVideoProps = {
  duration: number
  size: number
  format: string
  thumbnailHeight: number
  thumbnailWidth: number
  thumbnailUrl: string
} & Dimensions

export type TImage = UploadedFile<TImageProps>
export type TVideo = UploadedFile<TVideoProps>
export type TDocument = UploadedFile<TDocumentProps>

export type UploadedFileCommon = {
  url: string
  mimeType: string
  created_at: Date
}

export type UploadedFile<T> = {
  id: string
  fileType: string
  fileMetadata: T & UploadedFileCommon
}

export type FilePayload = {
  id: string
  fileType: string
  fileMetadata: Omit<TImage, "id"> | Omit<TVideo, "id"> | Omit<TDocument, "id">
}

export type PromotedProduct = {
  type: "application" | "course" | null
  id: string | null
}

export type Promotion = {
  product: PromotedProduct
  percentage: number
}

export type Rating = {
  rating: number
  ratingCount: number
}
export type FlatPromotion = PromotedProduct & { percentage: Promotion["percentage"] }
