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
  thumbnail_url: string
  thumbnail_width: number
  thumbnail_height: number
} & UploadedFile & Dimensions

export type UploadedFile = {
  id: string
  url: string
  mimetype: string
  created_at: Date
}

export type PromotedProduct = {
  type: "application" | "course" | null
  id: number
}

export type Promotion = {
  product: PromotedProduct
  percentage: number
}
