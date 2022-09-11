import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react"

const Container: ComponentStyleConfig = {
  baseStyle: {
    maxW: 'container.xl'
  },
}

export const ThemeChakra = extendTheme({
  colors: {
    primary: '#319795' // teal.500
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'teal',
      }
    },
    Container,
  },
})