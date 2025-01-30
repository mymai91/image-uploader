import {
  getListInActiveImageApi,
  restoreImageApi,
} from "@/app/product-images/api/productImage"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchListImage, restoreImage } from "./inActiveImageSlice"
import { ProductImage } from "@/types/image"

export const getListInActiveImage = createAsyncThunk(
  "inActiveImages/getList",
  async (params, { dispatch }) => {
    try {
      const resp = await getListInActiveImageApi()

      dispatch(fetchListImage({ items: resp.data.items }))
    } catch (error: any) {
      console.error("GET /images failed:", error)
    }
  },
)

export const restoreInActiveImage = createAsyncThunk(
  "inActiveImages/restore",
  async (params: ProductImage, { dispatch }) => {
    try {
      const resp = await restoreImageApi(params.id)
      dispatch(restoreImage({ id: params.id }))
    } catch (error) {
      console.error(
        `inActiveImages/restore /images/${params.id} failed:`,
        error,
      )
    }
  },
)
