import { createSlice } from '@reduxjs/toolkit'

interface PreloaderState {
  error: null | string
  isLoading: boolean
}

const initialState: PreloaderState = {
  error: null,
  isLoading: true
}

export const perloaderSlice = createSlice({
  name: 'preloader',
  initialState,
  reducers: {
    loaded(state) {
      state.isLoading = false
    },
    loading(state) {
      state.isLoading = false
    }
  }
})

export const { loaded, loading } = perloaderSlice.actions

export default perloaderSlice.reducer
