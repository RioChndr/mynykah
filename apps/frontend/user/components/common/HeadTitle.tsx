import Head from "next/head";
import { useAppConfig } from "../../config/app-config";

export function HeadTitle({ title, children }: { title?: string, children?: any }) {
  const appConfig = useAppConfig()
  if (children && typeof children !== 'string') {
    console.warn("HeadTitle children must be string")
    return <></>
  }
  return (
    <Head>
      <title>{`${title || children} | ${appConfig.name}`}</title>
    </Head>
  )
}