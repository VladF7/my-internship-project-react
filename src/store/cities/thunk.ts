import { createAsyncThunk } from '@reduxjs/toolkit'
import citiesAPI from '../../api/citiesAPI'
import { ICity, ICityForm, IEditCityRequestParams } from '../../types/city.types'
import { IThunkError } from '../../types'

export const getCitiesThunk = createAsyncThunk<ICity[], void, { rejectValue: IThunkError }>(
  'cities/getCities',
  async (data, { rejectWithValue }) => {
    try {
      const response = await citiesAPI.getCities()
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
export const deleteCityThunk = createAsyncThunk<number, number, { rejectValue: IThunkError }>(
  'cities/deleteCity',
  async (data, { rejectWithValue }) => {
    try {
      const response = await citiesAPI.deleteCity(data)
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
export const editCityThunk = createAsyncThunk<
  number[],
  IEditCityRequestParams,
  { rejectValue: IThunkError }
>('cities/editCity', async (data, { rejectWithValue }) => {
  try {
    const { id, formData } = data
    const response = await citiesAPI.editCity(id, formData)
    return response
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
export const addCityThunk = createAsyncThunk<ICity, ICityForm, { rejectValue: IThunkError }>(
  'cities/addCity',
  async (data: ICityForm, { rejectWithValue }) => {
    try {
      const response = await citiesAPI.addCity(data)
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
