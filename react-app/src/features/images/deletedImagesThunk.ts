import {
  getListDeletedImageApi,
  restoreImageApi,
} from "@/app/product-images/api/productImage"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchListImage, restoreDeletedImage } from "./deletedImagesSlice"
import { getListImage } from "./imagesThunk"

export const getDeletedListImage = createAsyncThunk(
  "deletedImages/getList",
  async (params, { dispatch }) => {
    console.log("params", params)
    console.log("deletedImages getListThunk#####")
    try {
      const response = await getListDeletedImageApi()
      console.log("response", response)
      dispatch(
        fetchListImage({
          items: response.data.items,
          page: 1,
          limit: 10,
          totalPage: 0,
          total: 0,
        }),
      )
    } catch (error: any) {
      console.error("GET deleted /images failed:", error)
    }
  },
)

export const restoreImage = createAsyncThunk(
  "deletedImages/restore",
  async (params, { dispatch }) => {
    const response = await restoreImageApi(params.id)
    console.log("response.data=====", response.data)
    dispatch(restoreDeletedImage({ image: response.data }))
    // dispatch(getListImage())
    // dispatch(getDeletedListImage())
    console.log("response", response)
  },
)
