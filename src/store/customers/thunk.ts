import { createAsyncThunk } from '@reduxjs/toolkit'
import customersAPI from '../../api/customersAPI'
import userAPI from '../../api/userAPI'
import { ISignUpForm, IUser } from '../../types/user.types'
import { ICustomer } from '../../types/customer.types'
import { IThunkError } from '../../types'

export const getCustomersThunk = createAsyncThunk<ICustomer[], void, { rejectValue: IThunkError }>(
  'customers/getCustomers',
  async (data, { rejectWithValue }) => {
    try {
      const response = await customersAPI.getCustomers()
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
export const deleteCustomerThunk = createAsyncThunk<number, number, { rejectValue: IThunkError }>(
  'customers/deleteCustomer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await customersAPI.deleteCustomer(data)
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
export const addCustomerThunk = createAsyncThunk<IUser, ISignUpForm, { rejectValue: IThunkError }>(
  'customers/addCustomer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.customerRegistrationFromAdminPage(data)
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
