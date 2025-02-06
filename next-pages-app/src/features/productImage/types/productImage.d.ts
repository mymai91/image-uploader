export interface ProductImage {
  id: number
  filename: string
  path: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPage: number
}

export interface ListImageState extends Pagination {
  items: ProductImage[]
  isLoading: boolean
  error: string | null
}

export interface ProductImageListResponse {
  data: {
    items: ProductImage[]
  }
}

export interface UploadImageResponse {
  data: ProductImage
}
