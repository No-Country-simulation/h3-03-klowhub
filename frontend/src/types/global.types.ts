export type Language = "inglés" | "español"
export type Platform = "appsheet" | "powerapps"
// export type Video = {
//   videoId: string
//   thumbnail: string
//   duration: string
// }

export type FileType = {
  [key: string]: string[]
}

export type Dimensions = {
  width: number
  height: number
}

export type TDocument = {
  filename: string
  size: string
} & UploadedFile

export type TImage = {
  alt: string
} & UploadedFile & Dimensions

export type TVideo = {
  duration: number
  size: number
  format: string
  thumbnailHeight: number
  thumbnailWidth: number
  thumbnailUrl: string
} & UploadedFile & Dimensions

export type UploadedFile = {
  id: string
  url: string
  mimeType: string
  created_at: Date
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
