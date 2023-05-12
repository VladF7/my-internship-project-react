import { createAsyncThunk } from '@reduxjs/toolkit'
import customersAPI from '../../api/customersAPI'
import userAPI from '../../api/userAPI'

export const getCustomersThunk = createAsyncThunk(
  'customers/getCustomers',
  async (data, { rejectWithValue }) => {
    try {
      const response = await customersAPI.getCustomers()
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const deleteCustomerThunk = createAsyncThunk(
  'customers/deleteCustomer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await customersAPI.deleteCustomer(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const addCustomerThunk = createAsyncThunk(
  'customers/addCustomer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await userAPI.customerRegistrationFromAdminPage(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
