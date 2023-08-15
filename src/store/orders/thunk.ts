import { createAsyncThunk } from '@reduxjs/toolkit'
import ordersAPI from '../../api/ordersAPI'
import {
  IEditOrderRequestParams,
  IOrdersAndCount,
  IOrdersTableRequestParams
} from '../../types/order.types'
import { IThunkError } from '../../types'

export const getOrdersThunk = createAsyncThunk<
  IOrdersAndCount,
  IOrdersTableRequestParams,
  { rejectValue: IThunkError }
>('orders/getOrders', async (data: IOrdersTableRequestParams, { rejectWithValue }) => {
  try {
    const response = await ordersAPI.getOrders(data)
    return response
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
export const deleteOrderThunk = createAsyncThunk<number, number, { rejectValue: IThunkError }>(
  'orders/deleteOrder',
  async (data: number, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.deleteOrder(data)
      return response
    } catch (error) {
      return rejectWithValue(error as IThunkError)
    }
  }
)
export const editOrderThunk = createAsyncThunk<
  number[],
  IEditOrderRequestParams,
  { rejectValue: IThunkError }
>('orders/editOrder', async (data, { rejectWithValue }) => {
  try {
    const { id, formData } = data
    const response = await ordersAPI.editOrder(id, formData)
    return response
  } catch (error) {
    return rejectWithValue(error as IThunkError)
  }
})
