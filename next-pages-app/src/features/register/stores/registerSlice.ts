interface RegisterState {
  id: string
  username: string
  email: string
}

const initialState: RegisterState = {
  id: "",
  username: "",
  email: "",
}

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegister: (state, action: PayloadAction<RegisterState>) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.email = action.payload.email
    },
  },
})
