import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { loginUser, logoutUser, registerUser } from "./authThunk"
import { User } from "../login/types/login"

interface AuthState {
  accessToken: string | null
  user: User | null
  loading: boolean
  error: string | null
}

// Try to load user info from the JWT token stored in cookies
const token = Cookies.get("image_uploader-accessToken") || null
const storedUser = Cookies.get("image_uploader-user")
  ? JSON.parse(Cookies.get("image_uploader-user")!)
  : null

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
      // Handle Register user
      .addCase(registerUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Handle  login user
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

          Cookies.set(
            "image_uploader-accessToken",
            action.payload.accessToken,
            { expires: 7 },
          )
          Cookies.set(
            "image_uploader-user",
            JSON.stringify(action.payload.user),
          )
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(logoutUser.fulfilled, state => {
        state.accessToken = null
        Cookies.remove("image_uploader-accessToken")
        Cookies.remove("image_uploader-user")
      })
  },
})

export default authSlice.reducer
