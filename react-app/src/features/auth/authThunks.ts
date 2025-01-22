import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginSuccess, loginFailure } from "./authSlice"
import { LoginRequest, LoginResponse } from "@/app/login/types/auth"
import { api } from "@/lib/api/api"

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (loginData: LoginRequest, { dispatch }) => {
    try {
      const response = await api.create<LoginResponse, LoginRequest>(
        "/auth/signin",
        loginData,
      )
      const { user, accessToken } = response.data

      dispatch(loginSuccess({ user, accessToken }))

      return { user, accessToken }
    } catch (error: any) {
      dispatch(loginFailure(error.response?.data?.message || "Login failed"))
    }
  },
)
