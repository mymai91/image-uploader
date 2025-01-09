import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UploadState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  isReady: boolean
  hasFailed: boolean
  name: string
  type: string
  size: number
  loading: boolean
}

const initialState: UploadState = {
  status: 'idle',
  error: null,
  isReady: false,
  hasFailed: false,
  name: '',
  type: '',
  size: 0,
  loading: false,
}

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    uploadImage(state, action: PayloadAction<File>) {
      state.status = 'loading'
      state.isReady = false
      state.hasFailed = false
      state.name = action.payload.name
      state.type = action.payload.type
      state.size = action.payload.size
      state.loading = true
    },
    uploadImageSuccess(state) {
      state.status = 'succeeded'
      state.isReady = true
      state.loading = false
    },
    uploadImageFailed(state, action: PayloadAction<string>) {
      state.status = 'failed'
      state.error = action.payload
      state.hasFailed = true
      state.loading = false
    },
  },
})

export const { uploadImage, uploadImageSuccess, uploadImageFailed } =
  uploadSlice.actions

export default uploadSlice.reducer
