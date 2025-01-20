"use client"

import { getClientStore } from "@/lib/store"
import { useMemo } from "react"
import { Provider } from "react-redux"

export function Providers({ children, preloadedState }) {
  const store = useMemo(() => getClientStore(preloadedState), [preloadedState])
  return <Provider>{children}</Provider>
}
