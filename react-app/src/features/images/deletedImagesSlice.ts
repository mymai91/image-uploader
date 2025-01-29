import {
  Pagination,
  ProductImage,
} from "@/app/product-images/types/ProductImage"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface DeletedListImageState extends Pagination {
  items: ProductImage[]
  loading: boolean
  error: string | null
}

const initialState: DeletedListImageState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPage: 0,
  loading: false,
  error: null,
}

const deletedImagesSlice = createSlice({
  name: "deletedImages",
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
      // state.items = [...state.items, ...action.payload.items]
      // state.items = [...state.items, ...action.payload.items]
      // if (action.payload.isLoadMore) {
      //   // Append when scrolling for more
      //   state.items = [...state.items, ...action.payload.items]
      // } else {
      //   // Replace when refetching
      //   state.items = action.payload.items
      // }

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
    restoreDeletedImage(state, action: PayloadAction<{ image: ProductImage }>) {
      state.items = state.items.filter(
        item => item.id !== action.payload.image.id,
      )
    },
    addRestoreImage(state, action: PayloadAction<{ image: ProductImage }>) {
      state.items = [...state.items, action.payload.image]
    },
  },
})

export const {
  fetchListImage,
  fetchListImageFailure,
  restoreDeletedImage,
  addRestoreImage,
} = deletedImagesSlice.actions

export default deletedImagesSlice.reducer
