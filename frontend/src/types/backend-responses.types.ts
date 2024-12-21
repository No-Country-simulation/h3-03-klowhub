import { ApplicationWithFullImgs } from "./application.types"
import { TImage } from "./global.types"
import { BTUser } from "./user.types"

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

export type BTMessage = {
  id: string
  userId: string
  chatId: string
  content: string
  fileUrl: string
  // emotes: string[]
  createdAt: Date
}

export type BTChat = {
  id: string
  members: string[]
  membersDetails: BTUser[]
  type: string
  messages: BTMessage[]
}
