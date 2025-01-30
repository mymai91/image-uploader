import { ListImageState, ProductImage } from "@/types/image"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
  },
})

export const { fetchListImage, deleteImage, pushRestoredImageToActiveList } =
  activeImageSlice.actions

export default activeImageSlice.reducer
