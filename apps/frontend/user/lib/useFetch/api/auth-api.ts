import { useFetch } from "../useFetch"

export async function ApiLoginWithGoogle(payload: { token: string }) {
  const fetch = useFetch()
  return await fetch.post('/api/auth/provider/google', payload)
}

export function ApiGetMe() {
  const fetch = useFetch()
  return fetch.get('/api/auth-user/me')
}