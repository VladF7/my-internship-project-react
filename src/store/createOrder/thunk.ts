import { createAsyncThunk } from '@reduxjs/toolkit'
import ordersAPI from '../../api/ordersAPI'
import { IOrder } from '../../types/order.types'
import { ICreateOrder } from '../../types/createOrder.types'
import { IThunkError } from '../../types'

export const createOrderStepOneThunk = createAsyncThunk<
  ICreateOrder,
  ICreateOrder,
  { rejectValue: IThunkError }
>('createOrder/stepOne', async (data, { rejectWithValue }) => {
  try {
    const { clockId, startTime } = data
    const endTime = await ordersAPI.getOrderEndTime(clockId as number, startTime)
    return { ...data, endTime }
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
export const createOrderStepTwoThunk = createAsyncThunk<
  IOrder,
  ICreateOrder,
  { rejectValue: IThunkError }
>('createOrder/stepTwo', async (data, { rejectWithValue }) => {
  try {
    const response = await ordersAPI.addOrder(data)
    return response
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
