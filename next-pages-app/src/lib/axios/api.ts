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
  // create: async <T, Payload>(path: string, data: Payload): Promise<T> => {
  //   try {
  //     const response = await axios.post(path, data)
  //     return response.data
  //   } catch (error: any) {
  //     // console.error(`POST ${path} failed:`, error)
  //     // throw error
  //     console.error(`POST ${path} failed:`, error)

  //     // Extract error message safely
  //     const message =
  //       error.response?.data?.message || "An unexpected error occurred"

  //     // Throw a new error with a clean message
  //     throw new Error(message)
  //   }
  // },

  // create: async <T, Payload>(path: string, data: Payload): Promise<T> => {
  //   try {
  //     const response = await axios.post(path, data)
  //     return response.data
  //   } catch (error: any) {
  //     console.error(`POST ${path} failed:`, error)

  //     // Extract error response from Axios
  //     const message =
  //       error.response?.data?.message || "An unexpected error occurred"

  //     // Prevent throwing full Axios error (which breaks Next.js)
  //     throw new Error(message)
  //   }
  // },

  create: async <T, Payload>(path: string, data: Payload): Promise<T> => {
    // try {
    const response = await axios.post(path, data)
    return response.data
    // } catch (error: any) {
    //   // Extract a safe error message
    //   const response = JSON.parse(error.request?.response)

    //   const message = response?.message || "An unexpected error occurred"
    //   console.log("message", message)
    //   throw message
    //   // Prevent throwing full Axios error (which crashes Next.js)
    //   // return Promise.reject(new Error(message))
    // }
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
