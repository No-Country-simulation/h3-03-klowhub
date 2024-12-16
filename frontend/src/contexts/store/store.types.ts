import { BTSeller } from "@/types/backend-responses.types"
import { TImage } from "@/types/global.types"

export type User = {
  id: string
  email: string
  name: string
  jwtToken: string
  seller: BTSeller | null
  profileImg: TImage | null
}

export type SellerUser = Required<User>

export type UI = {
  mode: string
}

export type Store = {
  user: User
  ui: UI
}
