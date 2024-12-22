import { TImage } from "@/types/global.types"
import { ChatMessage } from "./components/message-box/message-box.types"

export type ChatCard = {
  id: string
  name: string
  profileImg: TImage
  lastMessage: ChatMessage
}
