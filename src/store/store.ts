import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/slice'
import ordersReducer from './orders/slice'
import mastersReducer from './masters/slice'
import citiesReducer from './cities/slice'
import customersReducer from './customers/slice'
import createOrderReducer from './createOrder/slice'
import preloaderReducer from './preloader/slice'
import timezoneReducer from './timezone/slice'
import statisticsReducer from './statistics/slice'

export const store = configureStore({
  reducer: {
    preloader: preloaderReducer,
    auth: authReducer,
    orders: ordersReducer,
    masters: mastersReducer,
    cities: citiesReducer,
    customers: customersReducer,
    createOrder: createOrderReducer,
    timezone: timezoneReducer,
    statistics: statisticsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
