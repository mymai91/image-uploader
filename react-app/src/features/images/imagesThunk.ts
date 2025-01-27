import { ProductImage } from "@/app/product-images/types/ProductImage"
import { api } from "@/lib/api/api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  fetchListImage,
  fetchListImageFailure,
  removeImage,
  restoreImage,
} from "./imagesSlice"

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
  async (params, { dispatch }) => {
    console.log("params", params)

    try {
      await api.remove(`/images`, params.id)
      // console.log("response", response)
      dispatch(removeImage({ id: params.id }))
    } catch (error: any) {
      console.error(`DELETE /images/${params.id} failed:`, error)
    }
  },
)

export const restoreProductImage = createAsyncThunk(
  "productImages/restore",
  async (params, { dispatch }) => {
    try {
      const newImage = await api.update(`/images/${params.id}/restore`, {})
      dispatch(restoreImage({ image: newImage }))
    } catch (error: any) {
      console.error("POST /product-images failed:", error)
    }
  },
)
