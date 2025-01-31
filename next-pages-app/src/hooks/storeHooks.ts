import { AppDispatch, AppStore, RootState } from "@/lib/store"
import { useDispatch, useSelector, useStore } from "react-redux"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: (selector: (state: RootState) => any) => any =
  useSelector
export const useAppStore = () => useStore<AppStore>()
