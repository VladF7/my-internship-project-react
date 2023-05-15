import { createAsyncThunk } from '@reduxjs/toolkit'
import ordersAPI from '../../api/ordersAPI'

export const getOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.getOrders(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const deleteOrderThunk = createAsyncThunk(
  'orders/deleteOrder',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.deleteOrder(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const editOrderThunk = createAsyncThunk(
  'orders/editOrder',
  async (data, { rejectWithValue }) => {
    try {
      const { id, formData } = data
      const response = await ordersAPI.editOrder(id, formData)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
