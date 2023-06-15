import { createSlice } from '@reduxjs/toolkit'
import { getMasterStatisticsThunk } from './thunk'

const initialState = {
  masters: [],
  count: 0,
  error: null,
  isLoading: false,
  inProcess: false
}

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMasterStatisticsThunk.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(getMasterStatisticsThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.masters = action.payload.rows
      state.count = action.payload.count
    })
    builder.addCase(getMasterStatisticsThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload.message
    })
  }
})

export default statisticsSlice.reducer
