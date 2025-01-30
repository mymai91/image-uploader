"use client"

import { PropsWithChildren } from "react"
import StoreProvider from "./StoreProvider"
import ChakraThemeProvider from "./ChakraThemeProvider"

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <ChakraThemeProvider>{children}</ChakraThemeProvider>
    </StoreProvider>
  )
}

export default AppProvider
