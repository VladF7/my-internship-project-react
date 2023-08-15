import { IOption } from '.'

export type MIN_MAX_DATE = (Date | null)[]

export interface IMasterStatistic {
  id: number
  name: string
  smallOrdersCount: string
  mediumOrdersCount: string
  bigOrdersCount: string
  rating: string
  completedOrdersCount: string
  notCompletedOrdersCount: string
  totalEarned: string
}

export interface IMasterStatisticRequestParams {
  page: number
  limit: number
  sort: string
  sortBy: string
}
export interface IMastersStatisticAndCount {
  rows: IMasterStatistic[]
  count: number
}

export interface INumberOfOrdersByDateRequestParams {
  cityIds: number[]
  masterIds: number[]
  minMaxDate?: MIN_MAX_DATE
}
export interface IOrdersByDateFiltersFields {
  cityIds: number[]
  masterIds: IOption[]
}
export interface INumberOfOrdersByDate {
  date: string
  orderCount: string
}

export interface INumberOfOrdersByCity {
  cityName: string
  orderCount: string
}

export interface INumberOfOrdersByMasters {
  masterName: string
  orderCount: string
}
