export type TImage = {
  url: string
  width: number
  height: number
  alt: string
}

export type TAppInfo = {
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

export type TAuthorInfo = {
  name: string
  about: string
  img: TImage
}

export type TAppCard = {
  data: TAppInfo
  openFn: () => void
}

export type TProduct = {
  product: TAppInfo
  author: TAuthorInfo
}
