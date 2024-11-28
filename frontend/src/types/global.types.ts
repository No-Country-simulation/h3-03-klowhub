export type Language = "inglés" | "español"
export type Platform = "appsheet" | "powerapps"
export type Video = {
  videoId: string
  thumbnail: string
  duration: string
}

export type TImage = {
  url: string
  width: number
  height: number
  alt: string
}

export type TVideo = {
  thumbnail: TImage
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
