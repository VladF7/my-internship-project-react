import { createSlice } from '@reduxjs/toolkit'
import { deleteOrderThunk, editOrderThunk, getOrdersThunk } from './thunk'
import { IOrder } from '../../types/order.types'

interface OrdersState {
  orders: IOrder[]
  count: number
  error: null | string
  isLoading: boolean
  inProcess: boolean
}

const initialState: OrdersState = {
  orders: [],
  count: 0,
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
      state.orders = action.payload.rows
      state.count = action.payload.count
    })
    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload?.message || 'Unknown error'
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
      state.error = action.payload?.message || 'Unknown error'
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
      state.error = action.payload?.message || 'Unknown error'
    })
  }
})

export default ordersSlice.reducer