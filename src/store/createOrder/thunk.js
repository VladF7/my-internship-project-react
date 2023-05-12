import { createAsyncThunk } from '@reduxjs/toolkit'
import ordersAPI from '../../api/ordersAPI'

export const createOrderStepOneThunk = createAsyncThunk(
  'createOrder/stepOne',
  async (data, { rejectWithValue }) => {
    try {
      const { clockId, startTime } = data
      const endTime = await ordersAPI.getOrderEndTime(clockId, startTime)
      return { ...data, endTime }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const createOrderStepTwoThunk = createAsyncThunk(
  'createOrder/stepTwo',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.addOrder(data)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
