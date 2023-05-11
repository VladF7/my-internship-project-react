import { createSlice } from '@reduxjs/toolkit'
import { deleteOrderThunk, editOrderThunk, getOrdersThunk } from './thunk'

const initialState = {
  orders: [],
  error: null,
  isLoading: false,
  inProcess: false
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.orders = action.payload
    })
    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload.message
    })
    builder.addCase(deleteOrderThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(deleteOrderThunk.fulfilled, (state, action) => {
      state.inProcess = true
      const id = action.payload
      state.orders = state.orders.filter((order) => order.id !== id)
      state.error = null
    })
    builder.addCase(deleteOrderThunk.rejected, (state, action) => {
      state.inProcess = true
      state.error = action.payload.message
    })
    builder.addCase(editOrderThunk.pending, (state) => {
      state.inProcess = true
      state.error = null
    })
    builder.addCase(editOrderThunk.fulfilled, (state) => {
      state.inProcess = false
    })
    builder.addCase(editOrderThunk.rejected, (state, action) => {
      state.inProcess = false
      state.error = action.payload.message
    })
  }
})

export default ordersSlice.reducer
