import { useState, useEffect } from "react"
import { useAppSelector } from "@/hooks/storeHooks"

export const useIsAuthenticated = () => {
  const [isClient, setIsClient] = useState(false)
  const { accessToken } = useAppSelector(state => state.auth)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? Boolean(accessToken) : false
}
