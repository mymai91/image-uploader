import { ProductImage } from "@/app/product-images/types/ProductImage"
import { api } from "@/lib/api/api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  // addRestoreImage,
  fetchListImage,
  fetchListImageFailure,
  removeImage,
} from "./imagesSlice"
import { addRestoreImage } from "./deletedImagesSlice"

export const getListImage = createAsyncThunk(
  "productImages/getList",
  async (params, { dispatch }) => {
    // Dispatch another action inside the thunk

    console.log("params", params)
    console.log("getListThunk#####")
    // return api.getList<ProductImage>("/product-images")
    try {
      const response = await api.getList<ProductImage>("/images", {
        isActive: true,
      })

      dispatch(
        fetchListImage({
          items: response.data.items,
          page: 1,
          limit: 10,
          totalPage: response.data.totalPage,
          total: response.data.total,
        }),
      )
      console.log("response", response)
    } catch (error: any) {
      dispatch(
        fetchListImageFailure(
          error.response?.data?.message || "Failed to fetch images",
        ),
      )
      console.error("GET /product-images failed:", error)
      // throw error
    }
  },
)

export const deleteImage = createAsyncThunk(
  "productImages/delete",
  async (params: ProductImage, { dispatch }) => {
    console.log("params", params)

    try {
      await api.remove(`/images`, params.id)
      // console.log("response", response)

      // Optimistic update: remove from Redux state immediately
      dispatch(removeImage({ id: params.id }))
      dispatch(addRestoreImage({ image: params }))
    } catch (error: any) {
      console.error(`DELETE /images/${params.id} failed:`, error)
    }
  },
)
