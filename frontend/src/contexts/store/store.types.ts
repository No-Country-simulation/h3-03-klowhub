import { FullProposal } from "@/app/(site)/projects/[id]/components/proposal-form/proposal-form.types"
import { BTSeller } from "@/types/backend-responses.types"
import { TImage } from "@/types/global.types"

export type User = {
  id: string
  email: string
  name: string
  jwtToken: string
  sellerData: BTSeller | null
  profileImg: TImage | null
}

export type SellerUser = Required<User>

export type UI = {
  mode: string
}

export type Store = {
  user: User | null
  ui: UI
  proposal: FullProposal
}
