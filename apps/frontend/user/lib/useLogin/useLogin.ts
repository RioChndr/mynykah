import { useState } from "react"
import { useAuth } from "../auth/useAuth"
import { ApiLoginWithGoogle } from "../useFetch/api/auth-api"

type ResultProvider = Promise<{ token: string }>

export function useLogin(provider: string) {
  const [isDone, setIsDone] = useState<Boolean>(false)
  const [isError, setIsError] = useState<any>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const { fetchUser } = useAuth()

  const doLogin = async (creds?: any) => {
    try {
      setIsLoading(true)
      const providers: Record<string, (creds?: any) => ResultProvider> = {
        'google': LoginWithGoogle
      }
      const result = await providers[provider](creds)
      await fetchUser()
      setIsDone(true)
    } catch (error) {
      setIsError(error)
      console.log(error)
    }
    setIsLoading(false)
  }


  return {
    isDone,
    isError,
    isLoading,
    doLogin
  }
}

async function LoginWithGoogle(payload?: any): ResultProvider {
  const result = await ApiLoginWithGoogle({
    token: payload.credential
  })
  return {
    token: result.data.access_token
  }
}
