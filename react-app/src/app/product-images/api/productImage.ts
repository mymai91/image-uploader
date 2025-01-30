import { api } from "@/lib/api/api"
import { ProductImage } from "@/types/image"

type EmptyObject = Record<string, never>

export const getListImageApi = () => {
  return api.getList<ProductImage[]>("images", { isActive: true })
}

export const getListInActiveImageApi = () => {
  return api.getList<ProductImage[]>("images", { isActive: false })
}

export const restoreImageApi = (id: number) => {
  const path = `images/${id}/restore`
  return api.update<ProductImage, EmptyObject>(path, {})
}

export const deleteImageApi = (id: number) => {
  return api.remove(`images`, id)
}

export const uploadImageApi = (file: File, description: string) => {
  return api.create("images", { file, description })
}
