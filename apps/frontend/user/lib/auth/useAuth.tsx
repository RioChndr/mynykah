import { deleteCookie, setCookie } from 'cookies-next';
import Router from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ApiGetMe } from "../useFetch/api/auth-api";
import { LoginWithGoogle } from "./auth-provider";
import { configUseAuth } from "./config";
import { AuthProviderInterface, AuthUserInterface } from "./type";

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

  // run on componentDidMount
  useEffect(() => {
    const localUser = localStorage.getItem(configUseAuth.storage.localUser)
    if (localUser) {
      setUser(JSON.parse(localUser))
    }
  }, [])

  const saveToken = (token: string) => {
    localStorage.setItem(configUseAuth.storage.localToken, token)
    // save to cookies
    setCookie(configUseAuth.storage.localToken, token)
  }

  const saveUser = (user: AuthUserInterface) => {
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
    deleteCookie(configUseAuth.storage.localToken)
    Router.push(configUseAuth.loginPage)
  }

  const login = async (token: string) => {
    saveToken(token)
    // wait 1 sec to avoid strange thing
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 1000);
    })
    return fetchUser()
  }

  const loginStrategy = {
    withGoogle: async (payload: any) => {
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