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
  update: async <T, Payload>(
    path: string,
    id: string,
    data: Payload,
  ): Promise<T> => {
    try {
      const response = await axios.put(`${path}/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`PUT ${path}/${id} failed:`, error)
      throw error
    }
  },

  /**
   * Delete a resource
   */
  remove: async (path: string, id: string): Promise<void> => {
    try {
      await axios.delete(`${path}/${id}`)
    } catch (error) {
      console.error(`DELETE ${path}/${id} failed:`, error)
      throw error
    }
  },
}
