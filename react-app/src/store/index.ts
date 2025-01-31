import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/features/auth/authSlice"
import activeImageRducer from "@/features/activeImages/activeImageSlice"
import inActiveImageReducer from "@/features/inActiveImages/inActiveImageSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // Add reducers here
      activeImages: activeImageRducer,
      inActiveImages: inActiveImageReducer,
    },
  })
}

// Infer types for hooks
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
