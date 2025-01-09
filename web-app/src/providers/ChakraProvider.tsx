import theme from '@/theme/theme'
import { ChakraProvider as ChakraUIProvider } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const ChakraProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ChakraUIProvider theme={theme}>{children}</ChakraUIProvider>
}

export default ChakraProvider
