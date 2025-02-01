import authReducer from "@/features/login/store/authSlice"
import { configureStore } from "@reduxjs/toolkit"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  })
}

// Infer types for hooks
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
