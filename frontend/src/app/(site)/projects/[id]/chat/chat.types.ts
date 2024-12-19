import { TImage } from "@/types/global.types"
import { ChatMessage } from "./components/message-box/message-box.types"

export type ContactCard = {
  id: string
  name: string
  profileImg: TImage
  messages?: ChatMessage[]
}
