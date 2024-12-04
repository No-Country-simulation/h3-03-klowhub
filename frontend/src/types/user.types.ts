import { TImage } from "./global.types"

type UserMode = 
  | { name: "explorer", label: "Explorador" }
  | { name: "publisher", label: "Vendedor" }

type UserProfile = {
  email: string
  profileImg: TImage
}

type User = {
  id: string
  mode: UserMode
  profile: UserProfile
}
