import React, { PropsWithChildren } from 'react'
import ReduxProvider from './ReduxProvider'
import ChakraProvider from './ChakraProvider'

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReduxProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </ReduxProvider>
  )
}

export default AppProviders
