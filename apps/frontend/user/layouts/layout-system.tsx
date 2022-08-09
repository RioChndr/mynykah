import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import React, { ReactElement, useEffect } from "react";
import { AuthContextProvider } from "../lib/auth/useAuth";
import { initAxios } from "../lib/useFetch/useFetch";
import { ThemeChakra } from "../theme/theme";
import { AppPropsOptions } from "../type/app-type";
import LayoutDefault from "./default";

export function LayoutSystem (props: AppPropsOptions & {children?:ReactElement}) {
  initAxios()

  // base component must be provide ChalkraProvider
  const BaseComponent = ({children}) => (
    <AuthContextProvider>
      <ChakraProvider theme={ThemeChakra}>
        {children}
      </ChakraProvider>
    </AuthContextProvider>
  )

  if(props.Component.noLayout){
    return <BaseComponent>{props.children}</BaseComponent>
  }
  if(props.Component.getLayout){
    return <BaseComponent>{props.Component.getLayout(props)}</BaseComponent>
  }
  return <BaseComponent><LayoutDefault>{props.children}</LayoutDefault></BaseComponent>
}