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
    const token = localStorage.getItem("accessToken")

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
// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error.response?.status === 401) {
//       // Handle token expiration
//       localStorage.removeItem("accessToken")
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   },
// )

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
      localStorage.removeItem("accessToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
