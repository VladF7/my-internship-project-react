import { request } from '../api/requestAPI'

class OrdersAPI {
  async addOrder(masterId) {
    const requestData = {}
    sessionStorage.setItem('masterId', JSON.stringify(masterId))
    Object.keys(sessionStorage).forEach((key) => {
      requestData[key] = JSON.parse(sessionStorage.getItem(key))
    })

    const response = await request(`/api/orders`, 'POST', requestData)
    return response
  }
  async getOrders() {
    const response = await request('/api/orders', 'GET', null, localStorage.getItem('token'))
    return response
  }
  async getOrderById(id) {
    const response = await request(`/api/orders/${id}`, 'GET', null, localStorage.getItem('token'))
    return response
  }
  async getOrderEndDate(requestData) {
    const response = await request(
      '/api/orders/endTime',
      'POST',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
  async editOrder(id, cityId, masterId, clockId, startTime, endTime) {
    const editedOrder = {
      cityId,
      masterId,
      clockId,
      startTime,
      endTime
    }
    const response = await request(
      `/api/orders/${id}`,
      'PUT',
      editedOrder,
      localStorage.getItem('token')
    )
    return response
  }
  async delOrder(id) {
    const response = await request(
      `/api/orders/${id}`,
      'DELETE',
      null,
      localStorage.getItem('token')
    )
    return response
  }
}

const ordersAPI = new OrdersAPI()
export default ordersAPI
