import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
