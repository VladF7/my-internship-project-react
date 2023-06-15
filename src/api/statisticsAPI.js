import { request } from './requestAPI'

class StatisticAPI {
  async getNumberOfOrdersByDate(requestData, timezone) {
    const queryParams = {
      queryParams: encodeURIComponent(JSON.stringify({ filters: requestData, timezone }))
    }

    const response = await request(
      '/api/statistics/orders/numbersByDate' + '?' + new URLSearchParams(queryParams),
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async getNumberOfOrdersByCity(minMaxDate, timezone) {
    const queryParams = {
      queryParams: encodeURIComponent(JSON.stringify({ minMaxDate, timezone }))
    }

    const response = await request(
      '/api/statistics/orders/numbersByCity' + '?' + new URLSearchParams(queryParams),
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async getNumberOfOrdersByMasters(minMaxDate, timezone) {
    const queryParams = {
      queryParams: encodeURIComponent(JSON.stringify({ minMaxDate, timezone }))
    }

    const response = await request(
      '/api/statistics/orders/numbersByMasters' + '?' + new URLSearchParams(queryParams),
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async getMastersStatistics(requestData) {
    const queryParams = {
      queryParams: encodeURIComponent(JSON.stringify(requestData))
    }
    const response = await request(
      '/api/statistics/masters' + '?' + new URLSearchParams(queryParams),
      'GET',
      null,
      localStorage.getItem('token')
    )
    return response
  }
}

const statisticAPI = new StatisticAPI()
export default statisticAPI
