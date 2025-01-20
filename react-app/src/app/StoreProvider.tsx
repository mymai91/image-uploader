"use client"

import { Provider } from "react-redux"
import { useRef } from "react"
import { AppStore, makeStore } from "@/store"

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore() // Create store on first render
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
