import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"

export type NextPageOptions = NextPage & {
  /** default : false, If true, page will generate no layout default */
  noLayout?: boolean

  /** Fill with layout page custom */
  getLayout?: (props: any) => ReactElement

  /** If true, page will check if loggedin or not */
  requireAuth?: boolean
}

export type AppPropsOptions = AppProps & {
  Component: NextPageOptions
}