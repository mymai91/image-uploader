import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginSuccess, loginFailure } from "./authSlice"
import axiosInstance from "@/lib/axios/axios.config"

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { dispatch }) => {
    console.log("credentials in loginThunk", credentials)
    try {
      const response = await axiosInstance.post("/auth/signin", credentials)
      const { user, accessToken } = response.data.data

      dispatch(loginSuccess({ user, accessToken }))

      return { user, accessToken }
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"))
    }
  },
)
