import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginSuccess, loginFailure } from "./authSlice"
import axiosInstance from "@/lib/axios/axios.config"
import { LoginRequest } from "@/app/login/types/auth"

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (loginData: LoginRequest, { dispatch }) => {
    console.log("loginData in loginThunk", loginData)
    try {
      const response = await axiosInstance.post("/auth/signin", loginData)
      const { user, accessToken } = response.data.data

      dispatch(loginSuccess({ user, accessToken }))

      return { user, accessToken }
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"))
    }
  },
)
