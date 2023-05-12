import { createAsyncThunk } from '@reduxjs/toolkit'
import mastersAPI from '../../api/mastersAPI'
import userAPI from '../../api/userAPI'

export const getMastersThunk = createAsyncThunk(
  'masters/getMasters',
  async (data, { rejectWithValue }) => {
    try {
      const response = await mastersAPI.getMasters()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const deleteMasterThunk = createAsyncThunk(
  'masters/deleteMaster',
  async (data, { rejectWithValue }) => {
    try {
      const response = await mastersAPI.deleteMaster(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const editMasterThunk = createAsyncThunk(
  'masters/editMaster',
  async (data, { rejectWithValue }) => {
    try {
      const { id, formData } = data
      const response = await mastersAPI.editMaster(id, formData)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const addMasterThunk = createAsyncThunk(
  'masters/addMaster',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.masterRegistrationFromAdminPage(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
