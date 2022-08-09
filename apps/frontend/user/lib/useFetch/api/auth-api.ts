import axios from "axios"

export async function ApiLoginWithGoogle(payload: { token: string }) {
  return await axios.post('/api/auth/provider/google', payload)
}

export function ApiGetMe() {
  return axios.get('/api/auth-user/me')
}