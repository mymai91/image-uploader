import theme from "@/lib/theme/theme"
import { ChakraProvider } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default ThemeProvider
