import { createSlice } from '@reduxjs/toolkit'
import {
  activateMasterThunk,
  addMasterThunk,
  deleteMasterThunk,
  editMasterThunk,
  getMastersThunk
} from './thunk'
import { IMaster } from '../../types/master.types'

interface MastersState {
  masters: IMaster[]
  count: number
  error: null | string
  isLoading: boolean
  inProcess: boolean
}

const initialState: MastersState = {
  masters: [],
  count: 0,
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
      state.masters = action.payload.rows
      state.count = action.payload.count
    })
    builder.addCase(getMastersThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload?.message || 'Unknown error'
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
      state.error = action.payload?.message || 'Unknown error'
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
      state.error = action.payload?.message || 'Unknown error'
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
      state.error = action.payload?.message || 'Unknown error'
    })
    builder.addCase(activateMasterThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(activateMasterThunk.fulfilled, (state, action) => {
      state.inProcess = false
      const index = state.masters.findIndex((master) => master.id === action.payload.id)
      state.masters[index].isActivated = true
    })
    builder.addCase(activateMasterThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload?.message || 'Unknown error'
    })
  }
})

export default mastersSlice.reducer
