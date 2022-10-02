import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement } from "react";
import { AppConfigProvider } from "../config/app-config";
import { AuthContextProvider } from "../lib/auth/useAuth";
import { SwrConfigProvider } from "../lib/useFetch/swr-config-provider";
import { ThemeChakra } from "../theme/theme";
import { AppPropsOptions } from "../type/app-type";
import LayoutDefault from "./default";

export function LayoutSystem(props: AppPropsOptions & { children?: ReactElement }) {
  // base component must be provide ChalkraProvider
  const BaseComponent = ({ children }) => (
    <AppConfigProvider>
      <AuthContextProvider>
        <SwrConfigProvider>
          <ChakraProvider theme={ThemeChakra}>
            {children}
          </ChakraProvider>
        </SwrConfigProvider>
      </AuthContextProvider>
    </AppConfigProvider>
  )

  if (props.Component.noLayout) {
    return <BaseComponent>{props.children}</BaseComponent>
  }
  if (props.Component.getLayout) {
    return <BaseComponent>{props.Component.getLayout(props)}</BaseComponent>
  }
  return <BaseComponent><LayoutDefault>{props.children}</LayoutDefault></BaseComponent>
}