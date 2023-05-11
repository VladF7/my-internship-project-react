import { createAsyncThunk } from '@reduxjs/toolkit'
import citiesAPI from '../../api/citiesAPI'

export const getCitiesThunk = createAsyncThunk(
  'cities/getCities',
  async (data, { rejectWithValue }) => {
    try {
      const response = await citiesAPI.getCities()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const deleteCityThunk = createAsyncThunk(
  'cities/deleteCity',
  async (data, { rejectWithValue }) => {
    try {
      const response = await citiesAPI.deleteCity(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const editCityThunk = createAsyncThunk(
  'cities/editCity',
  async (data, { rejectWithValue }) => {
    try {
      const { id, formData } = data
      const response = await citiesAPI.editCity(id, formData)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const addCityThunk = createAsyncThunk(
  'cities/addCity',
  async (data, { rejectWithValue }) => {
    try {
      const response = await citiesAPI.addCity(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
