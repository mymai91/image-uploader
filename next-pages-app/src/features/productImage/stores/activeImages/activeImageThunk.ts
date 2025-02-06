import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  addUploadedImage,
  deleteImage,
  fetchListImage,
} from "./activeImageSlice"
// import { ProductImage } from "@/types/image"
import { pushDeletedImageToInActiveList } from "../inActiveImages/inActiveImageSlice"
import { ProductImage } from "../../types/productImage"
import { deleteImageApi, getListImageApi, uploadImageApi } from "../../api/api"

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

export const uploadImage = createAsyncThunk(
  "activeImages/upload",
  async (
    params: { file: File; description: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const resp = await uploadImageApi(params.file, params.description)

      dispatch(addUploadedImage({ item: resp.data }))
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Image upload failed",
      )
    }
  },
)
