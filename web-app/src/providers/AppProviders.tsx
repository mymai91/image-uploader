import theme from "@/theme/theme"
import { ChakraProvider } from "@chakra-ui/react"
import React from "react"

interface Props {
  children: React.ReactNode
}

const AppProviders: React.FC<Props> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default AppProviders
