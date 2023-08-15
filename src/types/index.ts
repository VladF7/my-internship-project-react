export interface ITablesRequestParams {
  page: number
  limit: number
  sort: string
  sortBy: string
}

export interface IOption {
  value: number | string
  label: string
}

export interface IThunkError {
  message: string
  code: string
  name: string
}
