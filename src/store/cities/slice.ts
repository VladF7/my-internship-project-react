import { createSlice } from '@reduxjs/toolkit'
import { addCityThunk, deleteCityThunk, editCityThunk, getCitiesThunk } from './thunk'
import { ICity } from '../../types/city.types'

interface CitiesState {
  cities: ICity[]
  error: null | string
  isLoading: boolean
  inProcess: boolean
}

const initialState: CitiesState = {
  cities: [],
  error: null,
  isLoading: false,
  inProcess: false
}

export const mastersSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCitiesThunk.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(getCitiesThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.cities = action.payload
    })
    builder.addCase(getCitiesThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload?.message || 'Unknown error'
    })
    builder.addCase(deleteCityThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(deleteCityThunk.fulfilled, (state, action) => {
      state.inProcess = false
      const id = action.payload
      state.cities = state.cities.filter((city) => city.id !== id)
    })
    builder.addCase(deleteCityThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload?.message || 'Unknown error'
    })
    builder.addCase(editCityThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(editCityThunk.fulfilled, (state) => {
      state.inProcess = false
    })
    builder.addCase(editCityThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload?.message || 'Unknown error'
    })
    builder.addCase(addCityThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(addCityThunk.fulfilled, (state) => {
      state.inProcess = false
    })
    builder.addCase(addCityThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload?.message || 'Unknown error'
    })
  }
})

export default mastersSlice.reducer
