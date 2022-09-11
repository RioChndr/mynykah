import { ApiLoginWithGoogle } from "../useFetch/api/auth-api"
import { ResultProvider } from "./type"

export async function LoginWithGoogle(payload: any): Promise<ResultProvider> {
  try {
    const result = await ApiLoginWithGoogle({
      token: payload.credential
    })
    return {
      token: result.data.access_token
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
}
