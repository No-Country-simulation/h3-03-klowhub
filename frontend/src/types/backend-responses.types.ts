import { ApplicationWithFullImgs } from "./application.types"
import { TImage } from "./global.types"

export type BTApplicationWithAuthor = ApplicationWithFullImgs & {
  author: BTAuthor
}

export type BTSeller = {
  id: string,
  type: string,
  about: string,
  website: string | null,
  documentImg: string |null,
  paymentMethod: string |null
}

export type BTAuthor = {
  id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  profileImg: TImage,
  seller: BTSeller
}
