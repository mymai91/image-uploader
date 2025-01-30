import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/features/auth/authSlice"
import imagesReducer from "@/features/images/imagesSlice"
import deletedImagesReducer from "@/features/images/deletedImagesSlice"
import activeImageRducer from "@/features/activeImages/activeImageSlice"
import inActiveImageReducer from "@/features/inActiveImages/inActiveImageSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer, // Add reducers here
      images: imagesReducer,
      activeImages: activeImageRducer,
      inActiveImages: inActiveImageReducer,
      deletedImages: deletedImagesReducer,
    },
  })
}

// Infer types for hooks
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
