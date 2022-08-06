import axiosInstance from "../fetch/axios";

export function ApiLoginWithGoogle(payload: { token: string }) {
  console.log(payload)
  const fetch = axiosInstance.post('/api/auth/provider/google', { ...payload })
  console.log(fetch)
  return fetch
}