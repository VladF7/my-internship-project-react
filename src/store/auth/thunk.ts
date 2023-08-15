import { createAsyncThunk } from '@reduxjs/toolkit'
import { actionLogin, actionLogout } from './slice'
import userAPI from '../../api/userAPI'
import { loaded } from '../preloader/slice'
import { ICreateCustomer, ILogin, ILoginForm, ISignUpForm, IUser } from '../../types/user.types'
import { AppDispatch } from '../store'
import { IThunkError } from '../../types'

export const loginThunk = createAsyncThunk<
  IUser | ILogin,
  ILoginForm,
  { rejectValue: IThunkError; dispatch: AppDispatch }
>('auth/login', async (data, { rejectWithValue, dispatch }) => {
  try {
    const response = await userAPI.login(data)

    if (response.redirect) {
      return response
    }
    localStorage.setItem('token', response.token)
    dispatch(actionLogin(response.user))
    return response.user
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
export const checkAuthThunk = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
  'auth/checkAuth',
  async (data, { dispatch }) => {
    try {
      const response = await userAPI.auth()

      dispatch(actionLogin(response.user))
    } catch (error) {
      dispatch(actionLogout())
    } finally {
      dispatch(loaded())
    }
  }
)
export const signUpThunk = createAsyncThunk<IUser, ISignUpForm, { rejectValue: IThunkError }>(
  'auth/signUp',
  async (data, { rejectWithValue }) => {
    try {
      const response = data.signUpAsMaster
        ? await userAPI.masterRegistration(data)
        : await userAPI.customerRegistration(data)
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
export const createUserCustomerThunk = createAsyncThunk<
  IUser,
  ICreateCustomer,
  { rejectValue: IThunkError }
>('auth/createUserCustomer', async (data, { rejectWithValue }) => {
  try {
    const response = await userAPI.createUserCustomer(data)
    return response
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
export const googleLoginThunk = createAsyncThunk<
  IUser | ILogin,
  string,
  { rejectValue: IThunkError; dispatch: AppDispatch }
>('auth/login/google', async (data, { rejectWithValue, dispatch }) => {
  try {
    const response = await userAPI.googleLogin(data)
    if (response.redirect) {
      return response
    }
    localStorage.setItem('token', response.token)
    dispatch(actionLogin(response.user))
    return response.user
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
