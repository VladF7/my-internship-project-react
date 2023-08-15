import { createSlice } from '@reduxjs/toolkit'
import { createOrderStepOneThunk, createOrderStepTwoThunk } from './thunk'
import { ICreateOrder } from '../../types/createOrder.types'

interface CreateOrderState {
  data: ICreateOrder
  error: null | string
  isLoading: boolean
  inProcess: boolean
}

const initialState: CreateOrderState = {
  data: {
    name: '',
    email: '',
    startTime: '',
    clockId: '',
    cityId: '',
    price: '',
    priceForHour: '',
    timeToFix: '',
    endTime: '',
    masterId: '',
    images: []
  },
  error: null,
  isLoading: false,
  inProcess: false
}

export const createOrderDataSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    leaveNameForCreateOrderData(state, action) {
      state.data.name = action.payload
    },
    clearCreateOrderData(state) {
      state.data = {
        name: '',
        email: '',
        startTime: '',
        clockId: '',
        cityId: '',
        price: '',
        priceForHour: '',
        timeToFix: '',
        endTime: '',
        masterId: '',
        images: []
      }
    },
    addMasterIdToCreateOrderData(state, action) {
      state.data.masterId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderStepOneThunk.pending, (state) => {
      state.error = null
      state.inProcess = true
    })
    builder.addCase(createOrderStepOneThunk.fulfilled, (state, action) => {
      state.data = { ...state.data, ...action.payload }
      state.inProcess = false
    })
    builder.addCase(createOrderStepOneThunk.rejected, (state, action) => {
      state.error = action.payload?.message || 'Unknown error'
      state.inProcess = false
    })
    builder.addCase(createOrderStepTwoThunk.pending, (state) => {
      state.error = null
      state.inProcess = true
    })
    builder.addCase(createOrderStepTwoThunk.fulfilled, (state) => {
      state.inProcess = false
    })
    builder.addCase(createOrderStepTwoThunk.rejected, (state, action) => {
      state.error = action.payload?.message || 'Unknown error'
      state.inProcess = false
    })
  }
})

export const { leaveNameForCreateOrderData, clearCreateOrderData, addMasterIdToCreateOrderData } =
  createOrderDataSlice.actions
export default createOrderDataSlice.reducer
