import Router from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ApiGetMe } from "../useFetch/api/auth-api";
import { setTokenAxios } from "../useFetch/useFetch";
import { LoginWithGoogle } from "./auth-provider";
import { AuthProviderInterface, AuthUserInterface } from "./type";
import { deleteCookie, removeCookies, setCookie } from 'cookies-next'
import { configUseAuth } from "./config";

export const AuthContext = React.createContext<AuthProviderInterface>({
  user: null,
  fetchUser: () => ({}),
  loginStrategy: {
    withGoogle: () => (null)
  },
  saveToken: (prev) => '',
  logout: () => null
})

export function AuthContextProvider(props: { children: JSX.Element }) {
  const [user, setUser] = useState<AuthUserInterface>()
  const [token, setToken] = useState('')

  useEffect(() => {
    const localToken = localStorage.getItem(configUseAuth.storage.localToken)
    saveToken(localToken)
    const localUser = localStorage.getItem(configUseAuth.storage.localUser)
    if(localUser){
      setUser(JSON.parse(localUser))
    }
  }, [])

  const saveToken = (token:string) => {
    setTokenAxios(token)
    setToken(token)
    localStorage.setItem(configUseAuth.storage.localToken, token)
    // save to cookies
    setCookie(configUseAuth.storage.localToken, token)
  }

  const saveUser = (user:AuthUserInterface) => {
    setUser(user)
    localStorage.setItem(configUseAuth.storage.localUser, JSON.stringify(user))
  }
  
  const fetchUser = async () => {
    const val = await ApiGetMe()
    const user = val.data
    saveUser(user)
    return user
  }

  const logout = () => {
    localStorage.removeItem(configUseAuth.storage.localToken)
    localStorage.removeItem(configUseAuth.storage.localUser)
    setUser(null)
    setToken(null)
    deleteCookie(configUseAuth.storage.localToken)
    Router.push(configUseAuth.loginPage)
  }

  const login = async (token:string) => {
    saveToken(token)
    return fetchUser()
  }

  const loginStrategy = {
    withGoogle: async (payload:any) => {
      const token = await LoginWithGoogle(payload)
      await login(token.token)
    },
  }

  const valueProvider = useMemo<AuthProviderInterface>(() => ({
    user,
    fetchUser,
    loginStrategy,
    saveToken,
    logout,
  }), [user])

  return (
    <AuthContext.Provider value={valueProvider}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}