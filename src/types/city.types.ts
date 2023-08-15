export interface ICityForm {
  name: string
  priceForHour: number
}
export interface ICity extends ICityForm {
  id: number
}
export interface IEditCityRequestParams {
  id: number | string
  formData: ICityForm
}
