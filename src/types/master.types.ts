import { IOption } from '.'
import { ICity } from './city.types'
import { IOrder } from './order.types'
import { IUser } from './user.types'

export interface IMasterEditForm {
  name: string
  cities: number[]
}
export interface IMasterEditFormFields {
  name: string
  cities: IOption[]
}
export interface IMasterEditRequestParams {
  id: string | number
  formData: IMasterEditForm
}

export interface IMaster {
  id: number
  name: string
  cities: ICity[]
  userId: number
  isActivated: boolean
  rating: string
  orders?: IOrder[]
  ratingCount?: number
  user?: IUser
}

export interface IMastersAndCount {
  rows: IMaster[]
  count: number
}

export interface IFreeMastersRequestParams {
  cityId: number
  startTime: Date
  endTime: string
  email: string
}

export interface IFreeMastersForCurrentOrderRequestParams
  extends Pick<IFreeMastersRequestParams, 'startTime' | 'cityId' | 'endTime'> {
  orderId: number | string
}
