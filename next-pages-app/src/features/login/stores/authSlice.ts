import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { loginUser, logoutUser } from "./authThunk"
import { User } from "../types/login"

interface AuthState {
  accessToken: string | null
  user: User | null
  loading: boolean
  error: string | null
}

// Try to load user info from the JWT token stored in cookies
const token = Cookies.get("accessToken") || null
const storedUser = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null

const initialState: AuthState = {
  user: storedUser,
  accessToken: token,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ accessToken: string; user: User }>) => {
          state.loading = false
          state.accessToken = action.payload.accessToken
          state.user = action.payload.user

          Cookies.set("accessToken", action.payload.accessToken, { expires: 7 })
          Cookies.set("user", JSON.stringify(action.payload.user))
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logoutUser.fulfilled, state => {
        state.accessToken = null
        Cookies.remove("accessToken")
        Cookies.remove("user")
      })
  },
})

export default authSlice.reducer
