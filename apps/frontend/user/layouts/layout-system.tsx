import { ChakraProvider } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { ThemeChakra } from "../theme/theme";
import { AppPropsWithLayout } from "../type/app-type";
import LayoutDefault from "./default";

export function LayoutSystem (props: AppPropsWithLayout, page: ReactElement) {
  // base component must be provide ChalkraProvider
  const BaseComponent = ({children}) => (
    <ChakraProvider theme={ThemeChakra}>
      {children}
    </ChakraProvider>
  )

  if(props.Component.noLayout){
    return <BaseComponent>{page}</BaseComponent>
  }
  return props.Component.getLayout ?? <BaseComponent><LayoutDefault>{page}</LayoutDefault></BaseComponent>
}