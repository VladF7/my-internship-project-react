import { createSlice } from '@reduxjs/toolkit'
import { addMasterThunk, deleteMasterThunk, editMasterThunk, getMastersThunk } from './thunk'

const initialState = {
  masters: [],
  error: null,
  isLoading: false,
  inProcess: false
}

export const mastersSlice = createSlice({
  name: 'masters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMastersThunk.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(getMastersThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.masters = action.payload
    })
    builder.addCase(getMastersThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload.message
    })
    builder.addCase(deleteMasterThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(deleteMasterThunk.fulfilled, (state, action) => {
      state.inProcess = false
      const id = action.payload
      state.masters = state.masters.filter((master) => master.id !== id)
    })
    builder.addCase(deleteMasterThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload.message
    })
    builder.addCase(editMasterThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(editMasterThunk.fulfilled, (state) => {
      state.inProcess = false
    })
    builder.addCase(editMasterThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload.message
    })
    builder.addCase(addMasterThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(addMasterThunk.fulfilled, (state) => {
      state.inProcess = false
    })
    builder.addCase(addMasterThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload.message
    })
  }
})

export default mastersSlice.reducer
