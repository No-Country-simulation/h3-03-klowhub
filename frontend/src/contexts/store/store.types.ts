import { FullProposal } from "@/app/(site)/projects/[id]/components/proposal-form/proposal-form.types"
import { BTUser } from "@/types/user.types"

export type UI = {
  mode: string
}

export type Store = {
  user: BTUser | null
  ui: UI
  proposal: FullProposal | null
}
