import { TImage } from "@/types/global.types"

export type TProductCard = {
  id: string
  title: string
  coverImg: TImage
  shortDescription: string
  platform: string
  tags: string[]
  rating: number
  ratingCount: number
  price: number
  fullDescription: string
}

export type AuthorInfo = {
  name: string
  about: string
  img: TImage
}

export type TQuickView = TProductCard & {
  author: AuthorInfo
}
