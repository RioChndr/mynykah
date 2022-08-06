import { ApiLoginWithGoogle } from "../api/auth-api"
import { LoginToApp } from "./auth"
import { UserCredGoogle } from "./type"

/** Provider auth */
export async function LoginWithGoogle(payload: UserCredGoogle) {
  const token = await ApiLoginWithGoogle({
    token: payload.credential
  })
  return LoginToApp(token.data.access_token)
}