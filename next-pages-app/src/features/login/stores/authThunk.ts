import { createAsyncThunk } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { loginApi } from "../api/api"
import { LoginDto } from "../types/login"
import { RegisterDto } from "../types/register"
import { registerApi } from "@/features/register/api/api"

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginDto, { rejectWithValue }) => {
    try {
      // const response = await axios.post('https://your-backend.com/api/login', credentials);
      const response = await loginApi(credentials)

      return response.data
      // return response.data.token
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed")
    }
  },
)

// 🔹 Async thunk for logout (if needed)
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  Cookies.remove("image_uploader-accessToken", { path: "/" })
  Cookies.remove("image_uploader-user", { path: "/" })
})

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterDto, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData) // Call your API function
      return response.data // Assume the response contains user info
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      )
    }
  },
)
