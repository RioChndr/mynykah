import { extendTheme } from "@chakra-ui/react"

const themeCustom = {
  colors: {
    primary: 'teal'
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'teal',
      }
    }
  }
}

export const ThemeChakra = extendTheme(themeCustom)