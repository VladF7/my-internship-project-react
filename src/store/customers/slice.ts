import { createSlice } from '@reduxjs/toolkit'
import { addCustomerThunk, deleteCustomerThunk, getCustomersThunk } from './thunk'
import { ICustomer } from '../../types/customer.types'

interface CustomersState {
  customers: ICustomer[]
  error: null | string
  isLoading: boolean
  inProcess: boolean
}

const initialState: CustomersState = {
  customers: [],
  error: null,
  isLoading: false,
  inProcess: false
}

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCustomersThunk.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(getCustomersThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.customers = action.payload
    })
    builder.addCase(getCustomersThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload?.message || 'Unknown error'
    })
    builder.addCase(deleteCustomerThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(deleteCustomerThunk.fulfilled, (state, action) => {
      state.inProcess = false
      const id = action.payload
      state.customers = state.customers.filter((customer) => customer.id !== id)
    })
    builder.addCase(deleteCustomerThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload?.message || 'Unknown error'
    })
    builder.addCase(addCustomerThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(addCustomerThunk.fulfilled, (state) => {
      state.inProcess = false
    })
    builder.addCase(addCustomerThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload?.message || 'Unknown error'
    })
  }
})

export default customersSlice.reducer
