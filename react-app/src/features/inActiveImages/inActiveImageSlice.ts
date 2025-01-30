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

const inActiveImageSlice = createSlice({
  name: "inActiveImages",
  initialState,
  reducers: {
    fetchListImage(state, action: PayloadAction<{ items: ProductImage[] }>) {
      state.items = action.payload.items
    },
    restoreImage(state, action: PayloadAction<{ id: number }>) {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },
  },
})

export const { fetchListImage, restoreImage } = inActiveImageSlice.actions

export default inActiveImageSlice.reducer
