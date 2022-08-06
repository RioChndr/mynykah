import { ChakraProvider } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { ThemeChakra } from "../theme/theme";
import { AppPropsWithLayout } from "../type/app-type";
import LayoutDefault from "./default";

export function LayoutSystem (props: AppPropsWithLayout & {children?:ReactElement}) {
  // base component must be provide ChalkraProvider
  const BaseComponent = ({children}) => (
    <ChakraProvider theme={ThemeChakra}>
      {children}
    </ChakraProvider>
  )

  if(props.Component.noLayout){
    return <BaseComponent>{props.children}</BaseComponent>
  }
  if(props.Component.getLayout){
    return <BaseComponent>{props.Component.getLayout(props)}</BaseComponent>
  }
  return <BaseComponent><LayoutDefault>{props.children}</LayoutDefault></BaseComponent>
}