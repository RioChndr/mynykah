import axios from "axios";
import Router from "next/router";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ApiGetMe } from "../useFetch/api/auth-api";
import { setTokenAxios } from "../useFetch/useFetch";
import { LoginWithGoogle } from "./auth-provider";
import { AuthProviderInterface, AuthUserInterface, ResultProvider } from "./type";

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
  
  const local = {
    localToken: 'access_token',
    localUser: 'auth_user',
  }

  useEffect(() => {
    const localToken = localStorage.getItem(local.localToken)
    setToken(localToken)
    const localUser = localStorage.getItem(local.localUser)
    if(localUser){
      setUser(JSON.parse(localUser))
    }
  }, [])

  const saveToken = (token:string) => {
    setTokenAxios(token)
    localStorage.setItem(local.localToken, token)
  }

  const saveUser = (user:AuthUserInterface) => {
    setUser(user)
    localStorage.setItem(local.localUser, JSON.stringify(user))
  }
  
  const fetchUser = async () => {
    const val = await ApiGetMe()
    const user = val.data
    saveUser(user)
    return user
  }

  const logout = () => {
    localStorage.removeItem(local.localToken)
    localStorage.removeItem(local.localUser)
    setUser(null)
    setToken(null)
    Router.push('/login')
  }

  const loginStrategy = {
    withGoogle: LoginWithGoogle,
  }

  const valueProvider = useMemo<AuthProviderInterface>(() => ({
    user,
    fetchUser,
    loginStrategy,
    saveToken,
    logout
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