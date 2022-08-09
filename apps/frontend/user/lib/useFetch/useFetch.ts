import axios from 'axios'
import { useEffect } from 'react'

export function initAxios() {
  useEffect(() => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
  }, [])
}

export function setTokenAxios(token: string) {
  axios.defaults.headers.common = {
    'Authorization': 'bearer ' + token
  }
}