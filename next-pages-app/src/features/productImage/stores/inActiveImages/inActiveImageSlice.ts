import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ListImageState, ProductImage } from "../../types/productImage"

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
    pushDeletedImageToInActiveList(
      state,
      action: PayloadAction<{ item: ProductImage }>,
    ) {
      state.items.push(action.payload.item)
    },
  },
})

export const { fetchListImage, restoreImage, pushDeletedImageToInActiveList } =
  inActiveImageSlice.actions

export default inActiveImageSlice.reducer
