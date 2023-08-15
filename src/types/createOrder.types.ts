export interface ICreateOrderForm {
  name: string
  email: string
  startTime: string | Date
  cityId: number | ''
  clockId: number | ''
  images: string[]
}

export interface ICreateOrder extends ICreateOrderForm {
  price: number | ''
  priceForHour: number | ''
  timeToFix: number | ''
  endTime?: string
  masterId?: number | ''
}

export interface ICurrentPriceInfo {
  priceForHour: number | ''
  timeToFix: number | ''
}
