import { Box } from "@chakra-ui/react"
import React from "react"
import { Footer } from "../components/layout-default/footer"
import Navbar from "../components/layout-default/navbar"

type Props = {
  children?: React.ReactNode
}

const LayoutDefault: React.FC<Props> = ({children}) => (
  <>
    <Box as='main' minH='calc(100vh)'>
      <Navbar></Navbar>
      {children}
    </Box>
    <Footer></Footer>
  </>
)

export default LayoutDefault