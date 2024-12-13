export type User = {
  id: string
  email: string
  fullname: string
  jwtToken: string
}

export type UI = {
  mode: string
}

export type Store = {
  user: User
  ui: UI
}
