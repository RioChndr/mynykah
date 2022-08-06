import Router from "next/router"
import { useEffect, useState } from "react"
import { ApiGetMe } from "../useFetch/api/auth-api"
import { AuthStorage, CheckAndUpdateAuthToken, RemoveAuthToken } from "./auth-utils"
import { UserDataInterface } from "./type"

interface OptiosUseAuth {
  redirectIfNotAuthenticated?: boolean,
  pageLogin?: string
}

const DefaultOptions: OptiosUseAuth = {
  redirectIfNotAuthenticated: true,
  pageLogin: '/login'
}

export const useAuth = (options?: OptiosUseAuth) => {
  options = Object.assign({}, DefaultOptions, options)
  const [user, setUser] = useState<UserDataInterface>()

  useEffect(() => {
    CheckAndUpdateAuthToken()
    const failedCheckAuth = (err?: any) => {
      if (options.redirectIfNotAuthenticated) {
        Router.replace(options.pageLogin)
      }
      console.log(err)
    }

    const isTokenValid = validateLocalToken()
    if (!isTokenValid) {
      failedCheckAuth()
    }
    ApiGetMe().then((res) => {
      setUser(res.data)
    }).catch((err) => {
      failedCheckAuth(err)
    })
  }, [])

  const userLogout = () => {
    RemoveAuthToken()
    Router.push(options.pageLogin)
  }

  return {
    user,
    userLogout
  }
}

function validateLocalToken() {
  const token = localStorage.getItem(AuthStorage.authorization)
  return !!token
}
