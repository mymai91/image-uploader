1. src/lib/axios/axios.config.ts

```
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("image_uploader-accessToken")

    // Only set Content-Type to JSON if it's not FormData
    if (config.headers && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json"
    }

    if (token && config.headers) {
      console.log("##token##", token)
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // Transform the data while keeping the original AxiosResponse structure
    response.data = {
      data: response.data?.data || response.data,
      status: response.status,
    }
    return response // Return the original AxiosResponse object
  },
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("image_uploader-accessToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
```

2. Api middle layer src/lib/axios/api.ts

```
import axios from "../axios/axios.config"

/* eslint-disable @typescript-eslint/no-explicit-any */
interface QueryParams {
  [key: string]: any
}

export const api = {
  /**
   * Get a list of resources with optional query parameters
   */
  getList: async <T>(path: string, params?: QueryParams): Promise<T[]> => {
    try {
      const response = await axios.get(path, { params })
      return response.data
    } catch (error) {
      console.error(`GET ${path} failed:`, error)
      throw error
    }
  },

  /**
   * Get a single resource by ID
   */
  getOne: async <T>(path: string, id: string): Promise<T> => {
    try {
      const response = await axios.get(`${path}/${id}`)
      return response.data
    } catch (error) {
      console.error(`GET ${path}/${id} failed:`, error)
      throw error
    }
  },

  /**
   * Create a new resource
   */
  create: async <T, Payload>(path: string, data: Payload): Promise<T> => {
    try {
      const response = await axios.post(path, data)
      return response.data
    } catch (error) {
      console.error(`POST ${path} failed:`, error)
      throw error
    }
  },

  /**
   * Update an existing resource
   */
  update: async <T, Payload>(path: string, data: Payload): Promise<T> => {
    try {
      const response = await axios.put(`${path}`, data)
      return response.data
    } catch (error) {
      console.error(`PUT ${path} failed:`, error)
      throw error
    }
  },

  /**
   * Delete a resource
   */
  remove: async (path: string, id: number): Promise<void> => {
    try {
      await axios.delete(`${path}/${id}`)
    } catch (error) {
      console.error(`DELETE ${path}/${id} failed:`, error)
      throw error
    }
  },
}
```
