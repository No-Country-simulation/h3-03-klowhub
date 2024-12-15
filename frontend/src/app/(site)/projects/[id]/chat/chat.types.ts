import { TImage } from "@/types/global.types"
import { ChatMessage } from "./components/chat-message/chat-message.types"


export type ContactCard = {
  id: string
  name: string
  profileImg: TImage
  messages?: ChatMessage[]
}
