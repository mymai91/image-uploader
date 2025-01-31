"use client"

import { PropsWithChildren } from "react"
import StoreProvider from "./StoreProvider"
import ThemeProvider from "./ThemeProvider"

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  )
}

export default AppProvider
