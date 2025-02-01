import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useAppSelector } from "./storeHooks"

export function useAuthRedirect() {
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.auth.isAuthenticated,
  // )

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  return isAuthenticated
}
