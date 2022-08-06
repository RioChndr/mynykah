import { useState } from "react"
import { CheckAndUpdateAuthToken, SaveToLocalstorage } from "../useAuth/auth-utils"
import { ApiLoginWithGoogle } from "../useFetch/api/auth-api"

type ResultProvider = Promise<{ token: string }>

export function useLogin(provider: string) {
  const [isDone, setIsDone] = useState<Boolean>(false)
  const [isError, setIsError] = useState<any>()
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const doLogin = (creds?: any) => {
    setIsLoading(true)
    const providers: Record<string, (creds?: any) => ResultProvider> = {
      'google': LoginWithGoogle
    }
    providers[provider](creds).then((result) => {
      SaveToLocalstorage(result.token)
      CheckAndUpdateAuthToken()
      setIsDone(true)
    }).catch((error) => {
      setIsError(error)
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
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
