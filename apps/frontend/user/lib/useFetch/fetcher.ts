import { SWRResponse } from 'swr';
import { api } from "./api";

export const fetcher = (url: string) => api.get(url).then(res => res.data)

export function SwrHooks<T>(swrResponse: SWRResponse) {
  return {
    data: swrResponse.data as T,
    isLoading: !swrResponse.data && !swrResponse.error,
    isError: swrResponse.error
  }
}