import { TImage } from "./global.types"

export type BTUser = {
  id: string
  name: string
  email: string
  role: string
  jwtToken: string
  seller?: BTSeller
  profileImg: TImage
}

export type BTSeller = {
  type: string,
  website: string | null,
  documentImg: TImage | null,
  paymentMethod: string | null,
  id: string,
  about: string 
}
