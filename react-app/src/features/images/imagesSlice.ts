import { ProductImage } from "@/app/product-images/types/ProductImage"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ListImageState {
  items: ProductImage[]
  total: number
  page: number
  limit: number
  totalPage: number
  loading: boolean
  error: string | null
}

const initialState: ListImageState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPage: 0,
  loading: false,
  error: null,
}

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    fetchListImage(
      state,
      action: PayloadAction<{
        items: ProductImage[]
        page: number
        limit: number
        totalPage: number
        total: number
      }>,
    ) {
      state.items = [...state.items, ...action.payload.items]
      state.page = action.payload.page
      state.limit = action.payload.limit
      state.totalPage = action.payload.totalPage
      state.total = action.payload.total
      state.loading = false
      state.error = null
    },
    fetchListImageFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    removeImage(state, action: PayloadAction<{ id: number }>) {
      const items = state.items
      const newItems = items.filter(item => item.id !== action.payload.id)

      state.items = newItems
      state.loading = false
    },
    restoreImage(state, action: PayloadAction<{ image: ProductImage }>) {
      state.items.push(action.payload.image)
    },
  },
})

export const {
  fetchListImage,
  fetchListImageFailure,
  removeImage,
  restoreImage,
} = imageSlice.actions
export default imageSlice.reducer
