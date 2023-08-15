import {
  IMasterStatisticRequestParams,
  IMastersStatisticAndCount,
  INumberOfOrdersByCity,
  INumberOfOrdersByDate,
  INumberOfOrdersByDateRequestParams,
  INumberOfOrdersByMasters,
  MIN_MAX_DATE
} from '../types/statistic.types'
import { axiosInstance } from './requestAPI'

class StatisticAPI {
  async getNumberOfOrdersByDate(requestData: INumberOfOrdersByDateRequestParams, timezone: string) {
    const response = await axiosInstance<INumberOfOrdersByDate[]>({
      url: '/statistics/orders/numbersByDate',
      params: {
        queryParams: encodeURIComponent(JSON.stringify({ filters: requestData, timezone }))
      },
      needAuth: true
    })
    return response.data
  }
  async getNumberOfOrdersByCity(minMaxDate: MIN_MAX_DATE, timezone: string) {
    const response = await axiosInstance<INumberOfOrdersByCity[]>({
      url: '/statistics/orders/numbersByCity',
      params: {
        queryParams: encodeURIComponent(JSON.stringify({ minMaxDate, timezone }))
      },
      needAuth: true
    })
    return response.data
  }
  async getNumberOfOrdersByMasters(minMaxDate: MIN_MAX_DATE, timezone: string) {
    const response = await axiosInstance<INumberOfOrdersByMasters[]>({
      url: '/statistics/orders/numbersByMasters',
      params: {
        queryParams: encodeURIComponent(JSON.stringify({ minMaxDate, timezone }))
      },
      needAuth: true
    })
    return response.data
  }
  async getMastersStatistics(requestData: IMasterStatisticRequestParams) {
    const response = await axiosInstance<IMastersStatisticAndCount>({
      url: '/statistics/masters',
      params: {
        queryParams: encodeURIComponent(JSON.stringify(requestData))
      },
      needAuth: true
    })
    return response.data
  }
}

const statisticAPI = new StatisticAPI()
export default statisticAPI
