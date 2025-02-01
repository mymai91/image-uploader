import authReducer from "@/features/login/stores/authSlice"
import activeImagesReducer from "@/features/productImage/stores/activeImages/activeImageSlice"
import inActiveImagesReducer from "@/features/productImage/stores/inActiveImages/inActiveImageSlice"
import { configureStore } from "@reduxjs/toolkit"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      activeImages: activeImagesReducer,
      inActiveImages: inActiveImagesReducer,
    },
  })
}

// Infer types for hooks
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
