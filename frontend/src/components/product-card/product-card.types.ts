import { TImage, TVideo } from "@/types/global.types"
import { AuthorInfo } from "@/types/global.types"
import { Module } from "@/types/courses.types"

export type TProductCard = {
  id?: string
  title: string
  coverImg: TImage
  shortDescription: string
  platform: string
  tags: string[]
  // rating: number
  // ratingCount: number
  price: number
  fullDescription: string
}

export type TQuickView = TProductCard & {
  author: AuthorInfo
  promotionalVideo?: TVideo
  // modules?: Module[]
}
