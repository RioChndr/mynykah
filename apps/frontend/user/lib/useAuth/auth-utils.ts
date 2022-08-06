import { useFetch } from "../useFetch/useFetch"

export function SaveToLocalstorage(token: string) {
  token = `Bearer ${token}`

  localStorage.setItem(AuthStorage.authorization, token)
  localStorage.setItem(AuthStorage.loginAt, new Date().toString())

  return token
}

export function CheckAndUpdateAuthToken() {
  const tokenLocalstorage = localStorage.getItem(AuthStorage.authorization)
  const fetch = useFetch()
  const tokenFetch = fetch.defaults?.headers?.common[AuthStorage.authorization]

  if (tokenLocalstorage && !tokenFetch) {
    fetch.defaults.headers.common[AuthStorage.authorization] = tokenLocalstorage
  }
}

export function RemoveAuthToken() {
  localStorage.removeItem(AuthStorage.authorization)
  const fetch = useFetch()
  fetch.defaults.headers.common[AuthStorage.authorization] = null
}

export const AuthStorage = {
  authorization: 'Authorization',
  loginAt: 'login_at'
}