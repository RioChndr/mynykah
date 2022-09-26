import Head from "next/head";
import { AppConfig } from "../../config/app-config";

export function HeadTitle({ title, children }: { title?: string, children?: any }) {
  if (children && typeof children !== 'string') {
    console.warn("HeadTitle children must be string")
    return <></>
  }
  return (
    <Head>
      <title>{`${title || children} | ${AppConfig.name}`}</title>
    </Head>
  )
}