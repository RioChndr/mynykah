import axiosInstance from "../fetch/axios"

export function LoginToApp(token: string) {
  token = `Bearer ${token}`

  localStorage.setItem(authStorage.authorization, token)
  localStorage.setItem(authStorage.loginAt, new Date().toString())

  axiosInstance.interceptors.request.use((config) => {
    config.headers['Authorization'] = localStorage.getItem(authStorage.authorization)
  })
}

const authStorage = {
  authorization: 'authorization',
  loginAt: 'login_at'
}