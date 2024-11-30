import { TImage } from "@/types/global.types"

export type ProductCard = {
  id: number
  title: string
  img: TImage
  description: string
  platform: string
  tags: string[]
  rating: number
  ratingCount: number
  price: number
  about: string
}

export type AuthorInfo = {
  name: string
  about: string
  img: TImage
}

export type QuickView = {
  product: ProductCard
  author: AuthorInfo
}
