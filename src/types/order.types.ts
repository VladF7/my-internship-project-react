import { IOption, ITablesRequestParams } from '.'
import { ICity } from './city.types'
import { IClock } from './clock.types'
import { ICustomer } from './customer.types'
import { IMaster } from './master.types'

type DateOrNull = Date | null

export interface IEditOrderFormFields {
  date: Date
  clockId: number
  cityId: number
  masterId: number
  status: string
  images: string[]
}

export interface IEditOrder {
  clockId: number
  cityId: number
  masterId: number
  price: number
  priceForHour: number
  startTime: string | Date
  endTime: string
  deletedImages: string[]
  status: string
}
export interface IEditOrderRequestParams {
  id: number | string
  formData: IEditOrder
}

export interface IOrder
  extends Pick<IEditOrder, 'startTime' | 'clockId' | 'cityId' | 'endTime' | 'masterId' | 'price'> {
  id: number
  images: IImage[]
  status: string
  customerId: number
  transactionId: string | null
  rating: string | null
  feedbackToken: string | null
  comment: string | null
  city: ICity
  clock: IClock
  customer: ICustomer
  master: IMaster
}

export interface IImage {
  publicId: string
  url: string
}

export interface IOrdersAndCount {
  rows: IOrder[]
  count: number
}

export interface IOrdersFilterFormFields {
  cities: number[]
  masters: IOption[]
  status: string
  minMaxDate: DateOrNull[]
  minMaxPrice: number[]
}

export interface IOrdersFilterForm {
  cities: number[]
  masters: number[]
  status: string
  minMaxDate: DateOrNull[]
  minMaxPrice: number[]
}

export interface IOrdersTableRequestParams extends ITablesRequestParams {
  filtersFields: IOrdersFilterForm
  timezoneOffset: number
}

export interface IFeedback {
  comment: string
  rating: number | null
}

export interface ICurrentOrderInfo {
  id: string
  endTime: string
  currentPrice: number
}
