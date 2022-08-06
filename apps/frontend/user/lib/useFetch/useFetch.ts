import Axios, { AxiosInstance } from 'axios'

export function useFetch() {
  if (!window.__FETCH_LIB) {
    window.__FETCH_LIB = Axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
    })
  }
  return window.__FETCH_LIB
}