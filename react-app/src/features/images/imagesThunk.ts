import { createAsyncThunk } from "@reduxjs/toolkit"

export const getListThunk = createAsyncThunk("productImages/getList", async ({dispatch}) => {

  // return api.getList<ProductImage>("/product-images")
  try {
    const response = await api.getList<ProductImage>("/product-images")
  } catch (error: any) {
    console.error("GET /product-images failed:", error)
    throw error
  }
}