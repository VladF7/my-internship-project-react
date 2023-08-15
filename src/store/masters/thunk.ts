import { createAsyncThunk } from '@reduxjs/toolkit'
import mastersAPI from '../../api/mastersAPI'
import userAPI from '../../api/userAPI'
import { IMaster, IMasterEditRequestParams, IMastersAndCount } from '../../types/master.types'
import { ISignUpForm, IUser } from '../../types/user.types'
import { ITablesRequestParams, IThunkError } from '../../types'

export const getMastersThunk = createAsyncThunk<
  IMastersAndCount,
  ITablesRequestParams,
  { rejectValue: IThunkError }
>('masters/getMasters', async (data: ITablesRequestParams, { rejectWithValue }) => {
  try {
    const response = await mastersAPI.getMasters(data)
    return response
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
export const deleteMasterThunk = createAsyncThunk<number, number, { rejectValue: IThunkError }>(
  'masters/deleteMaster',
  async (data: number, { rejectWithValue }) => {
    try {
      const response = await mastersAPI.deleteMaster(data)
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
export const editMasterThunk = createAsyncThunk<
  number[],
  IMasterEditRequestParams,
  { rejectValue: IThunkError }
>('masters/editMaster', async (data, { rejectWithValue }) => {
  try {
    const { id, formData } = data
    const response = await mastersAPI.editMaster(id, formData)
    return response
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
export const activateMasterThunk = createAsyncThunk<IMaster, number, { rejectValue: IThunkError }>(
  'masters/activateMaster',
  async (data, { rejectWithValue }) => {
    try {
      const response = await mastersAPI.activateMaster(data)
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
export const addMasterThunk = createAsyncThunk<IUser, ISignUpForm, { rejectValue: IThunkError }>(
  'masters/addMaster',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.masterRegistrationFromAdminPage(data)
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
