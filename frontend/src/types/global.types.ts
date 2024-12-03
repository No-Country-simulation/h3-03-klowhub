export type Language = "inglés" | "español"
export type Platform = "appsheet" | "powerapps"
// export type Video = {
//   videoId: string
//   thumbnail: string
//   duration: string
// }

export type TDocument = {
  id: string
  filename: string
  url: string
  size: string
  mimeType: string
  created_at: Date
}

export type TImage = {
  url: string
  width: number
  height: number
  alt: string
}

export type TVideo = {
  id: string
  url: string
  duration: number
  size: number
  format: string
  width: number
  height: number
  thumbnail_url: string
  thumbnail_width: number
  thumbnail_height: number
  created_at: Date;
} & TImage

export type FileType = {
  [key: string]: string[]
}

export type PromotedProduct = {
  type: "application" | "course" | null
  id: number
}

export type Promotion = {
  product: PromotedProduct
  percentage: number
}
