import { request } from '../api/requestAPI'

class OrdersAPI {
  async addOrder() {
    const requestData = {}
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
  async getOrderEndTime(requestData) {
    const response = await request(
      '/api/orders/orderEndTime' + '?' + new URLSearchParams(requestData),
      'GET'
    )
    return response
  }
  async editOrder(id, cityId, masterId, clockId, startTime, endTime, priceForHour, price, status) {
    const editedOrder = {
      id,
      cityId,
      masterId,
      clockId,
      startTime,
      endTime,
      priceForHour,
      price,
      status
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
  async changeStatus(id) {
    const response = await request(
      `/api/orders/changeStatus/${id}`,
      'PUT',
      null,
      localStorage.getItem('token')
    )
    return response
  }
  async setRating(id, rating) {
    const requestData = {
      rating
    }
    const response = await request(
      `/api/orders/setRating/${id}`,
      'PUT',
      requestData,
      localStorage.getItem('token')
    )
    return response
  }
}

const ordersAPI = new OrdersAPI()
export default ordersAPI
