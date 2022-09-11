import { SWRConfig, SWRConfiguration } from "swr"
import { fetcher } from "./fetcher"

export function SwrConfigProvider({ children }) {
  const config: SWRConfiguration = {
    fetcher: fetcher,
    refreshInterval: 0,
  }

  return <SWRConfig value={config}>{children}</SWRConfig>
}