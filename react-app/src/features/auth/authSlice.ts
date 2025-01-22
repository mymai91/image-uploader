import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: { id: number; email: string } | null
  accessToken: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ user: AuthState["user"]; accessToken: string }>,
    ) {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.loading = false
      state.error = null
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
    logout(state) {
      state.user = null
      state.accessToken = null
    },
  },
})

export const { loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
