import { api } from "../api"

export async function ApiLoginWithGoogle(payload: { token: string }) {
  return await api.post('/api/auth/provider/google', payload)
}

export function ApiGetMe() {
  return api.get('/api/auth-user/me')
}