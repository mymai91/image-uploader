import { api } from "@/lib/axios/api"
import {
  ProductImageListResponse,
  UploadImageResponse,
} from "../types/productImage"

type EmptyObject = Record<string, never>

export const getListImageApi = async () => {
  return await api.getList<ProductImageListResponse>("images", {
    isActive: true,
  })
}

export const getListInActiveImageApi = async () => {
  return await api.getList<ProductImageListResponse>("images", {
    isActive: false,
  })
}

export const restoreImageApi = async (id: number) => {
  const path = `images/${id}/restore`
  return await api.update<UploadImageResponse, EmptyObject>(path, {})
}

export const deleteImageApi = async (id: number) => {
  return await api.remove(`images`, id)
}

export const uploadImageApi = async (file: File, description: string) => {
  const formData = new FormData()
  formData.append("image", file)
  formData.append("description", description)

  return await api.create<UploadImageResponse, FormData>("images", formData)
}
