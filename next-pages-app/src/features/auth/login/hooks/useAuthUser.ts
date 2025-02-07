import { useAppSelector } from "@/hooks/storeHooks"

export const useAuthUser = () => {
  const { user } = useAppSelector(state => state.auth)

  return user
}
