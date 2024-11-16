export type Image = {
  url: string
  width: number
  height: number
  alt: string
}

export type Product = {
  title: string
  img: Image
  description: string
  platform: string
  tags: string[]
  rating: number
  ratingCount: number
  price: number
  orientation: 'vertical' | 'horizontal'
}
