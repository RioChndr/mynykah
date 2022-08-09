import React, { Dispatch, SetStateAction } from "react"

export type ResultProvider = { token: string }

export interface AuthUserInterface {
  id: string
  name: string
  email: string
  picture: string
}

export interface AuthProviderInterface {
  user?: AuthUserInterface
  fetchUser: () => any
  loginStrategy: {
    withGoogle: any
  },
  saveToken: (token: string) => any
  logout: () => void
}