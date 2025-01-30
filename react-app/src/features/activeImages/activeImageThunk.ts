import {
  deleteImageApi,
  getListImageApi,
} from "@/app/product-images/api/productImage"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteImage, fetchListImage } from "./activeImageSlice"
import { ProductImage } from "@/types/image"
import { pushDeletedImageToInActiveList } from "../inActiveImages/inActiveImageSlice"

export const getListActiveImage = createAsyncThunk(
  "activeImages/getList",
  async (params, { dispatch }) => {
    try {
      const response = await getListImageApi()
      dispatch(fetchListImage({ items: response.data.items }))
    } catch (error: any) {
      console.error("getListActiveImage /images failed:", error)
      throw error
    }
  },
)

export const deleteActiveImage = createAsyncThunk(
  "activeImages/delete",
  async (params: ProductImage, { dispatch }) => {
    try {
      await deleteImageApi(params.id)
      dispatch(deleteImage({ id: params.id }))
      dispatch(pushDeletedImageToInActiveList({ item: params }))
    } catch (error: any) {
      console.log("deleteActiveImage /images failed:", error)
    }
  },
)
