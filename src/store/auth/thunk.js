import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionLogin, actionLogout } from './slice'
import userAPI from '../../api/userAPI'
import { loaded } from '../preloader/slice'

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await userAPI.login(data)
      if (response.redirect) {
        return response
      }
      localStorage.setItem('token', response.token)
      dispatch(actionLogin(response.user))
      return response.user
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const checkAuthThunk = createAsyncThunk('auth/checkAuth', async (data, { dispatch }) => {
  try {
    const response = await userAPI.auth()
    dispatch(actionLogin(response.user))
  } catch (error) {
    dispatch(actionLogout())
  } finally {
    dispatch(loaded())
  }
})
export const signUpThunk = createAsyncThunk('auth/signUp', async (data, { rejectWithValue }) => {
  try {
    const response = data.signUpAsMaster
      ? await userAPI.masterRegistration(data)
      : await userAPI.customerRegistration(data)
    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})
export const createUserCustomerThunk = createAsyncThunk(
  'auth/createUserCustomer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.createUserCustomer(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
