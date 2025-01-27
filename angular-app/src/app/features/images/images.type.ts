export interface ImageResponse {
  id: number
  filename: string
  path: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface ListImagesResponse {
  items: ImageResponse[]
  total: number
  page: number
  limit: number
  totalPages: number
}
