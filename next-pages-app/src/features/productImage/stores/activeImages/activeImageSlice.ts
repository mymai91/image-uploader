import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ListImageState, ProductImage } from "../../types/productImage"
import { uploadImage } from "./activeImageThunk"

const initialState: ListImageState = {
  items: [],
  isLoading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPage: 0,
}

const activeImageSlice = createSlice({
  name: "activeImages",
  initialState,
  reducers: {
    fetchListImage(state, action: PayloadAction<{ items: ProductImage[] }>) {
      state.items = action.payload.items
    },
    deleteImage(state, action: PayloadAction<{ id: number }>) {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },
    pushRestoredImageToActiveList(
      state,
      action: PayloadAction<{ item: ProductImage }>,
    ) {
      state.items.push(action.payload.item)
    },
    addUploadedImage(state, action: PayloadAction<{ item: ProductImage }>) {
      state.items.unshift(action.payload.item)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadImage.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(uploadImage.fulfilled, state => {
        state.isLoading = false
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const {
  fetchListImage,
  deleteImage,
  pushRestoredImageToActiveList,
  addUploadedImage,
} = activeImageSlice.actions

export default activeImageSlice.reducer
