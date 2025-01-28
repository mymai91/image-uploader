import { api } from "@/lib/api/api"
import { ProductImage } from "../types/ProductImage"

type EmptyObject = Record<string, never>

export const getListImageApi = () => {
  return api.getList<ProductImage[]>("images", { isActive: true })
}

export const getListDeletedImageApi = () => {
  return api.getList<ProductImage[]>("images", { isActive: false })
}

export const restoreImageApi = (id: number) => {
  const path = `images/${id}/restore`
  return api.update<ProductImage, EmptyObject>(path, {})
}
