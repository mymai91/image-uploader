import { ProductImage } from "@/app/product-images/types/ProductImage"
import { api } from "@/lib/api/api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchListImage, fetchListImageFailure } from "./imagesSlice"

export const getListImage = createAsyncThunk(
  "productImages/getList",
  async (params, { dispatch }) => {
    // Dispatch another action inside the thunk

    console.log("params", params)
    console.log("getListThunk#####")
    // return api.getList<ProductImage>("/product-images")
    try {
      const response = await api.getList<ProductImage>("/images")

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
      throw error
    }
  },
)
